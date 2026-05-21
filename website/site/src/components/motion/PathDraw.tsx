"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

/**
 * PathDraw - animate any single <path d="..." /> drawing in on view.
 * Pass viewBox + d directly. Stroke and width customizable.
 */
export function PathDraw({
  d,
  viewBox = "0 0 100 100",
  stroke = "#1f3a2e",
  strokeWidth = 1.5,
  className,
  duration = 1.6,
  delay = 0,
}: {
  d: string;
  viewBox?: string;
  stroke?: string;
  strokeWidth?: number;
  className?: string;
  duration?: number;
  delay?: number;
}) {
  const reduce = useReducedMotion() ?? false;
  return (
    <svg viewBox={viewBox} className={cn(className)} fill="none" aria-hidden>
      <motion.path
        d={d}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduce ? false : { pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration, delay, ease: [0.32, 0.72, 0, 1] }}
      />
    </svg>
  );
}

