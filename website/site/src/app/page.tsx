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
import { TiltCard } from "@/components/motion/TiltCard";
import { Spotlight } from "@/components/motion/Spotlight";
import { Parallax } from "@/components/motion/Parallax";
import { RecordChain } from "@/components/illustrations/RecordChain";
import { BengaluruMap } from "@/components/illustrations/BengaluruMap";
import { HashRibbon } from "@/components/illustrations/HashRibbon";
import { ResumeVsRecord } from "@/components/illustrations/ResumeVsRecord";
import { DualSignatureFlow } from "@/components/illustrations/DualSignatureFlow";
export const metadata: Metadata = {
  title: `${site.name} - ${site.tagline}`,
  description: site.description,
  alternates: { canonical: "/" },
};


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
      <div className="bg-paper-warm/40" style={{ paddingBlock: 'var(--space-5)' }}>
        <HashRibbon />
      </div>

      {/* Resume vs Record Visual Storytelling Hook */}
      <Section className="overflow-hidden section-stack">
        <div className="mb-16 text-center md:mx-auto md:max-w-3xl">
          <Reveal>
            <Eyebrow>The Old Way vs. Vero</Eyebrow>
          </Reveal>
          <h2 className="mt-4 font-display text-3xl font-medium tracking-tighter text-ink-900 md:text-5xl">
            <WordReveal text="Resumes are claims. Records are proof." />
          </h2>
          <BlurIn delay={0.2}>
            <SectionLead className="mx-auto mt-4">
              A PDF can say anything. A Vero record is cryptographically signed by the client who paid you. The proof is built in.
            </SectionLead>
          </BlurIn>
        </div>
        <ResumeVsRecord />
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

        <MaskReveal delay={0.3} from="up" className="mt-12 w-full overflow-hidden">
          <DualSignatureFlow />
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
      <Section tone="warm" className="section-stack">
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


      {/* Final CTA */}
      <section className="bg-ink-950 text-paper">
        <div className="final-cta">
          <div className="final-cta-copy">
            <h2>
              <WordReveal text="Your work, signed and saved." />
            </h2>
            <BlurIn delay={0.3}>
              <p className="mt-5 text-lg text-ink-300">
                Stop applying. Start proving. Reserve your spot for the first 5,000 users.
              </p>
            </BlurIn>
          </div>
          <BlurIn delay={0.2} className="flex flex-col justify-center">
            <div className="waitlist-card">
              <InlineEmailForm />
            </div>
          </BlurIn>
        </div>
      </section>
    </>
  );
}

