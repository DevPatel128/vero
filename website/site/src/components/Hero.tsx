"use client";

import { motion, useReducedMotion } from "motion/react";
import { LinkButton } from "./Button";
import { Container } from "./Container";
import { RecordCard } from "./RecordCard";
import { PhoneMockup } from "./illustrations/PhoneMockup";
import { AmbientBackdrop } from "./illustrations/AmbientBackdrop";
import { site } from "@/lib/site";

const easeOut = [0.16, 1, 0.3, 1] as const;

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
    <section className="relative overflow-hidden pt-8 md:pt-12">
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
              transition={{ duration: 0.6, ease: easeOut }}
              className="group inline-flex items-center gap-2 rounded-full border border-ink-100 bg-paper/80 px-3 py-1 text-xs text-ink-600 backdrop-blur transition-colors hover:border-ink-200 hover:text-ink-900"
            >
              <span className="relative inline-flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-caution opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-caution" />
              </span>
              {site.launchCity} · {site.launchWindow} · TBA
              <span className="text-ink-400 transition-colors group-hover:text-accent">
                · follow our socials
              </span>
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
            </motion.a>

            <h1 className="mt-4 font-display text-5xl font-medium leading-[1.05] tracking-tighter text-ink-900 md:text-7xl">
              {["Proof", " ", "of", " ", "work."].map((word, i) => (
                <motion.span
                  key={i}
                  initial={reduce ? false : { opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.08 * i, ease: easeOut }}
                  className="inline-block"
                >
                  {word === " " ? " " : word}
                </motion.span>
              ))}
              <br />
              <motion.span
                initial={reduce ? false : { opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6, ease: easeOut }}
                className="inline-block text-ink-500"
              >
                Not posts about work.
              </motion.span>
            </h1>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.85, ease: easeOut }}
              className="mt-4 max-w-xl text-lg leading-relaxed text-ink-600"
            >
              {site.name} turns every job you complete into a verified record,
              signed by you and the person who hired you. Tamper-evident.
              Portable. Yours.
            </motion.p>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.0, ease: easeOut }}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <LinkButton href="/waitlist?as=professional" size="lg">
                Join as a professional
              </LinkButton>
              <LinkButton href="/waitlist?as=business" variant="secondary" size="lg">
                Hire on Vero
              </LinkButton>
            </motion.div>

            <motion.p
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="mt-6 text-xs text-ink-500"
            >
              Professionals join free. Always. No credit card.
            </motion.p>
          </div>

          <div className="relative lg:col-span-5">
            <div className="absolute -inset-x-8 -top-8 -bottom-12 -z-10 rounded-[2.5rem] bg-gradient-to-br from-paper-warm via-paper to-paper opacity-80" />

            {/* Phone mockup behind, cards floating in front - like a layered editorial composition */}
            <div className="relative">
              <div className="pointer-events-none absolute -right-6 top-4 hidden md:block">
                <PhoneMockup />
              </div>

              <div className="relative z-10 space-y-4 md:pr-32">
                {cards.map((card, i) => (
                  <motion.div
                    key={card.title}
                    initial={reduce ? false : { opacity: 0, x: 24, y: 8 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.5 + i * 0.12,
                      ease: easeOut,
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

