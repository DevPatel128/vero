# 06 — The Quality Bar (Apple-grade)

Quality is what people remember. The framework prescribes a quality bar so high that every shipped surface looks indistinguishable from a funded startup MVP — and feels safe enough that users entrust identity, money, value, or discipline records to it.

## The four gates

Every PR passes through four gates before merge:

### 1. Quality
- Lighthouse Performance ≥ 90 on the route touched.
- a11y violations = 0 (axe-playwright).
- Zero broken links on the changed routes.
- Visual regression approved if `@vroe/ui` is touched.
- No console errors / warnings on the touched routes.
- Bundle budget not breached.

### 2. Security
- No new public route accepts unsigned input.
- No new secret in code.
- Headers unchanged or improved.
- Crypto only via `@vroe/crypto` / `@<org>/crypto`.
- No new SQL via string concatenation.
- No new third-party script unless reviewed.

### 3. Effortless UX
- The touched flow is reachable from the place users expect.
- Empty / loading / error / forbidden states all present.
- Microcopy reads naturally aloud.
- Keyboard works.
- Reduced motion works.
- Mobile (360px) works.

### 4. Compliance
- Region-aware copy where applicable.
- New PII captured? Updated privacy notice.
- New cross-border transfer? Updated mechanism.
- New consent surface? Withdrawal as easy as giving.

A PR that fails any gate does not merge.

## Beyond the gates — the Apple-grade test

Apple-grade is a feeling, not a checklist. The closest test: imagine the surface on a friend's screen, in 2030, three years after launch. Would you be embarrassed by anything you wrote, designed, or shipped?

If yes, rework it before shipping.

## Concrete examples

### A button
- Has hover + focus + active + disabled + loading states.
- Verb in the label. ("Apply", not "Submit").
- Touch target ≥ 44px on mobile.
- Spacing matches tokens.

### A page
- Has its own Lighthouse score above gate.
- Has its own JSON-LD that validates.
- Has its own canonical URL.
- Has its own OG image (real, not placeholder).
- Has its own breadcrumb.
- Has its own copy file (`/website/<product>/pages/<slug>.md`).

### An API endpoint
- Validates inputs with Zod.
- Has idempotency where mutating.
- Has rate limit.
- Has audit log entry where trust-affecting.
- Has a TypeScript test.
- Has an OpenAPI entry.

### A piece of marketing copy
- Reads aloud naturally.
- Has a primary keyword exactly once.
- Has an FAQ section with FAQPage schema.
- Has no banned words.
- Has compliance review where touching sensitive surfaces.

## Why this works

Quality compounds. The first 50 shipped surfaces set the bar. Every later surface inherits the standard. Engineers, designers, writers, agents — all calibrate to the same level.

The cost is real. Some PRs take twice as long. We accept that.

## Anti-patterns

- "Ship it now, fix it later."
- Lighthouse "we'll do that for marketing later".
- Empty states as TODO.
- Mobile breakpoints as TODO.
- "Just put a placeholder image."
- "We'll write the compliance copy after launch."

If you find yourself saying any of these, stop. The framework rejects them.

