"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export function MagneticLink({
  href,
  children,
  className,
  strength = 0.18,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 180, damping: 18, mass: 0.4 });
  const reduce = useReducedMotion() ?? false;

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span style={{ x: sx, y: sy, display: "inline-block" }}>
      <Link
        ref={ref}
        href={href}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={cn(className)}
      >
        {children}
      </Link>
    </motion.span>
  );
}

