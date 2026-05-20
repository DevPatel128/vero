import "server-only";
import crypto from "node:crypto";
import Razorpay from "razorpay";

let _client: Razorpay | null = null;

export function razorpay(): Razorpay {
  if (_client) return _client;
  const id = process.env.RAZORPAY_KEY_ID;
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!id || !secret) throw new Error("Razorpay credentials missing");
  _client = new Razorpay({ key_id: id, key_secret: secret });
  return _client;
}

export const PLAN_IDS = {
  pro_monthly: process.env.RAZORPAY_PLAN_ID_PRO_MONTHLY ?? "",
  pro_yearly: process.env.RAZORPAY_PLAN_ID_PRO_YEARLY ?? "",
  team_monthly: process.env.RAZORPAY_PLAN_ID_TEAM_MONTHLY ?? "",
  team_yearly: process.env.RAZORPAY_PLAN_ID_TEAM_YEARLY ?? "",
} as const;

export type PlanKey = keyof typeof PLAN_IDS;

interface CustomerInput {
  userId: string;
  email: string;
  name?: string | null;
  contact?: string | null;
}

export async function getOrCreateCustomer(opts: CustomerInput) {
  const r = razorpay();
  return r.customers.create({
    email: opts.email,
    name: opts.name ?? opts.email,
    contact: opts.contact ?? undefined,
    notes: { trove_user_id: opts.userId },
    fail_existing: 0,
  });
}

export async function createSubscription(opts: {
  planId: string;
  userId: string;
  customerEmail: string;
  customerName?: string | null;
  totalCount?: number;
  notifyCustomer?: boolean;
  trialDays?: number;
}) {
  const r = razorpay();
  const subscription = await r.subscriptions.create({
    plan_id: opts.planId,
    total_count: opts.totalCount ?? 120,
    customer_notify: opts.notifyCustomer === false ? 0 : 1,
    quantity: 1,
    start_at: opts.trialDays ? Math.floor(Date.now() / 1000) + opts.trialDays * 86400 : undefined,
    notes: {
      trove_user_id: opts.userId,
      email: opts.customerEmail,
      name: opts.customerName ?? "",
    },
  });
  return subscription;
}

export async function cancelSubscription(subscriptionId: string, atCycleEnd = true) {
  const r = razorpay();
  return r.subscriptions.cancel(subscriptionId, atCycleEnd);
}

export async function fetchSubscription(subscriptionId: string) {
  const r = razorpay();
  return r.subscriptions.fetch(subscriptionId);
}

/** HMAC-SHA256 timing-safe webhook signature verification. */
export function verifyWebhookSignature(rawBody: string, signature: string | null): boolean {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret || !signature) return false;
  const expected = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
  const sigBuf = Buffer.from(signature, "utf8");
  const expBuf = Buffer.from(expected, "utf8");
  if (sigBuf.length !== expBuf.length) return false;
  return crypto.timingSafeEqual(sigBuf, expBuf);
}

/** Verify the inline checkout handler response (razorpay_payment_id + razorpay_subscription_id + razorpay_signature). */
export function verifyCheckoutSignature(input: { paymentId: string; subscriptionId: string; signature: string }): boolean {
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret) return false;
  const expected = crypto
    .createHmac("sha256", secret)
    .update(`${input.paymentId}|${input.subscriptionId}`)
    .digest("hex");
  if (expected.length !== input.signature.length) return false;
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(input.signature));
}
