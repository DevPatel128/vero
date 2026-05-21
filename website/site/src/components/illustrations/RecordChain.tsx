"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

/**
 * RecordChain
 *
 * Linked records, each signed by both parties and chained to the one before
 * it. Renders left-to-right at desktop, vertical on small screens.
 */
export function RecordChain({ className }: { className?: string }) {
  const reduce = useReducedMotion() ?? false;

  const records = [
    { c: "Apprenticeship", t: "Two weeks · Third Wave", d: "May" },
    { c: "Repair", t: "Plumbing · HSR", d: "May" },
    { c: "Design", t: "Logo · Sarjapur", d: "Apr" },
    { c: "Shift", t: "Café open · Indiranagar", d: "Apr" },
  ];

  return (
    <div className={cn("w-full", className)}>
      <svg
        viewBox="0 0 920 220"
        className="h-auto w-full"
        role="img"
        aria-label="A chain of signed records, each linked to the one before"
      >
        <defs>
          <linearGradient id="chainLine" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3d7a5d" stopOpacity="0.0" />
            <stop offset="50%" stopColor="#3d7a5d" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#3d7a5d" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Connecting chain line */}
        <motion.path
          d="M 60 110 L 860 110"
          stroke="url(#chainLine)"
          strokeWidth="1.5"
          strokeDasharray="4 6"
          fill="none"
          initial={reduce ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        />

        {records.map((r, i) => {
          const x = 60 + i * 220 + 50;
          return (
            <motion.g
              key={r.t}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.15 * i,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <rect
                x={x - 80}
                y="50"
                width="180"
                height="120"
                rx="14"
                fill="#fafaf7"
                stroke="#eeeeea"
              />
              {/* hash badge */}
              <text
                x={x}
                y="74"
                textAnchor="middle"
                fontSize="8"
                letterSpacing="1.5"
                fill="#878780"
                fontFamily="ui-monospace, monospace"
              >
                #{(i + 12).toString(16).padStart(4, "0")}…
              </text>
              <text
                x={x}
                y="100"
                textAnchor="middle"
                fontSize="9"
                letterSpacing="1.5"
                fill="#5b5b56"
                fontFamily="ui-sans-serif, system-ui"
                style={{ textTransform: "uppercase" }}
              >
                {r.c}
              </text>
              <text
                x={x}
                y="124"
                textAnchor="middle"
                fontSize="13"
                fontFamily="ui-serif, Georgia, serif"
                fill="#0f0f0e"
                fontWeight="500"
              >
                {r.t}
              </text>
              {/* signers */}
              <g transform={`translate(${x - 22}, 140)`}>
                <circle r="9" fill="#1c1c1b" />
                <circle cx="14" r="9" fill="#2c5743" stroke="#fafaf7" strokeWidth="1.5" />
                <circle cx="30" r="6" fill="#0e4a36" />
                <path
                  d="M 27 0 L 29 2 L 33 -2"
                  stroke="#fafaf7"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  fill="none"
                />
              </g>
              {/* link to next */}
              {i < records.length - 1 && (
                <motion.circle
                  cx={x + 130}
                  cy="110"
                  r="4"
                  fill="#3d7a5d"
                  initial={reduce ? false : { scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 * i + 0.4, duration: 0.4 }}
                />
              )}
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}

