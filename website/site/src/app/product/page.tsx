import type { Metadata } from "next";
import { Section, Eyebrow, SectionHeadline, SectionLead } from "@/components/Section";
import { LinkButton } from "@/components/Button";
import { sections as copy } from "@/lib/site";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { RecordCard } from "@/components/RecordCard";

export const metadata: Metadata = {
  title: "Product — How Vero works",
  description:
    "Vero creates permanent, signed work records. Here is the full picture: how records are made, why they cannot be faked, how escrow works, and what your profile looks like.",
  alternates: { canonical: "/product" },
};

export default function ProductPage() {
  return (
    <>
      {/* Hero */}
      <Section className="!pt-24 !pb-16">
        <div className="max-w-[56ch]">
          <Reveal>
            <Eyebrow>Product</Eyebrow>
            <SectionHeadline className="mt-3">
              How Vero actually works.
            </SectionHeadline>
            <SectionLead>
              Every time a job is completed on Vero, a permanent signed record is
              created. Both sides confirm it. It links to every job before it. It
              cannot be edited. It belongs to the worker.
            </SectionLead>
            <SectionLead>
              That is the entire idea. The rest is infrastructure to make it honest.
            </SectionLead>
          </Reveal>
        </div>
      </Section>

      {/* Five steps */}
      <Section tone="raised" rule="bottom">
        <Reveal>
          <Eyebrow>{copy.how.eyebrow}</Eyebrow>
          <SectionHeadline className="mt-3">{copy.how.headline}</SectionHeadline>
        </Reveal>

        <Stagger as="ol" className="mt-16 grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {copy.how.steps.map((s, i) => (
            <StaggerItem
              as="li"
              key={s.n}
              className={
                "relative" +
                (i % 3 === 1 ? " md:translate-y-10 lg:translate-y-14" : "") +
                (i % 3 === 2 ? " lg:translate-y-6" : "")
              }
            >
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-caption text-accent">{s.n}</span>
                <span className="h-px flex-1 bg-line-faint" aria-hidden />
              </div>
              <h3 className="mt-5 font-display text-h4 font-medium leading-tight tracking-tightish text-ink-0">
                {s.title}
              </h3>
              <p className="mt-3 max-w-[40ch] text-body text-pretty text-ink-1">{s.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* What a record looks like */}
      <Section tone="base" rule="bottom">
        <Reveal>
          <Eyebrow>What a record looks like</Eyebrow>
          <SectionHeadline className="mt-3">Small. Signed. Permanent.</SectionHeadline>
          <SectionLead>
            Each record carries the job description, both signatures, the date, an
            optional measurable detail, and a link to every record that came before
            it. Nothing is hidden. Nothing can be erased.
          </SectionLead>
        </Reveal>

        <Stagger className="mt-12 grid gap-6 md:grid-cols-3" stagger={0.1}>
          <StaggerItem>
            <RecordCard
              category="Apprenticeship"
              title="Three days assisting a stylist in HSR Layout"
              verifier="Verified by Lila T., owner"
              date="Example"
              signers={[
                { initials: "LT", role: "Verifier" },
                { initials: "AS", role: "Worker" },
              ]}
              metric={{ value: "24 hrs", label: "0 missed shifts" }}
            />
          </StaggerItem>
          <StaggerItem>
            <RecordCard
              category="Repair"
              title="Tap replacement · Koramangala · 2BHK"
              verifier="Verified by Mr. Bhat"
              date="Example"
              signers={[
                { initials: "RB", role: "Client" },
                { initials: "VK", role: "Worker" },
              ]}
              metric={{ value: "₹650", label: "Released from escrow" }}
            />
          </StaggerItem>
          <StaggerItem>
            <RecordCard
              category="Design"
              title="Menu refresh for Electronic City bakery"
              verifier="Verified by Bake & Co."
              date="Example"
              signers={[
                { initials: "BC", role: "Client" },
                { initials: "PD", role: "Worker" },
              ]}
            />
          </StaggerItem>
        </Stagger>
      </Section>

      {/* Why it cannot be faked */}
      <Section tone="raised" rule="bottom">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <Eyebrow>{copy.trust.eyebrow}</Eyebrow>
              <SectionHeadline className="mt-3">{copy.trust.headline}</SectionHeadline>
              <SectionLead>
                Vero is designed so that neither workers nor businesses — and not even
                the platform itself — can quietly alter a record after it is created.
              </SectionLead>
            </Reveal>
          </div>

          <Stagger
            as="ul"
            className="mt-4 grid gap-5 md:grid-cols-2 lg:col-span-8 lg:mt-0"
            stagger={0.06}
          >
            {copy.trust.pillars.map((p, i) => (
              <StaggerItem
                as="li"
                key={p.title}
                className="border border-line bg-surface-1/50 p-6 transition-colors hover:border-line-strong"
              >
                <span className="font-mono text-micro text-ink-3">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-display text-h6 font-medium leading-tight tracking-tightish text-ink-0">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-1">{p.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      {/* Your work record */}
      <Section tone="base" rule="bottom">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow>{copy.identity.eyebrow}</Eyebrow>
              <SectionHeadline className="mt-3">{copy.identity.headline}</SectionHeadline>
              <SectionLead>
                Your Vero profile is built from completed jobs, not self-descriptions.
                Every entry is signed by the person who hired you. You can carry it
                anywhere.
              </SectionLead>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Stagger as="ul" className="mt-4 grid gap-y-5">
              {copy.identity.facets.map((f) => (
                <StaggerItem
                  as="li"
                  key={f.label}
                  className="grid gap-3 border-b border-line-faint pb-5 sm:grid-cols-[14ch_1fr]"
                >
                  <span className="font-mono text-caption text-ink-2">{f.label}</span>
                  <span className="text-body text-ink-1">{f.body}</span>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </Section>

      {/* Work categories */}
      <Section tone="raised" rule="bottom">
        <Reveal>
          <Eyebrow>06 / Work categories</Eyebrow>
          <SectionHeadline className="mt-3">Ten categories at launch.</SectionHeadline>
          <SectionLead>
            Vero opens with the work categories where verified records matter most.
            Each category is its own reputation track — skills you build in one
            add credibility across others.
          </SectionLead>
        </Reveal>

        <Stagger as="ul" className="mt-12 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5" stagger={0.05}>
          {categories.map((c) => (
            <StaggerItem
              as="li"
              key={c.slug}
              className="border border-line-faint p-5 transition-colors hover:border-line"
            >
              <span className="font-mono text-micro text-ink-3">/{c.slug}</span>
              <p className="mt-3 font-display text-h6 font-medium tracking-tightish text-ink-0">{c.label}</p>
              <p className="mt-2 text-caption text-ink-2">{c.desc}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* AI layer */}
      <Section tone="base" rule="bottom">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow>{copy.ai.eyebrow}</Eyebrow>
              <SectionHeadline className="mt-3">{copy.ai.headline}</SectionHeadline>
              <SectionLead>{copy.ai.intent}</SectionLead>
            </Reveal>
          </div>
          <div className="lg:col-span-7 lg:pt-6">
            <Stagger as="ul" className="border-t border-line">
              {copy.ai.capabilities.map((cap, i) => (
                <StaggerItem
                  as="li"
                  key={i}
                  className="grid gap-4 border-b border-line-faint py-6 sm:grid-cols-[auto_1fr]"
                >
                  <span className="font-mono text-caption text-ink-2">{String(i + 1).padStart(2, "0")}</span>
                  <p className="max-w-[58ch] text-body text-ink-1">{cap}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section tone="inverse">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Reveal>
              <h2 className="font-display text-balance text-[clamp(2rem,4vw,3.2rem)] font-medium leading-[1.06] tracking-tighter text-ink-inverse">
                Your record starts with the first job you sign.
              </h2>
              <p className="mt-5 max-w-[52ch] text-lead text-ink-inverse/75">
                Join the waitlist. We open in Bengaluru in 2027 — first cohort
                accepted by hand.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-4 lg:flex lg:justify-end">
            <Reveal delay={0.1}>
              <LinkButton href="/#apply" variant="inverse" size="lg">
                Apply for early access
              </LinkButton>
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  );
}

const categories = [
  { slug: "developers", label: "Developers", desc: "Frontend, backend, full-stack, mobile." },
  { slug: "designers", label: "Designers", desc: "Brand, product, print, motion." },
  { slug: "editors", label: "Video editors", desc: "Reels, long-form, brand content." },
  { slug: "operators", label: "Operators", desc: "Startup ops, logistics, scheduling." },
  { slug: "creators", label: "Creators", desc: "Writers, photographers, stylists." },
  { slug: "marketing", label: "Marketing", desc: "Paid, organic, content, strategy." },
  { slug: "startup", label: "Startup support", desc: "Research, admin, early-stage generalists." },
  { slug: "ai", label: "AI workflows", desc: "Prompt engineers, automation, data." },
  { slug: "research", label: "Research", desc: "Market research, UX research, reports." },
  { slug: "growth", label: "Growth", desc: "SEO, partnerships, community, referrals." },
];
