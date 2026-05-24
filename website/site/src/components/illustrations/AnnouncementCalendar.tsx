"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

/**
 * AnnouncementCalendar — calendar leaf flipping over 2026 to reveal 2027 with
 * a "TBA · check our socials" stamp. Used when communicating the launch shift.
 */
export function AnnouncementCalendar({ className }: { className?: string }) {
  const reduce = useReducedMotion() ?? false;
  return (
    <div className={cn("relative w-full max-w-[420px]", className)}>
      <svg
        viewBox="0 0 420 360"
        className="h-auto w-full drop-shadow-[0_20px_40px_rgba(15,15,14,0.12)]"
        role="img"
        aria-label="Launch announcement calendar: 2027, to be announced"
      >
        {/* Ring */}
        <rect x="50" y="22" width="6" height="22" rx="3" fill="#3f3f3c" />
        <rect x="364" y="22" width="6" height="22" rx="3" fill="#3f3f3c" />

        {/* Card body */}
        <rect x="30" y="40" width="360" height="290" rx="22" fill="#fafaf7" stroke="#dcdcd4" />

        {/* Header strip */}
        <rect x="30" y="40" width="360" height="58" rx="22" fill="#0f0f0e" />
        <rect x="30" y="78" width="360" height="20" fill="#0f0f0e" />
        <text
          x="56"
          y="78"
          fontSize="11"
          letterSpacing="3"
          fill="#3d7a5d"
          fontFamily="ui-sans-serif, system-ui"
        >
          LAUNCH
        </text>

        {/* The flipping page — 2026 → 2027 */}
        <motion.g
          initial={reduce ? false : { rotateX: 0, y: 0 }}
          whileInView={{ rotateX: -180, y: -8 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.5, delay: 0.2, ease: [0.65, 0, 0.35, 1] }}
          style={{ transformOrigin: "210px 98px", transformStyle: "preserve-3d" }}
        >
          <rect x="60" y="118" width="300" height="120" rx="10" fill="#f3f1ec" />
          <text
            x="210"
            y="206"
            textAnchor="middle"
            fontSize="80"
            fontFamily="ui-serif, Georgia, serif"
            fill="#0f0f0e"
            fontWeight="500"
            letterSpacing="-2"
          >
            2026
          </text>
        </motion.g>

        {/* Real revealed year */}
        <motion.g
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 1.6 }}
        >
          <rect x="60" y="118" width="300" height="120" rx="10" fill="#fafaf7" stroke="#eeeeea" />
          <text
            x="210"
            y="206"
            textAnchor="middle"
            fontSize="80"
            fontFamily="ui-serif, Georgia, serif"
            fill="#0f0f0e"
            fontWeight="500"
            letterSpacing="-2"
          >
            2027
          </text>
        </motion.g>

        {/* Stamp */}
        <motion.g
          initial={reduce ? false : { opacity: 0, scale: 0.7, rotate: -8 }}
          whileInView={{ opacity: 1, scale: 1, rotate: -6 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 2.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: "210px 290px" }}
        >
          <rect
            x="120"
            y="260"
            width="180"
            height="50"
            rx="6"
            fill="none"
            stroke="#9a6b1f"
            strokeWidth="2"
            opacity="0.85"
          />
          <text
            x="210"
            y="282"
            textAnchor="middle"
            fontSize="11"
            letterSpacing="3"
            fill="#9a6b1f"
            fontFamily="ui-sans-serif, system-ui"
            fontWeight="700"
          >
            TO BE ANNOUNCED
          </text>
          <text
            x="210"
            y="298"
            textAnchor="middle"
            fontSize="9"
            letterSpacing="2"
            fill="#9a6b1f"
            fontFamily="ui-sans-serif, system-ui"
          >
            FOLLOW OUR SOCIALS
          </text>
        </motion.g>
      </svg>
    </div>
  );
}
