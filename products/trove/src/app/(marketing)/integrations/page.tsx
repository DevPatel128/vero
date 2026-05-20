import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Integrations",
  description: "Connect Trove to the tools you already use — Plaid, CSV imports, Stripe, Zapier (soon), and more.",
  alternates: { canonical: "/integrations" },
};

const integrations = [
  { name: "Plaid",  status: "Available",  cat: "Banking",     body: "Read-only connection to 12,000+ U.S. banks. OAuth where supported." },
  { name: "CSV Import", status: "Available", cat: "Import",   body: "Drop any CSV. Auto-detect columns. Duplicates filtered." },
  { name: "Stripe", status: "Available",  cat: "Billing",     body: "Powers your Trove Pro subscription. Card details never touch our servers." },
  { name: "Resend", status: "Available",  cat: "Email",       body: "Transactional emails — magic links, alerts, weekly digests." },
  { name: "PostHog", status: "Available", cat: "Analytics",   body: "Your usage events. PII-masked session replay. Opt-out anytime." },
  { name: "Sentry", status: "Available",  cat: "Monitoring",  body: "Error tracking so we fix bugs before you report them." },
  { name: "Google", status: "Available",  cat: "Auth",        body: "Sign in with Google. One click. Two seconds." },
  { name: "Apple",  status: "Q3 2026",    cat: "Auth",        body: "Sign in with Apple — coming alongside the iOS app." },
  { name: "Zapier", status: "Q4 2026",    cat: "Automation",  body: "Trigger workflows on transaction events. Connect 6,000+ apps." },
  { name: "QuickBooks", status: "Planned", cat: "Accounting", body: "Push categorized expenses to QuickBooks for freelancers." },
  { name: "Notion", status: "Planned",    cat: "Productivity", body: "Embed Trove tiles in Notion dashboards." },
  { name: "Webhooks", status: "Available", cat: "Developer",  body: "Subscribe to transaction.created, budget.exceeded, and more." },
];

export default function IntegrationsPage() {
  return (
    <>
      <section className="border-b border-border">
        <div className="container-wide py-20 md:py-28">
          <Badge variant="gold" className="mb-6">Integrations</Badge>
          <h1 className="display-serif text-display-xl">Plays nicely with the rest of your stack.</h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Trove is opinionated about money — and humble about everything else. Connect the tools you already use.
          </p>
        </div>
      </section>

      <section className="container-wide py-20">
        <div className="grid gap-px bg-trove-line sm:grid-cols-2 lg:grid-cols-3">
          {integrations.map((i) => (
            <div key={i.name} className="bg-background p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-serif text-xl tracking-tight">{i.name}</p>
                  <p className="mt-0.5 text-xs uppercase tracking-wider text-muted-foreground">{i.cat}</p>
                </div>
                <Badge variant={i.status === "Available" ? "success" : "secondary"}>{i.status}</Badge>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{i.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
