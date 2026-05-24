import { Hero } from "@/components/Hero";
import { Section, Eyebrow, SectionHeadline, SectionLead } from "@/components/Section";
import { LinkButton } from "@/components/Button";
import { site, sections as copy, positioning } from "@/lib/site";
import Link from "next/link";
import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

export const metadata: Metadata = {
  title: `${site.name} — ${site.tagline}`,
  description: site.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* =========================================================
          02 — The problem (teaser — 3 items, links to /why-now)
         ========================================================= */}
      <Section id="problem" tone="base" rule="bottom">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <Eyebrow>{copy.problem.eyebrow}</Eyebrow>
              <SectionHeadline className="mt-3">{copy.problem.headline}</SectionHeadline>
              <SectionLead>
                The hiring system in India is broken in a very specific way — not
                because people are dishonest, but because the tools we use make it
                impossible to tell who has actually done the work.
              </SectionLead>
              <LinkButton href="/why-now" variant="secondary" className="mt-8">
                Why this matters now →
              </LinkButton>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <Stagger as="ul" className="border-t border-line-faint">
              {copy.problem.items.slice(0, 3).map((p, i) => (
                <StaggerItem
                  as="li"
                  key={p.title}
                  className="grid gap-6 border-b border-line-faint py-7 sm:grid-cols-[auto_1fr] md:py-9"
                >
                  <span className="font-mono text-caption text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="font-display text-h5 font-medium leading-snug tracking-tightish text-ink-0">
                      {p.title}
                    </h3>
                    <p className="mt-2 max-w-[58ch] text-body text-pretty text-ink-1">{p.body}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </Section>

      {/* =========================================================
          03 — Who it is for (3 audience cards)
         ========================================================= */}
      <Section id="audiences" tone="raised" rule="bottom">
        <Reveal>
          <Eyebrow>02 / Who it is for</Eyebrow>
          <SectionHeadline className="mt-3">
            Built for three different people.
          </SectionHeadline>
          <SectionLead>
            A designer who needs to prove their work is really theirs. A café owner
            who cannot afford another bad hire. A solo client who just needs one
            trustworthy person for one job.
          </SectionLead>
        </Reveal>

        <Stagger as="div" className="mt-14 grid gap-5 md:grid-cols-3" stagger={0.08}>
          {audienceCards.map((card) => (
            <StaggerItem key={card.href}>
              <Link
                href={card.href}
                className="group flex h-full flex-col justify-between border border-line bg-surface-1/50 p-8 transition-colors hover:border-line-strong hover:bg-surface-1"
              >
                <div>
                  <span className="font-mono text-micro text-accent">{card.tag}</span>
                  <h3 className="mt-4 font-display text-h4 font-medium leading-tight tracking-tightish text-ink-0">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-body text-ink-1">{card.body}</p>
                </div>
                <span className="mt-8 inline-flex items-center gap-2 text-caption font-medium text-accent transition-transform group-hover:translate-x-1">
                  {card.cta} →
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* =========================================================
          04 — How it works (brief 3-step, links to /product)
         ========================================================= */}
      <Section id="how-it-works" tone="base" rule="bottom">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <Eyebrow>03 / How it works</Eyebrow>
              <SectionHeadline className="mt-3">
                Simple enough to explain in three steps.
              </SectionHeadline>
              <SectionLead>
                The full flow — verification, escrow, signatures, dispute paths — is
                on the product page. Here is the short version.
              </SectionLead>
              <LinkButton href="/product" variant="secondary" className="mt-8">
                See the full product →
              </LinkButton>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <Stagger as="ol" className="grid gap-8 md:grid-cols-3 lg:pt-4">
              {briefSteps.map((s, i) => (
                <StaggerItem as="li" key={s.title}>
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-caption text-accent">{String(i + 1).padStart(2, "0")}</span>
                    <span className="h-px flex-1 bg-line-faint" aria-hidden />
                  </div>
                  <h3 className="mt-5 font-display text-h5 font-medium leading-tight tracking-tightish text-ink-0">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-body text-ink-1">{s.body}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </Section>

      {/* =========================================================
          05 — Manifesto teaser (inverse pull quote)
         ========================================================= */}
      <Section tone="inverse">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-9">
            <Reveal>
              <Eyebrow className="text-ink-inverse/60">04 / Manifesto</Eyebrow>
              <p className="mt-6 font-editorial text-balance text-[clamp(2rem,4.4vw,3.6rem)] font-medium italic leading-[1.08] text-ink-inverse">
                Talent is common. Verified execution is rare. The next generation will
                not be hired by the document they wrote about themselves.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-3 lg:flex lg:justify-end">
            <Reveal delay={0.1}>
              <LinkButton href="/manifesto" variant="inverse">
                Read the manifesto
              </LinkButton>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* =========================================================
          06 — Security ribbon
         ========================================================= */}
      <Section tone="raised" rule="top" containerClassName="py-16 md:py-20">
        <div className="grid items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Eyebrow>{copy.security.eyebrow}</Eyebrow>
            <h3 className="mt-3 font-display text-h5 font-medium tracking-tightish text-ink-0">
              {copy.security.headline}
            </h3>
          </div>
          <ul className="grid gap-y-3 gap-x-8 sm:grid-cols-2 lg:col-span-9 lg:grid-cols-4">
            {copy.security.items.map((item) => (
              <li key={item} className="flex items-start gap-2 text-caption text-ink-1">
                <span className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* =========================================================
          07 — Waitlist
         ========================================================= */}
      <Section id="apply" tone="base">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow>05 / Apply for early access</Eyebrow>
              <SectionHeadline className="mt-3">
                We let the first cohort in by hand.
              </SectionHeadline>
              <SectionLead>
                Six fields. We read every application. Workers accepted will be
                contacted within four weeks. Businesses with a real hire in mind
                are prioritised.
              </SectionLead>
              <ul className="mt-8 grid gap-3 text-caption text-ink-2">
                {positioning.is.slice(0, 4).map((item) => (
                  <li key={item}>{item}.</li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <form
                action="/waitlist"
                method="post"
                className="grid gap-5 border border-line bg-surface-1/50 p-8 lg:p-10"
              >
                {waitlistRows.map((field) => (
                  <label key={field.name} className="grid gap-2">
                    <span className="flex items-baseline justify-between font-mono text-caption text-ink-2">
                      <span>{field.label}</span>
                      <span className="text-ink-3">{field.required ? "required" : "optional"}</span>
                    </span>
                    {field.type === "textarea" ? (
                      <textarea
                        name={field.name}
                        required={field.required}
                        rows={4}
                        className="resize-y rounded-md border border-line bg-surface-0 px-4 py-3 text-body text-ink-0 placeholder:text-ink-3 focus:border-accent focus:outline-none"
                        placeholder={field.hint}
                      />
                    ) : (
                      <input
                        name={field.name}
                        type={field.type}
                        required={field.required}
                        className="h-12 rounded-md border border-line bg-surface-0 px-4 text-body text-ink-0 placeholder:text-ink-3 focus:border-accent focus:outline-none"
                      />
                    )}
                    {field.hint && field.type !== "textarea" && (
                      <span className="text-caption text-ink-3">{field.hint}</span>
                    )}
                  </label>
                ))}
                <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
                  <p className="max-w-[40ch] text-caption text-ink-3">
                    We never share applications. Your record on Vero belongs to you.
                  </p>
                  <button
                    type="submit"
                    className="btn-magnetic inline-flex h-12 items-center gap-2 rounded-pill bg-accent px-6 text-sm font-medium text-accent-ink hover:shadow-glow"
                  >
                    Submit application
                    <span aria-hidden>→</span>
                  </button>
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* =========================================================
          08 — Final close
         ========================================================= */}
      <Section tone="base">
        <div className="mx-auto max-w-[60ch] text-center">
          <Reveal>
            <p className="font-mono text-caption text-ink-2">{site.name} · pre-launch · Bengaluru</p>
            <h2 className="mt-6 font-display text-balance text-[clamp(2.25rem,4.4vw,3.5rem)] font-medium leading-[1.04] tracking-tighter text-ink-0">
              Work is becoming identity. Earn yours before everyone else does.
            </h2>
            <div className="mt-10 flex justify-center gap-3">
              <LinkButton href="/#apply" size="lg">
                Apply for early access
              </LinkButton>
              <LinkButton href="/manifesto" variant="secondary" size="lg">
                Read the manifesto
              </LinkButton>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}

/* =========================================================
   Local data
   ========================================================= */

const audienceCards = [
  {
    tag: "For professionals",
    title: "Designers, developers, writers, skilled trades.",
    body: "You have done real work. Now you can prove it — with a permanent, signed record that travels with you regardless of which platform you are on.",
    cta: "See how it works for you",
    href: "/for-professionals",
  },
  {
    tag: "For businesses",
    title: "Cafés, studios, SMBs, and growing teams.",
    body: "Stop screening people who might be lying. See a verified history of completed work, signed by real clients, before you make the first call.",
    cta: "See how it works for you",
    href: "/for-businesses",
  },
  {
    tag: "Solo clients",
    title: "One job. One person. Done right.",
    body: "Need a plumber, a designer, or a weekend helper? Hire from people who have a proven track record — not just a high rating on a platform you cannot trust.",
    cta: "Find verified help",
    href: "/for-businesses#solo",
  },
];

const briefSteps = [
  {
    title: "Verify once.",
    body: "Workers and businesses confirm their identity before they connect. No anonymous accounts.",
  },
  {
    title: "Do real work.",
    body: "Agree on scope, fund escrow if paid, complete the job. Nothing abstract — actual work, actual people.",
  },
  {
    title: "Both sides sign.",
    body: "When the job is done, both the worker and the client confirm it. The record is permanent and belongs to the worker.",
  },
];

type WaitlistRow = {
  name: string;
  label: string;
  type: "text" | "email" | "url" | "textarea";
  required: boolean;
  hint?: string;
};

const waitlistRows: WaitlistRow[] = [
  { name: "name", label: "Full name", type: "text", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "linkedin", label: "LinkedIn", type: "url", required: false },
  { name: "portfolio", label: "Portfolio / GitHub / X", type: "url", required: false },
  {
    name: "building",
    label: "What are you building or doing right now?",
    type: "textarea",
    required: true,
    hint: "Two sentences. Concrete is better than abstract.",
  },
  {
    name: "why",
    label: "Why should Vero choose you?",
    type: "textarea",
    required: true,
    hint: "One paragraph. Show, don't claim.",
  },
];
