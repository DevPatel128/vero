import { type NextRequest } from "next/server";
import { verifyWebhookSignature } from "@/lib/razorpay";
import { createAdminClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

interface RazorpayEvent {
  event: string;
  payload: {
    subscription?: {
      entity?: {
        id: string;
        status: string;
        plan_id: string;
        current_start: number | null;
        current_end: number | null;
        ended_at: number | null;
        notes: Record<string, string>;
      };
    };
    payment?: {
      entity?: {
        id: string;
        status: string;
        amount: number;
        currency: string;
        subscription_id?: string;
        notes?: Record<string, string>;
      };
    };
  };
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get("x-razorpay-signature");

  if (!verifyWebhookSignature(rawBody, signature)) {
    return new Response("invalid signature", { status: 400 });
  }

  let event: RazorpayEvent;
  try {
    event = JSON.parse(rawBody) as RazorpayEvent;
  } catch {
    return new Response("invalid json", { status: 400 });
  }

  const admin = createAdminClient();
  const sub = event.payload.subscription?.entity;
  const userId = sub?.notes?.trove_user_id;

  try {
    switch (event.event) {
      case "subscription.authenticated":
      case "subscription.activated":
      case "subscription.updated":
      case "subscription.resumed": {
        if (!sub || !userId) break;
        await admin.from("subscriptions_billing").upsert({
          user_id: userId,
          razorpay_subscription_id: sub.id,
          plan: planFromId(sub.plan_id),
          status: sub.status,
          current_period_end: sub.current_end ? new Date(sub.current_end * 1000).toISOString() : null,
          cancel_at_period_end: false,
        });
        break;
      }
      case "subscription.charged": {
        if (!sub || !userId) break;
        await admin.from("subscriptions_billing").update({
          status: "active",
          current_period_end: sub.current_end ? new Date(sub.current_end * 1000).toISOString() : null,
        }).eq("user_id", userId);
        break;
      }
      case "subscription.halted":
      case "subscription.paused": {
        if (!userId) break;
        await admin.from("subscriptions_billing").update({ status: sub?.status ?? "halted" }).eq("user_id", userId);
        break;
      }
      case "subscription.cancelled":
      case "subscription.completed": {
        if (!userId) break;
        await admin.from("subscriptions_billing").update({ status: "canceled", plan: "free" }).eq("user_id", userId);
        break;
      }
      case "payment.failed": {
        // TODO: email user via Resend
        break;
      }
      default:
        break;
    }
  } catch (err) {
    console.error("[razorpay.webhook] handler failed", err);
    return new Response("handler error", { status: 500 });
  }

  return Response.json({ received: true });
}

function planFromId(planId: string): "pro" | "team" {
  const team = [process.env.RAZORPAY_PLAN_ID_TEAM_MONTHLY, process.env.RAZORPAY_PLAN_ID_TEAM_YEARLY].filter(Boolean);
  return team.includes(planId) ? "team" : "pro";
}
