import type { Metadata } from "next";
import { Section, Eyebrow, SectionTitle, SectionLead } from "@/components/Section";
import { LinkButton } from "@/components/Button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Community",
  description:
    "Vero community surface for early workers, businesses, and builders following the Bengaluru proof-of-work launch.",
  alternates: { canonical: "/community" },
};

const rules = [
  "Use real names when discussing real work.",
  "No hiring spam, pay-to-play lists, or fake urgency.",
  "No screenshots of private records without consent.",
  "Questions about safety, payment, or data get public answers.",
];

export default function Page() {
  return (
    <>
      <Section className="!pt-24 !pb-12">
        <Eyebrow>Community</Eyebrow>
        <SectionTitle>Early access should be accountable.</SectionTitle>
        <SectionLead>
          Before launch, the community is a smaller channel for workers, businesses,
          and builders who want to shape the trust model carefully.
        </SectionLead>
      </Section>

      <Section tone="warm" className="!pt-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl bg-ink-950 p-8 text-paper">
            <p className="text-xs uppercase tracking-[0.18em] text-accent-glow">
              Pre-launch
            </p>
            <h2 className="mt-4 font-display text-3xl font-medium tracking-tighter">
              Join through the waitlist first.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-300">
              Community invites go to waitlist members in waves. We are keeping the
              first group small so feedback stays usable.
            </p>
            <div className="mt-8">
              <LinkButton href="/waitlist" size="lg">
                Join the waitlist
              </LinkButton>
            </div>
          </div>
          <div className="rounded-3xl border border-ink-100 bg-paper p-8">
            <p className="text-xs uppercase tracking-[0.18em] text-accent">
              Social channels
            </p>
            <div className="mt-5 grid gap-3">
              {Object.entries(site.social).map(([key, url]) => (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 items-center justify-between rounded-xl border border-ink-100 px-4 text-sm font-medium text-ink-800 hover:bg-paper-warm"
                >
                  {key}
                  <span aria-hidden>→</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <Eyebrow>Community rules</Eyebrow>
        <SectionTitle className="!text-3xl md:!text-4xl">
          The bar is higher because trust is the product.
        </SectionTitle>
        <ul className="mt-10 grid gap-4 md:grid-cols-2">
          {rules.map((rule) => (
            <li
              key={rule}
              className="rounded-2xl border border-ink-100 bg-paper p-6 text-base text-ink-700"
            >
              {rule}
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
