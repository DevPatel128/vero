# Design System

> Status: Draft · Owner: Dev Patel · Version: 1 · Last updated: 2026-09-23
> Sources: Documents/11; 10_ARCHIVE/SUPERSEDED-DOCUMENTS/CLAUDE.md.pre-framework §6; website/site/src/app/globals.css, website/site/tailwind.config.ts (verified against the implementation, 2026-09-22)

## Visual goals

Calm, intelligent, premium, minimal, app-like, trustworthy. For a pre-launch product, the design carries as much of the brand promise as the copy does.

## Color

OKLCH color space. Strategy: tinted graphite neutrals carry most of the surface; one champagne accent carries brand voice; a signal cyan is reserved for verification marks only.

**Verified in code (`website/site/src/app/globals.css`), dark mode (default):**

```
--surface-0: oklch(0.142 0.006 240)   --ink-0: oklch(0.965 0.004 95)
--surface-1: oklch(0.176 0.007 240)   --ink-1: oklch(0.78 0.005 240)
--surface-2: oklch(0.212 0.007 240)   --ink-2: oklch(0.56 0.005 240)
--surface-3: oklch(0.252 0.008 240)   --ink-3: oklch(0.38 0.006 240)
--accent:      oklch(0.81 0.07 92)
--accent-glow: oklch(0.87 0.10 92)
--signal:      oklch(0.74 0.085 200)
--caution:     oklch(0.76 0.12 60)
```

Light mode uses the same token names with inverted lightness (see `globals.css` for exact values). Every token is a CSS custom property, redefined under `@media (prefers-color-scheme: light)` and `:root[data-theme]`, and mapped into Tailwind via `tailwind.config.ts`'s `colors.surface`, `colors.ink`, `colors.accent`, `colors.signal`, `colors.caution`.

**Color rules** (`Documents/11`): never pure `#000` or `#fff`; the accent covers no more than ~10% of any screen; signal cyan is reserved for verification-system marks (signature, hash, escrow), not general UI.

**Known gap, verified in code:** several classes used in `website/site/src` have no corresponding definition in `tailwind.config.ts` or `globals.css` — `text-ink-900`, `bg-paper`, `bg-trust`, `bg-ink-950`, and similar. Tailwind silently omits CSS for a class it cannot resolve; affected elements fall back to inherited color rather than erroring. Confirmed by grepping the config and stylesheet for these token names: zero matches. Not fixed in this pass — it is a visual change that needs a screenshot diff before shipping (see the perf/seo/a11y commit in this PR's history for why it was deferred).

## Typography

Three typefaces, each with one job (`Documents/11`, matches `website/site/src/app/layout.tsx`'s `next/font/google` usage):

| Role | Font | Usage |
|---|---|---|
| Primary | Geist Sans | Headlines, body, buttons, navigation — almost everything |
| Mono | Geist Mono | Hashes, IDs, signature glyphs, timestamps only — never decorative |
| Editorial | Spectral, italic only | Pull-quotes, 1-2 per page maximum — never headings or labels |

**Type scale** (`website/site/tailwind.config.ts`, rem, roughly modular 1.25): micro 0.75 · caption 0.8125 · body 1 · lead 1.125 · h6 1.25 · h5 1.5625 · h4 1.953 · h3 2.441 · h2 3.052 · h1 3.815 · display 4.768 · mega 6.5.

**Rules:** headlines never italic; tracked-uppercase text above every section header is banned; drop caps banned; body line length 62-72 characters.

## Elevation and layout

**Spacing:** 8-point grid. Major rhythm: 24 / 48 / 96 / 144 / 192px. Section padding varies deliberately rather than staying uniform.

**Radii** (`tailwind.config.ts`): none 0 · xs 3px · sm 6px · DEFAULT 10px · md 12px · lg 16px · xl 22px · 2xl 28px · pill 999px.

**Shadows** (`tailwind.config.ts`): `hairline` (1px outline), `card`, `lift`, `glow` (accent-glow ring, for focus/key marks).

## Motion

Curves (`tailwind.config.ts`): `out` = `cubic-bezier(0.16, 1, 0.3, 1)` (primary), `micro` = `cubic-bezier(0.22, 1, 0.36, 1)`. Durations: `micro` 180ms, `reveal` 320ms, `scene` 600ms.

**Rules** (`Documents/11`): never animate layout properties (width/height/top/left) — transform and opacity only; respect `prefers-reduced-motion` fully.

**Known exception, fixed in this PR:** the homepage hero's `<h1>` and lead paragraph previously used Framer Motion's `initial={{opacity: 0}}`, which Next.js server-renders as an inline style — meaning the page's largest content (its LCP candidate) was invisible until client JS hydrated, and permanently invisible with JS disabled. Rendered as plain, unanimated elements instead; see the perf/seo/a11y commit in this PR's history. Secondary hero elements (status chip, CTA row, proof points) keep their entrance animation.

## Component rules

**Banned** (`Documents/11`): gradient text, purple/neon/holographic colors, decorative 3D glassy elements, "trusted by" logo strips, big-number metric strips, three-up icon-and-title card grids, floating chatbot popups, decorative Lottie animation.

**Reference points:** should feel like Stripe (clarity), Linear (interaction precision), Apple (restraint), Financial Times (editorial seriousness), Patagonia (understated trust). Must never feel like Fiverr/Upwork, generic SaaS templates, crypto/web3, "AI-slop" gradients, or LinkedIn/Behance vanity-profile aesthetics.

## Source of truth

This file describes the token *values* as implemented. `01_PRINCIPLES/PRINCIPLES.md` and this file's rules govern intent; `website/site/src/app/globals.css` and `tailwind.config.ts` are the implementation. If they disagree, that is a bug to fix or a decision to record in `08_DECISIONS/DESIGN/`, not something to silently resolve in either direction.

---

# Responsive

> Status: Draft · Owner: Dev Patel · Version: 1 · Last updated: 2026-09-23
> Sources: 10_ARCHIVE/SUPERSEDED-DOCUMENTS/CLAUDE.md.pre-framework §§7, 18; website/site/tailwind.config.ts (verified 2026-09-22)

## Principle

Mobile-first. Design and build for one-handed use, small screens, slow networks, and lower-end Android devices first; treat desktop as an expansion of the mobile layout, not the other way around.

## Breakpoints (as implemented)

`website/site/tailwind.config.ts` does not override Tailwind's default `screens` map, so the live site uses Tailwind's defaults: `sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px, `2xl` 1536px. No product-specific breakpoint has been defined; if one becomes necessary, add it to `tailwind.config.ts` and record why in `08_DECISIONS/DESIGN/`.

## Requirements

- Touch-first interaction: large tap targets, no interaction that depends on hover alone.
- Sticky, reachable primary actions on mobile rather than actions buried at the bottom of a long scroll.
- Compact, collapsible sections for long content on small screens.
- Minimal input friction: correct input types/`inputMode` on form fields (verified in code: the waitlist email field uses `type="email"` and `inputMode="email"`).
- Layouts must not depend on JavaScript for the content to be visible — see `04_DESIGN/DESIGN-SYSTEM.md`'s note on the hero LCP fix, which was exactly this failure mode (content invisible without JS).

## Performance budget

No formal, measured performance budget exists in this repo as of 2026-09-23. `Documents/12`'s Phase-2+ metrics name explicit *targets* — Lighthouse Performance 90+ on mobile, Accessibility 95+, 99.9%+ uptime — but these are `TARGET`, not measured values; no Lighthouse run is recorded against the current site in this repo. Treat any specific performance number stated elsewhere as a target until a measurement is attached to it.

## Known gap

No Lighthouse CI or bundle-size budget check exists in `05_ENGINEERING/DEPLOYMENT.md`'s pipeline as of this PR. A baseline measurement should be taken before setting an enforced budget, per `05_ENGINEERING/PERFORMANCE.md`'s "measure before optimizing" rule.
