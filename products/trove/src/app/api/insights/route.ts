import { type NextRequest } from "next/server";
import { jsonError, requireApiUser, withRateLimit } from "@/lib/api";
import { createClient } from "@/lib/supabase/server";
import { generateInsight } from "@/lib/ai";
import { audit } from "@/lib/audit";

export async function POST(_req: NextRequest) {
  const user = await requireApiUser();
  if (!user) return jsonError("unauthorized", "Sign in required.", 401);
  const rl = await withRateLimit("ai", user.id);
  if (rl) return rl;

  const supabase = await createClient();
  const since = new Date(); since.setDate(since.getDate() - 30);

  const [{ data: txns = [] }, { data: subs = [] }] = await Promise.all([
    supabase.from("transactions").select("amount, direction, category, merchant").gte("occurred_at", since.toISOString()),
    supabase.from("subscriptions").select("merchant, amount, cadence").eq("status", "active").limit(8),
  ]);

  const income = (txns ?? []).filter((t) => t.direction === "credit").reduce((s, t) => s + Number(t.amount), 0);
  const spend = (txns ?? []).filter((t) => t.direction === "debit").reduce((s, t) => s + Number(t.amount), 0);

  const cats = new Map<string, number>();
  (txns ?? []).forEach((t) => { if (t.direction === "debit") cats.set(t.category, (cats.get(t.category) ?? 0) + Number(t.amount)); });
  const topCategories = Array.from(cats.entries()).map(([category, amount]) => ({ category, amount })).sort((a, b) => b.amount - a.amount).slice(0, 5);

  let text: string;
  try {
    text = await generateInsight({ windowDays: 30, income, spend, topCategories, subscriptions: (subs ?? []).map((s) => ({ merchant: s.merchant, amount: Number(s.amount), cadence: s.cadence })) });
  } catch (err) {
    console.error("[insights] AI failed", err);
    return jsonError("ai_unavailable", "AI provider is temporarily unavailable.", 503);
  }

  const { data } = await supabase.from("insights").insert({
    user_id: user.id, kind: "monthly_summary",
    payload: { text, income, spend, topCategories },
    window_start: since.toISOString(), window_end: new Date().toISOString(),
  }).select().single();

  await audit({ userId: user.id, action: "insight.generate", resourceType: "insight", resourceId: data?.id ?? null });
  return Response.json({ text, insight_id: data?.id });
}
