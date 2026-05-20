import { type NextRequest } from "next/server";
import { z } from "zod";
import { jsonError, requireApiUser, validate, withRateLimit } from "@/lib/api";
import { verifyCheckoutSignature } from "@/lib/razorpay";
import { createAdminClient } from "@/lib/supabase/server";
import { audit } from "@/lib/audit";

const schema = z.object({
  razorpay_payment_id: z.string().min(4),
  razorpay_subscription_id: z.string().min(4),
  razorpay_signature: z.string().min(8),
});

export async function POST(req: NextRequest) {
  const user = await requireApiUser();
  if (!user) return jsonError("unauthorized", "Sign in required.", 401);
  const rl = await withRateLimit("api", user.id);
  if (rl) return rl;

  const parsed = await validate(schema, req);
  if ("error" in parsed) return parsed.error;

  const ok = verifyCheckoutSignature({
    paymentId: parsed.data.razorpay_payment_id,
    subscriptionId: parsed.data.razorpay_subscription_id,
    signature: parsed.data.razorpay_signature,
  });
  if (!ok) {
    await audit({
      userId: user.id,
      action: "billing.verify.failed",
      resourceType: "subscription",
      resourceId: parsed.data.razorpay_subscription_id,
    });
    return jsonError("invalid_signature", "Signature verification failed.", 400);
  }

  const admin = createAdminClient();
  await admin
    .from("subscriptions_billing")
    .update({ status: "authenticated", razorpay_subscription_id: parsed.data.razorpay_subscription_id })
    .eq("user_id", user.id);

  await audit({
    userId: user.id,
    action: "billing.verify.success",
    resourceType: "subscription",
    resourceId: parsed.data.razorpay_subscription_id,
  });

  return Response.json({ ok: true });
}
