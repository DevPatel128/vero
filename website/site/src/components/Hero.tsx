"use client";

import { motion, useReducedMotion } from "motion/react";
import { Container } from "./Container";
import { RecordCard } from "./RecordCard";
import { PhoneMockup } from "./illustrations/PhoneMockup";
import { AmbientBackdrop } from "./illustrations/AmbientBackdrop";
import { InlineEmailForm } from "./InlineEmailForm";
import { site } from "@/lib/site";

const appleEase = [0.32, 0.72, 0, 1] as const;

const cards = [
  {
    className: "ml-auto max-w-sm",
    category: "Apprenticeship",
    title: "Two weeks assisting at Third Wave Coffee, Whitefield",
    verifier: "Verified by Anita R., shift lead",
    date: "May 2026",
    signers: [
      { initials: "AR", role: "Verifier" },
      { initials: "SK", role: "Subject" },
    ],
    metric: { value: "14 shifts", label: "Punctual · 0 missed" },
  },
  {
    className: "mr-auto max-w-sm",
    category: "Home service",
    title: "Plumbing repair · HSR Layout · 2BHK",
    verifier: "Verified by Mrs. Iyer",
    date: "May 2026",
    signers: [
      { initials: "PI", role: "Client" },
      { initials: "RM", role: "Professional" },
    ],
  },
  {
    className: "ml-auto max-w-sm",
    category: "Design",
    title: "Logo refresh for Sarjapur bakery",
    verifier: "Verified by Bake & Co.",
    date: "April 2026",
    signers: [
      { initials: "BC", role: "Client" },
      { initials: "JD", role: "Professional" },
    ],
    metric: { value: "₹4,800", label: "Released from escrow" },
  },
];

export function Hero() {
  const reduce = useReducedMotion() ?? false;

  return (
    <section className="hero">
      <AmbientBackdrop />
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <motion.a
              href={site.social.x}
              target="_blank"
              rel="noopener noreferrer"
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: appleEase }}
              className="group inline-flex items-center gap-2 rounded-full border border-ink-100 bg-paper/80 px-3 py-1 text-xs text-ink-700 backdrop-blur transition-colors hover:border-ink-200 hover:text-ink-900"
            >
              <span className="relative inline-flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-caution opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-caution" />
              </span>
              {site.launchCity} Early Access · Launching {site.launchWindow}
              <span className="text-ink-500 transition-colors group-hover:text-accent">
                · follow our socials
              </span>
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
            </motion.a>

            <h1 className="mt-4 font-display text-5xl font-medium leading-[1.05] tracking-tightest text-ink-900 md:text-7xl">
              <motion.span
                initial={reduce ? false : { opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.08, ease: appleEase }}
                className="inline-block"
              >
                The resume is dead.
              </motion.span>
              <br />
              <motion.span
                initial={reduce ? false : { opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6, ease: appleEase }}
                className="inline-block text-ink-700"
              >
                Your verified work is your new portfolio.
              </motion.span>
            </h1>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.85, ease: appleEase }}
              className="mt-4 max-w-xl text-lg leading-relaxed text-ink-700"
            >
              {site.name} turns every job you finish into an un-fakeable record,
              signed by your client. No bidding wars. No fake reviews. Just
              proof of what you can do.
            </motion.p>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.0, ease: appleEase }}
            >
              <InlineEmailForm />
            </motion.div>
          </div>

          <div className="relative lg:col-span-5">
            <div className="absolute -inset-x-8 -top-8 -bottom-12 -z-10 rounded-[2.5rem] bg-gradient-to-br from-paper-warm via-paper to-paper opacity-80" />

            <div className="relative">
              <div className="phone-glow hidden md:block" />
              <div className="phone-wrapper hidden md:block">
                <PhoneMockup />
              </div>

              <div className="relative z-10 flex snap-x snap-mandatory overflow-x-auto pb-8 pt-4 md:block md:space-y-4 md:overflow-visible md:pb-0 md:pt-0 md:pr-32 no-scrollbar -mx-6 px-6 md:mx-0 md:px-0">
                {cards.map((card, i) => (
                  <motion.div
                    key={card.title}
                    className="w-[85vw] shrink-0 snap-center pr-4 md:w-auto md:shrink md:pr-0"
                    initial={reduce ? false : { opacity: 0, x: 24, y: 8 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.5 + i * 0.12,
                      ease: appleEase,
                    }}
                    whileHover={reduce ? undefined : { y: -4 }}
                  >
                    <RecordCard {...card} />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
