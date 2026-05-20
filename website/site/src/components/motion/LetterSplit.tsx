"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

const ease = [0.16, 1, 0.3, 1] as const;

export function LetterSplit({
  text,
  className,
  delay = 0,
  stagger = 0.03,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const reduce = useReducedMotion() ?? false;
  const chars = Array.from(text);

  return (
    <span className={cn("inline-block", className)} aria-label={text}>
      {chars.map((c, i) => (
        <motion.span
          key={i}
          aria-hidden
          initial={reduce ? false : { opacity: 0, y: 24, rotate: -4 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{
            duration: 0.6,
            delay: delay + i * stagger,
            ease,
          }}
          className="inline-block whitespace-pre"
          style={{ willChange: "transform" }}
        >
          {c === " " ? " " : c}
        </motion.span>
      ))}
    </span>
  );
}

export function WordReveal({
  text,
  className,
  delay = 0,
  stagger = 0.08,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const reduce = useReducedMotion() ?? false;
  const words = text.split(" ");

  return (
    <span className={cn("inline-block", className)} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            aria-hidden
            initial={reduce ? false : { y: "110%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: delay + i * stagger, ease }}
            className="inline-block whitespace-pre"
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
