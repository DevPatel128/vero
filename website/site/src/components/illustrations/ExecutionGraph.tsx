"use client";

import { motion, useReducedMotion } from "motion/react";
import { useMemo } from "react";

/**
 * A living execution graph.
 *
 * Nodes are signed engagements. Edges chain them by hash. The visualisation
 * is deterministic per render — the same seed always produces the same graph —
 * so first paint matches subsequent paints (no layout flicker).
 *
 * Decorative. Hidden from assistive tech.
 */

type Node = {
  id: string;
  x: number;
  y: number;
  r: number;
  signed: boolean;
  ts: number; // birth order
};

type Edge = { from: string; to: string; ts: number; verified: boolean };

function generate(seed = 7): { nodes: Node[]; edges: Edge[] } {
  // Simple LCG so output is deterministic.
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };

  const W = 600;
  const H = 420;
  const cols = 6;
  const rows = 5;
  const nodes: Node[] = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      // sparse: ~70% nodes populated
      if (rand() < 0.32) continue;
      const baseX = (c + 0.5) * (W / cols);
      const baseY = (r + 0.5) * (H / rows);
      const jitterX = (rand() - 0.5) * (W / cols) * 0.45;
      const jitterY = (rand() - 0.5) * (H / rows) * 0.45;
      const isSigned = rand() < 0.62;
      nodes.push({
        id: `n${r}-${c}`,
        x: Math.round(baseX + jitterX),
        y: Math.round(baseY + jitterY),
        r: isSigned ? 3.6 : 2.2,
        signed: isSigned,
        ts: r * cols + c,
      });
    }
  }

  // chained edges — each node references the closest earlier node by hash
  const edges: Edge[] = [];
  for (let i = 1; i < nodes.length; i++) {
    const a = nodes[i];
    let bestJ = 0;
    let bestD = Infinity;
    for (let j = 0; j < i; j++) {
      const b = nodes[j];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < bestD) {
        bestD = d;
        bestJ = j;
      }
    }
    const b = nodes[bestJ];
    edges.push({
      from: b.id,
      to: a.id,
      ts: Math.max(a.ts, b.ts),
      verified: a.signed && b.signed,
    });
  }

  return { nodes, edges };
}

export function ExecutionGraph({
  className = "",
  animate = true,
}: {
  className?: string;
  animate?: boolean;
}) {
  const reduce = useReducedMotion() ?? false;
  const motionOn = animate && !reduce;

  const { nodes, edges } = useMemo(() => generate(7), []);
  const total = nodes.length;
  const window = 0.42; // length of each reveal as % of total
  const dur = 4.8; // full choreography (s)

  const nodeMap = useMemo(() => {
    const m = new Map<string, Node>();
    nodes.forEach((n) => m.set(n.id, n));
    return m;
  }, [nodes]);

  return (
    <svg
      viewBox="0 0 600 420"
      className={className}
      aria-hidden="true"
      role="presentation"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <radialGradient id="exec-node-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--accent-glow)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="var(--accent-glow)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="exec-edge-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0" />
          <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.65" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
        <filter id="exec-soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      {/* edges */}
      <g>
        {edges.map((e, i) => {
          const a = nodeMap.get(e.from)!;
          const b = nodeMap.get(e.to)!;
          const delay = (e.ts / total) * (dur - window);
          const stroke = e.verified ? "var(--accent)" : "var(--ink-3)";
          return (
            <motion.line
              key={`e-${i}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke={stroke}
              strokeWidth={e.verified ? 0.9 : 0.55}
              strokeLinecap="round"
              initial={
                motionOn
                  ? { pathLength: 0, opacity: 0 }
                  : { pathLength: 1, opacity: e.verified ? 0.7 : 0.35 }
              }
              animate={
                motionOn
                  ? {
                      pathLength: 1,
                      opacity: e.verified ? 0.7 : 0.35,
                    }
                  : {}
              }
              transition={{
                duration: 0.9,
                delay,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
          );
        })}
      </g>

      {/* nodes */}
      <g>
        {nodes.map((n) => {
          const delay = (n.ts / total) * (dur - window) + 0.15;
          if (n.signed) {
            return (
              <g key={n.id}>
                {/* halo */}
                <motion.circle
                  cx={n.x}
                  cy={n.y}
                  r={n.r * 3}
                  fill="url(#exec-node-glow)"
                  initial={motionOn ? { opacity: 0 } : { opacity: 0.5 }}
                  animate={motionOn ? { opacity: [0, 0.7, 0.5] } : {}}
                  transition={{
                    duration: 1.4,
                    delay,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
                {/* core */}
                <motion.circle
                  cx={n.x}
                  cy={n.y}
                  r={n.r}
                  fill="var(--accent)"
                  initial={motionOn ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
                  animate={motionOn ? { scale: 1, opacity: 1 } : {}}
                  style={{ transformBox: "fill-box", transformOrigin: "center" }}
                  transition={{
                    duration: 0.6,
                    delay,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
                {/* signature mark */}
                <motion.circle
                  cx={n.x}
                  cy={n.y}
                  r={n.r * 1.9}
                  fill="none"
                  stroke="var(--accent-glow)"
                  strokeWidth={0.5}
                  initial={motionOn ? { opacity: 0, scale: 0.6 } : { opacity: 0.6, scale: 1 }}
                  animate={motionOn ? { opacity: 0.6, scale: 1 } : {}}
                  style={{ transformBox: "fill-box", transformOrigin: "center" }}
                  transition={{
                    duration: 0.9,
                    delay: delay + 0.15,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
              </g>
            );
          }

          return (
            <motion.circle
              key={n.id}
              cx={n.x}
              cy={n.y}
              r={n.r}
              fill="var(--ink-3)"
              initial={motionOn ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 0.7 }}
              animate={motionOn ? { scale: 1, opacity: 0.7 } : {}}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
              transition={{
                duration: 0.5,
                delay,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
          );
        })}
      </g>

      {/* timestamp tick at bottom — silent, infrastructural */}
      <g
        fontFamily="var(--font-mono)"
        fontSize="8"
        fill="var(--ink-3)"
        opacity="0.7"
      >
        <text x={6} y={414}>
          ledger · ALVED · live
        </text>
        <text x={594} y={414} textAnchor="end">
          {`${nodes.filter((n) => n.signed).length} signed / ${nodes.length} records`}
        </text>
      </g>
    </svg>
  );
}
