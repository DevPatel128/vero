import type { Metadata } from "next";
import { Section, Eyebrow, SectionTitle, SectionLead } from "@/components/Section";
import { LinkButton } from "@/components/Button";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Vero essays and notes on proof of work, portable identity, local trust, signed records, and the Bengaluru launch.",
  alternates: { canonical: "/blog" },
};

const categories = ["Product", "Research", "Engineering", "Company"];

export default function BlogPage() {
  return (
    <>
      <Section className="!pt-24 !pb-12">
        <Eyebrow>Blog</Eyebrow>
        <SectionTitle>Essays after there is something real to say.</SectionTitle>
        <SectionLead>
          Vero will publish product notes, research, and engineering write-ups as the
          Bengaluru pilot develops. We are not backfilling a fake archive.
        </SectionLead>
      </Section>

      <Section tone="warm" className="!pt-6">
        <div className="grid gap-4 md:grid-cols-4">
          {categories.map((category) => (
            <div key={category} className="rounded-2xl border border-ink-100 bg-paper p-6">
              <h2 className="font-display text-xl font-medium tracking-tightish text-ink-900">
                {category}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-600">
                Drafts open when the pilot gives us evidence, not before.
              </p>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <LinkButton href="/newsletter" variant="secondary">
            Get the first issue
          </LinkButton>
        </div>
      </Section>
    </>
  );
}
