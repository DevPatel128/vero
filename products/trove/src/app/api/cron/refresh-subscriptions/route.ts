import { type NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

/**
 * Detects recurring charges. Marks transactions and upserts into subscriptions.
 * Runs nightly via Vercel cron (vercel.json).
 */
export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) return new Response("unauthorized", { status: 401 });

  const admin = createAdminClient();
  const since = new Date(); since.setDate(since.getDate() - 90);

  const { data: txns = [] } = await admin
    .from("transactions")
    .select("user_id, merchant, amount, category, occurred_at")
    .eq("direction", "debit")
    .gte("occurred_at", since.toISOString());

  // Group by (user, merchant). Detect cadence by interval consistency.
  type Group = { user_id: string; merchant: string; category: string; amounts: number[]; dates: number[] };
  const groups = new Map<string, Group>();
  for (const t of (txns ?? []) as { user_id: string; merchant: string; category: string; amount: number | string; occurred_at: string }[]) {
    const key = `${t.user_id}::${t.merchant.toLowerCase()}`;
    const g: Group = groups.get(key) ?? { user_id: t.user_id, merchant: t.merchant, category: t.category, amounts: [], dates: [] };
    g.amounts.push(Number(t.amount));
    g.dates.push(new Date(t.occurred_at).getTime());
    groups.set(key, g);
  }

  let upserted = 0;
  for (const g of groups.values()) {
    if (g.dates.length < 3) continue;
    g.dates.sort((a, b) => a - b);
    const intervals: number[] = [];
    for (let i = 1; i < g.dates.length; i++) intervals.push((g.dates[i]! - g.dates[i - 1]!) / 86400_000);
    const avg = intervals.reduce((a, b) => a + b, 0) / intervals.length;
    const variance = Math.sqrt(intervals.map((d) => (d - avg) ** 2).reduce((a, b) => a + b, 0) / intervals.length);
    const consistent = variance / avg < 0.2;
    if (!consistent) continue;

    const cadence = avg <= 10 ? "weekly" : avg <= 45 ? "monthly" : avg <= 120 ? "quarterly" : "yearly";
    const avgAmount = g.amounts.reduce((a, b) => a + b, 0) / g.amounts.length;
    const nextRenewal = new Date(g.dates.at(-1)! + avg * 86400_000).toISOString().slice(0, 10);

    await admin.from("subscriptions").upsert(
      { user_id: g.user_id, merchant: g.merchant, amount: avgAmount, cadence, next_renewal: nextRenewal, category: g.category, status: "active", confidence: Math.min(1, 1 - variance / avg) },
      { onConflict: "user_id,merchant" },
    );
    upserted++;
  }

  return Response.json({ groups: groups.size, upserted });
}
