import type { Metadata } from "next";
import { Section, Eyebrow, SectionTitle, SectionLead } from "@/components/Section";
import { LinkButton } from "@/components/Button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Careers at VROE Labs. Hiring principles and open-role status for the team building Vero.",
  alternates: { canonical: "/careers" },
};

const principles = [
  "Work close to users before writing systems for them.",
  "Prefer evidence over internal certainty.",
  "Treat security, privacy, and accessibility as product work.",
  "Write plainly enough that non-engineers can review decisions.",
];

export default function CareersPage() {
  return (
    <>
      <Section className="!pt-24 !pb-12">
        <Eyebrow>Careers</Eyebrow>
        <SectionTitle>No public roles are open today.</SectionTitle>
        <SectionLead>
          VROE Labs is keeping the early team small while Vero moves toward its
          Bengaluru pilot. When roles open, they will appear here first.
        </SectionLead>
      </Section>

      <Section tone="warm" className="!pt-6">
        <h2 className="font-display text-3xl font-medium tracking-tighter text-ink-900">
          Hiring principles.
        </h2>
        <ul className="mt-8 grid gap-4 md:grid-cols-2">
          {principles.map((item) => (
            <li key={item} className="rounded-2xl border border-ink-100 bg-paper p-6 text-base text-ink-700">
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-ink-600">
          For exceptional, directly relevant notes:{" "}
          <a className="underline decoration-accent" href={`mailto:${site.contact.general}`}>
            {site.contact.general}
          </a>
        </p>
      </Section>
    </>
  );
}
