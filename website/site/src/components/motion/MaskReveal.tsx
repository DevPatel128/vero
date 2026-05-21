"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

type Direction = "up" | "right" | "down" | "left";

const initial: Record<Direction, string> = {
  up: "inset(100% 0 0 0)",
  right: "inset(0 100% 0 0)",
  down: "inset(0 0 100% 0)",
  left: "inset(0 0 0 100%)",
};

export function MaskReveal({
  children,
  className,
  from = "up",
  delay = 0,
  duration = 0.95,
}: {
  children: React.ReactNode;
  className?: string;
  from?: Direction;
  delay?: number;
  duration?: number;
}) {
  const reduce = useReducedMotion() ?? false;
  return (
    <motion.div
      className={cn("overflow-hidden", className)}
      initial={reduce ? false : { clipPath: initial[from] }}
      whileInView={{ clipPath: "inset(0 0 0 0)" }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration, delay, ease: [0.65, 0, 0.35, 1] }}
    >
      {children}
    </motion.div>
  );
}

