import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Changelog",
  description: "Everything we ship at Trove — public, dated, and honest about what shipped vs. what's still cooking.",
  alternates: { canonical: "/changelog" },
};

const releases = [
  {
    date: "2026-05-14",
    version: "v2.0.0",
    tag: "Major",
    title: "Trove V2 — the rebuild",
    body: "Rebuilt on Next.js App Router. New design system. New blog. New admin. New everything.",
    items: [
      "Next.js 15 + React 19 + TypeScript strict",
      "Tailwind v3 + shadcn/ui (FT × Apple custom variants)",
      "Supabase SSR auth + RLS on every table",
      "Stripe billing wired end-to-end",
      "PostHog + Sentry + Resend integrated",
      "Playwright E2E + Vitest unit suites",
      "Full SEO: sitemap, robots, llms.txt, JSON-LD",
    ],
  },
  {
    date: "2026-05-10",
    version: "v1.4.0",
    tag: "Feature",
    title: "Subscription audit + AI weekly digest",
    items: [
      "Recurring detection scans 90-day window, top-5 chips in transaction input",
      "Weekly AI digest emailed every Monday at 9am local time",
      "PostHog analytics integrated for first-touch attribution",
    ],
  },
  {
    date: "2026-05-01",
    version: "v1.3.0",
    tag: "Feature",
    title: "Form validation + distributed rate limiting",
    items: [
      "react-hook-form + zod on profile and transaction forms",
      "Upstash Redis sliding-window rate limiting (replaces in-memory)",
      "Validation: positive amount, URL-or-empty social links",
    ],
  },
  {
    date: "2026-04-18",
    version: "v1.2.0",
    tag: "Polish",
    title: "Marketing site overhaul",
    items: [
      "Seven-section landing page (Hero, What is Trove, How it works, etc.)",
      "Gold T monogram favicon",
      "Stroke icon set (14 components)",
    ],
  },
];

export default function ChangelogPage() {
  return (
    <>
      <section className="border-b border-border">
        <div className="container-wide py-20 md:py-28">
          <Badge variant="gold" className="mb-6">Changelog</Badge>
          <h1 className="display-serif text-display-xl">Built in public.<br />Shipped honestly.</h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Every release, dated. Including the ones where we shipped something small. Especially those.
          </p>
        </div>
      </section>

      <section className="container-wide py-20">
        <ol className="space-y-12">
          {releases.map((r) => (
            <li key={r.version} className="grid gap-8 lg:grid-cols-[180px_1fr]">
              <div>
                <time dateTime={r.date} className="font-mono text-sm text-muted-foreground">{r.date}</time>
                <div className="mt-2 flex items-center gap-2">
                  <Badge variant={r.tag === "Major" ? "gold" : "secondary"}>{r.tag}</Badge>
                  <span className="font-mono text-xs text-muted-foreground">{r.version}</span>
                </div>
              </div>
              <article className="border-l border-border pl-8">
                <h2 className="font-serif text-2xl tracking-tight">{r.title}</h2>
                {r.body && <p className="mt-2 text-base text-muted-foreground">{r.body}</p>}
                <ul className="mt-4 space-y-2 text-base">
                  {r.items.map((it) => (<li key={it} className="flex gap-3"><span className="text-trove-goldDeep">·</span><span>{it}</span></li>))}
                </ul>
              </article>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
