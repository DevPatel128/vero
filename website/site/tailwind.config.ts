import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ink: {
          50: "#f7f7f5",
          100: "#eeeeea",
          200: "#dcdcd4",
          300: "#b8b8ad",
          400: "#878780",
          500: "#5b5b56",
          600: "#3f3f3c",
          700: "#2c2c2a",
          800: "#1c1c1b",
          900: "#0f0f0e",
          950: "#070706",
        },
        paper: {
          DEFAULT: "#fafaf7",
          warm: "#f3f1ec",
        },
        accent: {
          DEFAULT: "#1f3a2e",
          soft: "#2c5743",
          glow: "#3d7a5d",
        },
        trust: "#0e4a36",
        proof: "#7a5d2c",
        caution: "#9a6b1f",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: [
          "var(--font-sans)",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      letterSpacing: {
        tightish: "-0.015em",
        tighter: "-0.025em",
      },
      maxWidth: {
        content: "1120px",
        prose: "68ch",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      boxShadow: {
        card: "0 1px 0 0 rgba(15,15,14,0.04), 0 1px 3px 0 rgba(15,15,14,0.06)",
        lift: "0 10px 30px -10px rgba(15,15,14,0.18)",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;

