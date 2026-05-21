"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

/**
 * StandingDial - multi-spoke dial (not stars). Each spoke is a different
 * trust signal: completion, on-time, repeat, dispute-free, category, peers.
 */
export function StandingDial({ className }: { className?: string }) {
  const reduce = useReducedMotion() ?? false;
  const spokes = [
    { label: "Completion", v: 0.92 },
    { label: "On-time", v: 0.88 },
    { label: "Repeat clients", v: 0.74 },
    { label: "Dispute-free", v: 0.96 },
    { label: "Category", v: 0.81 },
    { label: "Peers", v: 0.68 },
  ];
  const cx = 220;
  const cy = 220;
  const rMax = 150;

  const angle = (i: number) => (i / spokes.length) * Math.PI * 2 - Math.PI / 2;

  const polygon = spokes
    .map((s, i) => {
      const r = rMax * s.v;
      return `${cx + r * Math.cos(angle(i))},${cy + r * Math.sin(angle(i))}`;
    })
    .join(" ");

  return (
    <div className={cn("w-full", className)}>
      <svg
        viewBox="0 0 520 440"
        className="h-auto w-full"
        role="img"
        aria-label="Trust signals dial. Six dimensions, no stars."
      >
        {/* Concentric guides */}
        {[0.25, 0.5, 0.75, 1].map((f, idx) => (
          <polygon
            key={f}
            points={spokes
              .map((_, i) => {
                const r = rMax * f;
                return `${cx + r * Math.cos(angle(i))},${cy + r * Math.sin(angle(i))}`;
              })
              .join(" ")}
            fill="none"
            stroke="#0f0f0e"
            strokeOpacity={0.05 + idx * 0.02}
          />
        ))}

        {/* Spoke lines */}
        {spokes.map((_, i) => (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={cx + rMax * Math.cos(angle(i))}
            y2={cy + rMax * Math.sin(angle(i))}
            stroke="#0f0f0e"
            strokeOpacity="0.08"
          />
        ))}

        {/* Filled standing */}
        <motion.polygon
          points={polygon}
          fill="#3d7a5d"
          fillOpacity="0.18"
          stroke="#1f3a2e"
          strokeWidth="1.5"
          initial={reduce ? false : { scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />

        {/* Spoke endpoints */}
        {spokes.map((s, i) => {
          const r = rMax * s.v;
          const x = cx + r * Math.cos(angle(i));
          const y = cy + r * Math.sin(angle(i));
          const lx = cx + (rMax + 28) * Math.cos(angle(i));
          const ly = cy + (rMax + 28) * Math.sin(angle(i));
          const anchor = lx < cx - 4 ? "end" : lx > cx + 4 ? "start" : "middle";
          return (
            <motion.g
              key={s.label}
              initial={reduce ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.07 }}
            >
              <circle cx={x} cy={y} r="4" fill="#1f3a2e" />
              <text
                x={lx}
                y={ly + 4}
                textAnchor={anchor}
                fontSize="11"
                fontFamily="ui-sans-serif, system-ui"
                fill="#3f3f3c"
                fontWeight="500"
              >
                {s.label}
              </text>
            </motion.g>
          );
        })}

        {/* Center label */}
        <text
          x={cx}
          y={cy - 4}
          textAnchor="middle"
          fontSize="9"
          letterSpacing="2"
          fill="#878780"
          fontFamily="ui-sans-serif, system-ui"
        >
          STANDING
        </text>
        <text
          x={cx}
          y={cy + 14}
          textAnchor="middle"
          fontSize="14"
          fontFamily="ui-serif, Georgia, serif"
          fill="#0f0f0e"
          fontWeight="500"
        >
          six dimensions
        </text>
      </svg>
    </div>
  );
}

