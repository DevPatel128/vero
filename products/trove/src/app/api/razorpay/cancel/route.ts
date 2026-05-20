import { type NextRequest } from "next/server";
import { jsonError, requireApiUser, withRateLimit } from "@/lib/api";
import { cancelSubscription } from "@/lib/razorpay";
import { createClient, createAdminClient } from "@/lib/supabase/server";
import { audit } from "@/lib/audit";

export async function POST(req: NextRequest) {
  const user = await requireApiUser();
  if (!user) return jsonError("unauthorized", "Sign in required.", 401);
  const rl = await withRateLimit("api", user.id);
  if (rl) return rl;

  const supabase = await createClient();
  const { data: billing } = await supabase
    .from("subscriptions_billing")
    .select("razorpay_subscription_id, plan, status")
    .eq("user_id", user.id)
    .maybeSingle();

  const subId = (billing as { razorpay_subscription_id?: string | null } | null)?.razorpay_subscription_id;
  if (!subId) return jsonError("not_found", "No active subscription to cancel.", 404);

  try {
    await cancelSubscription(subId, true);
  } catch (err) {
    console.error("[razorpay.cancel] failed", err);
    return jsonError("razorpay_error", "Couldn't cancel subscription.", 500);
  }

  const admin = createAdminClient();
  await admin
    .from("subscriptions_billing")
    .update({ cancel_at_period_end: true })
    .eq("user_id", user.id);

  await audit({
    userId: user.id,
    action: "billing.subscribe.cancel",
    resourceType: "subscription",
    resourceId: subId,
  });

  return Response.json({ ok: true, cancel_at_period_end: true });
}
