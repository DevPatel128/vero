import { Hero } from "@/components/Hero";
import { Section, Eyebrow, SectionTitle, SectionLead } from "@/components/Section";
import { LinkButton } from "@/components/Button";
import { InlineEmailForm } from "@/components/InlineEmailForm";
import { site } from "@/lib/site";
import Link from "next/link";
import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { LetterSplit, WordReveal } from "@/components/motion/LetterSplit";
import { MaskReveal } from "@/components/motion/MaskReveal";
import { BlurIn } from "@/components/motion/BlurIn";
import { FlipIn } from "@/components/motion/FlipIn";
import { ScaleIn } from "@/components/motion/ScaleIn";
import { TiltCard } from "@/components/motion/TiltCard";
import { Spotlight } from "@/components/motion/Spotlight";
import { Parallax } from "@/components/motion/Parallax";
import { SignatureFlow } from "@/components/illustrations/SignatureFlow";
import { RecordChain } from "@/components/illustrations/RecordChain";
import { StandingDial } from "@/components/illustrations/StandingDial";
import { BengaluruMap } from "@/components/illustrations/BengaluruMap";
import { HashRibbon } from "@/components/illustrations/HashRibbon";

export const metadata: Metadata = {
  title: `${site.name} - ${site.tagline}`,
  description: site.description,
  alternates: { canonical: "/" },
};

const problems = [
  {
    title: "Claims do not equal proof.",
    body: "Profiles are full of titles, endorsements, and self-descriptions that nobody verified. You read a resume and you still do not know what the person actually did.",
  },
  {
    title: "Beginners cannot get the first job.",
    body: "Most platforms reward the people who already have records. The students, switchers, and people just starting are left waiting outside the door.",
  },
  {
    title: "Trust is hard to carry across apps.",
    body: "What you build on one platform stays trapped there. The next platform makes you start from zero. Reputation does not compound.",
  },
];

const howItWorks = [
  { step: "1", title: "Apply or get matched", body: "Small, real, local work. Apprenticeships, gigs, repair calls, café shifts, design briefs. Bengaluru-first." },
  { step: "2", title: "Do the work", body: "No bidding war. No race to the bottom. Just a clear scope, a fair rate, and a person on the other side who needs help." },
  { step: "3", title: "Both sides sign", body: "Professional confirms completion. Client confirms completion. Both signatures are required." },
  { step: "4", title: "A record is minted", body: "Chained to the records that came before. Public if you want. Private if you do not. Owned by you forever." },
];

const personas = [
  { tag: "For professionals", title: "Build a record nobody can take away.", body: "Students. Switchers. Skilled hands without a portfolio. Begin with small work. Stack verified completions. Carry your record forward.", href: "/for-professionals" },
  { tag: "For businesses", title: "Hire from a pool whose history is already proof.", body: "Cafés. Households. Studios. SMBs. Stop screening unverified candidates. See who has actually shown up before.", href: "/for-businesses" },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Hash ribbon - bridges hero into content */}
      <div className="bg-paper-warm/40 py-6">
        <HashRibbon />
      </div>

      {/* Problem strip - FlipIn cards */}
      <Section tone="warm" className="!py-20">
        <BlurIn>
          <Eyebrow>The problem</Eyebrow>
        </BlurIn>
        <h2 className="max-w-3xl font-display text-3xl font-medium tracking-tighter text-ink-900 md:text-5xl">
          <WordReveal text="Today, the proof is missing." />
        </h2>
        <BlurIn delay={0.2}>
          <SectionLead>
            Three things break the way work and credibility connect. Vero is built around them.
          </SectionLead>
        </BlurIn>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {problems.map((p, i) => (
            <FlipIn key={p.title} delay={i * 0.12} axis={i % 2 === 0 ? "x" : "y"}>
              <article className="relative h-full rounded-2xl border border-ink-100 bg-paper p-7">
                <span className="font-mono text-xs text-ink-400">0{i + 1}</span>
                <h3 className="mt-2 font-display text-xl font-medium tracking-tightish text-ink-900">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">{p.body}</p>
              </article>
            </FlipIn>
          ))}
        </div>
      </Section>

      {/* How it works - MaskReveal heading, then signature diagram, then steps */}
      <Section id="how-it-works">
        <MaskReveal from="left">
          <Eyebrow>How a record is made</Eyebrow>
        </MaskReveal>
        <h2 className="max-w-3xl font-display text-3xl font-medium tracking-tighter text-ink-900 md:text-5xl">
          <LetterSplit text="Four steps. Two signatures. One record." stagger={0.025} />
        </h2>
        <BlurIn delay={0.5}>
          <SectionLead>
            Vero is small on the surface and serious underneath. There is no algorithm
            guessing whether the work happened. Both sides say so. Both sides sign.
          </SectionLead>
        </BlurIn>

        <MaskReveal delay={0.3} from="up" className="mt-12">
          <SignatureFlow className="mx-auto max-w-3xl" />
        </MaskReveal>

        <Stagger
          as="ol"
          className="mt-14 grid gap-6 md:grid-cols-4"
          stagger={0.08}
        >
          {howItWorks.map((s) => (
            <StaggerItem
              key={s.step}
              as="li"
              className="rounded-2xl border border-ink-100 bg-paper p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
            >
              <span className="font-mono text-xs text-accent">Step {s.step}</span>
              <h3 className="mt-3 font-display text-lg font-medium tracking-tightish text-ink-900">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">{s.body}</p>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.2} className="mt-12">
          <LinkButton href="/how-it-works" variant="secondary">
            See the full flow
          </LinkButton>
        </Reveal>
      </Section>

      {/* Chained records - Parallax inside, MaskReveal title */}
      <Section tone="warm" className="!py-20">
        <MaskReveal from="right">
          <Eyebrow>Chained, not edited</Eyebrow>
        </MaskReveal>
        <h2 className="max-w-3xl font-display text-3xl font-medium tracking-tighter text-ink-900 md:text-5xl">
          <WordReveal text="Every record references the one before it." />
        </h2>
        <BlurIn delay={0.3}>
          <SectionLead>
            History cannot be quietly rewritten. The chain is the receipt.
          </SectionLead>
        </BlurIn>
        <Parallax range={40} className="mt-12 overflow-hidden">
          <RecordChain />
        </Parallax>
      </Section>

      {/* Trust & Escrow Visual */}
      <Section tone="warm" className="!py-24">
        <div className="text-center md:mx-auto md:max-w-3xl">
          <Reveal>
            <Eyebrow>Escrow Guarantee</Eyebrow>
          </Reveal>
          <h2 className="mt-4 font-display text-3xl font-medium tracking-tighter text-ink-900 md:text-5xl">
            <WordReveal text="Safe money. No chasing invoices." />
          </h2>
          <Reveal delay={0.2}>
            <SectionLead className="mx-auto mt-4">
              When a job starts, the client funds it up front. We hold it safely in escrow. When you finish, both sides sign, and the money drops. We take a flat 5% fee.
            </SectionLead>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {[
            { step: "1", title: "Client Funds Upfront", body: "The budget is locked in escrow before you lift a finger. You know the money is real." },
            { step: "2", title: "You Do The Work", body: "Deliver exactly what was agreed upon. No scope creep without a signed addendum." },
            { step: "3", title: "Sign & Release", body: "Both parties sign the ledger confirming completion. Funds are released instantly." },
          ].map((item, i) => (
            <ScaleIn key={item.step} delay={i * 0.15} from={0.9}>
              <div className="flex h-full flex-col items-center rounded-3xl border border-ink-100 bg-paper p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-premium-hover">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-trust text-xl font-bold text-paper shadow-md">
                  {item.step}
                </div>
                <h3 className="mt-6 font-display text-xl font-medium tracking-tight text-ink-900">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">
                  {item.body}
                </p>
              </div>
            </ScaleIn>
          ))}
        </div>
      </Section>

      {/* Standing dial */}
      <Section tone="warm">
        <div className="grid items-center gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Reveal>
              <Eyebrow>Standing, not stars</Eyebrow>
            </Reveal>
            <h2 className="font-display text-3xl font-medium tracking-tighter text-ink-900 md:text-5xl">
              <WordReveal text="Six dimensions. No gameable number." />
            </h2>
            <BlurIn delay={0.3}>
              <SectionLead>
                Show-up rate. On-time rate. Repeat clients. Dispute-free record.
                Category strength. Peer quality. Each is visible and explainable on your
                dashboard.
              </SectionLead>
            </BlurIn>
          </div>
          <ScaleIn delay={0.2} className="md:col-span-7" from={0.85}>
            <StandingDial />
          </ScaleIn>
        </div>
      </Section>

      {/* Personas - Spotlight cards */}
      <Section>
        <Reveal>
          <Eyebrow>Built for both sides</Eyebrow>
        </Reveal>
        <h2 className="max-w-3xl font-display text-3xl font-medium tracking-tighter text-ink-900 md:text-5xl">
          <WordReveal text="One platform. Two reasons to use it." />
        </h2>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {personas.map((p, i) => (
            <BlurIn key={p.tag} delay={i * 0.12}>
              <Link
                href={p.href}
                className="group relative block overflow-hidden rounded-3xl bg-ink-950 text-paper transition-all duration-500 hover:-translate-y-1 hover:shadow-lift"
              >
                <Spotlight className="rounded-3xl" size={420}>
                  <div className="relative p-10">
                    <span className="relative text-xs uppercase tracking-[0.22em] text-accent-glow">
                      {p.tag}
                    </span>
                    <h3 className="relative mt-4 font-display text-3xl font-medium tracking-tighter">
                      {p.title}
                    </h3>
                    <p className="relative mt-4 max-w-md text-base leading-relaxed text-ink-300">
                      {p.body}
                    </p>
                    <span className="relative mt-8 inline-flex items-center gap-2 text-sm font-medium text-accent-glow">
                      Read more
                      <span
                        aria-hidden
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </span>
                  </div>
                </Spotlight>
              </Link>
            </BlurIn>
          ))}
        </div>
      </Section>

      {/* Location - Bengaluru map */}
      <Section tone="warm">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Reveal>
              <Eyebrow>Where it begins</Eyebrow>
            </Reveal>
            <h2 className="font-display text-3xl font-medium tracking-tighter text-ink-900 md:text-5xl">
              <WordReveal
                text={`${site.launchCity}, first. ${site.launchWindow} - TBA.`}
              />
            </h2>
            <BlurIn delay={0.3}>
              <SectionLead>
                Trust is local before it is global. Five neighbourhoods. Exact launch
                date to be announced - follow our socials for the call.
              </SectionLead>
            </BlurIn>
          </div>
          <MaskReveal delay={0.2} from="right" className="md:col-span-7">
            <BengaluruMap />
          </MaskReveal>
        </div>
      </Section>

      {/* FAQ teaser */}
      <Section>
        <Reveal>
          <Eyebrow>Common questions</Eyebrow>
        </Reveal>
        <h2 className="max-w-3xl font-display text-3xl font-medium tracking-tighter text-ink-900 md:text-5xl">
          <WordReveal text="Short answers to the things people ask." />
        </h2>

        <Stagger
          as="dl"
          className="mt-12 divide-y divide-ink-100 border-y border-ink-100"
          stagger={0.06}
        >
          {[
            { q: "Is Vero free for professionals?", a: "Yes. Always. We do not charge professionals to create or carry their records." },
            { q: "Who pays Vero?", a: "Businesses pay a small SaaS subscription based on roles and volume. There is a flat 5% escrow fee on paid work - below the 25% common in the market." },
            { q: "Is my record private?", a: "Each record carries a visibility flag. Public, shared, or private. Private records still count toward your standing but do not appear on your public profile." },
            { q: "Can I take my Vero record with me?", a: "Yes. Every record is exportable as a portable, signed document. You own it." },
            { q: "When does Vero open?", a: "Bengaluru in 2027. Exact date to be announced - follow our socials for the call." },
          ].map((item) => (
            <StaggerItem key={item.q} className="grid gap-4 py-7 md:grid-cols-12">
              <dt className="md:col-span-4 font-display text-lg font-medium tracking-tightish text-ink-900">
                {item.q}
              </dt>
              <dd className="md:col-span-8 text-base leading-relaxed text-ink-600">
                {item.a}
              </dd>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.2} className="mt-10">
          <LinkButton href="/faq" variant="ghost">
            Read the full FAQ →
          </LinkButton>
        </Reveal>
      </Section>

      {/* Final CTA */}
      <Section tone="ink">
        <div className="grid items-center gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <h2 className="font-display text-4xl font-medium tracking-tighter md:text-5xl">
              <WordReveal text="Your work, signed and saved." />
            </h2>
            <BlurIn delay={0.3}>
              <p className="mt-5 max-w-xl text-lg text-ink-300">
                Stop applying. Start proving. Reserve your spot for the first 5,000 users.
              </p>
            </BlurIn>
          </div>
          <BlurIn delay={0.2} className="md:col-span-5 flex flex-col justify-center">
            <div className="rounded-3xl bg-white/5 p-6 backdrop-blur-md">
              <InlineEmailForm />
            </div>
          </BlurIn>
        </div>
      </Section>
    </>
  );
}

