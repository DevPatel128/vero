import type { Metadata } from "next";
import { Section, Eyebrow, SectionHeadline, SectionLead } from "@/components/Section";
import { LinkButton } from "@/components/Button";
import { TrustGraph } from "@/components/illustrations/TrustGraph";
import { EscrowFlow } from "@/components/illustrations/EscrowFlow";
import { CategoryCubes } from "@/components/illustrations/CategoryCubes";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

export const metadata: Metadata = {
  title: "For businesses — Vero",
  description:
    "Hire from people whose history is already verified. Cafés, households, studios, SMBs, and solo clients — Vero is the alternative to unverified gig apps.",
  alternates: { canonical: "/for-businesses" },
};

export default function ForBusinessesPage() {
  return (
    <>
      {/* Hero */}
      <Section className="!pt-24 !pb-16">
        <div className="grid items-center gap-14 md:grid-cols-12">
          <div className="md:col-span-8">
            <Reveal>
              <Eyebrow>For businesses</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <SectionHeadline className="mt-3">
                Hire from people whose history is already proof.
              </SectionHeadline>
            </Reveal>
            <Reveal delay={0.1}>
              <SectionLead>
                Every worker on Vero has a verified record of completed jobs, signed
                by real clients. You see what actually happened — before the first
                phone call.
              </SectionLead>
            </Reveal>
            <Reveal delay={0.2} className="mt-9 flex flex-col gap-3 sm:flex-row">
              <LinkButton href="/waitlist?as=business" size="lg">
                Join as a business
              </LinkButton>
              <LinkButton href="#pricing" variant="secondary" size="lg">
                See pricing
              </LinkButton>
            </Reveal>
          </div>
          <div className="md:col-span-4 hidden md:flex md:justify-end">
            <TrustGraph />
          </div>
        </div>
      </Section>

      {/* Who this is for — three types */}
      <Section tone="raised" rule="bottom">
        <Reveal>
          <Eyebrow>Who this is for</Eyebrow>
          <SectionHeadline className="mt-3">
            Small team or solo. You deserve the same protection.
          </SectionHeadline>
          <SectionLead>
            Vero is not just for big companies with HR departments. It is built for
            the people who make one bad hire and feel it for months.
          </SectionLead>
        </Reveal>

        <Stagger as="ul" className="mt-12 grid gap-5 md:grid-cols-3" stagger={0.07}>
          {clientTypes.map((ct) => (
            <StaggerItem
              as="li"
              key={ct.label}
              className="border border-line-faint p-7 transition-colors hover:border-line"
            >
              <span className="font-mono text-micro text-accent">{ct.label}</span>
              <h3 className="mt-4 font-display text-h5 font-medium leading-snug tracking-tightish text-ink-0">
                {ct.title}
              </h3>
              <p className="mt-3 text-body text-ink-1">{ct.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Why move to Vero */}
      <Section tone="base" rule="bottom">
        <Reveal>
          <Eyebrow>Why Vero</Eyebrow>
          <SectionHeadline className="mt-3">
            Four things that change when the pool is verified.
          </SectionHeadline>
        </Reveal>

        <Stagger as="ul" className="mt-12 grid gap-6 md:grid-cols-2" stagger={0.07}>
          {reasons.map((r) => (
            <StaggerItem
              as="li"
              key={r.title}
              className="border border-line-faint p-7 transition-colors hover:border-line"
            >
              <h3 className="font-display text-h5 font-medium leading-snug tracking-tightish text-ink-0">
                {r.title}
              </h3>
              <p className="mt-3 text-body text-ink-1">{r.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Escrow — how money works */}
      <Section tone="raised" rule="bottom">
        <Reveal>
          <Eyebrow>How money works</Eyebrow>
          <SectionHeadline className="mt-3">
            Funded before the job starts. Released when both sides confirm it is done.
          </SectionHeadline>
          <SectionLead>
            Escrow protects both sides. The worker knows the money is real. You know
            it is safe until the job is confirmed complete. No surprises.
          </SectionLead>
        </Reveal>
        <div className="mt-12">
          <EscrowFlow className="mx-auto max-w-4xl" />
        </div>
      </Section>

      {/* Categories */}
      <Section tone="base" rule="bottom">
        <Reveal>
          <Eyebrow>What you can hire for</Eyebrow>
          <SectionHeadline className="mt-3">Ten categories at launch.</SectionHeadline>
          <SectionLead>
            We are starting with the categories where verified records make the
            biggest difference — and adding more as the trust model proves itself.
          </SectionLead>
        </Reveal>
        <div className="mt-12">
          <CategoryCubes />
        </div>
      </Section>

      {/* Pricing */}
      <Section id="pricing" tone="raised" rule="bottom">
        <Reveal>
          <Eyebrow>Plans</Eyebrow>
          <SectionHeadline className="mt-3">Simple. Transparent. India-priced.</SectionHeadline>
        </Reveal>

        <Stagger as="ul" className="mt-12 grid gap-6 md:grid-cols-3" stagger={0.1}>
          {plans.map((p) => (
            <StaggerItem
              as="li"
              key={p.name}
              className={`flex flex-col border p-7 ${
                p.highlight
                  ? "border-accent bg-surface-inverse text-ink-inverse"
                  : "border-line-faint bg-surface-1/50"
              }`}
            >
              {p.highlight && (
                <span className="mb-4 self-start rounded-pill bg-accent px-3 py-1 font-mono text-micro text-accent-ink">
                  Recommended
                </span>
              )}
              <h3 className={`font-display text-h4 font-medium tracking-tightish ${p.highlight ? "text-ink-inverse" : "text-ink-0"}`}>
                {p.name}
              </h3>
              <p className={`mt-1 font-mono text-caption ${p.highlight ? "text-ink-inverse/60" : "text-ink-3"}`}>{p.tag}</p>
              <p className={`mt-5 font-display text-h2 font-medium ${p.highlight ? "text-ink-inverse" : "text-ink-0"}`}>{p.price}</p>
              <ul className={`mt-6 flex-1 space-y-3 text-body ${p.highlight ? "text-ink-inverse/80" : "text-ink-1"}`}>
                {p.bullets.map((b) => (
                  <li key={b} className="flex gap-3">
                    <span className="text-accent" aria-hidden>✓</span>
                    {b}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <LinkButton
                  href="/waitlist?as=business"
                  size="md"
                  variant={p.highlight ? "primary" : "secondary"}
                >
                  {p.highlight ? "Join the waitlist" : `Choose ${p.name}`}
                </LinkButton>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.3}>
          <p className="mt-6 text-caption text-ink-3">
            Prices shown are pre-tax. GST applies for Indian customers. Plan details may change before public launch.
          </p>
        </Reveal>
      </Section>

      {/* CTA */}
      <Section tone="inverse">
        <div className="grid items-center gap-10 md:grid-cols-12">
          <div className="md:col-span-8">
            <Reveal>
              <h2 className="font-display text-balance text-[clamp(2rem,4vw,3.2rem)] font-medium leading-[1.06] tracking-tighter text-ink-inverse">
                Hire with proof, not guesswork.
              </h2>
              <p className="mt-4 max-w-[50ch] text-lead text-ink-inverse/75">
                Join the businesses waitlist. We open in Bengaluru in 2027 — first
                cohort accepted by hand.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="md:col-span-4 flex md:justify-end">
            <LinkButton href="/waitlist?as=business" variant="inverse" size="lg">
              Join the businesses waitlist
            </LinkButton>
          </Reveal>
        </div>
      </Section>
    </>
  );
}

const clientTypes = [
  {
    label: "SMBs",
    anchor: "smb",
    title: "Growing teams that hire regularly.",
    body: "Studios, agencies, repair shops, clinics, retail stores. You hire often enough that one bad pick costs real money and time. Vero gives you a pool where every worker has a track record.",
  },
  {
    label: "Solo clients",
    anchor: "solo",
    title: "One job. One person. Done right.",
    body: "You need a plumber, a designer, a weekend photographer. You do not want to guess. Hire from people whose past clients have already signed off on the work.",
  },
  {
    label: "Cafés & households",
    anchor: "local",
    title: "Local work deserves verified people.",
    body: "Baristas, cooks, household helpers, event staff. Vero treats small local work as seriously as a corporate contract — because the people doing it deserve that too.",
  },
];

const reasons = [
  {
    title: "See verified history, not a star rating.",
    body: "A 4.8 star rating tells you the last client was satisfied. A verified record tells you how many jobs were completed, what they involved, and whether any disputes were raised.",
  },
  {
    title: "Escrow protects you from day one.",
    body: "Funds are committed before work starts and released only when both sides confirm completion. The platform fee is 5% — flat, visible, and below the market.",
  },
  {
    title: "Disputes are handled fairly and on record.",
    body: "If something goes wrong, there is a clear three-step path — direct, mediated, then reviewed. Every step is logged. Nothing gets buried.",
  },
  {
    title: "Rehire the people who worked out.",
    body: "Invite workers you have used before directly. Build a small verified network of people you trust — without starting from scratch every time.",
  },
];

const plans = [
  {
    name: "Starter",
    price: "Free",
    tag: "For one-off hires",
    highlight: false,
    bullets: [
      "Post up to 3 roles a month",
      "Worker verification included",
      "5% escrow on paid work",
      "Standard dispute path",
    ],
  },
  {
    name: "Business",
    price: "₹2,499 / mo",
    tag: "Recommended for SMBs",
    highlight: true,
    bullets: [
      "Unlimited roles",
      "Repeat-worker invites",
      "Priority dispute response",
      "Business verification mark",
      "5% escrow on paid work",
    ],
  },
  {
    name: "Studio",
    price: "Custom",
    tag: "For higher volume",
    highlight: false,
    bullets: [
      "Multiple branches / locations",
      "Roles and scheduling integration",
      "Workforce-wide analytics",
      "Dedicated success contact",
      "Custom escrow terms",
    ],
  },
];
