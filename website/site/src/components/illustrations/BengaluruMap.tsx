"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

/**
 * BengaluruMap - abstract neighbourhood map with five pinned launch areas.
 */
export function BengaluruMap({ className }: { className?: string }) {
  const reduce = useReducedMotion() ?? false;
  const pins = [
    { name: "Whitefield", x: 460, y: 160 },
    { name: "HSR Layout", x: 320, y: 280 },
    { name: "Koramangala", x: 240, y: 240 },
    { name: "Sarjapur", x: 420, y: 330 },
    { name: "Electronic City", x: 320, y: 380 },
  ];

  return (
    <div className={cn("w-full", className)}>
      <svg
        viewBox="0 0 600 460"
        className="h-auto w-full"
        role="img"
        aria-label="Bengaluru launch neighbourhoods"
      >
        <defs>
          <pattern id="mapGrid" width="22" height="22" patternUnits="userSpaceOnUse">
            <path d="M 22 0 L 0 0 0 22" fill="none" stroke="#0f0f0e" strokeOpacity="0.05" />
          </pattern>
          <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3d7a5d" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#3d7a5d" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="600" height="460" fill="#f3f1ec" />
        <rect width="600" height="460" fill="url(#mapGrid)" />

        {/* Abstract roads */}
        <motion.g
          stroke="#878780"
          strokeOpacity="0.4"
          strokeWidth="1.2"
          fill="none"
          initial={reduce ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.path d="M 60 110 Q 280 90 540 200" />
          <motion.path d="M 80 380 Q 300 320 540 360" />
          <motion.path d="M 220 60 L 250 410" />
          <motion.path d="M 400 80 Q 420 240 380 420" />
          <motion.path d="M 60 260 Q 300 270 540 280" />
        </motion.g>

        {/* Subtle bloom under the cluster */}
        <ellipse cx="350" cy="280" rx="220" ry="160" fill="url(#mapGlow)" />

        {/* Pins */}
        {pins.map((p, i) => (
          <motion.g
            key={p.name}
            initial={reduce ? false : { opacity: 0, y: -16, scale: 0.4 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.6,
              delay: 0.4 + i * 0.12,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <motion.circle
              cx={p.x}
              cy={p.y + 6}
              r="14"
              fill="#3d7a5d"
              fillOpacity="0.16"
              animate={reduce ? undefined : { scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }}
              transition={{ duration: 3.2, repeat: Infinity, delay: i * 0.4 }}
              style={{ transformOrigin: `${p.x}px ${p.y + 6}px` }}
            />
            <path
              d={`M ${p.x} ${p.y - 18} C ${p.x - 10} ${p.y - 18} ${p.x - 10} ${p.y} ${p.x} ${p.y + 6} C ${p.x + 10} ${p.y} ${p.x + 10} ${p.y - 18} ${p.x} ${p.y - 18} Z`}
              fill="#0f0f0e"
            />
            <circle cx={p.x} cy={p.y - 12} r="4" fill="#3d7a5d" />
            <text
              x={p.x + 14}
              y={p.y - 8}
              fontSize="11"
              fontFamily="ui-sans-serif, system-ui"
              fill="#0f0f0e"
              fontWeight="600"
            >
              {p.name}
            </text>
          </motion.g>
        ))}

        {/* Label */}
        <text
          x="40"
          y="40"
          fontSize="10"
          letterSpacing="2.5"
          fill="#5b5b56"
          fontFamily="ui-sans-serif, system-ui"
        >
          BENGALURU · FIVE NEIGHBOURHOODS
        </text>
      </svg>
    </div>
  );
}

