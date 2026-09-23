# Accessibility

> Status: Draft · Owner: Dev Patel · Version: 1 · Last updated: 2026-09-23
> Sources: Documents/11; website/site/src/app/globals.css (verified 2026-09-22); 05_ENGINEERING/SECURITY/SECURITY.md (CIA framing, not accessibility-specific)

## Standard

WCAG AA minimum across the product, AAA where practical on body content (`Documents/11`, `01_PRINCIPLES/PRINCIPLES.md` rule 16: "accessibility is part of quality," not a checklist at the end).

## Requirements

- All interactive elements reachable and operable by keyboard.
- Visible, clear focus rings.
- Color contrast meets WCAG AA on body content, AAA where possible.
- Semantic HTML: correct heading order, landmark regions, ARIA labels where semantics alone are insufficient.
- Reduced motion fully supported, not just partially degraded.
- A screen reader can navigate the entire product, not just the marketing pages.

## Verified in code (`website/site`, as of 2026-09-22)

- **Skip link:** `.skip-link` in `globals.css`, visible on focus, present in `layout.tsx`.
- **Focus rings:** `:focus-visible` rule in `globals.css` — 2px accent-glow outline pattern, matching `Documents/11`'s stated intent.
- **Reduced motion:** `@media (prefers-reduced-motion: reduce)` block in `globals.css`, plus per-component `useReducedMotion()` checks (Framer Motion) used across 31 components as of the audit performed for this PR.
- **Honeypot fields hidden from assistive tech:** fixed in this PR — both the waitlist and investor forms' honeypot wrapper now carry `aria-hidden="true"` (previously only `tabIndex={-1}`, which keeps a field out of Tab order but not out of a screen reader's linear/virtual-cursor navigation).

## Not yet verified

- **Color contrast:** not measured against WCAG AA/AAA thresholds with an automated tool (axe, Lighthouse) as part of this PR. The undefined-Tailwind-class gap noted in `04_DESIGN/DESIGN-SYSTEM.md` means some elements' actual rendered color depends on inheritance rather than an explicit token, which contrast tooling should check directly rather than assuming from the token list.
- **Screen-reader walkthrough:** no recorded pass with a real screen reader (VoiceOver, NVDA, JAWS) across the live site.
- **Heading order:** not audited page-by-page in this pass.
- **Form error announcement:** whether validation errors are announced to assistive tech (e.g. via `aria-live`) has not been checked.

## Process gap

No accessibility check exists in `05_ENGINEERING/CI-CD/DEPLOYMENT.md`'s CI pipeline as of this PR (typecheck, lint, Playwright, build, npm audit, gitleaks — no axe-core or Lighthouse CI step). Adding one is a reasonable follow-up, not done here since it needs its own pass to fix whatever it finds rather than just report it.

## Rule

Do not claim a WCAG conformance level for the whole product without an actual audit. This file records what has been verified and what has not; treat the "not yet verified" section as open work, not as passing by default.
