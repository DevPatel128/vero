import { type NextRequest, NextResponse } from "next/server";
import { jsonError, requireApiUser, withRateLimit } from "@/lib/api";
import { createSubscription, PLAN_IDS, type PlanKey } from "@/lib/razorpay";
import { createAdminClient } from "@/lib/supabase/server";
import { audit } from "@/lib/audit";
import { siteConfig } from "@/lib/site";

export async function POST(req: NextRequest) {
  const user = await requireApiUser();
  if (!user) return jsonError("unauthorized", "Sign in required.", 401);
  const rl = await withRateLimit("api", user.id);
  if (rl) return rl;

  const url = new URL(req.url);
  const plan = (url.searchParams.get("plan") ?? "pro_monthly") as PlanKey;
  const planId = PLAN_IDS[plan];
  if (!planId) return jsonError("config_error", `Razorpay plan ${plan} not configured.`, 500);

  let subscription;
  try {
    subscription = await createSubscription({
      planId,
      userId: user.id,
      customerEmail: user.email!,
      customerName: (user.user_metadata as { full_name?: string })?.full_name ?? null,
      trialDays: 14,
    });
  } catch (err) {
    console.error("[razorpay.subscribe] create failed", err);
    return jsonError("razorpay_error", "Couldn't create subscription.", 500);
  }

  const admin = createAdminClient();
  await admin.from("subscriptions_billing").upsert({
    user_id: user.id,
    razorpay_subscription_id: subscription.id,
    plan: plan.startsWith("team") ? "team" : "pro",
    status: subscription.status ?? "created",
  });

  await audit({
    userId: user.id,
    action: "billing.subscribe.create",
    resourceType: "subscription",
    resourceId: subscription.id,
    metadata: { plan },
  });

  const successUrl = `${siteConfig.url}/settings/billing?status=success&sub=${subscription.id}`;
  const cancelUrl = `${siteConfig.url}/settings/billing?status=cancelled`;

  return NextResponse.json({
    subscription_id: subscription.id,
    short_url: subscription.short_url,
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    success_url: successUrl,
    cancel_url: cancelUrl,
  });
}
