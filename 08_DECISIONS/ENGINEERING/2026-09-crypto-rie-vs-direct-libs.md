# @rie/crypto vs. direct libraries — unresolved, scoped to the archived app

> Status: Proposed · Owner: Dev Patel · Version: 1 · Last updated: 2026-09-22

**Status:** Proposed (records an open conflict; does not resolve it)

**Decision**

No decision yet. This records a real conflict found during the audit so it is not lost, and scopes it: it affects only `09_ARCHIVE/SUPERSEDED-DOCUMENTS/vero-app-application/` (archived, not deployed), not `website/site` (the live marketing site has no auth/crypto surface at all).

**Why should we make this change?**

The pre-framework root `CLAUDE.md` (now archived) and the old `SECURITY_IMPLEMENTATION.md` mandated `@rie/crypto` exclusively — "never DIY JWT, hashing, or encryption" — for Argon2id password hashing and RS256 JWTs. The archived `application/` prototype instead used `@node-rs/argon2` and `jose` directly, with its own `CLAUDE.md` explicitly permitting Supabase's own HS256 session tokens and reserving RS256 only for custom tokens. Neither document was updated to reconcile with the other; `@rie/crypto` itself does not appear to exist anywhere in this repo (no package, no reference outside the policy documents), suggesting the rule may predate `application/`'s actual implementation approach, or `@rie/crypto` was planned but never built.

**Impact**

None today: `application/` is archived and not deployed, and `website/site` has no authentication of its own. This becomes live only if `application/` (or any future auth-bearing product) is revived.

**Evidence**

`09_ARCHIVE/SUPERSEDED-DOCUMENTS/CLAUDE.md.pre-framework` §12; `09_ARCHIVE/SUPERSEDED-DOCUMENTS/2026-05-root-legacy/SECURITY_IMPLEMENTATION.md`; `09_ARCHIVE/SUPERSEDED-DOCUMENTS/vero-app-application/CLAUDE.archived.md`; `09_ARCHIVE/SUPERSEDED-DOCUMENTS/vero-app-application/src/lib/crypto/{password,tokens}.ts`.

**Alternatives**

(a) Build `@rie/crypto` as specified and require the archived app to migrate to it before revival. (b) Formally drop the `@rie/crypto`-only rule and standardize on well-maintained direct libraries (`@node-rs/argon2`, `jose`), which is what the app prototype already does and are themselves audited, widely-used primitives. (c) Leave both documents as-is and decide only when `application/` is actually revived.

**How**

Not implemented. A human should pick (a), (b), or (c) before `application/` leaves `09_ARCHIVE/`.

**Cost**

Option (a): building and maintaining a shared crypto package. Option (b): $0, uses existing dependencies. Option (c): $0 now, defers the decision.

**Lower-cost alternatives**

(b) or (c) are both near-zero-cost compared to (a).

**Cost justification**

Not yet applicable; no option has been chosen.

**Reason**

Not yet decided. Recorded here specifically so a future revival of `application/` does not silently pick one convention without addressing the conflict.

**Consequences**

`09_ARCHIVE/SUPERSEDED-DOCUMENTS/vero-app-application/ARCHIVED.md` already points here. Reviving that app should read this decision first.

**Revisit condition**

Any decision to move `application/` (or a successor) out of `09_ARCHIVE/` and toward deployment.

**Approved by**

(pending)

**Date**

(pending)
