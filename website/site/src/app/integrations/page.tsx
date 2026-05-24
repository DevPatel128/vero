import type { Metadata } from "next";
import { Section, Eyebrow, SectionTitle, SectionLead } from "@/components/Section";
import { LinkButton } from "@/components/Button";

export const metadata: Metadata = {
  title: "Integrations",
  description:
    "Vero integrations status: record exports and verification APIs are planned after the Bengaluru pilot validates the trust model.",
  alternates: { canonical: "/integrations" },
};

const planned = [
  "Record export readers",
  "Business hiring tools",
  "Public profile embeds",
  "Webhook delivery for signed records",
];

export default function Page() {
  return (
    <>
      <Section className="!pt-24 !pb-12">
        <Eyebrow>Integrations</Eyebrow>
        <SectionTitle>Integrations come after records are stable.</SectionTitle>
        <SectionLead>
          We are not opening integrations before the record format, verifier flow,
          privacy model, and dispute semantics are tested in the pilot.
        </SectionLead>
      </Section>

      <Section tone="warm" className="!pt-6">
        <div className="rounded-3xl border border-ink-100 bg-paper p-8">
          <h2 className="font-display text-3xl font-medium tracking-tighter text-ink-900">
            Planned, not promised for launch day.
          </h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {planned.map((item) => (
              <li key={item} className="rounded-2xl bg-paper-warm p-5 text-base text-ink-700">
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <LinkButton href="/docs/api" variant="secondary">
              Read API status
            </LinkButton>
          </div>
        </div>
      </Section>
    </>
  );
}
