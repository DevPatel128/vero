import type { Metadata } from "next";
import { Section, Eyebrow, SectionLead } from "@/components/Section";
import { LinkButton } from "@/components/Button";
import { WordReveal } from "@/components/motion/LetterSplit";
import { MaskReveal } from "@/components/motion/MaskReveal";
import { BlurIn } from "@/components/motion/BlurIn";
import { TiltCard } from "@/components/motion/TiltCard";
import { ScaleIn } from "@/components/motion/ScaleIn";
import { FlipIn } from "@/components/motion/FlipIn";
import { Parallax } from "@/components/motion/Parallax";
import { RecordChain } from "@/components/illustrations/RecordChain";
import { StandingDial } from "@/components/illustrations/StandingDial";
import { EscrowFlow } from "@/components/illustrations/EscrowFlow";
import { IDBadge } from "@/components/illustrations/IDBadge";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Vero features: signed records, trust graph, escrow, dispute resolution, portable identity. Built so the platform cannot quietly bend a worker's history.",
  alternates: { canonical: "/features" },
};

type Item = { title: string; body: string };
type IllKind = "chain" | "dial" | "escrow" | "id";

const categories: {
  name: string;
  blurb: string;
  items: Item[];
  illustration?: IllKind;
}[] = [
  {
    name: "Records",
    blurb: "Signed, chained, and portable. The substance of the platform.",
    illustration: "chain",
    items: [
      { title: "Two-party signing", body: "Worker and client both sign. Neither can sign alone. The platform never signs for either." },
      { title: "Chained history", body: "Each record references the one before it for the same worker. Reordering is detectable." },
      { title: "Visibility flags", body: "Public, shared, or private. Workers choose per record. Privacy is the default for sensitive categories." },
      { title: "Portable export", body: "Every record is exportable in a portable, signed format. The credentials you build can be read by other products that speak the same protocol." },
    ],
  },
  {
    name: "Standing",
    blurb: "A trust graph, not a star rating. Many real signals, not one gameable number.",
    illustration: "dial",
    items: [
      { title: "Completion reliability", body: "Show-up rate, on-time rate, dispute rate, and repeat-booking ratio. Each is visible and explainable." },
      { title: "Counterparty quality", body: "Working with verified, well-rated clients lifts your standing. Working with fraudulent accounts cannot." },
      { title: "Category strength", body: "Standing is held per category. A kitchen assistant builds kitchen credibility — not generic stars." },
      { title: "Transparent reasons", body: "Any change to your standing is explained on your dashboard. No black boxes." },
    ],
  },
  {
    name: "Money + safety",
    blurb: "Escrow you can see. Disputes with a clear path. Coverage where it matters.",
    illustration: "escrow",
    items: [
      { title: "Funded escrow on paid work", body: "The client funds the job up front. We hold it. The worker can see the money is real before showing up." },
      { title: "Flat 5% fee", body: "Well below the market. We do not take a hidden cut, and we do not change the rate by category or city." },
      { title: "Dispute path", body: "If something goes wrong, evidence is collected, a small review team responds quickly, and resolutions are recorded." },
      { title: "Repeat-offender cut-off", body: "Accounts proven to abuse the system are cut off and removed from the trust graph. The pattern is detectable." },
    ],
  },
  {
    name: "Verification",
    blurb: "Who you say you are, confirmed before paid work begins.",
    illustration: "id",
    items: [
      { title: "Phone verification", body: "Required for every account. Quick. No new password to remember." },
      { title: "ID verification for paid work", body: "Workers verify their ID before earning. We use government-supported digital documents — quick to do, hard to fake." },
      { title: "Business verification", body: "Businesses verify their entity. We display the verification mark on profiles and on every record they sign." },
      { title: "No biometric data stored", body: "We do not retain biometric data. Verification results are stored, the underlying scans are not." },
    ],
  },
];

function Illustration({ kind }: { kind: IllKind }) {
  if (kind === "chain") return <RecordChain />;
  if (kind === "dial") return <StandingDial />;
  if (kind === "escrow") return <EscrowFlow />;
  return <IDBadge />;
}

const motionStrategies = [
  // category 0 — Records
  {
    illoWrap: (c: React.ReactNode) => (
      <Parallax range={30}>{c}</Parallax>
    ),
    itemWrap: (i: number, c: React.ReactNode) => (
      <ScaleIn delay={i * 0.07}>{c}</ScaleIn>
    ),
  },
  // category 1 — Standing
  {
    illoWrap: (c: React.ReactNode) => <ScaleIn from={0.85}>{c}</ScaleIn>,
    itemWrap: (i: number, c: React.ReactNode) => (
      <FlipIn delay={i * 0.07} axis={i % 2 === 0 ? "x" : "y"}>
        {c}
      </FlipIn>
    ),
  },
  // category 2 — Money + safety
  {
    illoWrap: (c: React.ReactNode) => (
      <MaskReveal from="left">{c}</MaskReveal>
    ),
    itemWrap: (i: number, c: React.ReactNode) => (
      <BlurIn delay={i * 0.07}>{c}</BlurIn>
    ),
  },
  // category 3 — Verification
  {
    illoWrap: (c: React.ReactNode) => (
      <MaskReveal from="right">{c}</MaskReveal>
    ),
    itemWrap: (_i: number, c: React.ReactNode) => (
      <TiltCard className="h-full" intensity={5}>
        {c}
      </TiltCard>
    ),
  },
];

export default function Page() {
  return (
    <>
      <Section className="!pt-24 !pb-12">
        <MaskReveal from="left">
          <Eyebrow>Features</Eyebrow>
        </MaskReveal>
        <h1 className="max-w-3xl font-display text-4xl font-medium leading-[1.05] tracking-tighter text-ink-900 md:text-6xl">
          <WordReveal text="The small details that make Vero serious." />
        </h1>
        <BlurIn delay={0.4}>
          <SectionLead>
            Vero is engineered so the rules are the same for everyone, including us. The
            features below are the parts that make that claim mean something.
          </SectionLead>
        </BlurIn>
      </Section>

      {categories.map((cat, ix) => {
        const strat = motionStrategies[ix];
        return (
          <Section key={cat.name} tone={ix % 2 === 0 ? "warm" : "paper"}>
            <div className="grid gap-12 md:grid-cols-12">
              <div className="md:col-span-4">
                <BlurIn>
                  <span className="font-mono text-xs text-accent">
                    0{ix + 1} · {cat.name}
                  </span>
                  <h2 className="mt-3 font-display text-3xl font-medium tracking-tighter text-ink-900">
                    {cat.blurb}
                  </h2>
                </BlurIn>
              </div>
              <div className="md:col-span-8 space-y-10">
                {cat.illustration && (
                  <div>{strat.illoWrap(<Illustration kind={cat.illustration} />)}</div>
                )}
                <div className="grid gap-8 sm:grid-cols-2">
                  {cat.items.map((item, i) => (
                    <div key={item.title}>
                      {strat.itemWrap(
                        i,
                        <div className="rounded-2xl border border-ink-100 bg-paper p-6">
                          <h3 className="font-display text-lg font-medium tracking-tightish text-ink-900">
                            {item.title}
                          </h3>
                          <p className="mt-2 text-sm leading-relaxed text-ink-600">
                            {item.body}
                          </p>
                        </div>,
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Section>
        );
      })}

      <Section tone="ink">
        <div className="grid items-center gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <h2 className="font-display text-3xl font-medium tracking-tighter md:text-5xl">
              <WordReveal text="The platform you would want behind your career." />
            </h2>
          </div>
          <BlurIn delay={0.2} className="md:col-span-5 flex flex-col gap-3 md:items-end">
            <LinkButton href="/waitlist" size="lg">
              Join the waitlist
            </LinkButton>
            <LinkButton href="/trust" variant="secondary" size="lg">
              How trust works
            </LinkButton>
          </BlurIn>
        </div>
      </Section>
    </>
  );
}

