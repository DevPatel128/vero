import type { Metadata } from "next";
import { Section, Eyebrow, SectionHeadline, SectionLead } from "@/components/Section";
import { LinkButton } from "@/components/Button";
import { IDBadge } from "@/components/illustrations/IDBadge";
import { RecordChain } from "@/components/illustrations/RecordChain";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

export const metadata: Metadata = {
  title: "For professionals — Vero",
  description:
    "You have done real work. Vero gives you a permanent, signed record that proves it — and travels with you no matter what platform comes next.",
  alternates: { canonical: "/for-professionals" },
};

export default function ForProfessionalsPage() {
  return (
    <>
      {/* Hero */}
      <Section className="!pt-24 !pb-16">
        <div className="grid items-center gap-14 md:grid-cols-12">
          <div className="md:col-span-7">
            <Reveal>
              <Eyebrow>For professionals</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <SectionHeadline className="mt-3">
                You have done the work. Now you can prove it.
              </SectionHeadline>
            </Reveal>
            <Reveal delay={0.1}>
              <SectionLead>
                Vero is free for workers. Always. Build a verified record of
                completed jobs — signed by the people who hired you — that you
                own and carry wherever you go.
              </SectionLead>
            </Reveal>
            <Reveal delay={0.2} className="mt-9 flex flex-col gap-3 sm:flex-row">
              <LinkButton href="/waitlist?as=worker" size="lg">
                Join as a professional
              </LinkButton>
              <LinkButton href="/product" variant="secondary" size="lg">
                How it works
              </LinkButton>
            </Reveal>
          </div>
          <div className="md:col-span-5 flex justify-center md:justify-end">
            <IDBadge />
          </div>
        </div>
      </Section>

      {/* The problem — relatable pain points */}
      <Section tone="raised" rule="bottom">
        <Reveal>
          <Eyebrow>The hard parts</Eyebrow>
          <SectionHeadline className="mt-3">
            Three loops that work against talented people.
          </SectionHeadline>
        </Reveal>

        <Stagger as="ul" className="mt-12 grid gap-6 md:grid-cols-3" stagger={0.08}>
          {pains.map((p) => (
            <StaggerItem
              as="li"
              key={p.title}
              className="border border-line-faint p-7 transition-colors hover:border-line"
            >
              <h3 className="font-display text-h5 font-medium leading-snug tracking-tightish text-ink-0">
                {p.title}
              </h3>
              <p className="mt-3 text-body text-ink-1">{p.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* What changes */}
      <Section tone="base" rule="bottom">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <Eyebrow>What changes on Vero</Eyebrow>
              <SectionHeadline className="mt-3">
                Your work speaks for itself. Literally.
              </SectionHeadline>
              <SectionLead>
                Every job you complete becomes a signed entry in your record. The
                person who hired you signs it too. That record is permanent,
                portable, and belongs to you — not the platform.
              </SectionLead>
            </Reveal>
          </div>

          <Stagger as="ul" className="grid gap-5 md:grid-cols-2 lg:col-span-8" stagger={0.07}>
            {wins.map((w) => (
              <StaggerItem
                as="li"
                key={w.title}
                className="border border-line-faint bg-surface-1/50 p-7 transition-colors hover:border-line"
              >
                <h3 className="font-display text-h5 font-medium leading-snug tracking-tightish text-ink-0">
                  {w.title}
                </h3>
                <p className="mt-3 text-body text-ink-1">{w.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      {/* Who this is for — specific audiences */}
      <Section tone="raised" rule="bottom">
        <Reveal>
          <Eyebrow>Who Vero is for</Eyebrow>
          <SectionHeadline className="mt-3">
            Different work. Same problem.
          </SectionHeadline>
          <SectionLead>
            The credential gap hits every kind of worker. Vero is built for all of them.
          </SectionLead>
        </Reveal>

        <Stagger as="ul" className="mt-12 grid gap-5 md:grid-cols-2" stagger={0.07}>
          {audiences.map((a) => (
            <StaggerItem
              as="li"
              key={a.label}
              className="grid border border-line-faint p-7 transition-colors hover:border-line sm:grid-cols-[10ch_1fr] sm:gap-6"
            >
              <span className="mb-3 font-display text-caption font-medium uppercase tracking-[0.16em] text-accent sm:mb-0">
                {a.label}
              </span>
              <div>
                <p className="font-display text-h6 font-medium tracking-tightish text-ink-0">{a.title}</p>
                <p className="mt-2 text-body text-ink-1">{a.body}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Record chain visual */}
      <Section tone="base" rule="bottom">
        <Reveal>
          <Eyebrow>How records stack</Eyebrow>
          <SectionHeadline className="mt-3">
            One job. Then another. Then another.
          </SectionHeadline>
          <SectionLead>
            Each record is linked to the one before it. That continuity turns
            separate jobs into a career history that anyone can read and no one can fake.
          </SectionLead>
        </Reveal>
        <div className="mt-12 overflow-hidden">
          <RecordChain />
        </div>
      </Section>

      {/* Promises — what Vero commits to workers */}
      <Section tone="raised" rule="bottom">
        <Reveal>
          <Eyebrow>What we promise workers</Eyebrow>
          <SectionHeadline className="mt-3">Four commitments. No asterisks.</SectionHeadline>
        </Reveal>

        <Stagger as="ul" className="mt-10 border-t border-line-faint" stagger={0.06}>
          {promises.map((p) => (
            <StaggerItem
              as="li"
              key={p}
              className="flex items-start gap-4 border-b border-line-faint py-6"
            >
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-accent" aria-hidden />
              <span className="text-body text-ink-0">{p}</span>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* CTA */}
      <Section tone="inverse">
        <div className="grid items-center gap-10 md:grid-cols-12">
          <div className="md:col-span-8">
            <Reveal>
              <h2 className="font-display text-balance text-[clamp(2rem,4vw,3.2rem)] font-medium leading-[1.06] tracking-tighter text-ink-inverse">
                Your record starts the first time you sign.
              </h2>
              <p className="mt-4 max-w-[52ch] text-lead text-ink-inverse/75">
                Join the workers waitlist. First cohort opens in Bengaluru in 2027 —
                exact date to be announced.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="md:col-span-4 flex md:justify-end">
            <LinkButton href="/waitlist?as=worker" variant="inverse" size="lg">
              Join as a professional
            </LinkButton>
          </Reveal>
        </div>
      </Section>
    </>
  );
}

const pains = [
  {
    title: "You need experience to get hired, but you need to be hired to get experience.",
    body: "Most platforms only reward people who already have records. Starting out — or starting over — is disproportionately hard.",
  },
  {
    title: "Your work history disappears when you leave a platform.",
    body: "Three years of great jobs on one app count for nothing on the next one. You start from zero every single time.",
  },
  {
    title: "Saying you did good work is not the same as proving it.",
    body: "Without a verified record, the only thing you have is your word. And when everyone else has screenshots and LinkedIn posts, your word is not enough.",
  },
];

const wins = [
  {
    title: "Start small. Build real.",
    body: "Short gigs, one-off jobs, apprenticeships — everything counts. Each completed job, no matter how small, becomes a signed entry in your record.",
  },
  {
    title: "Your record travels with you.",
    body: "Your Vero record is portable. It is not locked to this platform. When the next platform comes along, your history comes with you.",
  },
  {
    title: "You can see exactly where you stand.",
    body: "Show-up rate, repeat clients, dispute history — all visible, all explained. No black-box score that shifts for no reason.",
  },
  {
    title: "Privacy is yours to decide.",
    body: "Each record can be public, shared only with specific people, or private. Private records still count toward your standing.",
  },
];

const audiences = [
  {
    label: "Students",
    title: "Build a record before your first resume line.",
    body: "Start with small paid or unpaid work before you graduate. A signed record of real jobs will outweigh an unverified LinkedIn entry every time.",
  },
  {
    label: "Career switchers",
    title: "Prove your new direction without a long wait.",
    body: "Take verified work in the field you are moving into. Stack completions. By the time you apply for a full-time role, you have a track record, not just a plan.",
  },
  {
    label: "Skilled trades",
    title: "Carpenters, electricians, cooks, beauticians — your work deserves proof too.",
    body: "Millions of people do excellent hands-on work and have nothing to show for it online. Vero treats every job as a real entry in a real record.",
  },
  {
    label: "Freelancers",
    title: "Stop relying on screenshots and unverifiable portfolios.",
    body: "Designers, developers, writers, editors — sign the work. A signed record from a real client is worth more than a Behance link anyone could have made.",
  },
];

const promises = [
  "Vero is free for workers. Always. We will never charge you to create, keep, or export your record.",
  "No record will ever be silently edited, downgraded, or removed by the platform.",
  "You can export your full record in a portable format at any time.",
  "If we cannot keep these promises, we will say so before we break them.",
];
