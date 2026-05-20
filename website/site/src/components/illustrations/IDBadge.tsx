"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

/**
 * IDBadge — verified ID badge with a flipping back panel showing
 * the categories the verifier covers. Calm flip motion.
 */
export function IDBadge({ className }: { className?: string }) {
  const reduce = useReducedMotion() ?? false;
  return (
    <div className={cn("relative w-full max-w-[440px]", className)}>
      <motion.div
        initial={reduce ? false : { opacity: 0, rotateY: -25, y: 10 }}
        whileInView={{ opacity: 1, rotateY: 0, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformStyle: "preserve-3d", perspective: 1200 }}
      >
        <svg
          viewBox="0 0 440 280"
          className="h-auto w-full drop-shadow-[0_20px_40px_rgba(15,15,14,0.12)]"
          role="img"
          aria-label="Verified identity badge"
        >
          <defs>
            <linearGradient id="badgeBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1c1c1b" />
              <stop offset="100%" stopColor="#0f0f0e" />
            </linearGradient>
          </defs>

          {/* Lanyard slot */}
          <rect x="190" y="6" width="60" height="10" rx="5" fill="#3f3f3c" />

          <rect x="20" y="22" width="400" height="240" rx="20" fill="url(#badgeBg)" />

          {/* Photo placeholder */}
          <rect x="40" y="50" width="100" height="120" rx="12" fill="#2c2c2a" />
          <circle cx="90" cy="92" r="20" fill="#3f3f3c" />
          <path d="M 60 168 Q 90 134 120 168" fill="#3f3f3c" />

          {/* Name + role */}
          <text
            x="160"
            y="68"
            fontSize="9"
            letterSpacing="2.5"
            fill="#3d7a5d"
            fontFamily="ui-sans-serif, system-ui"
          >
            VERIFIED · WORKER
          </text>
          <text
            x="160"
            y="100"
            fontSize="22"
            fontFamily="ui-serif, Georgia, serif"
            fill="#fafaf7"
            fontWeight="500"
          >
            Sanjay K.
          </text>
          <text
            x="160"
            y="124"
            fontSize="11"
            fill="#b8b8ad"
            fontFamily="ui-sans-serif, system-ui"
          >
            Kitchen · Apprenticeship · Café
          </text>

          {/* Verified tick */}
          <g transform="translate(160, 144)">
            <circle r="10" fill="#0e4a36" cx="10" cy="10" />
            <path
              d="M 5 10 L 8 13 L 15 7"
              stroke="#fafaf7"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <text
              x="28"
              y="14"
              fontSize="11"
              fill="#fafaf7"
              fontFamily="ui-sans-serif, system-ui"
              fontWeight="500"
            >
              Phone · ID · 14 signed shifts
            </text>
          </g>

          {/* Hash strip */}
          <line x1="40" y1="200" x2="400" y2="200" stroke="#3f3f3c" />
          <text
            x="40"
            y="222"
            fontSize="10"
            fontFamily="ui-monospace, monospace"
            fill="#878780"
          >
            #v3r0-2026-0517-a8f1
          </text>
          <text
            x="40"
            y="240"
            fontSize="9"
            letterSpacing="2"
            fill="#3d7a5d"
            fontFamily="ui-sans-serif, system-ui"
          >
            ANYONE WITH THE KEY CAN VERIFY
          </text>

          {/* Animated rotating accent ring on bottom right */}
          <motion.g
            animate={reduce ? undefined : { rotate: 360 }}
            transition={{ duration: 40, ease: "linear", repeat: Infinity }}
            style={{ transformOrigin: "380px 220px" }}
          >
            <circle
              cx="380"
              cy="220"
              r="22"
              fill="none"
              stroke="#3d7a5d"
              strokeOpacity="0.4"
              strokeDasharray="3 4"
            />
            <circle cx="380" cy="198" r="2.5" fill="#3d7a5d" />
          </motion.g>
        </svg>
      </motion.div>
    </div>
  );
}
