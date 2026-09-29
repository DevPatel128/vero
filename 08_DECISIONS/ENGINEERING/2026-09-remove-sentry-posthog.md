# Remove Sentry and PostHog from website/site

> Status: Proposed · Owner: Dev Patel · Version: 1 · Last updated: 2026-09-22

**Status:** Proposed

**Decision**

Remove `@sentry/nextjs`, `posthog-js`, and the associated dead config (`sentry.*.config.ts`, `src/components/Providers.tsx`) from `website/site` rather than wiring them up.

**Why should we make this change?**

Both were dependencies with configuration files present but never actually mounted: `Providers.tsx` (which initializes PostHog) was never imported into `layout.tsx`, and no `instrumentation.ts` wired up the Sentry configs. `/legal/cookies` states no third-party analytics are used, which the dead PostHog config already contradicted in spirit; keeping unused error-tracking and analytics dependencies adds attack surface, dependency-update burden, and confusion (a reader finding `sentry.client.config.ts` reasonably assumes it is active) for zero current benefit.

**Impact**

No behavior change: neither was doing anything. Removes 2 runtime dependencies and 4 files. Reduces `npm audit` surface and dependency count.

**Evidence**

Grepped `layout.tsx` and the whole `src/` tree for `Providers`, `Sentry`, `sentry`, `posthog`: zero references outside the dead files themselves. Confirmed in this PR's `chore(site)` commit.

**Alternatives**

Wire them up properly instead of removing them (rejected here, not because it is a bad idea, but because it is a product/privacy decision — what to monitor, what data leaves the site, and how it reconciles with `/legal/cookies` — that needs a human choice, not a default reinstatement of dead code as this PR ships).

**How**

Deleted the dependencies and files; no replacement added.

**Cost**

$0. Removes cost (dependency maintenance, audit surface) rather than adding it.

**Lower-cost alternatives**

N/A — removal is already the lowest-cost option.

**Cost justification**

Trivial: removing genuinely dead code with a documented privacy claim it already contradicted.

**Reason**

Per `05_ENGINEERING/ENGINEERING.md`'s "smallest practical architecture" principle and `01_PRINCIPLES/PRINCIPLES.md` rule 3 ("simplicity is a product requirement"), unused code that looks active is a liability, not a neutral placeholder.

**Consequences**

`website/site` currently ships with no error tracking and no product analytics at all. `06_OPERATIONS/OBSERVABILITY.md` should record this gap once written, and a future decision to add observability should start from a clean slate rather than resurrecting this dead config.

**Revisit condition**

A real requirement for error tracking or analytics, weighed against `/legal/cookies`'s current no-third-party-analytics claim (which would need updating if analytics is added).

**Approved by**

(pending)

**Date**

(pending)
