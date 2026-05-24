import type { Metadata } from "next";
import { Section, Eyebrow, SectionTitle, SectionLead } from "@/components/Section";
import { LinkButton } from "@/components/Button";
import { IDBadge } from "@/components/illustrations/IDBadge";
import { RecordChain } from "@/components/illustrations/RecordChain";

export const metadata: Metadata = {
  title: "For professionals",
  description:
    "Vero helps professionals carry signed proof of completed work across clients, roles, platforms, and future opportunities.",
  alternates: { canonical: "/for-professionals" },
};

const points = [
  {
    title: "Your past work should travel.",
    body: "A platform review, chat screenshot, or private client note should not be the only proof you can show.",
  },
  {
    title: "Small projects still count.",
    body: "Short engagements, service calls, creative briefs, and trial work can become signed records when both sides confirm the outcome.",
  },
  {
    title: "Standing should have reasons.",
    body: "Vero shows category strength, repeat work, dispute history, and completion patterns instead of compressing you into one rating.",
  },
];

export default function Page() {
  return (
    <>
      <Section className="!pt-24 !pb-12">
        <div className="grid items-center gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <Eyebrow>For professionals</Eyebrow>
            <SectionTitle>Your work history should not be trapped.</SectionTitle>
            <SectionLead>
              Vero gives independent professionals a signed record of completed work:
              portable, visible when they choose, and useful beyond one platform.
            </SectionLead>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <LinkButton href="/waitlist?as=worker" size="lg">
                Join as a professional
              </LinkButton>
              <LinkButton href="/use-cases" variant="secondary" size="lg">
                View use cases
              </LinkButton>
            </div>
          </div>
          <div className="md:col-span-5 flex justify-center md:justify-end">
            <IDBadge />
          </div>
        </div>
      </Section>

      <Section tone="warm" className="!pt-6">
        <div className="grid gap-6 md:grid-cols-3">
          {points.map((point) => (
            <article
              key={point.title}
              className="rounded-2xl border border-ink-100 bg-paper p-7 shadow-card"
            >
              <h2 className="font-display text-xl font-medium tracking-tightish text-ink-900">
                {point.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-600">
                {point.body}
              </p>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <Eyebrow>Portable proof</Eyebrow>
        <SectionTitle className="!text-3xl md:!text-4xl">
          A record chain is harder to dismiss than a profile line.
        </SectionTitle>
        <SectionLead>
          Each record references the one before it. That continuity is what turns
          separate jobs into a career history.
        </SectionLead>
        <div className="mt-10 overflow-hidden">
          <RecordChain />
        </div>
      </Section>
    </>
  );
}
