import type { Metadata } from "next";
import { Section, Eyebrow, SectionTitle, SectionLead } from "@/components/Section";
import { LinkButton } from "@/components/Button";

export const metadata: Metadata = {
  title: "Build log",
  description:
    "The Vero build log: product decisions, trust-model work, Bengaluru launch preparation, and what remains before public access.",
  alternates: { canonical: "/story" },
};

const entries = [
  {
    date: "Now",
    title: "Pre-launch surface",
    body: "The marketing site explains the record model, waitlist, pricing posture, trust system, and legal surfaces without fake launch metrics.",
  },
  {
    date: "Next",
    title: "Bengaluru pilot preparation",
    body: "We are narrowing categories, verifier flows, dispute paths, and worker onboarding before opening the first wave.",
  },
  {
    date: "Later",
    title: "Public records and exports",
    body: "Portable signed records, public profiles, verifier pages, and cross-product record readers arrive after the pilot proves the model.",
  },
];

export default function Page() {
  return (
    <>
      <Section className="!pt-24 !pb-12">
        <Eyebrow>Build log</Eyebrow>
        <SectionTitle>What is built, what is next, what is not ready.</SectionTitle>
        <SectionLead>
          A public build log keeps the pre-launch story honest. Vero is not open yet.
          The waitlist is live. The product is being narrowed for Bengaluru.
        </SectionLead>
      </Section>

      <Section tone="warm" className="!pt-6">
        <ol className="space-y-6">
          {entries.map((entry) => (
            <li
              key={entry.title}
              className="grid gap-6 rounded-3xl border border-ink-100 bg-paper p-7 md:grid-cols-12"
            >
              <div className="md:col-span-3">
                <span className="font-mono text-xs text-accent">{entry.date}</span>
                <h2 className="mt-2 font-display text-2xl font-medium tracking-tightish text-ink-900">
                  {entry.title}
                </h2>
              </div>
              <p className="md:col-span-9 text-base leading-relaxed text-ink-700">
                {entry.body}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <div className="grid items-center gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <Eyebrow>Follow along</Eyebrow>
            <SectionTitle className="!text-3xl md:!text-4xl">
              The next update goes to the waitlist first.
            </SectionTitle>
          </div>
          <div className="md:col-span-5 md:text-right">
            <LinkButton href="/newsletter" size="lg">
              Get build notes
            </LinkButton>
          </div>
        </div>
      </Section>
    </>
  );
}
