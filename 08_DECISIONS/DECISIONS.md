# Decisions

> Status: Review · Owner: Dev Patel · Version: 2 · Last updated: 2026-09-28
> Source: The Framework. (imported unchanged apart from this header)

A permanent record of important product and engineering decisions.

## Index

| Date | Decision | Area | Status |
|---|---|---|---|
| 2026-09-22 | [Adopt The Framework and the numbered documentation system](ENGINEERING/2026-09-adopt-framework.md) | Engineering | Proposed |
| 2026-09-22 | [Stay on Vercel and Upstash; defer Cloudflare and Supabase](ENGINEERING/2026-09-stay-on-vercel-upstash.md) | Engineering | Proposed |
| 2026-09-22 | [Remove Sentry and PostHog from website/site](ENGINEERING/2026-09-remove-sentry-posthog.md) | Engineering | Proposed |
| 2026-09-22 | [@rie/crypto vs. direct libraries — unresolved, scoped to the archived app](ENGINEERING/2026-09-crypto-rie-vs-direct-libs.md) | Engineering | Proposed |
| 2026-09-22 | [Open contradictions found while adopting the framework](PRODUCT/2026-09-open-contradictions.md) | Product | Proposed |
| 2026-09-28 | [Adopt the Wolf v3 framework, replacing v2](ENGINEERING/2026-09-adopt-wolf-framework.md) | Engineering | Proposed |

New entries use the template below and add a row here. Never delete a row; move it to `10_ARCHIVE/OLD-DECISIONS/` and note the supersession if a decision is later reversed.

## Template

### [DATE] — [Decision title]

**Status:** Proposed / Approved / Rejected / Superseded

**Decision**

What was decided?

**Why should we make this change?**

What problem or opportunity requires it?

**Impact**

What will change?
What results should it yield?
What risks or trade-offs exist?

**Evidence**

What research or user evidence supports it?

**Alternatives**

What else was considered?

**How**

How will the decision be implemented?

**Cost**

What will it cost?

**Lower-cost alternatives**

Can the same result be achieved more cheaply?

**Cost justification**

Is the cost justified against the expected value and requirements?

**Reason**

Why was this option selected?

**Consequences**

What changes because of this decision?

**Revisit condition**

What evidence would justify reopening it?

**Approved by**

**Date**

---

## Rules

- Record meaningful decisions, not trivial implementation details.
- Never silently reverse an approved decision.
- Reopening a decision requires new evidence or a material change in context.
- Prefer the lowest-cost option that satisfies required security, reliability, performance, compliance and user-value requirements.
