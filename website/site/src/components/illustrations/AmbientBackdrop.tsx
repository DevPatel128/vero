"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

/**
 * AmbientBackdrop
 *
 * A calm, slowly-drifting backdrop for the hero. Two soft accent blooms and a
 * dotted grid. Stays well below content; no aggressive motion.
 */
export function AmbientBackdrop({ className }: { className?: string }) {
  const reduce = useReducedMotion() ?? false;

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}
    >
      <svg className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <pattern
            id="ambientDots"
            x="0"
            y="0"
            width="22"
            height="22"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="1" fill="#0f0f0e" fillOpacity="0.06" />
          </pattern>
          <radialGradient id="bloomA" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3d7a5d" stopOpacity="0.13" />
            <stop offset="100%" stopColor="#3d7a5d" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="bloomB" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#7a5d2c" stopOpacity="0.09" />
            <stop offset="100%" stopColor="#7a5d2c" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#ambientDots)" />
      </svg>

      <motion.div
        className="absolute -left-32 top-0 h-[520px] w-[520px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(61,122,93,0.18), transparent 70%)",
        }}
        animate={reduce ? undefined : { x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-24 top-40 h-[440px] w-[440px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(122,93,44,0.14), transparent 70%)",
        }}
        animate={reduce ? undefined : { x: [0, -24, 0], y: [0, 24, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
