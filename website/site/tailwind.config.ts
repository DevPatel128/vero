import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        surface: {
          0: "var(--surface-0)",
          1: "var(--surface-1)",
          2: "var(--surface-2)",
          3: "var(--surface-3)",
          inverse: "var(--surface-inverse)",
        },
        ink: {
          0: "var(--ink-0)",
          1: "var(--ink-1)",
          2: "var(--ink-2)",
          3: "var(--ink-3)",
          inverse: "var(--ink-inverse)",
        },
        line: {
          DEFAULT: "var(--line)",
          strong: "var(--line-strong)",
          faint: "var(--line-faint)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          glow: "var(--accent-glow)",
          ink: "var(--accent-ink)",
        },
        signal: {
          DEFAULT: "var(--signal)",
          soft: "var(--signal-soft)",
        },
        caution: "var(--caution)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        editorial: ["var(--font-editorial)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      fontSize: {
        "micro": ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.005em" }],
        "caption": ["0.8125rem", { lineHeight: "1.45", letterSpacing: "0.001em" }],
        "body": ["1rem", { lineHeight: "1.6", letterSpacing: "-0.005em" }],
        "lead": ["1.125rem", { lineHeight: "1.55", letterSpacing: "-0.008em" }],
        "h6": ["1.25rem", { lineHeight: "1.4", letterSpacing: "-0.012em" }],
        "h5": ["1.5625rem", { lineHeight: "1.3", letterSpacing: "-0.014em" }],
        "h4": ["1.953rem", { lineHeight: "1.18", letterSpacing: "-0.018em" }],
        "h3": ["2.441rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "h2": ["3.052rem", { lineHeight: "1.04", letterSpacing: "-0.024em" }],
        "h1": ["3.815rem", { lineHeight: "1.0", letterSpacing: "-0.028em" }],
        "display": ["4.768rem", { lineHeight: "0.98", letterSpacing: "-0.032em" }],
        "mega": ["6.5rem", { lineHeight: "0.94", letterSpacing: "-0.038em" }],
      },
      letterSpacing: {
        precise: "-0.018em",
        tightish: "-0.012em",
        tighter: "-0.024em",
      },
      maxWidth: {
        prose: "68ch",
        content: "1240px",
        wide: "1400px",
      },
      borderRadius: {
        none: "0",
        xs: "3px",
        sm: "6px",
        DEFAULT: "10px",
        md: "12px",
        lg: "16px",
        xl: "22px",
        "2xl": "28px",
        pill: "999px",
      },
      boxShadow: {
        hairline: "0 0 0 1px var(--line)",
        card: "0 1px 0 0 oklch(0 0 0 / 0.04), 0 1px 3px 0 oklch(0 0 0 / 0.06)",
        lift: "0 24px 60px -28px oklch(0 0 0 / 0.4), 0 8px 24px -12px oklch(0 0 0 / 0.22)",
        glow: "0 0 0 1px var(--accent-glow), 0 0 24px -4px var(--accent-glow)",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.16, 1, 0.3, 1)",
        micro: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      transitionDuration: {
        micro: "180ms",
        reveal: "320ms",
        scene: "600ms",
      },
      backdropBlur: {
        glass: "24px",
      },
      keyframes: {
        breathe: {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        sweep: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        grow: {
          "0%": { strokeDashoffset: "1", opacity: "0" },
          "60%": { opacity: "1" },
          "100%": { strokeDashoffset: "0", opacity: "1" },
        },
      },
      animation: {
        breathe: "breathe 2.4s ease-in-out infinite",
        sweep: "sweep 1.6s cubic-bezier(0.16, 1, 0.3, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
