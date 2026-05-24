"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

/**
 * CategoryCubes — isometric stack of category tiles. Each tile slides in.
 */
export function CategoryCubes({ className }: { className?: string }) {
  const reduce = useReducedMotion() ?? false;
  const tiles = [
    { label: "Cafés", icon: "M3 8h14M3 12h14M5 16h10" },
    { label: "Homes", icon: "M3 11l7-7 7 7M5 11v8h10v-8" },
    { label: "Studios", icon: "M3 5h14v10H3zM7 19h6" },
    { label: "Repair", icon: "M5 13l-2 6 6-2 8-8a3 3 0 0 0-4-4z" },
    { label: "Care", icon: "M10 17s-7-4-7-9a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 5-7 9-7 9z" },
    { label: "Design", icon: "M4 16l4-4 4 4 6-6" },
  ];

  return (
    <div className={cn("w-full", className)}>
      <svg
        viewBox="0 0 720 360"
        className="h-auto w-full"
        role="img"
        aria-label="Categories at launch"
      >
        {tiles.map((t, i) => {
          const col = i % 3;
          const row = Math.floor(i / 3);
          const x = 80 + col * 200;
          const y = 80 + row * 130;
          return (
            <motion.g
              key={t.label}
              initial={reduce ? false : { opacity: 0, y: 24, rotate: -3 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.6,
                delay: i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {/* shadow */}
              <rect
                x={x + 6}
                y={y + 8}
                width="160"
                height="100"
                rx="14"
                fill="#0f0f0e"
                opacity="0.08"
              />
              <rect
                x={x}
                y={y}
                width="160"
                height="100"
                rx="14"
                fill="#fafaf7"
                stroke="#eeeeea"
              />
              {/* icon */}
              <g
                transform={`translate(${x + 22}, ${y + 22})`}
                stroke="#1f3a2e"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d={t.icon} />
              </g>
              <text
                x={x + 22}
                y={y + 78}
                fontSize="13"
                fontFamily="ui-serif, Georgia, serif"
                fill="#0f0f0e"
                fontWeight="500"
              >
                {t.label}
              </text>
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}
