"use client";

import {
  animate,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

export function CountUp({
  to,
  duration = 1.6,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
}: {
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const mv = useMotionValue(0);
  const text = useTransform(mv, (v) =>
    `${prefix}${v.toFixed(decimals)}${suffix}`,
  );
  const reduce = useReducedMotion() ?? false;

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      mv.set(to);
      return;
    }
    const controls = animate(mv, to, { duration, ease: [0.16, 1, 0.3, 1] });
    return controls.stop;
  }, [inView, to, duration, mv, reduce]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const unsub = text.on("change", (v) => {
      el.textContent = v;
    });
    return unsub;
  }, [text]);

  return (
    <span ref={ref} className={cn(className)}>
      {prefix}0{suffix}
    </span>
  );
}
