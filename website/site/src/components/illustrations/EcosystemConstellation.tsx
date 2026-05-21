"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

/**
 * EcosystemConstellation
 *
 * The single hint image for the VROE Labs ecosystem. Shows three orbiting
 * surfaces - Vero (work), RIE (discipline), Trove (value) - connected by the
 * shared ALVED protocol ring. Intentionally light on words; meant to *suggest*
 * the ecosystem rather than announce features.
 */
export function EcosystemConstellation({
  className,
  showLabels = true,
}: {
  className?: string;
  showLabels?: boolean;
}) {
  const reduce = useReducedMotion() ?? false;

  return (
    <div className={cn("relative aspect-square w-full max-w-[640px]", className)}>
      <svg
        viewBox="0 0 600 600"
        className="h-full w-full"
        role="img"
        aria-label="VROE Labs ecosystem: Vero, RIE, and Trove connected by the shared ALVED protocol"
      >
        <defs>
          <radialGradient id="ecoBg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f3f1ec" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#fafaf7" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#fafaf7" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3d7a5d" stopOpacity="0.0" />
            <stop offset="50%" stopColor="#3d7a5d" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#1f3a2e" stopOpacity="0.0" />
          </linearGradient>
          <linearGradient id="orbVero" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1c1c1b" />
            <stop offset="100%" stopColor="#0f0f0e" />
          </linearGradient>
          <linearGradient id="orbRie" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fafaf7" />
            <stop offset="100%" stopColor="#eeeeea" />
          </linearGradient>
          <linearGradient id="orbTrove" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f3f1ec" />
            <stop offset="100%" stopColor="#dcdcd4" />
          </linearGradient>
          <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="6" />
            <feOffset dx="0" dy="6" result="off" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.18" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <circle cx="300" cy="300" r="290" fill="url(#ecoBg)" />

        {/* Dotted concentric grid */}
        {[100, 160, 220, 280].map((r, i) => (
          <circle
            key={r}
            cx="300"
            cy="300"
            r={r}
            fill="none"
            stroke="#0f0f0e"
            strokeOpacity={0.06 - i * 0.01}
            strokeDasharray="2 6"
          />
        ))}

        {/* ALVED ring - animated rotation */}
        <motion.g
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 60, ease: "linear", repeat: Infinity }}
          style={{ transformOrigin: "300px 300px" }}
        >
          <circle
            cx="300"
            cy="300"
            r="220"
            fill="none"
            stroke="url(#ringGrad)"
            strokeWidth="1.5"
          />
          {[0, 60, 120, 180, 240, 300].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            const cx = 300 + 220 * Math.cos(rad);
            const cy = 300 + 220 * Math.sin(rad);
            return (
              <circle
                key={deg}
                cx={cx}
                cy={cy}
                r="2"
                fill="#3d7a5d"
                fillOpacity="0.55"
              />
            );
          })}
        </motion.g>

        {/* Connecting arcs between products */}
        <g stroke="#0f0f0e" strokeOpacity="0.12" strokeWidth="1" fill="none">
          <path d="M 300 80 Q 300 300 491 410" />
          <path d="M 491 410 Q 300 300 109 410" />
          <path d="M 109 410 Q 300 300 300 80" />
        </g>

        {/* VERO - top, ink (the live one) */}
        <motion.g
          initial={reduce ? false : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.g
            animate={reduce ? undefined : { y: [0, -6, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "300px 80px" }}
          >
            <circle
              cx="300"
              cy="80"
              r="62"
              fill="url(#orbVero)"
              filter="url(#softShadow)"
            />
            <circle cx="300" cy="80" r="62" fill="none" stroke="#3d7a5d" strokeOpacity="0.35" />
            <text
              x="300"
              y="86"
              textAnchor="middle"
              fontFamily="ui-serif, Georgia, serif"
              fontSize="22"
              fontWeight="500"
              fill="#fafaf7"
              letterSpacing="-0.5"
            >
              Vero
            </text>
            <circle cx="300" cy="115" r="2.5" fill="#3d7a5d" />
          </motion.g>
          {showLabels && (
            <text
              x="300"
              y="170"
              textAnchor="middle"
              fontSize="10"
              letterSpacing="3"
              fill="#5b5b56"
              fontFamily="ui-sans-serif, system-ui"
              style={{ textTransform: "uppercase" }}
            >
              Work · live
            </text>
          )}
        </motion.g>

        {/* RIE - bottom-right */}
        <motion.g
          initial={reduce ? false : { opacity: 0, x: 14, y: 14 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        >
          <motion.g
            animate={reduce ? undefined : { y: [0, 6, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            style={{ transformOrigin: "491px 410px" }}
          >
            <circle
              cx="491"
              cy="410"
              r="56"
              fill="url(#orbRie)"
              stroke="#dcdcd4"
              filter="url(#softShadow)"
            />
            <text
              x="491"
              y="416"
              textAnchor="middle"
              fontFamily="ui-serif, Georgia, serif"
              fontSize="20"
              fontWeight="500"
              fill="#0f0f0e"
              letterSpacing="-0.5"
            >
              RIE
            </text>
          </motion.g>
          {showLabels && (
            <text
              x="491"
              y="495"
              textAnchor="middle"
              fontSize="10"
              letterSpacing="3"
              fill="#878780"
              fontFamily="ui-sans-serif, system-ui"
              style={{ textTransform: "uppercase" }}
            >
              Discipline · soon
            </text>
          )}
        </motion.g>

        {/* TROVE - bottom-left */}
        <motion.g
          initial={reduce ? false : { opacity: 0, x: -14, y: 14 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
        >
          <motion.g
            animate={reduce ? undefined : { y: [0, 5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            style={{ transformOrigin: "109px 410px" }}
          >
            <circle
              cx="109"
              cy="410"
              r="56"
              fill="url(#orbTrove)"
              stroke="#dcdcd4"
              filter="url(#softShadow)"
            />
            <text
              x="109"
              y="416"
              textAnchor="middle"
              fontFamily="ui-serif, Georgia, serif"
              fontSize="18"
              fontWeight="500"
              fill="#0f0f0e"
              letterSpacing="-0.5"
            >
              Trove
            </text>
          </motion.g>
          {showLabels && (
            <text
              x="109"
              y="495"
              textAnchor="middle"
              fontSize="10"
              letterSpacing="3"
              fill="#878780"
              fontFamily="ui-sans-serif, system-ui"
              style={{ textTransform: "uppercase" }}
            >
              Value · soon
            </text>
          )}
        </motion.g>

        {/* Center mark - quiet ALVED node, no announcement */}
        <g>
          <circle
            cx="300"
            cy="300"
            r="22"
            fill="#fafaf7"
            stroke="#0f0f0e"
            strokeOpacity="0.1"
          />
          <text
            x="300"
            y="297"
            textAnchor="middle"
            fontSize="8"
            letterSpacing="3"
            fill="#878780"
            fontFamily="ui-sans-serif, system-ui"
            style={{ textTransform: "uppercase" }}
          >
            One
          </text>
          <text
            x="300"
            y="310"
            textAnchor="middle"
            fontSize="8"
            letterSpacing="3"
            fill="#878780"
            fontFamily="ui-sans-serif, system-ui"
            style={{ textTransform: "uppercase" }}
          >
            protocol
          </text>
        </g>

        {/* Subtle traveling pulse along the ring */}
        {!reduce && (
          <motion.circle
            r="3"
            fill="#3d7a5d"
            animate={{
              offsetDistance: ["0%", "100%"],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            style={{
              offsetPath: "path('M 300 80 A 220 220 0 1 1 299.99 80')",
            }}
          />
        )}
      </svg>
    </div>
  );
}

