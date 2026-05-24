"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

export function EscrowFlow({ className }: { className?: string }) {
  const reduce = useReducedMotion() ?? false;
  const steps = [
    { label: "Funded", sub: "Client deposits", v: "₹4,800" },
    { label: "Held", sub: "Vero holds in escrow", v: "₹4,800" },
    { label: "Released", sub: "Both signatures", v: "₹4,560" },
  ];

  return (
    <div className={cn("w-full", className)}>
      <svg
        viewBox="0 0 720 200"
        className="h-auto w-full"
        role="img"
        aria-label="Escrow flow: funded, held, released"
      >
        {steps.map((s, i) => {
          const x = 30 + i * 230;
          return (
            <motion.g
              key={s.label}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <rect
                x={x}
                y="40"
                width="200"
                height="120"
                rx="16"
                fill={i === 2 ? "#1c1c1b" : "#fafaf7"}
                stroke={i === 2 ? "#3d7a5d" : "#dcdcd4"}
              />
              <text
                x={x + 20}
                y="68"
                fontSize="9"
                letterSpacing="2"
                fill={i === 2 ? "#3d7a5d" : "#878780"}
                fontFamily="ui-sans-serif, system-ui"
              >
                {`STEP 0${i + 1}`}
              </text>
              <text
                x={x + 20}
                y="100"
                fontSize="20"
                fontFamily="ui-serif, Georgia, serif"
                fill={i === 2 ? "#fafaf7" : "#0f0f0e"}
                fontWeight="500"
              >
                {s.label}
              </text>
              <text
                x={x + 20}
                y="122"
                fontSize="11"
                fill={i === 2 ? "#b8b8ad" : "#5b5b56"}
                fontFamily="ui-sans-serif, system-ui"
              >
                {s.sub}
              </text>
              <text
                x={x + 180}
                y="148"
                textAnchor="end"
                fontSize="14"
                fontFamily="ui-monospace, monospace"
                fill={i === 2 ? "#3d7a5d" : "#1f3a2e"}
                fontWeight="600"
              >
                {s.v}
              </text>
            </motion.g>
          );
        })}

        {/* Connectors */}
        {[0, 1].map((i) => (
          <motion.path
            key={i}
            d={`M ${230 + i * 230} 100 L ${260 + i * 230} 100`}
            stroke="#3d7a5d"
            strokeOpacity="0.45"
            strokeWidth="1.5"
            strokeDasharray="3 4"
            initial={reduce ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.4 + i * 0.2 }}
          />
        ))}
      </svg>
    </div>
  );
}
