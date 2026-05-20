import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Careers",
  description: "Help us build the financial operating system of the next decade. Open and upcoming roles at Trove / Vroe Labs.",
  alternates: { canonical: "/careers" },
};

const roles = [
  { title: "Founding Engineer (Full-Stack)", location: "Remote · Worldwide", type: "Full-time", status: "Coming soon", desc: "Ship the V3. TypeScript + Postgres. Equity-heavy. Compensated when we raise." },
  { title: "Founding Designer", location: "Remote · Worldwide", type: "Full-time", status: "Coming soon", desc: "Own the entire product surface. FT × Apple sensibility. Type, motion, density." },
  { title: "Growth Engineer", location: "Remote · Worldwide", type: "Contract → FT", status: "Coming soon", desc: "Programmatic SEO, lifecycle email, onboarding optimization. Build the funnel." },
];

export default function CareersPage() {
  return (
    <>
      <section className="border-b border-border">
        <div className="container-wide py-20 md:py-28">
          <Badge variant="gold" className="mb-6">Careers</Badge>
          <h1 className="display-serif text-display-xl">Build the financial OS of the next decade.</h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            We are not currently hiring full-time. We are talking to people we want to work with someday. If that's you, send a note — when the moment comes, we'll come back.
          </p>
        </div>
      </section>

      <section className="container-wide py-20">
        <p className="eyebrow mb-6">Open & upcoming</p>
        <div className="divide-y divide-border border-y border-border">
          {roles.map((r) => (
            <div key={r.title} className="grid gap-4 py-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="font-serif text-2xl tracking-tight">{r.title}</h3>
                  <Badge variant="secondary">{r.status}</Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{r.location} · {r.type}</p>
                <p className="mt-2 max-w-2xl text-base text-muted-foreground">{r.desc}</p>
              </div>
              <div>
                <Button asChild variant="outline">
                  <Link href={`/contact?topic=press&role=${encodeURIComponent(r.title)}`}>Express interest</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-trove-cream py-24">
        <div className="container-prose">
          <h2 className="display-serif text-display-md">How we work</h2>
          <ul className="mt-6 space-y-3 text-lg leading-relaxed">
            <li>· Remote. Async by default. Synchronous when it matters.</li>
            <li>· Salary + equity. No bullshit titles.</li>
            <li>· Two-week trial paid project before any offer.</li>
            <li>· We hire for taste, then craft, then speed.</li>
            <li>· No interview gauntlets. We talk like adults.</li>
          </ul>
        </div>
      </section>
    </>
  );
}
