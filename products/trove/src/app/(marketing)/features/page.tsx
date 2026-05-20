import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BarChart3, Bell, Brain, Calendar, Download, FileBarChart, Globe, KeyRound, LayoutDashboard, Lock, Receipt, Repeat, Search, Sparkles, Target, TrendingUp, Wallet, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Features",
  description: "Trove's complete feature set — unified accounts, AI insights, subscription tracking, budgets, goals, reports and more.",
  alternates: { canonical: "/features" },
};

const groups = [
  {
    name: "Visibility",
    blurb: "Every dollar, every account, one canvas.",
    items: [
      { icon: LayoutDashboard, title: "Unified dashboard", body: "Net worth, cash flow, accounts, and burn — at a glance." },
      { icon: Wallet, title: "Multi-account aggregation", body: "Banks, credit, brokerage, crypto, cash. All here." },
      { icon: TrendingUp, title: "Real-time trends", body: "Daily, weekly, monthly. With cohort and YoY comparisons." },
      { icon: BarChart3, title: "Live charts", body: "Recharts-powered, accessible, fast, exportable." },
    ],
  },
  {
    name: "Intelligence",
    blurb: "AI that does the thinking — when you want it.",
    items: [
      { icon: Brain, title: "AI insights", body: "Plain-English summaries. Ask any money question." },
      { icon: Sparkles, title: "Smart categorization", body: "96.4% accuracy. Learns from your corrections." },
      { icon: Search, title: "Universal search", body: "Find any transaction in milliseconds. ⌘K." },
      { icon: Zap, title: "Anomaly detection", body: "Trove flags unusual charges before you do." },
    ],
  },
  {
    name: "Control",
    blurb: "From subscriptions to savings — you decide.",
    items: [
      { icon: Repeat, title: "Subscription tracker", body: "Surfaces what you forgot. Tracks renewals and price hikes." },
      { icon: Target, title: "Budgets that bend", body: "Category, period, rollover. Soft & hard limits." },
      { icon: Calendar, title: "Goals & forecasts", body: "Save for X by Y. Trove projects honestly." },
      { icon: Bell, title: "Notifications", body: "Email + in-app. Tunable. Never noisy." },
    ],
  },
  {
    name: "Reporting",
    blurb: "Tax season is just a click now.",
    items: [
      { icon: FileBarChart, title: "Monthly · quarterly · yearly", body: "Auto-generated. Clean. CFO-grade." },
      { icon: Download, title: "PDF + CSV exports", body: "For your accountant, partner, or peace of mind." },
      { icon: Receipt, title: "Audit-ready trail", body: "Every action logged. Permissioned access." },
      { icon: Globe, title: "Multi-currency", body: "Travel and remote work? We handle FX correctly." },
    ],
  },
  {
    name: "Trust",
    blurb: "Security, privacy, and craft.",
    items: [
      { icon: Lock, title: "Bank-grade encryption", body: "TLS 1.3 in transit, AES-256 at rest." },
      { icon: KeyRound, title: "Read-only access", body: "We can't move your money. Period." },
      { icon: Sparkles, title: "Dark mode + a11y", body: "WCAG AA. Keyboard-first. Screen-reader sound." },
      { icon: Globe, title: "GDPR + CCPA", body: "Data portability, deletion, and dignity." },
    ],
  },
];

export default function FeaturesPage() {
  return (
    <>
      <section className="border-b border-border">
        <div className="container-wide py-20 md:py-28">
          <Badge variant="gold" className="mb-6">Features</Badge>
          <h1 className="display-serif text-display-xl max-w-3xl">Everything you need to feel in control of your money.</h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Not another budgeting app. Trove is a complete operating system for personal finance — built for the way you actually live, with the rigor of a tool you'll keep using five years from now.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild size="lg"><Link href="/register">Start free <ArrowRight className="h-4 w-4" /></Link></Button>
            <Button asChild variant="ghost" size="lg"><Link href="/pricing">See pricing</Link></Button>
          </div>
        </div>
      </section>

      {groups.map((group, i) => (
        <section key={group.name} className={i % 2 ? "bg-trove-surface/30" : ""}>
          <div className="container-wide py-20 md:py-24 border-b border-border">
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <p className="font-mono text-xs uppercase tracking-widest text-trove-goldDeep">{`0${i + 1}`}</p>
                <h2 className="mt-2 display-serif text-display-md">{group.name}</h2>
                <p className="mt-4 text-lg text-muted-foreground max-w-sm">{group.blurb}</p>
              </div>
              <div className="lg:col-span-8 grid gap-px bg-trove-line sm:grid-cols-2">
                {group.items.map((item) => (
                  <div key={item.title} className="bg-background p-6">
                    <item.icon className="h-5 w-5 text-trove-goldDeep" strokeWidth={1.25} />
                    <h3 className="mt-4 font-serif text-lg tracking-tight">{item.title}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="py-24">
        <div className="container-wide text-center">
          <h2 className="display-serif text-display-md">Try it. It's free.</h2>
          <p className="mt-4 mx-auto max-w-xl text-lg text-muted-foreground">No card. No commitment. Just clarity.</p>
          <Button asChild size="lg" className="mt-8"><Link href="/register">Start tracking <ArrowRight className="h-4 w-4" /></Link></Button>
        </div>
      </section>
    </>
  );
}
