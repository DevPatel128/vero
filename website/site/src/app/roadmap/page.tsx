import type { Metadata } from "next";
import { Section, Eyebrow, SectionTitle, SectionLead } from "@/components/Section";
import { LinkButton } from "@/components/Button";

export const metadata: Metadata = {
  title: "Roadmap",
  description:
    "Vero public roadmap: now, next, and later for the Bengaluru proof-of-work identity launch.",
  alternates: { canonical: "/roadmap" },
};

const columns = [
  {
    label: "Now",
    items: ["Waitlist", "Public trust pages", "Investor and press request surfaces"],
  },
  {
    label: "Next",
    items: ["Bengaluru pilot flows", "Worker onboarding", "Business verification", "Dispute path"],
  },
  {
    label: "Later",
    items: ["Record export", "Public verifier", "API documentation", "Cross-product record readers"],
  },
];

export default function RoadmapPage() {
  return (
    <>
      <Section className="!pt-24 !pb-12">
        <Eyebrow>Roadmap</Eyebrow>
        <SectionTitle>Public direction without overpromising dates.</SectionTitle>
        <SectionLead>
          Vero is pre-launch. This roadmap states what is active, what comes next, and
          what waits until the pilot gives us evidence.
        </SectionLead>
      </Section>

      <Section tone="warm" className="!pt-6">
        <div className="grid gap-6 md:grid-cols-3">
          {columns.map((column) => (
            <section key={column.label} className="rounded-3xl border border-ink-100 bg-paper p-7">
              <h2 className="font-display text-2xl font-medium tracking-tightish text-ink-900">
                {column.label}
              </h2>
              <ul className="mt-6 space-y-3">
                {column.items.map((item) => (
                  <li key={item} className="rounded-xl bg-paper-warm px-4 py-3 text-sm text-ink-700">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
        <div className="mt-8">
          <LinkButton href="/story" variant="secondary">
            Read the build log
          </LinkButton>
        </div>
      </Section>
    </>
  );
}
