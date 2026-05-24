import { Hero } from "@/components/Hero";
import { Section, Eyebrow, SectionHeadline, SectionLead } from "@/components/Section";
import { LinkButton } from "@/components/Button";
import { site, sections as copy, paths, positioning, waitlistFields } from "@/lib/site";
import Link from "next/link";
import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Marquee } from "@/components/motion/Marquee";

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
          02 — Why current systems fail
          Asymmetric: heading column anchors left, list reads right.
          No boxes. Hairlines between items.
         ========================================================= */}
      <Section id="problem" tone="base" rule="bottom">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <Eyebrow>{copy.problem.eyebrow}</Eyebrow>
              <SectionHeadline className="mt-3">{copy.problem.headline}</SectionHeadline>
              <SectionLead>
                The world hires on documents the candidate wrote, conversations no one
                recorded, and platforms that grade the wrong thing. The shape of the
                problem is not new. The instruments are.
              </SectionLead>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <Stagger as="ul" className="border-t border-line-faint">
              {copy.problem.items.map((p, i) => (
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
          03 — How VERO works
          Six steps, varied scale, intentional staircase rhythm.
         ========================================================= */}
      <Section id="how-it-works" tone="raised" rule="bottom">
        <div className="max-w-[64ch]">
          <Reveal>
            <Eyebrow>{copy.how.eyebrow}</Eyebrow>
            <SectionHeadline className="mt-3">{copy.how.headline}</SectionHeadline>
            <SectionLead>
              Each step is signed. No step assumes the next. A record only exists when
              both parties commit it, and once committed it cannot be quietly edited.
            </SectionLead>
          </Reveal>
        </div>

        <Stagger as="ol" className="mt-20 grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
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

      {/* =========================================================
          04 — Trust + Verification (the moat)
          Big statement, then six pillars in unequal grid.
         ========================================================= */}
      <Section id="trust" tone="base" rule="bottom">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>{copy.trust.eyebrow}</Eyebrow>
              <SectionHeadline className="mt-3" size="h1">
                {copy.trust.headline}
              </SectionHeadline>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <p className="text-lead text-ink-1">
                The system is engineered so identity, work, and money each leave a signed
                trace. Nobody can mint history alone — not a client, not an operator, not
                the platform.
              </p>
              <p className="mt-4 font-editorial text-h6 italic text-accent">
                &ldquo;Proof matters more than presentation.&rdquo;
              </p>
            </Reveal>
          </div>
        </div>

        <Stagger
          as="ul"
          className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          stagger={0.06}
        >
          {copy.trust.pillars.map((p, i) => (
            <StaggerItem
              as="li"
              key={p.title}
              className="group relative border border-line bg-surface-1/50 p-7 transition-colors duration-reveal hover:border-line-strong"
            >
              <span className="font-mono text-micro text-ink-3">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 font-display text-h6 font-medium leading-tight tracking-tightish text-ink-0">
                {p.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-1">{p.body}</p>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.1} className="mt-14 flex items-center gap-3 text-caption text-ink-2">
          <span className="sig-glyph">W</span>
          <span>worker signature</span>
          <span className="mx-3 text-ink-3">·</span>
          <span className="sig-glyph">C</span>
          <span>client signature</span>
          <span className="mx-3 text-ink-3">·</span>
          <span className="font-mono">both required, every record</span>
        </Reveal>
      </Section>

      {/* =========================================================
          05 — Proof-of-Work Identity
          Split: editorial left, visual right (profile card mock).
         ========================================================= */}
      <Section id="identity" tone="raised" rule="bottom">
        <div className="grid items-start gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal>
              <Eyebrow>{copy.identity.eyebrow}</Eyebrow>
              <SectionHeadline className="mt-3">{copy.identity.headline}</SectionHeadline>
              <SectionLead>
                A VERO profile is built from what has been done, not what has been claimed.
                Operators carry their record across categories and across platforms speaking
                the ALVED protocol. Nobody can quietly take it away.
              </SectionLead>
            </Reveal>

            <Stagger as="ul" className="mt-12 grid gap-y-5">
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

          <div className="lg:col-span-6">
            <Reveal delay={0.15}>
              <ProfileMockup />
            </Reveal>
          </div>
        </div>
      </Section>

      {/* =========================================================
          06 — Career + Freelance Paths
          Single-line marquee strip. Categories framed as ladders.
         ========================================================= */}
      <Section id="paths" tone="base" rule="bottom" containerClassName="px-0 sm:px-0">
        <div className="mx-auto max-w-content px-5 sm:px-8">
          <Reveal>
            <div className="grid items-end gap-6 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <Eyebrow>05 / Where execution compounds</Eyebrow>
                <SectionHeadline className="mt-3">
                  Ten launch categories. Each one a reputation ladder.
                </SectionHeadline>
              </div>
              <div className="lg:col-span-4">
                <p className="text-body text-ink-1">
                  Paths are entry points, not silos. Trust accrued in one category counts
                  toward the next. Operators specialise. Records travel with them.
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-16">
          <Marquee duration={48}>
            {paths.map((p) => (
              <div
                key={p.slug}
                className="flex w-72 shrink-0 flex-col justify-between gap-8 border-l border-line-faint py-3 pl-6"
              >
                <span className="font-mono text-micro text-ink-3">/{p.slug}</span>
                <span className="font-display text-h4 font-medium leading-none tracking-tightish text-ink-0">
                  {p.label}
                </span>
              </div>
            ))}
          </Marquee>
        </div>
      </Section>

      {/* =========================================================
          07 — AI + Execution Layer
          Narrow editorial column. List with hairlines.
         ========================================================= */}
      <Section id="ai" tone="raised" rule="bottom">
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
                  <span className="font-mono text-caption text-ink-2">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="max-w-[58ch] text-body text-ink-1">{cap}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </Section>

      {/* =========================================================
          08 — Manifesto teaser
          Drench-quiet treatment. One editorial pull quote.
         ========================================================= */}
      <Section tone="inverse">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-9">
            <Reveal>
              <Eyebrow className="text-ink-inverse/60">07 / Manifesto</Eyebrow>
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
          09 / 10 — Audience portals: Businesses + Investors
          Two split panels, deliberately unequal weights.
         ========================================================= */}
      <Section id="audiences" tone="base" rule="bottom">
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Businesses — larger, inverse */}
          <Link
            href="/businesses"
            className="group relative overflow-hidden border border-line-strong bg-surface-inverse p-10 transition-colors hover:border-accent lg:col-span-7 lg:p-14"
          >
            <div className="flex items-center gap-2">
              <span className="font-mono text-micro text-accent">08 / For businesses</span>
            </div>
            <h3 className="mt-6 max-w-[20ch] font-display text-h2 font-medium leading-[1.04] tracking-tighter text-ink-inverse">
              Hire from a pool whose history is already proof.
            </h3>
            <p className="mt-6 max-w-[48ch] text-lead text-ink-inverse/75">
              Stop screening unverified candidates. See execution history before the
              first interview. Access operators whose record is signed by the people
              who hired them last.
            </p>
            <span className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-accent transition-transform group-hover:translate-x-1">
              Read for businesses
              <span aria-hidden>→</span>
            </span>
          </Link>

          {/* Investors — quieter, light-on-dark hairline */}
          <Link
            href="/investors"
            className="group relative overflow-hidden border border-line bg-surface-1 p-10 transition-colors hover:border-line-strong lg:col-span-5 lg:p-14"
          >
            <span className="font-mono text-micro text-ink-3">09 / For investors</span>
            <h3 className="mt-6 max-w-[18ch] font-display text-h2 font-medium leading-[1.04] tracking-tighter text-ink-0">
              An infrastructure category, not a marketplace.
            </h3>
            <p className="mt-6 max-w-[42ch] text-body text-ink-1">
              Proof-of-work as portable identity. Trust as a behavioural moat. Verified
              execution as the data layer underneath the next decade of work.
            </p>
            <span className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-ink-0 transition-transform group-hover:translate-x-1">
              Schedule a founder conversation
              <span aria-hidden>→</span>
            </span>
          </Link>
        </div>
      </Section>

      {/* =========================================================
          11 — Research / Insights teaser
          Three editorial essay teases, varied widths.
         ========================================================= */}
      <Section id="research" tone="raised" rule="bottom">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>10 / Research and insights</Eyebrow>
              <SectionHeadline className="mt-3">
                Essays on the workforce being rebuilt around proof.
              </SectionHeadline>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <p className="text-body text-ink-1">
                Long-form research on the future of work, reputation systems, hiring
                failure modes, and the apprenticeship economy. Published quarterly.
              </p>
              <LinkButton href="/research" variant="secondary" className="mt-6">
                Read research
              </LinkButton>
            </Reveal>
          </div>
        </div>

        <Stagger as="ul" className="mt-16 grid gap-6 md:grid-cols-3">
          {[
            {
              tag: "Future of work",
              title: "Why the resume is the last document anyone reads.",
              read: "12 min",
            },
            {
              tag: "Reputation infrastructure",
              title: "Portable trust: what cryptographic signatures finally enable.",
              read: "9 min",
            },
            {
              tag: "Gen Z labor",
              title: "The high-agency generation hires itself out of order.",
              read: "11 min",
            },
          ].map((essay, i) => (
            <StaggerItem
              key={essay.title}
              as="li"
              className={i === 0 ? "md:col-span-2" : ""}
            >
              <article className="group flex h-full flex-col justify-between border border-line bg-surface-0 p-8 transition-colors hover:border-line-strong"
              >
                <div>
                  <span className="font-mono text-micro text-ink-3">{essay.tag}</span>
                  <h3 className="mt-5 font-display text-h5 font-medium leading-snug tracking-tightish text-ink-0">
                    {essay.title}
                  </h3>
                </div>
                <div className="mt-10 flex items-center justify-between text-caption text-ink-2">
                  <span>{essay.read} read</span>
                  <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* =========================================================
          12 — Waitlist (selective)
         ========================================================= */}
      <Section id="apply" tone="base">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow>11 / Apply for early access</Eyebrow>
              <SectionHeadline className="mt-3">
                We let the first cohort in by hand.
              </SectionHeadline>
              <SectionLead>
                Six fields. No marketing form. We read every application. Operators we
                accept will be contacted within four weeks. Clients with a real
                engagement in mind are prioritised.
              </SectionLead>
              <ul className="mt-8 grid gap-3 text-caption text-ink-2">
                <li>{positioning.is[0]}.</li>
                <li>{positioning.is[1]}.</li>
                <li>{positioning.is[2]}.</li>
                <li>{positioning.is[3]}.</li>
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
                {waitlistFields.map((field) => (
                  <label key={field.name} className="grid gap-2">
                    <span className="flex items-baseline justify-between font-mono text-caption text-ink-2">
                      <span>{field.label}</span>
                      <span className="text-ink-3">
                        {field.required ? "required" : "optional"}
                      </span>
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
                    We never share applications. Records you eventually build on VERO
                    belong to you.
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
          13 — Security ribbon
          Quiet single strip. Eight terms inline.
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
          14 — Final close
         ========================================================= */}
      <Section tone="base">
        <div className="mx-auto max-w-[60ch] text-center">
          <Reveal>
            <p className="font-mono text-caption text-ink-2">{site.name} · ALVED · pre-launch</p>
            <h2 className="mt-6 font-display text-balance text-[clamp(2.25rem,4.4vw,3.5rem)] font-medium leading-[1.04] tracking-tighter text-ink-0">
              Work is becoming identity. Earn it before everyone else does.
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
   Local component — profile mockup for section 05
   Pure SVG/HTML, no images, no external assets.
   ========================================================= */

function ProfileMockup() {
  const records = [
    { tag: "developer", title: "Ledger-backed payments adapter", verifier: "client + reviewer", n: "11.842" },
    { tag: "operator", title: "Marketplace operations sprint", verifier: "founder + ops lead", n: "11.781" },
    { tag: "designer", title: "Verification flow visual system", verifier: "design lead + cofounder", n: "11.704" },
  ];

  return (
    <div className="relative" aria-hidden>
      <div
        className="relative overflow-hidden border border-line bg-surface-0 p-7 shadow-lift"
        style={{ borderRadius: "22px" }}
      >
        {/* Profile header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="grid h-10 w-10 place-items-center rounded-pill border border-accent-glow bg-surface-1 font-mono text-caption text-accent"
              aria-hidden
            >
              MK
            </div>
            <div>
              <p className="font-display text-h6 font-medium tracking-tightish text-ink-0">
                M. Krishnan
              </p>
              <p className="font-mono text-micro text-ink-3">/operator · 47 verified records</p>
            </div>
          </div>
          <span className="rounded-pill border border-accent-glow bg-accent/10 px-2.5 py-1 font-mono text-micro text-accent">
            verified
          </span>
        </div>

        {/* Standing dial */}
        <div className="mt-7 grid grid-cols-3 gap-3">
          {["show-up", "on-time", "repeat clients"].map((label, i) => (
            <div key={label} className="rounded-md border border-line-faint p-3">
              <div className="h-1 rounded-pill bg-surface-2">
                <div
                  className="h-1 rounded-pill bg-accent"
                  style={{ width: `${88 + i * 3}%` }}
                />
              </div>
              <p className="mt-2 font-mono text-micro text-ink-3">{label}</p>
            </div>
          ))}
        </div>

        {/* Records */}
        <ul className="mt-6 grid gap-3">
          {records.map((r) => (
            <li
              key={r.n}
              className="grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-md border border-line-faint bg-surface-1/40 px-4 py-3"
            >
              <span className="grid h-7 w-7 place-items-center rounded-pill border border-accent-glow text-accent" aria-hidden>
                <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path d="M2.5 6.5l2.5 2.5L9.5 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <div>
                <p className="text-sm font-medium text-ink-0">{r.title}</p>
                <p className="font-mono text-micro text-ink-3">signed · {r.verifier}</p>
              </div>
              <span className="font-mono text-micro text-ink-2">#{r.n}</span>
            </li>
          ))}
        </ul>

        {/* Hash chain */}
        <div className="mt-6 flex items-center gap-2 font-mono text-micro text-ink-3">
          <span>chain</span>
          <span className="h-px flex-1 bg-line-faint" aria-hidden />
          <span>2f81…a04d</span>
          <span className="text-accent">→</span>
          <span>be32…7e10</span>
          <span className="text-accent">→</span>
          <span>{records[0].n.slice(-4)}…</span>
        </div>
      </div>

      {/* Floating overlay record — depth */}
      <div
        className="absolute -bottom-6 -right-2 hidden w-72 border border-line bg-surface-1 p-5 shadow-lift sm:block"
        style={{ borderRadius: "16px" }}
      >
        <p className="font-mono text-micro text-ink-3">latest signature</p>
        <p className="mt-2 text-sm font-medium text-ink-0">
          Hash-anchored to ALVED ledger
        </p>
        <p className="mt-3 font-mono text-micro text-accent">
          0x9c4f · 2026-05-19T14:08
        </p>
      </div>
    </div>
  );
}
