# 05 — Compliance Pattern

Compliance is shipped as **code, copy, and config** — not as a binder. The framework requires:

1. One central matrix: `docs/COMPLIANCE.md`.
2. Per-region privacy pages in `/website/shared/legal/`.
3. Engineering control mapping in the same matrix.
4. Per-product compliance shorthand in each context pack (`12-security-rules.md`).
5. A compliance owner with PR-blocking authority on the matrix.

## The matrix

The matrix lists every jurisdiction the product line plans to operate in. For each, it captures:

- The primary law(s).
- Lawful basis + consent rules.
- User rights.
- Children's rules.
- Cross-border transfer rules.
- Breach notification timelines.
- Penalties.

See [`/docs/COMPLIANCE.md`](../docs/COMPLIANCE.md) for the populated version.

## How the matrix becomes enforceable

- **Marketing copy** — the matrix tells the writer what claims are forbidden and what disclosures are required per region.
- **Onboarding** — the matrix dictates age gates, consent banners, parental consent flows.
- **Storage** — encryption at rest, residency, retention schedules.
- **Auth** — MFA where required, OTP handling, session controls.
- **Logging** — audit log retention, redaction rules.
- **Subpoena response** — what we can / cannot produce.

## Region selection

The framework supports two patterns:

1. **One global product with regional editions.** Default privacy page + per-region children pages.
2. **Hard-gated per region** — separate infrastructure for jurisdictions with localization mandates (e.g., China PIPL).

Decide pattern per product at the strategy stage.

## Control mapping

Every control in the matrix has:

- A name.
- A pointer to where it lives (code, copy, config).
- An owner.
- A test or audit.

## Updates

- **Quarterly review** of the matrix.
- **On regulator change** — patch the matrix, then the controls, then user notice.
- **PR rule** — any change to `docs/COMPLIANCE.md` requires compliance-owner approval + a corresponding update to affected surfaces in the same PR.

## Anti-patterns

- A privacy page that says "we comply with all applicable laws". (Useless.)
- A consent banner with pre-ticked boxes. (Illegal in many places.)
- A "global terms" page that contradicts a region-specific page. (Confusing.)
- Compliance addressed only at launch. (Painful.)

## Smell test

If a feature spec sentence ends with _"and we'll figure out the privacy / compliance stuff later"_ — the framework rejects it. Privacy / compliance live alongside the feature spec, not after.

