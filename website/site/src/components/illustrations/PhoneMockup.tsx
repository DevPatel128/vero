"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

/**
 * PhoneMockup
 *
 * A hand-drawn-feeling mobile mockup of the Vero app — a record card on a
 * trust-shell home screen. Pure SVG so it scales and stays sharp.
 */
export function PhoneMockup({
  className,
  variant = "record",
}: {
  className?: string;
  variant?: "record" | "feed" | "verify";
}) {
  const reduce = useReducedMotion() ?? false;

  return (
    <div className={cn("relative", className)}>
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 12, rotate: -2 }}
        whileInView={{ opacity: 1, y: 0, rotate: -1.5 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        <svg
          viewBox="0 0 320 640"
          className="h-auto w-full max-w-[260px] drop-shadow-[0_30px_60px_rgba(15,15,14,0.18)]"
          role="img"
          aria-label="Vero mobile app preview"
        >
          <defs>
            <linearGradient id="phoneFrame" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1c1c1b" />
              <stop offset="100%" stopColor="#070706" />
            </linearGradient>
            <linearGradient id="phoneScreen" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fafaf7" />
              <stop offset="100%" stopColor="#f3f1ec" />
            </linearGradient>
          </defs>

          {/* Frame */}
          <rect
            x="6"
            y="6"
            width="308"
            height="628"
            rx="46"
            fill="url(#phoneFrame)"
          />
          <rect
            x="14"
            y="14"
            width="292"
            height="612"
            rx="40"
            fill="url(#phoneScreen)"
          />

          {/* Notch */}
          <rect x="124" y="20" width="72" height="22" rx="11" fill="#070706" />

          {/* Status bar */}
          <text
            x="34"
            y="62"
            fontSize="11"
            fontFamily="ui-sans-serif, system-ui"
            fill="#3f3f3c"
            fontWeight="600"
          >
            9:41
          </text>
          <g transform="translate(252, 50)">
            <rect x="0" y="0" width="20" height="11" rx="2" fill="#3f3f3c" />
            <rect x="22" y="2" width="2" height="7" rx="1" fill="#3f3f3c" />
          </g>

          {/* Header */}
          <text
            x="34"
            y="106"
            fontSize="11"
            fontFamily="ui-sans-serif, system-ui"
            fill="#878780"
            letterSpacing="2.5"
          >
            VERO
          </text>
          <text
            x="34"
            y="138"
            fontSize="22"
            fontFamily="ui-serif, Georgia, serif"
            fill="#0f0f0e"
            fontWeight="500"
            letterSpacing="-0.5"
          >
            Your records
          </text>

          {/* Record card 1 — animated draw */}
          <motion.g
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <rect
              x="26"
              y="162"
              width="268"
              height="142"
              rx="18"
              fill="#fafaf7"
              stroke="#eeeeea"
            />
            <rect x="40" y="178" width="74" height="18" rx="9" fill="#f3f1ec" />
            <text
              x="48"
              y="190"
              fontSize="8"
              letterSpacing="1.5"
              fill="#5b5b56"
              fontFamily="ui-sans-serif, system-ui"
            >
              APPRENTICESHIP
            </text>
            {/* verified badge */}
            <g transform="translate(244, 178)">
              <circle r="9" fill="#0e4a36" cx="9" cy="9" />
              <path
                d="M 5 9 L 8 12 L 13 6"
                stroke="#fafaf7"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </g>
            <text
              x="40"
              y="226"
              fontSize="13"
              fontFamily="ui-serif, Georgia, serif"
              fill="#0f0f0e"
              fontWeight="500"
            >
              Two weeks at Third Wave
            </text>
            <text
              x="40"
              y="244"
              fontSize="13"
              fontFamily="ui-serif, Georgia, serif"
              fill="#0f0f0e"
              fontWeight="500"
            >
              Coffee, Whitefield
            </text>
            <text
              x="40"
              y="268"
              fontSize="10"
              fill="#878780"
              fontFamily="ui-sans-serif, system-ui"
            >
              Verified by Anita R.
            </text>
            <text
              x="40"
              y="284"
              fontSize="10"
              fill="#878780"
              fontFamily="ui-sans-serif, system-ui"
            >
              14 shifts · 0 missed
            </text>

            {/* signers */}
            <g>
              <circle cx="240" cy="278" r="9" fill="#1c1c1b" />
              <text
                x="240"
                y="282"
                textAnchor="middle"
                fontSize="8"
                fill="#fafaf7"
                fontWeight="600"
              >
                AR
              </text>
              <circle cx="258" cy="278" r="9" fill="#2c5743" stroke="#fafaf7" strokeWidth="1.5" />
              <text
                x="258"
                y="282"
                textAnchor="middle"
                fontSize="8"
                fill="#fafaf7"
                fontWeight="600"
              >
                SK
              </text>
            </g>
          </motion.g>

          {/* Record card 2 */}
          <motion.g
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <rect
              x="26"
              y="320"
              width="268"
              height="120"
              rx="18"
              fill="#fafaf7"
              stroke="#eeeeea"
            />
            <rect x="40" y="336" width="60" height="18" rx="9" fill="#f3f1ec" />
            <text
              x="48"
              y="348"
              fontSize="8"
              letterSpacing="1.5"
              fill="#5b5b56"
              fontFamily="ui-sans-serif, system-ui"
            >
              REPAIR
            </text>
            <g transform="translate(244, 336)">
              <circle r="9" fill="#0e4a36" cx="9" cy="9" />
              <path
                d="M 5 9 L 8 12 L 13 6"
                stroke="#fafaf7"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </g>
            <text
              x="40"
              y="382"
              fontSize="13"
              fontFamily="ui-serif, Georgia, serif"
              fill="#0f0f0e"
              fontWeight="500"
            >
              Plumbing · HSR Layout
            </text>
            <text
              x="40"
              y="408"
              fontSize="10"
              fill="#878780"
              fontFamily="ui-sans-serif, system-ui"
            >
              Escrow released · example
            </text>
            <text
              x="40"
              y="424"
              fontSize="9"
              fill="#878780"
              fontFamily="ui-monospace, monospace"
            >
              signed · chained
            </text>
          </motion.g>

          {/* Standing card */}
          <motion.g
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <rect
              x="26"
              y="456"
              width="268"
              height="108"
              rx="18"
              fill="#1c1c1b"
            />
            <text
              x="40"
              y="478"
              fontSize="9"
              letterSpacing="2"
              fill="#3d7a5d"
              fontFamily="ui-sans-serif, system-ui"
            >
              STANDING
            </text>
            <text
              x="40"
              y="510"
              fontSize="26"
              fontFamily="ui-serif, Georgia, serif"
              fill="#fafaf7"
              fontWeight="500"
            >
              4 records
            </text>
            <text
              x="40"
              y="530"
              fontSize="10"
              fill="#b8b8ad"
              fontFamily="ui-sans-serif, system-ui"
            >
              100% completion · 0 disputes
            </text>
            {/* mini bars */}
            <g transform="translate(40, 542)">
              <rect width="40" height="6" rx="3" fill="#3d7a5d" />
              <rect x="44" width="32" height="6" rx="3" fill="#2c5743" />
              <rect x="80" width="24" height="6" rx="3" fill="#1f3a2e" />
              <rect x="108" width="16" height="6" rx="3" fill="#3f3f3c" />
            </g>
          </motion.g>

          {/* Home indicator */}
          <rect x="130" y="608" width="60" height="4" rx="2" fill="#1c1c1b" />
        </svg>
      </motion.div>
    </div>
  );
}
