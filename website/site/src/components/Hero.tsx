"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ExecutionGraph } from "./illustrations/ExecutionGraph";
import { site } from "@/lib/site";

const ease = [0.16, 1, 0.3, 1] as const;

const ctas = [
  { label: "Apply for early access", href: "/#apply", primary: true },
  { label: "Explore the vision", href: "/manifesto" },
  { label: "For businesses", href: "/businesses" },
  { label: "For investors", href: "/investors" },
];

const proofPoints = [
  { tag: "01", text: "Both sides sign every record." },
  { tag: "02", text: "Records chain by hash. History cannot be edited." },
  { tag: "03", text: "Standing compounds across briefs, not stars." },
];

export function Hero() {
  const reduce = useReducedMotion() ?? false;

  return (
    <section
      className="relative isolate overflow-hidden border-b border-line-faint"
      aria-labelledby="hero-heading"
    >
      {/* ambient grid — soft, decorative */}
      <div className="hairline-grid pointer-events-none absolute inset-0 -z-10" aria-hidden />

      {/* graph in background — anchored right, breaking out of the column */}
      <div
        className="pointer-events-none absolute right-[-12%] top-1/2 hidden w-[68%] -translate-y-1/2 opacity-90 lg:block"
        aria-hidden
      >
        <ExecutionGraph />
      </div>

      <div className="mx-auto max-w-content px-5 pb-20 pt-24 sm:px-8 md:pt-28 lg:pb-32 lg:pt-36">
        <div className="grid items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            {/* status chip */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="inline-flex items-center gap-2.5 rounded-pill border border-line bg-surface-1/60 px-3 py-1.5 text-micro font-mono text-ink-1 backdrop-blur-sm"
            >
              <span className="relative inline-flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              <span className="tracking-[0.04em]">{site.launchStatus}</span>
              <span className="text-ink-3">·</span>
              <span className="text-ink-2">{site.cohort}</span>
            </motion.div>

            {/* H1 — two opposed lines, the second carries the brand */}
            <h1
              id="hero-heading"
              className="mt-7 max-w-[18ch] font-display text-balance text-[clamp(2.75rem,6.4vw+0.5rem,7rem)] font-medium leading-[0.94] tracking-tighter text-ink-0"
            >
              <motion.span
                initial={reduce ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.05, ease }}
                className="block text-ink-2"
              >
                LinkedIn shows claims.
              </motion.span>
              <motion.span
                initial={reduce ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.22, ease }}
                className="block text-ink-0"
              >
                VERO shows proof.
              </motion.span>
            </h1>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease }}
              className="mt-7 max-w-[42ch] text-lead leading-relaxed text-ink-1"
            >
              VERO Freelance is a verified proof-of-work network for ambitious operators
              and the clients who need to hire them. Identity is earned through real
              engagements, signed on both sides, and chained on a record nobody owns
              alone.
            </motion.p>

            {/* CTAs — magnetic, varied weight; primary first */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6, ease }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              {ctas.map((cta) =>
                cta.primary ? (
                  <Link
                    key={cta.href}
                    href={cta.href}
                    className="btn-magnetic inline-flex h-12 items-center gap-2 rounded-pill bg-accent px-6 text-sm font-medium text-accent-ink hover:shadow-glow"
                  >
                    {cta.label}
                    <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
                  </Link>
                ) : (
                  <Link
                    key={cta.href}
                    href={cta.href}
                    className="btn-magnetic inline-flex h-12 items-center gap-2 rounded-pill border border-line bg-surface-1/50 px-5 text-sm font-medium text-ink-1 hover:border-line-strong hover:text-ink-0"
                  >
                    {cta.label}
                  </Link>
                ),
              )}
            </motion.div>

            {/* Three short proof statements — replaces the SaaS hero-metric strip */}
            <motion.ul
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.95 }}
              className="mt-14 grid gap-4 border-t border-line-faint pt-7 sm:grid-cols-3"
            >
              {proofPoints.map((p, i) => (
                <motion.li
                  key={p.tag}
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 1.0 + i * 0.08, ease }}
                  className="flex gap-3 text-sm leading-snug text-ink-1"
                >
                  <span className="shrink-0 font-mono text-micro text-accent">{p.tag}</span>
                  <span className="text-pretty">{p.text}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* mobile / tablet: render graph in-flow */}
          <div className="lg:hidden">
            <div className="relative aspect-[6/4.2] w-full">
              <ExecutionGraph className="absolute inset-0" />
            </div>
          </div>
        </div>
      </div>

      {/* hairline rail at bottom of hero — sets infrastructural tone */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-line-faint" aria-hidden />
    </section>
  );
}
