import type { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Billing", robots: { index: false, follow: false } };

export default async function BillingPage() {
  const supabase = await createClient();
  const { data: billing } = await supabase.from("subscriptions_billing").select("*").maybeSingle();
  const plan = billing?.plan ?? "free";

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow">Current plan</p>
            <h2 className="mt-1 font-serif text-3xl tracking-tight capitalize">{plan}</h2>
            {billing?.current_period_end && (
              <p className="mt-2 text-sm text-muted-foreground">
                {billing.cancel_at_period_end ? "Cancels" : "Renews"} on {formatDate(billing.current_period_end)}
              </p>
            )}
          </div>
          <Badge variant={plan === "free" ? "secondary" : "gold"}>{billing?.status ?? "free"}</Badge>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {plan === "free" ? (
            <form action="/api/stripe/checkout" method="post">
              <Button type="submit" variant="primary">Upgrade to Pro · $9/mo</Button>
            </form>
          ) : (
            <form action="/api/stripe/portal" method="post">
              <Button type="submit" variant="outline">Manage in Stripe →</Button>
            </form>
          )}
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="font-serif text-xl">Invoices</h2>
        <p className="mt-1 text-sm text-muted-foreground">Past invoices are managed in Stripe.</p>
        <form action="/api/stripe/portal" method="post" className="mt-4">
          <Button type="submit" variant="outline" size="sm">Open billing portal →</Button>
        </form>
      </Card>
    </div>
  );
}
