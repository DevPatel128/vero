"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/cn";

export function Spotlight({
  children,
  className,
  size = 360,
  color = "rgba(61,122,93,0.22)",
}: {
  children: React.ReactNode;
  className?: string;
  size?: number;
  color?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(-9999);
  const y = useMotionValue(-9999);
  const reduce = useReducedMotion() ?? false;

  const bg = useMotionTemplate`radial-gradient(${size}px circle at ${x}px ${y}px, ${color}, transparent 70%)`;

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  };

  const onLeave = () => {
    x.set(-9999);
    y.set(-9999);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn("relative", className)}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{ background: bg }}
      />
      {children}
    </div>
  );
}

