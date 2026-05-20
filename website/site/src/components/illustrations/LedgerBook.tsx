"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

/**
 * LedgerBook — an open book with signed pages turning. Editorial, calm.
 */
export function LedgerBook({ className }: { className?: string }) {
  const reduce = useReducedMotion() ?? false;
  return (
    <div className={cn("w-full", className)}>
      <svg
        viewBox="0 0 720 420"
        className="h-auto w-full"
        role="img"
        aria-label="A ledger of signed records"
      >
        <defs>
          <linearGradient id="leather" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2c2c2a" />
            <stop offset="100%" stopColor="#0f0f0e" />
          </linearGradient>
          <linearGradient id="paperL" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fafaf7" />
            <stop offset="100%" stopColor="#eeeeea" />
          </linearGradient>
        </defs>

        {/* Book base */}
        <rect x="40" y="56" width="640" height="320" rx="12" fill="url(#leather)" />
        <rect x="60" y="76" width="600" height="280" rx="6" fill="url(#paperL)" />
        <line x1="360" y1="76" x2="360" y2="356" stroke="#dcdcd4" strokeWidth="1" />

        {/* Left page entries */}
        <motion.g
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          {[0, 1, 2, 3].map((i) => (
            <motion.g
              key={i}
              initial={reduce ? false : { x: -10, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.15 * i, ease: [0.16, 1, 0.3, 1] }}
            >
              <line
                x1="80"
                y1={120 + i * 56}
                x2="340"
                y2={120 + i * 56}
                stroke="#dcdcd4"
              />
              <text
                x="80"
                y={114 + i * 56}
                fontSize="9"
                letterSpacing="1.5"
                fill="#878780"
                fontFamily="ui-sans-serif, system-ui"
              >
                {["APPRENTICESHIP", "REPAIR", "DESIGN", "SHIFT"][i]}
              </text>
              <text
                x="80"
                y={136 + i * 56}
                fontSize="12"
                fontFamily="ui-serif, Georgia, serif"
                fill="#0f0f0e"
                fontWeight="500"
              >
                {[
                  "Two weeks · Third Wave",
                  "Tap · Koramangala",
                  "Menu · Sarjapur",
                  "Open · Indiranagar",
                ][i]}
              </text>
              <text
                x="338"
                y={134 + i * 56}
                textAnchor="end"
                fontSize="9"
                fill="#5b5b56"
                fontFamily="ui-monospace, monospace"
              >
                #{(0x12 + i).toString(16)}…
              </text>
            </motion.g>
          ))}
        </motion.g>

        {/* Right page — current open record with signatures */}
        <motion.g
          initial={reduce ? false : { opacity: 0, rotateY: -25 }}
          whileInView={{ opacity: 1, rotateY: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: "360px 216px", perspective: 1000 }}
        >
          <text
            x="396"
            y="116"
            fontSize="9"
            letterSpacing="2"
            fill="#5b5b56"
            fontFamily="ui-sans-serif, system-ui"
          >
            RECORD · 16 MAY 2026
          </text>
          <text
            x="396"
            y="156"
            fontSize="22"
            fontFamily="ui-serif, Georgia, serif"
            fill="#0f0f0e"
            fontWeight="500"
          >
            Two weeks at
          </text>
          <text
            x="396"
            y="184"
            fontSize="22"
            fontFamily="ui-serif, Georgia, serif"
            fill="#0f0f0e"
            fontWeight="500"
          >
            Third Wave, Whitefield
          </text>
          <text
            x="396"
            y="220"
            fontSize="11"
            fill="#5b5b56"
            fontFamily="ui-sans-serif, system-ui"
          >
            14 shifts · 0 missed · ₹4,800 released
          </text>

          {/* Signatures */}
          <text
            x="396"
            y="268"
            fontSize="9"
            letterSpacing="2"
            fill="#878780"
            fontFamily="ui-sans-serif, system-ui"
          >
            BOTH SIGNED
          </text>
          <motion.path
            d="M 396 296 C 416 286, 432 308, 450 296 S 482 290, 498 304 L 540 296"
            stroke="#1f3a2e"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            initial={reduce ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, delay: 0.6 }}
          />
          <motion.path
            d="M 396 326 C 410 318, 426 336, 442 326 S 472 322, 484 332 L 528 326"
            stroke="#3d7a5d"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            initial={reduce ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, delay: 0.9 }}
          />
          <text
            x="396"
            y="320"
            fontSize="9"
            fill="#878780"
            fontFamily="ui-sans-serif, system-ui"
          >
            Anita R.
          </text>
          <text
            x="396"
            y="350"
            fontSize="9"
            fill="#878780"
            fontFamily="ui-sans-serif, system-ui"
          >
            Sanjay K.
          </text>

          {/* Wax seal */}
          <motion.g
            initial={reduce ? false : { scale: 0, rotate: -20 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "600px 320px" }}
          >
            <circle cx="600" cy="320" r="28" fill="#0e4a36" />
            <circle cx="600" cy="320" r="22" fill="none" stroke="#3d7a5d" strokeWidth="1" />
            <text
              x="600"
              y="324"
              textAnchor="middle"
              fontSize="10"
              fontFamily="ui-serif, Georgia, serif"
              fill="#fafaf7"
              fontWeight="600"
              letterSpacing="1"
            >
              VERO
            </text>
          </motion.g>
        </motion.g>

        {/* Spine threads */}
        <g stroke="#3d7a5d" strokeOpacity="0.5">
          <line x1="358" y1="80" x2="362" y2="80" />
          <line x1="358" y1="120" x2="362" y2="120" />
          <line x1="358" y1="160" x2="362" y2="160" />
          <line x1="358" y1="200" x2="362" y2="200" />
          <line x1="358" y1="240" x2="362" y2="240" />
          <line x1="358" y1="280" x2="362" y2="280" />
          <line x1="358" y1="320" x2="362" y2="320" />
        </g>
      </svg>
    </div>
  );
}
