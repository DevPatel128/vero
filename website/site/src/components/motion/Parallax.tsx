"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/cn";

export function Parallax({
  children,
  className,
  range = 80,
}: {
  children: React.ReactNode;
  className?: string;
  range?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [range, -range]);

  return (
    <motion.div ref={ref} style={{ y }} className={cn(className)}>
      {children}
    </motion.div>
  );
}

