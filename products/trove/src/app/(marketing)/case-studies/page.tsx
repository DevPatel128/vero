import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Customers",
  description: "How people are using Trove — from freelancers and founders to remote workers and grad students.",
  alternates: { canonical: "/case-studies" },
};

const stories = [
  {
    slug: "maya-designer-cancelled-84-month",
    title: "How Maya cancelled $84/month of unused subscriptions in her first week",
    role: "Independent designer, Lisbon",
    metric: "$1,008",
    metricLabel: "annual saved",
    excerpt: "She'd been paying for Adobe twice. We noticed.",
  },
  {
    slug: "arjun-founder-saas-burn-rate",
    title: "Arjun replaced a Notion spreadsheet with Trove and finally trusts his burn rate",
    role: "B2B SaaS founder, Bangalore",
    metric: "92%",
    metricLabel: "less time on bookkeeping",
    excerpt: "What used to take me Sunday mornings now takes the time to drink coffee.",
  },
  {
    slug: "sofia-phd-financial-aid",
    title: "Sofia used Trove to budget her PhD stipend and saved for her thesis defense",
    role: "PhD student, Boston",
    metric: "$3,400",
    metricLabel: "saved in 6 months",
    excerpt: "I didn't realize how much I was spending on coffee until Trove told me — quietly.",
  },
];

export default function CustomersPage() {
  return (
    <>
      <section className="border-b border-border">
        <div className="container-wide py-20 md:py-28">
          <Badge variant="gold" className="mb-6">Customers</Badge>
          <h1 className="display-serif text-display-xl">Real stories. Real numbers.</h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Trove is in private pilot with 200 founding members. Below are a few of their stories.
          </p>
        </div>
      </section>

      <section className="container-wide py-20">
        <div className="grid gap-px bg-trove-line md:grid-cols-2 lg:grid-cols-3">
          {stories.map((s) => (
            <Link key={s.slug} href={`/case-studies/${s.slug}`} className="group block bg-background p-8 transition-colors hover:bg-trove-cream">
              <p className="eyebrow text-trove-goldDeep">{s.role}</p>
              <h2 className="mt-4 font-serif text-2xl tracking-tight">{s.title}</h2>
              <p className="mt-4 text-base text-muted-foreground italic">"{s.excerpt}"</p>
              <div className="mt-8 flex items-end justify-between border-t border-border pt-4">
                <div>
                  <p className="font-serif text-3xl number-tabular text-trove-goldDeep">{s.metric}</p>
                  <p className="text-xs text-muted-foreground">{s.metricLabel}</p>
                </div>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
