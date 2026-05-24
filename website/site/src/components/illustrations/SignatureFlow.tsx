"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

/**
 * SignatureFlow
 *
 * Two parties → one record. Two signatures, both required.
 */
export function SignatureFlow({ className }: { className?: string }) {
  const reduce = useReducedMotion() ?? false;

  return (
    <div className={cn("w-full", className)}>
      <svg
        viewBox="0 0 720 280"
        className="h-auto w-full"
        role="img"
        aria-label="Both worker and client sign. Neither can sign alone."
      >
        <defs>
          <linearGradient id="sigArrow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3d7a5d" stopOpacity="0" />
            <stop offset="100%" stopColor="#3d7a5d" stopOpacity="0.6" />
          </linearGradient>
        </defs>

        {/* Worker */}
        <motion.g
          initial={reduce ? false : { opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <rect x="40" y="60" width="200" height="160" rx="20" fill="#1c1c1b" />
          <text
            x="60"
            y="92"
            fontSize="9"
            letterSpacing="2"
            fill="#3d7a5d"
            fontFamily="ui-sans-serif, system-ui"
          >
            WORKER
          </text>
          <text
            x="60"
            y="124"
            fontSize="22"
            fontFamily="ui-serif, Georgia, serif"
            fill="#fafaf7"
            fontWeight="500"
          >
            Sanjay K.
          </text>
          <text
            x="60"
            y="148"
            fontSize="11"
            fill="#b8b8ad"
            fontFamily="ui-sans-serif, system-ui"
          >
            Confirms completion
          </text>
          {/* signature scribble */}
          <motion.path
            d="M 60 178 C 78 168, 92 188, 110 176 S 142 172, 156 184 L 200 178"
            stroke="#3d7a5d"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            initial={reduce ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.g>

        {/* Center record */}
        <motion.g
          initial={reduce ? false : { opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <rect
            x="288"
            y="80"
            width="144"
            height="120"
            rx="14"
            fill="#fafaf7"
            stroke="#dcdcd4"
          />
          <text
            x="360"
            y="106"
            textAnchor="middle"
            fontSize="9"
            letterSpacing="2"
            fill="#878780"
            fontFamily="ui-sans-serif, system-ui"
          >
            RECORD
          </text>
          <text
            x="360"
            y="138"
            textAnchor="middle"
            fontSize="16"
            fontFamily="ui-serif, Georgia, serif"
            fill="#0f0f0e"
            fontWeight="500"
          >
            One signed
          </text>
          <text
            x="360"
            y="158"
            textAnchor="middle"
            fontSize="16"
            fontFamily="ui-serif, Georgia, serif"
            fill="#0f0f0e"
            fontWeight="500"
          >
            artefact
          </text>
          <g transform="translate(354, 178)">
            <circle r="6" fill="#0e4a36" cx="6" cy="0" />
            <path
              d="M 3 0 L 5 2 L 9 -2"
              stroke="#fafaf7"
              strokeWidth="1.4"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        </motion.g>

        {/* Client */}
        <motion.g
          initial={reduce ? false : { opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <rect
            x="480"
            y="60"
            width="200"
            height="160"
            rx="20"
            fill="#fafaf7"
            stroke="#dcdcd4"
          />
          <text
            x="500"
            y="92"
            fontSize="9"
            letterSpacing="2"
            fill="#1f3a2e"
            fontFamily="ui-sans-serif, system-ui"
          >
            CLIENT
          </text>
          <text
            x="500"
            y="124"
            fontSize="22"
            fontFamily="ui-serif, Georgia, serif"
            fill="#0f0f0e"
            fontWeight="500"
          >
            Anita R.
          </text>
          <text
            x="500"
            y="148"
            fontSize="11"
            fill="#5b5b56"
            fontFamily="ui-sans-serif, system-ui"
          >
            Confirms completion
          </text>
          <motion.path
            d="M 500 178 C 516 168, 530 188, 548 176 S 580 172, 596 184 L 640 178"
            stroke="#1f3a2e"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            initial={reduce ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.g>

        {/* Arrows */}
        <motion.path
          d="M 240 140 L 285 140"
          stroke="url(#sigArrow)"
          strokeWidth="1.5"
          markerEnd="url(#arrow)"
          fill="none"
          initial={reduce ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        />
        <motion.path
          d="M 480 140 L 435 140"
          stroke="url(#sigArrow)"
          strokeWidth="1.5"
          fill="none"
          initial={reduce ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.75 }}
        />
      </svg>
    </div>
  );
}
