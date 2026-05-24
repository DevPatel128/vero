"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

/**
 * HashRibbon — long horizontal ribbon of hash IDs that shifts on hover
 * and slowly drifts. Reads like the chain header of a ledger.
 */
export function HashRibbon({
  className,
  count = 20,
}: {
  className?: string;
  count?: number;
}) {
  const reduce = useReducedMotion() ?? false;
  const hashes = Array.from({ length: count }, (_, i) =>
    `#${(0x1a000 + i * 0x57).toString(16).padStart(5, "0")}`,
  );

  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      <motion.div
        className="flex w-max gap-6 font-mono text-xs text-ink-500"
        animate={reduce ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 60, ease: "linear", repeat: Infinity }}
      >
        {[...hashes, ...hashes].map((h, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 whitespace-nowrap"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-trust/60" />
            {h}
            <span className="text-ink-300">·</span>
            <span className="text-ink-400">signed</span>
            <span className="text-ink-300">·</span>
            <span className="text-ink-400">chained</span>
          </span>
        ))}
      </motion.div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-paper to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-paper to-transparent" />
    </div>
  );
}
