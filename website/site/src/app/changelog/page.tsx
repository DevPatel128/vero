import type { Metadata } from "next";
import { Section, Eyebrow, SectionTitle, SectionLead } from "@/components/Section";

export const metadata: Metadata = {
  title: "Changelog",
  description:
    "Vero changelog for public website, waitlist, trust, legal, and product launch milestones.",
  alternates: { canonical: "/changelog" },
};

const changes = [
  {
    date: "Pre-launch",
    title: "Grand website surface",
    body: "Home, trust, pricing, waitlist, press, investor, legal, docs, community, and build-log surfaces are available.",
  },
  {
    date: "Planned",
    title: "Pilot access milestones",
    body: "Pilot milestones will be published when they are real and dated.",
  },
];

export default function ChangelogPage() {
  return (
    <>
      <Section className="!pt-24 !pb-12">
        <Eyebrow>Changelog</Eyebrow>
        <SectionTitle>Changes worth recording.</SectionTitle>
        <SectionLead>
          Public changes are listed here. We will not invent releases to make the
          project look older than it is.
        </SectionLead>
      </Section>

      <Section tone="warm" className="!pt-6">
        <ol className="space-y-5">
          {changes.map((change) => (
            <li key={change.title} className="rounded-3xl border border-ink-100 bg-paper p-7">
              <span className="font-mono text-xs text-accent">{change.date}</span>
              <h2 className="mt-2 font-display text-2xl font-medium tracking-tightish text-ink-900">
                {change.title}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-ink-600">
                {change.body}
              </p>
            </li>
          ))}
        </ol>
      </Section>
    </>
  );
}
