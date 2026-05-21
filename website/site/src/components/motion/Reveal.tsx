"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { cn } from "@/lib/cn";

type Direction = "up" | "down" | "left" | "right" | "fade";

const distance = 22;

const variants = (dir: Direction, reduce: boolean): Variants => {
  if (reduce) return { hidden: { opacity: 1 }, visible: { opacity: 1 } };
  const map: Record<Direction, { x: number; y: number }> = {
    up: { x: 0, y: distance },
    down: { x: 0, y: -distance },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
    fade: { x: 0, y: 0 },
  };
  return {
    hidden: { opacity: 0, ...map[dir] },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };
};

export function Reveal({
  children,
  className,
  as: As = "div",
  direction = "up",
  delay = 0,
  amount = 0.3,
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  as?: keyof typeof motion;
  direction?: Direction;
  delay?: number;
  amount?: number;
  once?: boolean;
}) {
  const reduce = useReducedMotion() ?? false;
  const MotionTag = motion[As] as typeof motion.div;
  return (
    <MotionTag
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants(direction, reduce)}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}

