"use client";

import { useState } from "react";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => { open: () => void };
  }
}

interface RazorpayOptions {
  key: string;
  subscription_id: string;
  name: string;
  description: string;
  prefill?: { email?: string; name?: string };
  theme?: { color: string };
  handler: (resp: { razorpay_payment_id: string; razorpay_subscription_id: string; razorpay_signature: string }) => void;
  modal?: { ondismiss?: () => void };
}

export function UpgradeButton({ plan, label }: { plan: "pro_monthly" | "pro_yearly" | "team_monthly" | "team_yearly"; label: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/razorpay/subscribe?plan=${plan}`, { method: "POST" });
      if (!res.ok) throw new Error("subscribe failed");
      const body = (await res.json()) as { subscription_id: string; key_id: string; success_url: string };

      if (!window.Razorpay) {
        toast.error("Couldn't load Razorpay checkout. Refresh and try again.");
        return;
      }

      const rz = new window.Razorpay({
        key: body.key_id,
        subscription_id: body.subscription_id,
        name: "Trove",
        description: "Trove Pro subscription",
        theme: { color: "#C9A96E" },
        handler: async (resp) => {
          const verify = await fetch("/api/razorpay/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(resp),
          });
          if (verify.ok) {
            toast.success("Payment confirmed. Pro unlocked.");
            router.push("/settings/billing?status=success");
            router.refresh();
          } else {
            toast.error("Payment captured but verification failed. Contact support.");
          }
        },
        modal: { ondismiss: () => setLoading(false) },
      });
      rz.open();
    } catch (err) {
      console.error(err);
      toast.error("Couldn't start checkout. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />
      <Button onClick={onClick} loading={loading} disabled={loading} variant="primary">{label}</Button>
    </>
  );
}

export function CancelButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    if (!confirm("Cancel at end of billing period? You keep Pro access until then.")) return;
    setLoading(true);
    try {
      const res = await fetch("/api/razorpay/cancel", { method: "POST" });
      if (!res.ok) throw new Error("cancel failed");
      toast.success("Cancellation scheduled. You keep Pro until period end.");
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error("Couldn't cancel. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return <Button onClick={onClick} loading={loading} disabled={loading} variant="outline">Cancel subscription</Button>;
}
