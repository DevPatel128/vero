import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, BarChart3, Brain, Receipt, Repeat, Sparkles, Target, TrendingUp, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Trove — Your financial operating system",
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <SocialProof />
      <Pillars />
      <DashboardPreview />
      <FeatureGrid />
      <HowItWorks />
      <Testimonials />
      <SecurityCallout />
      <PricingTeaser />
      <FAQ />
      <CTAFooter />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="container-wide pt-20 pb-24 md:pt-28 md:pb-32">
        <div className="grid items-center gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Badge variant="gold" className="mb-6 gap-1.5 px-3 py-1">
              <Sparkles className="h-3 w-3" /> Now in private pilot · 200 founding members
            </Badge>
            <h1 className="display-serif text-display-xl text-balance text-trove-ink">
              Your money,<br />
              <span className="italic text-trove-goldDeep">finally</span> in focus.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">
              Trove is the financial operating system for a generation that grew up with five bank accounts, twelve subscriptions, and zero clarity. Connect everything. Understand anything. Decide better.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Button asChild size="lg">
                <Link href="/register">
                  {siteConfig.primaryCta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="ghost" size="lg">
                <Link href="/features">See how it works →</Link>
              </Button>
            </div>
            <p className="mt-6 text-xs text-muted-foreground">
              Free forever for personal use · No credit card · Read-only bank access
            </p>
          </div>

          <div className="lg:col-span-5">
            <HeroVisual />
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px bg-trove-line" />
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="relative card-flat overflow-hidden">
      <div className="border-b border-border px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-trove-line" />
          <span className="h-2 w-2 rounded-full bg-trove-line" />
          <span className="h-2 w-2 rounded-full bg-trove-line" />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">trove.app/dashboard</span>
      </div>
      <div className="p-6">
        <div className="flex items-baseline justify-between">
          <div>
            <p className="eyebrow">Net position · May</p>
            <p className="mt-1 font-serif text-3xl tracking-tight">$24,318.<span className="text-muted-foreground">04</span></p>
          </div>
          <Badge variant="success" className="gap-1"><TrendingUp className="h-3 w-3" /> +12.4%</Badge>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-px bg-trove-line">
          {[
            { label: "Income", value: "$8,250", tone: "success" as const },
            { label: "Spent", value: "$3,891", tone: "default" as const },
            { label: "Saved", value: "$4,359", tone: "gold" as const },
          ].map((s) => (
            <div key={s.label} className="bg-card p-4">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{s.label}</p>
              <p className="mt-1 font-serif text-lg number-tabular">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <div className="flex items-baseline justify-between">
            <p className="eyebrow">Cash flow · 6 mo</p>
            <p className="text-xs text-muted-foreground">in / out</p>
          </div>
          <div className="mt-3 flex h-24 items-end gap-1.5">
            {[
              { in: 70, out: 48 },
              { in: 65, out: 52 },
              { in: 80, out: 55 },
              { in: 78, out: 60 },
              { in: 82, out: 50 },
              { in: 95, out: 45 },
            ].map((b, i) => (
              <div key={i} className="flex flex-1 flex-col gap-1">
                <div className="bg-trove-ink" style={{ height: `${b.in}%` }} />
                <div className="bg-trove-salmon" style={{ height: `${b.out}%` }} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 rounded-[4px] border border-trove-gold/30 bg-trove-gold/5 p-4">
          <div className="flex items-start gap-3">
            <Brain className="h-4 w-4 mt-0.5 text-trove-goldDeep" />
            <div className="text-sm">
              <p className="font-medium">You'll spend $187 less this month if you pause Substack and Apple+.</p>
              <p className="mt-1 text-xs text-muted-foreground">Two subscriptions, both unused in 30 days.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SocialProof() {
  const logos = ["Y Combinator", "On Deck", "South Park Commons", "ProductHunt #1", "MIT $100K", "Sequoia Scout"];
  return (
    <section className="border-y border-border bg-trove-surface/40 py-10">
      <div className="container-wide">
        <p className="eyebrow text-center mb-6">Trusted by makers and operators from</p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
          {logos.map((l) => (
            <span key={l} className="font-serif italic text-lg text-muted-foreground/80">{l}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pillars() {
  const pillars = [
    { icon: Wallet, title: "See everything", body: "Bank accounts, credit cards, brokerage, cash — one canvas. No more juggling six apps." },
    { icon: Brain, title: "Understand instantly", body: "AI explains your spending in plain language. Not another bar chart you'll never read." },
    { icon: Target, title: "Decide with confidence", body: "Goal projections, subscription audits, and budget alerts — before you overspend, not after." },
  ];
  return (
    <section className="py-24 md:py-32">
      <div className="container-wide">
        <div className="max-w-2xl">
          <p className="eyebrow">What Trove does</p>
          <h2 className="mt-3 display-serif text-display-md">Three jobs. One product. No spreadsheets.</h2>
        </div>
        <div className="mt-16 grid gap-px bg-trove-line lg:grid-cols-3">
          {pillars.map((p) => (
            <div key={p.title} className="bg-background p-8">
              <p.icon className="h-7 w-7 text-trove-goldDeep" strokeWidth={1.25} />
              <h3 className="mt-6 font-serif text-2xl tracking-tight">{p.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DashboardPreview() {
  return (
    <section className="border-y border-border bg-trove-surface/30 py-24">
      <div className="container-wide grid items-center gap-16 lg:grid-cols-2">
        <div>
          <p className="eyebrow">The dashboard</p>
          <h2 className="mt-3 display-serif text-display-md">A single canvas for every dollar.</h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
            Every transaction, every account, every subscription — categorized, contextualized, and rendered in a way that respects your time and your eyes.
          </p>
          <ul className="mt-8 space-y-4">
            {["Real-time multi-account aggregation","Smart categorization (96.4% accuracy)","Monthly · quarterly · yearly reports","Exportable PDF + CSV","Dark mode that doesn't shout"].map((f) => (
              <li key={f} className="flex items-start gap-3">
                <span className="mt-2 h-px w-6 bg-trove-gold" />
                <span className="text-base">{f}</span>
              </li>
            ))}
          </ul>
        </div>
        <Card className="overflow-hidden">
          <div className="border-b border-border px-5 py-3 flex items-center justify-between">
            <p className="eyebrow">Top categories · this month</p>
            <span className="text-xs text-muted-foreground">$3,891 spent</span>
          </div>
          <div className="divide-y divide-border">
            {[
              { name: "Food", amount: 824, pct: 21, color: "#E8C8AC" },
              { name: "Subscriptions", amount: 612, pct: 16, color: "#C9A96E" },
              { name: "Transport", amount: 487, pct: 13, color: "#A8884F" },
              { name: "Shopping", amount: 412, pct: 11, color: "#7A6F5C" },
              { name: "Health", amount: 298, pct: 8, color: "#3B7A3D" },
            ].map((c) => (
              <div key={c.name} className="grid grid-cols-[1fr_auto] items-center gap-4 px-5 py-3">
                <div>
                  <div className="flex items-center justify-between text-sm">
                    <span>{c.name}</span>
                    <span className="number-tabular text-muted-foreground">${c.amount}</span>
                  </div>
                  <div className="mt-1.5 h-1 bg-trove-line">
                    <div className="h-1" style={{ width: `${c.pct * 4}%`, backgroundColor: c.color }} />
                  </div>
                </div>
                <span className="number-tabular text-xs text-muted-foreground">{c.pct}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}

function FeatureGrid() {
  const features = [
    { icon: Wallet,     title: "Unified accounts",   body: "Bank, credit, brokerage, cash — aggregated and reconciled hourly." },
    { icon: BarChart3,  title: "Spending analytics", body: "Trends, anomalies, merchant patterns, MoM and YoY comparisons." },
    { icon: Repeat,     title: "Subscription audit", body: "We find the subscriptions you forgot. Cancel in one click." },
    { icon: Target,     title: "Goals & forecasting", body: "Save for a deposit, a wedding, or a sabbatical. Trove projects." },
    { icon: Brain,      title: "AI insights",        body: "Plain-English answers. Ask: 'where did $400 go in March?'" },
    { icon: Receipt,    title: "Reports & exports",  body: "PDF and CSV. Tax-season ready. Auditor-clean." },
  ];
  return (
    <section className="py-24 md:py-32">
      <div className="container-wide">
        <div className="max-w-2xl">
          <p className="eyebrow">Everything you need</p>
          <h2 className="mt-3 display-serif text-display-md">Built for the way you actually live.</h2>
        </div>
        <div className="mt-16 grid gap-px bg-trove-line md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="bg-background p-8">
              <f.icon className="h-6 w-6 text-trove-goldDeep" strokeWidth={1.25} />
              <h3 className="mt-5 font-serif text-xl tracking-tight">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", title: "Sign up in 30 seconds", body: "Email or Google. No card. We bring you straight to the dashboard." },
    { n: "02", title: "Connect or import",     body: "Link accounts via Plaid (read-only) or drop a CSV. Both work." },
    { n: "03", title: "Let Trove sort it",     body: "Smart categorization sorts months of transactions in seconds." },
    { n: "04", title: "Ask. Decide. Repeat.",  body: "Ask the AI anything. Set a goal. Cancel a sub. Move on with your week." },
  ];
  return (
    <section className="border-y border-border bg-trove-cream py-24">
      <div className="container-wide">
        <p className="eyebrow">How it works</p>
        <h2 className="mt-3 display-serif text-display-md max-w-2xl">From sign-up to clarity in under five minutes.</h2>
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div key={s.n} className="border-t border-trove-line pt-6">
              <p className="font-mono text-xs text-trove-goldDeep">{s.n}</p>
              <h3 className="mt-2 font-serif text-xl tracking-tight">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const items = [
    { quote: "I cancelled $84/month of subscriptions in the first 10 minutes. Pays for itself ten times over.", name: "Maya R.", role: "Designer, Remote" },
    { quote: "It does what I tried to build in Notion for two years, except it actually works.", name: "Arjun T.", role: "Founder, B2B SaaS" },
    { quote: "The AI summary at the end of the month feels like having a tiny CFO.", name: "Sofia G.", role: "PhD student" },
  ];
  return (
    <section className="py-24">
      <div className="container-wide">
        <p className="eyebrow">What members say</p>
        <h2 className="mt-3 display-serif text-display-md max-w-2xl">Loved by people who hate spreadsheets.</h2>
        <div className="mt-12 grid gap-px bg-trove-line md:grid-cols-3">
          {items.map((t, i) => (
            <figure key={i} className="bg-background p-8">
              <blockquote className="font-serif text-xl leading-relaxed text-trove-ink">
                <span className="text-trove-goldDeep">"</span>{t.quote}<span className="text-trove-goldDeep">"</span>
              </blockquote>
              <figcaption className="mt-6 text-sm">
                <p className="font-medium text-trove-ink">{t.name}</p>
                <p className="text-muted-foreground">{t.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function SecurityCallout() {
  return (
    <section className="border-y border-border bg-trove-ink text-trove-cream py-24">
      <div className="container-wide grid items-center gap-12 md:grid-cols-2">
        <div>
          <p className="eyebrow text-trove-gold">Security by design</p>
          <h2 className="mt-3 display-serif text-display-md text-trove-cream">Your money belongs to you. So does your data.</h2>
        </div>
        <ul className="space-y-4">
          {[
            "Read-only bank access. We can't move your money.",
            "Bank-grade encryption in transit and at rest.",
            "SOC 2 Type II — audit in progress (Q3 2026).",
            "No data sold. Ever. Read the privacy policy.",
            "Delete everything in one click.",
          ].map((s) => (
            <li key={s} className="flex gap-3 text-base">
              <span className="mt-2 h-px w-6 bg-trove-gold shrink-0" />
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function PricingTeaser() {
  return (
    <section className="py-24">
      <div className="container-wide text-center">
        <p className="eyebrow">Pricing</p>
        <h2 className="mt-3 display-serif text-display-md">Free for individuals. Forever.</h2>
        <p className="mt-4 mx-auto max-w-xl text-lg text-muted-foreground">
          Upgrade to Pro for advanced analytics, exports, and the Trove AI assistant. $9/mo. Cancel anytime.
        </p>
        <div className="mt-8">
          <Button asChild size="lg">
            <Link href="/pricing">See pricing <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const qs = [
    { q: "Is Trove a bank?", a: "No. Trove is a read-only dashboard. We never move your money. Your funds stay with your bank." },
    { q: "How do you connect to my accounts?", a: "Plaid for U.S. accounts (read-only, OAuth where supported). You can also import CSVs from any bank." },
    { q: "Do you sell my data?", a: "No. We never sell, share, or rent your data. Our business is your subscription, not your information." },
    { q: "Is there a free plan?", a: "Yes. Free forever for individuals. Pro adds AI, exports, and unlimited categories." },
    { q: "Can I delete my data?", a: "Yes — one button, hard delete, including backups within 30 days. GDPR and CCPA compliant." },
  ];
  return (
    <section className="border-t border-border py-24 bg-trove-cream">
      <div className="container-prose">
        <p className="eyebrow">Frequently asked</p>
        <h2 className="mt-3 display-serif text-display-md">Questions, answered.</h2>
        <dl className="mt-10 divide-y divide-border border-y border-border">
          {qs.map((item) => (
            <div key={item.q} className="py-6">
              <dt className="font-serif text-xl tracking-tight">{item.q}</dt>
              <dd className="mt-2 text-base text-muted-foreground leading-relaxed">{item.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function CTAFooter() {
  return (
    <section className="relative py-32">
      <div className="container-wide">
        <div className="card-flat bg-trove-ink text-trove-cream p-12 md:p-20 text-center">
          <p className="eyebrow text-trove-gold">Ready when you are</p>
          <h2 className="mt-4 display-serif text-display-lg text-trove-cream">
            Start tracking your money<br/>
            <span className="italic text-trove-gold">smarter.</span>
          </h2>
          <p className="mt-6 mx-auto max-w-xl text-lg text-trove-cream/80">
            Free forever for individuals. No card. Cancel a hundred subscriptions on us.
          </p>
          <div className="mt-10">
            <Button asChild size="lg" variant="primary">
              <Link href="/register">{siteConfig.primaryCta} <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
