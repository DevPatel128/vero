# DESIGN.md — VERO Freelance Marketing Surface

## Color (OKLCH, brand register)

Strategy: **Committed-but-quiet**. Tinted graphite neutrals carry 85% of the surface. One champagne signal color carries the brand voice. Verification cyan appears only at trust-system marks. Beige-and-slate without commitment is the failure mode; refuse it. The signal is not "accent dust" — it appears at scale at the verification climax (page section 4) and the hero's living graph.

Dark (default scene: operator, late evening, considering a career pivot, dim ambient):
- `--surface-0`: oklch(0.14 0.005 240) — graphite base
- `--surface-1`: oklch(0.17 0.006 240) — raised
- `--surface-2`: oklch(0.21 0.006 240) — card
- `--ink-0`: oklch(0.96 0.004 240) — primary text
- `--ink-1`: oklch(0.78 0.005 240) — secondary
- `--ink-2`: oklch(0.56 0.005 240) — tertiary / mono
- `--ink-3`: oklch(0.38 0.006 240) — disabled / rule
- `--accent`: oklch(0.78 0.06 95) — restrained warm metallic (champagne)
- `--accent-glow`: oklch(0.85 0.09 95) — for focus + key marks only
- `--signal`: oklch(0.72 0.08 200) — verification cyan, used sparingly

Light (default scene: client, weekday morning, evaluating a hire on a 14" laptop):
- `--surface-0`: oklch(0.985 0.003 95) — deep paper white
- `--surface-1`: oklch(0.965 0.004 95)
- `--surface-2`: oklch(0.94 0.005 95)
- `--ink-0`: oklch(0.16 0.006 240)
- `--ink-1`: oklch(0.32 0.006 240)
- `--ink-2`: oklch(0.5 0.006 240)
- `--ink-3`: oklch(0.7 0.006 240)
- `--accent`: oklch(0.5 0.07 95)
- `--accent-glow`: oklch(0.62 0.09 95)
- `--signal`: oklch(0.46 0.09 200)

Rules:
- Never `#000` or `#fff`.
- Accent ≤ 10% of any viewport.
- Verification cyan only for trust-system marks (signature, hash, escrow).

## Typography

**Anti-editorial-typographic escape.** The reflex for a "trust/serious/infrastructure" brief is display-serif headlines + italic + tracked-uppercase mono labels. Saturated lane. We refuse it.

Voice words: precise, infrastructural, earned. (Not "elegant", not "warm".)

Primary: **Geist Sans** (Vercel, OFL). Variable. 400 / 500 / 600 / 700. -0.018em tracking on display, -0.005em on body. Hero + all headings. Strong weight contrast inside a single family carries the voice.
Editorial accent: **Spectral** (Production Type, OFL). Italic 500. **Used only at manifesto-grade pull-quotes (1–2 places per page max).** Never as section headings, never as kicker labels, never tracked-uppercase. Subverts the editorial-typographic formula by appearing as a quoted human voice inside an otherwise sans surface.
Mono: **Geist Mono**. Used only for hashes, IDs, signature glyphs, timestamps. Never decoratively.

Banned in this project:
- Tracked-uppercase mono section-kickers above every heading (template scaffold).
- Display italic in headings (editorial cliché).
- Ruled separator lines above every section title.
- Drop caps.

Scale (rem, modular 1.250):
- micro 0.75 / caption 0.8125 / body 1 / lead 1.125 / h6 1.25 / h5 1.5625 / h4 1.953 / h3 2.441 / h2 3.052 / h1 3.815 / display 4.768 / mega 6.5

Hero h1: clamp(2.75rem, 6.4vw + 0.5rem, 7rem).
Body line length: 62–72ch.

## Elevation

- Layer 0: `--surface-0` (page)
- Layer 1: `--surface-1` + border 1px `--ink-3` @ 22% opacity
- Layer 2: `--surface-2` + border 1px `--ink-3` @ 30% + shadow `0 1px 0 0 oklch(0 0 0 / 0.04), 0 40px 60px -30px oklch(0 0 0 / 0.32)`
- Glass: applied only on hero / verification-system reveal. `backdrop-filter: blur(24px) saturate(140%)`. Borders required.

## Motion

Curves: `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out-expo) primary. `cubic-bezier(0.22, 1, 0.36, 1)` for micro-interactions.
Durations: 180ms (micro) / 320ms (reveal) / 600ms (scene change) / 1100ms (execution-graph node birth).
Never animate layout (width/height/top/left). Transform + opacity + filter only.
Magnetic CTAs: 12px translate radius, 240ms snap, 1.02 scale.
Respect `prefers-reduced-motion`.

## Spacing

8pt grid. Major rhythm: 24 / 48 / 96 / 144 / 192. Vary deliberately for cadence. Never uniform section padding.

## Borders + radii

Borders: 1px hairlines, `--ink-3` low-opacity. No 2px+ side stripes.
Radii: 4 (input), 12 (card), 20 (panel), 999 (pill). No mixed radii in one composition.

## Component banlist (project-specific)

- No card grids of 4 identical icon+title+body tiles.
- No "trusted by" logo strip placed below hero.
- No big-number metric strip (8M users / 99.99% / 5x) anywhere.
- No gradient text.
- No purple. No neon. No holographic anything.
- No floating Lottie chatbot.

## Acceptable signature moves

- Hero living execution graph (nodes appear over time, hashes stamp edges).
- Editorial pull-quotes set in display serif at 4–6rem, single column.
- Hairline numbered section markers (01 / 02 / 03 in mono).
- Inline signature glyphs (W ✕ C) flanking key trust statements.
- Asymmetric two-column layouts with deliberate negative space.

## Accessibility

WCAG AA minimum, AAA on body. Visible focus rings (2px accent-glow, 4px offset). Keyboard reachable in source order. Reduced-motion full bypass. Semantic landmarks (header / main / nav / footer / section + aria-labelledby).
