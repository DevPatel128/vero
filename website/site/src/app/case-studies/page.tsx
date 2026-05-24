import type { Metadata } from "next";
import { Section, Eyebrow, SectionTitle, SectionLead } from "@/components/Section";
import { LinkButton } from "@/components/Button";

export const metadata: Metadata = {
  title: "Case studies",
  description:
    "Vero case studies will publish only after real pilots with permission. No fake quotes, no invented customers, no borrowed logos.",
  alternates: { canonical: "/case-studies" },
};

export default function Page() {
  return (
    <>
      <Section className="!pt-24 !pb-12">
        <Eyebrow>Case studies</Eyebrow>
        <SectionTitle>No case studies until pilots are real.</SectionTitle>
        <SectionLead>
          We will publish customer stories only when a worker or business has used
          Vero in a real pilot and approved the story.
        </SectionLead>
      </Section>

      <Section tone="warm" className="!pt-6">
        <div className="rounded-3xl border border-ink-100 bg-paper p-8 md:p-10">
          <h2 className="font-display text-3xl font-medium tracking-tighter text-ink-900">
            What will count as publishable.
          </h2>
          <ul className="mt-6 grid gap-4 text-base text-ink-700 md:grid-cols-3">
            <li className="rounded-2xl bg-paper-warm p-5">Real user consent</li>
            <li className="rounded-2xl bg-paper-warm p-5">A verifiable before/after</li>
            <li className="rounded-2xl bg-paper-warm p-5">No paid testimonial language</li>
          </ul>
          <div className="mt-8">
            <LinkButton href="/waitlist" variant="secondary">
              Join the pilot list
            </LinkButton>
          </div>
        </div>
      </Section>
    </>
  );
}
