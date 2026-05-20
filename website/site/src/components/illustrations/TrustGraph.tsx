"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

/**
 * TrustGraph
 *
 * A small network of nodes (people, businesses) connected by signed work.
 * Renders calmly — no aggressive pulse, just gentle propagation.
 */
export function TrustGraph({ className }: { className?: string }) {
  const reduce = useReducedMotion() ?? false;

  const nodes = [
    { id: "w1", x: 120, y: 110, kind: "w", label: "SK" },
    { id: "w2", x: 320, y: 80, kind: "w", label: "RM" },
    { id: "w3", x: 460, y: 180, kind: "w", label: "PD" },
    { id: "w4", x: 200, y: 240, kind: "w", label: "JD" },
    { id: "b1", x: 240, y: 170, kind: "b", label: "TW" },
    { id: "b2", x: 380, y: 130, kind: "b", label: "BC" },
    { id: "b3", x: 380, y: 260, kind: "b", label: "MI" },
  ];

  const edges: [string, string][] = [
    ["w1", "b1"],
    ["b1", "w2"],
    ["w2", "b2"],
    ["b2", "w3"],
    ["w3", "b3"],
    ["b3", "w4"],
    ["w4", "b1"],
    ["w1", "b2"],
  ];

  const map = Object.fromEntries(nodes.map((n) => [n.id, n]));

  return (
    <div className={cn("w-full", className)}>
      <svg
        viewBox="0 0 560 340"
        className="h-auto w-full"
        role="img"
        aria-label="A trust graph — workers and businesses connected by signed records"
      >
        {edges.map(([a, b], i) => (
          <motion.line
            key={`${a}-${b}`}
            x1={map[a].x}
            y1={map[a].y}
            x2={map[b].x}
            y2={map[b].y}
            stroke="#3d7a5d"
            strokeOpacity="0.4"
            strokeWidth="1"
            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.4 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.08 * i, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}

        {nodes.map((n, i) => (
          <motion.g
            key={n.id}
            initial={reduce ? false : { opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.06 * i, ease: [0.16, 1, 0.3, 1] }}
          >
            <circle
              cx={n.x}
              cy={n.y}
              r={n.kind === "w" ? 22 : 18}
              fill={n.kind === "w" ? "#1c1c1b" : "#fafaf7"}
              stroke={n.kind === "w" ? "#3d7a5d" : "#dcdcd4"}
              strokeWidth={n.kind === "w" ? 1.5 : 1}
            />
            <text
              x={n.x}
              y={n.y + 4}
              textAnchor="middle"
              fontSize="11"
              fontWeight="600"
              fill={n.kind === "w" ? "#fafaf7" : "#0f0f0e"}
              fontFamily="ui-sans-serif, system-ui"
            >
              {n.label}
            </text>
          </motion.g>
        ))}

        {/* Legend */}
        <g transform="translate(20, 300)">
          <circle r="6" fill="#1c1c1b" stroke="#3d7a5d" strokeWidth="1" />
          <text
            x="14"
            y="3"
            fontSize="10"
            fill="#5b5b56"
            fontFamily="ui-sans-serif, system-ui"
          >
            Worker
          </text>
          <circle cx="92" r="6" fill="#fafaf7" stroke="#dcdcd4" />
          <text
            x="104"
            y="3"
            fontSize="10"
            fill="#5b5b56"
            fontFamily="ui-sans-serif, system-ui"
          >
            Business
          </text>
          <line
            x1="180"
            y1="0"
            x2="220"
            y2="0"
            stroke="#3d7a5d"
            strokeOpacity="0.5"
          />
          <text
            x="226"
            y="3"
            fontSize="10"
            fill="#5b5b56"
            fontFamily="ui-sans-serif, system-ui"
          >
            Signed work
          </text>
        </g>
      </svg>
    </div>
  );
}
