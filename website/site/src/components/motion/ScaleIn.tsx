"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

export function ScaleIn({
  children,
  className,
  delay = 0,
  from = 0.88,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  from?: number;
}) {
  const reduce = useReducedMotion() ?? false;
  return (
    <motion.div
      className={cn(className)}
      initial={reduce ? false : { opacity: 0, scale: from }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

