"use client";

import { motion, useScroll, useReducedMotion, useSpring } from "motion/react";
import { cn } from "@/lib/cn";

export function ScrollProgress({ className }: { className?: string }) {
  const reduce = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.2,
  });
  if (reduce) return null;
  return (
    <motion.div
      aria-hidden
      className={cn(
        "fixed left-0 right-0 top-0 z-50 h-[2px] origin-left bg-gradient-to-r from-trust via-accent-glow to-accent",
        className,
      )}
      style={{ scaleX: x }}
    />
  );
}

