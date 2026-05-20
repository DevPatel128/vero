import type { Metadata } from "next";
import Link from "next/link";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Trove is free for individuals. Pro adds AI, exports, and unlimited categories for $9/mo. Team for shared finances.",
  alternates: { canonical: "/pricing" },
};

const plans = [
  {
    name: "Free",
    price: "$0",
    cadence: "forever",
    tagline: "Everything an individual needs to take control.",
    cta: { label: "Start free", href: "/register" },
    highlight: false,
    features: [
      { name: "Up to 3 accounts",                ok: true },
      { name: "1,000 transactions / month",      ok: true },
      { name: "Smart categorization",            ok: true },
      { name: "Basic subscription tracking",     ok: true },
      { name: "Mobile + dark mode",              ok: true },
      { name: "AI financial insights",           ok: false },
      { name: "Unlimited exports",               ok: false },
      { name: "Multi-currency",                  ok: false },
      { name: "Goal forecasting",                ok: false },
    ],
  },
  {
    name: "Pro",
    price: "$9",
    cadence: "per month",
    yearly: "$84/yr · save 22%",
    tagline: "For the operator who wants clarity, not chores.",
    cta: { label: "Start Pro trial", href: "/register?plan=pro" },
    highlight: true,
    features: [
      { name: "Unlimited accounts",              ok: true },
      { name: "Unlimited transactions",          ok: true },
      { name: "Smart categorization",            ok: true },
      { name: "Advanced subscription tracker",   ok: true },
      { name: "Mobile + dark mode",              ok: true },
      { name: "AI financial insights",           ok: true },
      { name: "Unlimited exports (PDF, CSV)",    ok: true },
      { name: "Multi-currency",                  ok: true },
      { name: "Goal forecasting",                ok: true },
    ],
  },
  {
    name: "Team",
    price: "$24",
    cadence: "per month",
    yearly: "$240/yr · save 17%",
    tagline: "Share finances with a partner, family, or co-founder.",
    cta: { label: "Talk to us", href: "/contact?topic=team" },
    highlight: false,
    features: [
      { name: "Everything in Pro",               ok: true },
      { name: "Up to 5 members",                 ok: true },
      { name: "Shared goals & budgets",          ok: true },
      { name: "Role-based access",               ok: true },
      { name: "Audit logs",                      ok: true },
      { name: "Priority support",                ok: true },
      { name: "Custom categories",               ok: true },
      { name: "SSO (coming)",                    ok: true },
      { name: "Dedicated CSM",                   ok: false },
    ],
  },
];

export default function PricingPage() {
  return (
    <>
      <section className="border-b border-border">
        <div className="container-wide py-20 md:py-28 text-center">
          <Badge variant="gold" className="mb-6">Pricing</Badge>
          <h1 className="display-serif text-display-xl max-w-3xl mx-auto">
            Honest pricing.<br />No surprises.
          </h1>
          <p className="mt-6 mx-auto max-w-xl text-lg text-muted-foreground">
            Free for individuals. Always. Pro and Team for those who want more — at a price that feels like respect.
          </p>
        </div>
      </section>

      <section className="container-wide py-20">
        <div className="grid gap-px bg-trove-line lg:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={plan.highlight ? "relative border-trove-gold bg-trove-cream" : "bg-card"}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-6">
                  <Badge variant="gold">Most popular</Badge>
                </div>
              )}
              <div className="p-8">
                <h2 className="font-serif text-2xl tracking-tight">{plan.name}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{plan.tagline}</p>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="font-serif text-5xl tracking-tight number-tabular">{plan.price}</span>
                  <span className="text-sm text-muted-foreground">{plan.cadence}</span>
                </div>
                {plan.yearly && <p className="mt-1 text-xs text-trove-goldDeep">{plan.yearly}</p>}
                <Button asChild size="lg" className="mt-6 w-full" variant={plan.highlight ? "primary" : "default"}>
                  <Link href={plan.cta.href}>{plan.cta.label}</Link>
                </Button>
                <ul className="mt-8 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f.name} className="flex items-start gap-3 text-sm">
                      {f.ok ? (
                        <Check className="h-4 w-4 mt-0.5 text-trove-goldDeep shrink-0" />
                      ) : (
                        <X className="h-4 w-4 mt-0.5 text-muted-foreground/40 shrink-0" />
                      )}
                      <span className={f.ok ? "text-trove-ink" : "text-muted-foreground/60 line-through"}>{f.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-trove-surface/30 py-24">
        <div className="container-prose">
          <h2 className="display-serif text-display-md">Pricing FAQ</h2>
          <dl className="mt-8 divide-y divide-border border-y border-border">
            {[
              { q: "Is there a free trial for Pro?", a: "Yes — 14 days, no card required. After that you stay on Free unless you upgrade." },
              { q: "Can I switch plans anytime?", a: "Yes. Upgrades are prorated. Downgrades take effect at the next billing cycle." },
              { q: "Do you offer student discounts?", a: "50% off Pro with a .edu email. Email us at hello@trove.vroelabs.com." },
              { q: "What payment methods do you accept?", a: "All major cards via Stripe. We don't store card details — Stripe does, encrypted." },
              { q: "Refunds?", a: "Cancel within 7 days of paying for an annual plan for a full refund. After that, we don't pro-rate refunds." },
            ].map((item) => (
              <div key={item.q} className="py-5">
                <dt className="font-serif text-lg">{item.q}</dt>
                <dd className="mt-1 text-base text-muted-foreground">{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
