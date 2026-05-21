import type { Metadata } from "next";
import { Section, Eyebrow, SectionLead } from "@/components/Section";
import { LinkButton } from "@/components/Button";
import { LetterSplit, WordReveal } from "@/components/motion/LetterSplit";
import { MaskReveal } from "@/components/motion/MaskReveal";
import { BlurIn } from "@/components/motion/BlurIn";
import { FlipIn } from "@/components/motion/FlipIn";
import { ScaleIn } from "@/components/motion/ScaleIn";
import { TiltCard } from "@/components/motion/TiltCard";
import { Spotlight } from "@/components/motion/Spotlight";
import { Parallax } from "@/components/motion/Parallax";
import { TrustGraph } from "@/components/illustrations/TrustGraph";
import { EscrowFlow } from "@/components/illustrations/EscrowFlow";
import { CategoryCubes } from "@/components/illustrations/CategoryCubes";

export const metadata: Metadata = {
  title: "For businesses",
  description:
    "Hire from a pool whose history is already proof. Cafés, households, studios, SMBs. Verified professionals, escrow, dispute paths - all on Vero.",
  alternates: { canonical: "/for-businesses" },
};

const reasons = [
  { title: "Stop screening unverified candidates", body: "Every professional on Vero has a record of completions, signed by real clients. You see what happened, not what was claimed." },
  { title: "5% escrow. Flat. Visible.", body: "Fund the work up front. Hold safely. Release on completion. The fee is below the market - and we do not change it by category, city, or contract size." },
  { title: "A trust graph, not a star bait", body: "Repeat clients, dispute history, on-time rate, category-specific standing. Multiple real signals, weighted. Not one gameable number." },
  { title: "Disputes resolved on record", body: "If something goes wrong, evidence is collected, a small review team responds quickly, and the outcome is recorded on both sides." },
];

const plans = [
  {
    name: "Starter",
    price: "Free",
    tag: "For one-off hires",
    bullets: [
      "Post up to 3 roles a month",
      "Professional verification included",
      "5% escrow on paid work",
      "Standard dispute path",
    ],
  },
  {
    name: "Business",
    price: "₹2,499 / mo",
    tag: "Recommended",
    highlight: true,
    bullets: [
      "Unlimited roles",
      "Repeat-professional invites",
      "Priority dispute response",
      "Business verification mark",
      "5% escrow on paid work",
    ],
  },
  {
    name: "Studio",
    price: "Custom",
    tag: "For higher volume",
    bullets: [
      "Multiple branches / locations",
      "Roles + scheduling integration",
      "Workforce-wide analytics",
      "Dedicated success contact",
      "Custom escrow terms",
    ],
  },
];

export default function Page() {
  return (
    <>
      <Section className="!pt-24 !pb-12">
        <MaskReveal from="left">
          <Eyebrow>For businesses</Eyebrow>
        </MaskReveal>
        <h1 className="max-w-3xl font-display text-4xl font-medium leading-[1.05] tracking-tighter text-ink-900 md:text-6xl">
          <LetterSplit
            text="Hire from people whose history is already proof."
            stagger={0.018}
          />
        </h1>
        <BlurIn delay={0.6}>
          <SectionLead>
            Cafés. Households. Studios. SMBs. If you have spent any hour of any week
            screening unverified candidates from a generic gig app - Vero is the
            alternative.
          </SectionLead>
        </BlurIn>
        <BlurIn delay={0.75} className="mt-9 flex flex-col gap-3 sm:flex-row">
          <LinkButton href="/waitlist?as=business" size="lg">
            Join as a business
          </LinkButton>
          <LinkButton href="/pricing" variant="secondary" size="lg">
            See pricing
          </LinkButton>
        </BlurIn>
      </Section>

      <Section tone="warm">
        <div className="grid items-center gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <BlurIn>
              <Eyebrow>The pool you hire from</Eyebrow>
            </BlurIn>
            <h2 className="font-display text-3xl font-medium tracking-tighter text-ink-900 md:text-5xl">
              <WordReveal text="A network of verified professionals and verified businesses." />
            </h2>
            <BlurIn delay={0.4}>
              <SectionLead>
                Every node in the graph is verified. Every edge is a signed record. You
                are not hiring strangers - you are hiring people whose history is
                already legible.
              </SectionLead>
            </BlurIn>
          </div>
          <Parallax range={30} className="md:col-span-7">
            <TrustGraph />
          </Parallax>
        </div>
      </Section>

      <Section>
        <MaskReveal from="right">
          <Eyebrow>Why move to Vero</Eyebrow>
        </MaskReveal>
        <h2 className="max-w-3xl font-display text-3xl font-medium tracking-tighter text-ink-900 md:text-5xl">
          <WordReveal text="Four reasons SMBs switch." />
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {reasons.map((r, i) => (
            <FlipIn key={r.title} delay={i * 0.1} axis={i % 2 === 0 ? "x" : "y"}>
              <div className="h-full rounded-2xl border border-ink-100 bg-paper p-7 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift">
                <h3 className="font-display text-xl font-medium tracking-tightish text-ink-900">
                  {r.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-ink-600">{r.body}</p>
              </div>
            </FlipIn>
          ))}
        </div>
      </Section>

      <Section tone="warm">
        <BlurIn>
          <Eyebrow>Escrow, shown</Eyebrow>
        </BlurIn>
        <h2 className="max-w-3xl font-display text-3xl font-medium tracking-tighter text-ink-900 md:text-5xl">
          <WordReveal text="Funded, held, released. Visible at every step." />
        </h2>
        <MaskReveal delay={0.3} from="down" className="mt-12">
          <EscrowFlow className="mx-auto max-w-4xl" />
        </MaskReveal>
      </Section>

      <Section>
        <BlurIn>
          <Eyebrow>Categories at launch</Eyebrow>
        </BlurIn>
        <h2 className="max-w-3xl font-display text-3xl font-medium tracking-tighter text-ink-900 md:text-5xl">
          <WordReveal text="The work we are opening first." />
        </h2>
        <BlurIn delay={0.3}>
          <SectionLead>
            We are launching with the categories where verified records have the most
            leverage. We will add more as the trust model proves itself.
          </SectionLead>
        </BlurIn>
        <ScaleIn delay={0.2} className="mt-12" from={0.92}>
          <CategoryCubes />
        </ScaleIn>
      </Section>

      <Section tone="warm">
        <BlurIn>
          <Eyebrow>Plans</Eyebrow>
        </BlurIn>
        <h2 className="max-w-3xl font-display text-3xl font-medium tracking-tighter text-ink-900 md:text-5xl">
          <WordReveal text="Simple, transparent, India-priced." />
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {plans.map((p, i) => (
            <ScaleIn key={p.name} delay={i * 0.12} from={0.9}>
              <TiltCard className="h-full" intensity={p.highlight ? 9 : 5}>
                <Spotlight
                  className={`relative h-full overflow-hidden rounded-2xl border ${
                    p.highlight
                      ? "border-accent bg-ink-950 text-paper shadow-lift"
                      : "border-ink-100 bg-paper"
                  }`}
                  size={p.highlight ? 460 : 320}
                  color={p.highlight ? "rgba(61,122,93,0.32)" : "rgba(61,122,93,0.18)"}
                >
                  <div className="relative flex h-full flex-col p-7">
                    {p.highlight && (
                      <span className="absolute -top-3 right-6 rounded-full bg-accent-glow px-3 py-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-ink-950">
                        {p.tag}
                      </span>
                    )}
                    <h3
                      className={`font-display text-2xl font-medium tracking-tightish ${
                        p.highlight ? "text-paper" : "text-ink-900"
                      }`}
                    >
                      {p.name}
                    </h3>
                    <p
                      className={`mt-1 text-xs uppercase tracking-[0.16em] ${
                        p.highlight ? "text-accent-glow" : "text-ink-500"
                      }`}
                    >
                      {p.tag}
                    </p>
                    <p
                      className={`mt-6 font-display text-3xl ${
                        p.highlight ? "text-paper" : "text-ink-900"
                      }`}
                    >
                      {p.price}
                    </p>
                    <ul
                      className={`mt-6 space-y-3 text-sm ${
                        p.highlight ? "text-ink-200" : "text-ink-700"
                      }`}
                    >
                      {p.bullets.map((b) => (
                        <li key={b} className="flex gap-2">
                          <span aria-hidden className="text-accent-glow">
                            ✓
                          </span>
                          {b}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto pt-8">
                      <LinkButton
                        href="/waitlist?as=business"
                        size="md"
                        variant={p.highlight ? "primary" : "secondary"}
                      >
                        {p.highlight ? "Join the waitlist" : "Choose " + p.name}
                      </LinkButton>
                    </div>
                  </div>
                </Spotlight>
              </TiltCard>
            </ScaleIn>
          ))}
        </div>
        <BlurIn delay={0.4}>
          <p className="mt-6 text-xs text-ink-500">
            Prices shown are pre-tax. GST applies for Indian customers. Annual billing
            available at launch.
          </p>
        </BlurIn>
      </Section>

      <Section tone="ink">
        <div className="grid items-center gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <h2 className="font-display text-3xl font-medium tracking-tighter md:text-5xl">
              <WordReveal text="Hire with proof, not guesswork." />
            </h2>
          </div>
          <BlurIn delay={0.2} className="md:col-span-5 flex md:justify-end">
            <LinkButton href="/waitlist?as=business" size="lg">
              Join the businesses waitlist
            </LinkButton>
          </BlurIn>
        </div>
      </Section>
    </>
  );
}

