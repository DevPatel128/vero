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
import { PhoneMockup } from "@/components/illustrations/PhoneMockup";
import { IDBadge } from "@/components/illustrations/IDBadge";
import { RecordChain } from "@/components/illustrations/RecordChain";

export const metadata: Metadata = {
  title: "For professionals",
  description:
    "Vero is free for professionals. Always. Build a record of real, verified work. Students, switchers, skilled hands without a portfolio - start small, grow forward.",
  alternates: { canonical: "/for-professionals" },
};

const pains = [
  { title: "You need experience to get hired", body: "And you need to get hired to get experience. Most platforms reward the people who already have records." },
  { title: "Your past does not travel", body: "What you build on one app stays trapped there. The next platform makes you start from zero." },
  { title: "Your word counts for nothing", body: "Without a verified history, claiming what you can do does not move anyone. Claims are everywhere." },
];

const wins = [
  { title: "Begin small, signed, and real", body: "Apprenticeships and short gigs that fit your life today. Each one signed by you and the person who hired you." },
  { title: "Carry your record forward", body: "Every record is exportable. The credentials you build on Vero can be read by other platforms that speak the same protocol." },
  { title: "Your standing is explained", body: "Show-up rate. Repeat clients. Dispute history. No black-box number. You can see exactly why you are where you are." },
  { title: "Privacy is yours to choose", body: "Each record carries a visibility flag - public, shared, or private. Private records still count toward your standing." },
];

const audiences = [
  { label: "Students", body: "Before the first résumé line lands, build a small record of paid and unpaid work. It will outweigh a part-time at a coffee chain." },
  { label: "Career switchers", body: "Begin in the new direction with verified, lower-stake work. Stack completions until the next employer cannot ignore you." },
  { label: "Skilled hands", body: "Carpenters, electricians, cooks, beauticians, stylists, repair technicians. People who do real work and have nothing online to show for it." },
  { label: "Creators + freelancers", body: "Designers, editors, writers, developers. Stop relying on screenshots and unverifiable Behance links. Sign the work." },
];

export default function Page() {
  return (
    <>
      <Section className="!pt-24 !pb-12">
        <div className="grid items-center gap-14 md:grid-cols-12">
          <div className="md:col-span-7">
            <MaskReveal from="left">
              <Eyebrow>For professionals</Eyebrow>
            </MaskReveal>
            <h1 className="font-display text-4xl font-medium leading-[1.05] tracking-tighter text-ink-900 md:text-6xl">
              <LetterSplit text="A record of real work, owned by you." stagger={0.02} />
            </h1>
            <BlurIn delay={0.6}>
              <SectionLead>
                Vero is free for professionals. Always. We do not charge you to create your
                record, to keep it, or to take it elsewhere.
              </SectionLead>
            </BlurIn>
            <BlurIn delay={0.8} className="mt-9 flex flex-col gap-3 sm:flex-row">
              <LinkButton href="/waitlist?as=professional" size="lg">
                Join as a professional
              </LinkButton>
              <LinkButton href="/how-it-works" variant="secondary" size="lg">
                How it works
              </LinkButton>
            </BlurIn>
          </div>
          <ScaleIn delay={0.2} className="md:col-span-5 flex justify-center md:justify-end" from={0.88}>
            <PhoneMockup />
          </ScaleIn>
        </div>
      </Section>

      <Section tone="warm">
        <BlurIn>
          <Eyebrow>The hard parts</Eyebrow>
        </BlurIn>
        <h2 className="max-w-3xl font-display text-3xl font-medium tracking-tighter text-ink-900 md:text-5xl">
          <WordReveal text="Three loops that work against beginners." />
        </h2>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {pains.map((p, i) => (
            <FlipIn key={p.title} delay={i * 0.12} axis={i % 2 === 0 ? "x" : "y"}>
              <div className="h-full">
                <h3 className="font-display text-xl font-medium tracking-tightish text-ink-900">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">{p.body}</p>
              </div>
            </FlipIn>
          ))}
        </div>
      </Section>

      {/* Verified ID + what changes */}
      <Section>
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <BlurIn>
              <Eyebrow>Verified, not vouched</Eyebrow>
            </BlurIn>
            <h2 className="font-display text-3xl font-medium tracking-tighter text-ink-900 md:text-5xl">
              <WordReveal text="An identity anyone can verify." />
            </h2>
            <BlurIn delay={0.3}>
              <SectionLead>
                Your phone, your ID, and your signed history form a single artefact.
                Anyone with the public key can check it. The platform is not a privileged
                party.
              </SectionLead>
            </BlurIn>
          </div>
          <MaskReveal delay={0.2} from="down" className="md:col-span-7 flex justify-center">
            <IDBadge />
          </MaskReveal>
        </div>
      </Section>

      <Section tone="warm">
        <BlurIn>
          <Eyebrow>What changes on Vero</Eyebrow>
        </BlurIn>
        <h2 className="max-w-3xl font-display text-3xl font-medium tracking-tighter text-ink-900 md:text-5xl">
          <WordReveal text="Small work. Signed. Yours." />
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {wins.map((w, i) => (
            <ScaleIn key={w.title} delay={i * 0.08} from={0.94}>
              <TiltCard className="h-full" intensity={5}>
                <div className="h-full rounded-2xl border border-ink-100 bg-paper p-7 shadow-card transition-shadow duration-300 hover:shadow-lift">
                  <h3 className="font-display text-xl font-medium tracking-tightish text-ink-900">
                    {w.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-ink-600">{w.body}</p>
                </div>
              </TiltCard>
            </ScaleIn>
          ))}
        </div>
      </Section>

      <Section>
        <MaskReveal from="left">
          <Eyebrow>Stacks over time</Eyebrow>
        </MaskReveal>
        <h2 className="max-w-3xl font-display text-3xl font-medium tracking-tighter text-ink-900 md:text-5xl">
          <WordReveal text="One signed record, then another, then another." />
        </h2>
        <BlurIn delay={0.3}>
          <SectionLead>
            Each record references the one before it for you. The chain is yours to
            carry into the next opportunity, on Vero or elsewhere.
          </SectionLead>
        </BlurIn>
        <Parallax range={30} className="mt-10 overflow-hidden">
          <RecordChain />
        </Parallax>
      </Section>

      <Section tone="warm">
        <BlurIn>
          <Eyebrow>Who Vero is for</Eyebrow>
        </BlurIn>
        <h2 className="max-w-3xl font-display text-3xl font-medium tracking-tighter text-ink-900 md:text-5xl">
          <WordReveal text="Different people. Same need." />
        </h2>

        <ul className="mt-12 grid gap-5 md:grid-cols-2">
          {audiences.map((a, i) => (
            <li key={a.label}>
              <BlurIn delay={i * 0.08}>
                <Spotlight
                  className="rounded-2xl border border-ink-100 bg-paper transition-all duration-300 hover:border-ink-200"
                  size={320}
                >
                  <div className="relative grid grid-cols-12 gap-5 p-7">
                    <span className="col-span-3 font-display text-sm font-medium uppercase tracking-[0.16em] text-accent">
                      {a.label}
                    </span>
                    <p className="col-span-9 text-base leading-relaxed text-ink-700">
                      {a.body}
                    </p>
                  </div>
                </Spotlight>
              </BlurIn>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="ink">
        <div className="grid items-center gap-10 md:grid-cols-12">
          <div className="md:col-span-8">
            <h2 className="font-display text-3xl font-medium tracking-tighter md:text-5xl">
              <WordReveal text="Your record begins the first time you sign." />
            </h2>
            <BlurIn delay={0.3}>
              <p className="mt-5 max-w-xl text-ink-300">
                Join the professionals&apos; waitlist. You will be one of the first to do
                real, signed work in Bengaluru when we open in 2027 - exact date to be
                announced.
              </p>
            </BlurIn>
          </div>
          <BlurIn delay={0.2} className="md:col-span-4 flex md:justify-end">
            <LinkButton href="/waitlist?as=professional" size="lg">
              Join as a professional
            </LinkButton>
          </BlurIn>
        </div>
      </Section>
    </>
  );
}

