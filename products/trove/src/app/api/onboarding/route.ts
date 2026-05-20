import { type NextRequest } from "next/server";
import { z } from "zod";
import { jsonError, requireApiUser, validate, withRateLimit } from "@/lib/api";
import { createClient } from "@/lib/supabase/server";
import { audit } from "@/lib/audit";
import { sendEmail, welcomeEmailHtml } from "@/lib/resend";

const schema = z.object({
  name: z.string().min(2).max(80),
  currency: z.string().length(3),
  monthly_income: z.number().nonnegative().optional().default(0),
  account: z.object({
    name: z.string().min(1).max(80),
    type: z.enum(["checking", "savings", "credit", "investment", "cash", "loan", "other"]),
  }).optional(),
});

export async function POST(req: NextRequest) {
  const user = await requireApiUser();
  if (!user) return jsonError("unauthorized", "Sign in required.", 401);

  const rl = await withRateLimit("api", user.id);
  if (rl) return rl;

  const parsed = await validate(schema, req);
  if ("error" in parsed) return parsed.error;
  const { name, currency, monthly_income, account } = parsed.data;

  const supabase = await createClient();
  const { error: profileErr } = await supabase.from("profiles").update({
    full_name: name,
    currency,
    onboarding_complete: true,
  }).eq("id", user.id);
  if (profileErr) return jsonError("db_error", profileErr.message, 500);

  const income = monthly_income ?? 0;
  if (income > 0) {
    const monthStart = new Date(); monthStart.setDate(1);
    await supabase.from("monthly_income").upsert({ user_id: user.id, amount: income, month: monthStart.toISOString().slice(0, 10) });
  }

  if (account) {
    await supabase.from("accounts").insert({ user_id: user.id, name: account.name, type: account.type });
  }

  await audit({ userId: user.id, action: "onboarding.complete", resourceType: "profile", resourceId: user.id });

  try {
    if (user.email) await sendEmail({ to: user.email, subject: "Welcome to Trove", html: welcomeEmailHtml(name) });
  } catch (err) {
    console.warn("[onboarding] welcome email failed", err);
  }

  return Response.json({ ok: true });
}
