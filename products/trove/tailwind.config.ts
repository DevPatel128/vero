import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{ts,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", md: "2rem", lg: "2.5rem" },
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        trove: {
          cream: "#FAF7F2",
          salmon: "#F2DFCE",
          salmonDeep: "#E8C8AC",
          gold: "#C9A96E",
          goldDeep: "#A8884F",
          ink: "#111111",
          subtle: "#595959",
          line: "#E5E0D8",
          paper: "#FFFFFF",
          surface: "#F4EFE6",
          success: "#3B7A3D",
          warning: "#B8860B",
          danger: "#9A2A2A",
        },
        background: "var(--bg)",
        foreground: "var(--fg)",
        card: { DEFAULT: "var(--card)", foreground: "var(--card-fg)" },
        popover: { DEFAULT: "var(--popover)", foreground: "var(--popover-fg)" },
        primary: { DEFAULT: "var(--primary)", foreground: "var(--primary-fg)" },
        secondary: { DEFAULT: "var(--secondary)", foreground: "var(--secondary-fg)" },
        muted: { DEFAULT: "var(--muted)", foreground: "var(--muted-fg)" },
        accent: { DEFAULT: "var(--accent)", foreground: "var(--accent-fg)" },
        destructive: { DEFAULT: "var(--destructive)", foreground: "var(--destructive-fg)" },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
        serif: ["Georgia", "Times New Roman", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(3rem, 6vw, 5rem)", { lineHeight: "1.04", letterSpacing: "-0.025em", fontWeight: "400" }],
        "display-lg": ["clamp(2.25rem, 4.5vw, 3.75rem)", { lineHeight: "1.05", letterSpacing: "-0.022em", fontWeight: "400" }],
        "display-md": ["clamp(1.75rem, 3.5vw, 2.75rem)", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "400" }],
        "display-sm": ["clamp(1.5rem, 2.5vw, 2rem)", { lineHeight: "1.15", letterSpacing: "-0.015em", fontWeight: "500" }],
        "eyebrow": ["0.75rem", { lineHeight: "1.5", letterSpacing: "0.18em", fontWeight: "600" }],
      },
      borderRadius: {
        none: "0",
        sm: "2px",
        DEFAULT: "4px",
        md: "4px",
        lg: "4px",
        xl: "4px",
        "2xl": "4px",
        full: "9999px",
      },
      boxShadow: {
        none: "none",
        flat: "0 0 0 1px var(--border)",
        "flat-strong": "0 0 0 1.5px var(--ring)",
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-out both",
        "fade-up": "fadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) both",
        "scale-in": "scaleIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) both",
        shimmer: "shimmer 1.6s linear infinite",
        marquee: "marquee 28s linear infinite",
      },
      keyframes: {
        fadeIn: { from: { opacity: "0" }, to: { opacity: "1" } },
        fadeUp: { from: { opacity: "0", transform: "translateY(8px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        scaleIn: { from: { opacity: "0", transform: "scale(0.98)" }, to: { opacity: "1", transform: "scale(1)" } },
        shimmer: { "0%": { backgroundPosition: "-200% 0" }, "100%": { backgroundPosition: "200% 0" } },
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
      },
      transitionTimingFunction: {
        fluid: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
