"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

export function FlipIn({
  children,
  className,
  delay = 0,
  axis = "x",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  axis?: "x" | "y";
}) {
  const reduce = useReducedMotion() ?? false;
  return (
    <motion.div
      className={cn("[transform-style:preserve-3d]", className)}
      style={{ perspective: 1000 }}
      initial={
        reduce
          ? false
          : axis === "x"
          ? { opacity: 0, rotateX: -45, y: 20 }
          : { opacity: 0, rotateY: 45, x: 20 }
      }
      whileInView={{ opacity: 1, rotateX: 0, rotateY: 0, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, delay, ease: [0.32, 0.72, 0, 1] }}
    >
      {children}
    </motion.div>
  );
}

