"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/cn";

export function TiltCard({
  children,
  className,
  intensity = 8,
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const reduce = useReducedMotion() ?? false;

  const rx = useSpring(useTransform(py, [-0.5, 0.5], [intensity, -intensity]), {
    stiffness: 220,
    damping: 22,
  });
  const ry = useSpring(useTransform(px, [-0.5, 0.5], [-intensity, intensity]), {
    stiffness: 220,
    damping: 22,
  });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const onLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn("[transform-style:preserve-3d]", className)}
      style={{ rotateX: rx, rotateY: ry, perspective: 800 }}
    >
      <div style={{ transform: "translateZ(0)" }}>{children}</div>
    </motion.div>
  );
}

