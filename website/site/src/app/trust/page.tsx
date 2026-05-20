import type { Metadata } from "next";
import { Section, Eyebrow, SectionTitle, SectionLead } from "@/components/Section";
import { LinkButton } from "@/components/Button";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { SignatureFlow } from "@/components/illustrations/SignatureFlow";
import { TrustGraph } from "@/components/illustrations/TrustGraph";

export const metadata: Metadata = {
  title: "Trust",
  description:
    "How Vero builds trust: signed records, a trust graph rather than a star rating, escrow on paid work, dispute paths, repeat-offender cut-off.",
  alternates: { canonical: "/trust" },
};

const principles = [
  { h: "Both sides sign", b: "Every record carries two signatures. Neither side can sign alone. The platform never signs on either side's behalf." },
  { h: "Chained, not editable", b: "Each record links by hash to the one before it for the same worker. Reordering, deleting, and rewriting are all detectable." },
  { h: "A graph, not a rating", b: "Show-up rate, repeat-booking ratio, dispute history, counterparty quality, on-time rate, category strength — multiple signals, never one gameable number." },
  { h: "Escrow on paid work", b: "The client funds the job up front. We hold it. Release is on the record. The worker can see the money is real." },
  { h: "Documented dispute path", b: "Evidence collected. Small review team responds quickly. Outcome recorded on both sides. No silent resolutions." },
  { h: "Repeat-offender cut-off", b: "Accounts proven to abuse the system lose access and are removed from the trust graph. Patterns are tracked across the network." },
];

export default function Page() {
  return (
    <>
      <Section className="!pt-24 !pb-12">
        <Reveal>
          <Eyebrow>Trust</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <SectionTitle>How Vero is built to be hard to game.</SectionTitle>
        </Reveal>
        <Reveal delay={0.1}>
          <SectionLead>
            Trust is a property of the substrate, not a slogan on the home page. The six
            principles below are what make a Vero record worth more than a screenshot.
          </SectionLead>
        </Reveal>
      </Section>

      <Section tone="warm">
        <Reveal>
          <Eyebrow>Two signatures, one artefact</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <SectionTitle className="!text-2xl md:!text-4xl">
            The smallest unit of trust on the platform.
          </SectionTitle>
        </Reveal>
        <Reveal delay={0.15} className="mt-10">
          <SignatureFlow className="mx-auto max-w-4xl" />
        </Reveal>
      </Section>

      <Section>
        <Stagger className="grid gap-6 md:grid-cols-2" stagger={0.08}>
          {principles.map((p, i) => (
            <StaggerItem
              key={p.h}
              className="rounded-2xl border border-ink-100 bg-paper p-7 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
            >
              <span className="font-mono text-xs text-accent">0{i + 1}</span>
              <h3 className="mt-2 font-display text-xl font-medium tracking-tightish text-ink-900">
                {p.h}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-ink-600">{p.b}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section tone="warm">
        <div className="grid items-center gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Reveal>
              <Eyebrow>The shape of standing</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <SectionTitle>
                A network of signed work. No stars.
              </SectionTitle>
            </Reveal>
            <Reveal delay={0.1}>
              <SectionLead>
                Standing on Vero is not a number. It is a position in a graph — the
                clients you have worked with, the work they signed for, the patterns
                that emerge over time.
              </SectionLead>
            </Reveal>
          </div>
          <Reveal delay={0.15} className="md:col-span-7">
            <TrustGraph />
          </Reveal>
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Reveal>
              <Eyebrow>What we will never do</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <SectionTitle className="!text-3xl md:!text-4xl">
                Promises with a sharp edge.
              </SectionTitle>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="md:col-span-7 prose-vero space-y-5">
            <p>
              We will not silently edit a record. We will not change a worker&apos;s
              standing without an audit entry. We will not promote profiles for reasons
              the user cannot see. We will not sell your data, today or ever. We will
              not pre-tick consent boxes.
            </p>
            <p>
              These are not features. They are constraints we accept in exchange for
              being allowed to call this a trust product.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section tone="ink">
        <div className="grid items-center gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <Reveal>
              <h2 className="font-display text-3xl font-medium tracking-tighter md:text-5xl">
                Trust is the only thing worth carrying forward.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="md:col-span-5 flex md:justify-end">
            <LinkButton href="/waitlist" size="lg">
              Join the waitlist
            </LinkButton>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
