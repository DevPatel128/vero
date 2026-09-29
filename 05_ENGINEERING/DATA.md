# Data

> Status: Review · Owner: Dev Patel · Version: 2 · Last updated: 2026-09-28
> Source: The Framework. (imported unchanged apart from this header); merged from `DATA/SUPABASE-AND-DATA.md` and `DATA/VERO-SCHEMA.md` (appended below) into a single flat file when this repo adopted the Wolf v3 layout, content unchanged
> Split from `ENGINEERING.md`: section 5. Section numbers are unchanged so old references still resolve.

## 5. Supabase and data

Use Supabase as the database/auth/data platform when it satisfies the product requirements without unnecessary supporting infrastructure.

```text
User
 ↓
Authentication
 ↓
Authorization
 ↓
Row-Level Security
 ↓
Database operation
 ↓
Auditability
```

### Database requirements

Consider:

- clear schema
- relationships
- primary keys
- foreign keys
- constraints
- indexes
- query efficiency
- pagination
- transactions
- migrations
- backups/recovery
- retention
- deletion
- duplicate prevention
- sensitive-data minimization

Do not optimize database design for hypothetical scale before actual requirements justify it.

---

# Vero: planned data schema

> Status: Draft · Owner: Dev Patel · Version: 1 · Last updated: 2026-09-23
> Sources: 10_ARCHIVE/SUPERSEDED-DOCUMENTS/vero-app-application/migrations/001_initial_schema.sql; 10_ARCHIVE/SUPERSEDED-DOCUMENTS/CLAUDE.md.pre-framework §20

## Status: planned, not deployed

Nothing in this file is live. The production site (`website/site`) stores only waitlist entries in Upstash Redis — see `05_ENGINEERING/DATA.md` for the generic rule and `08_DECISIONS/ENGINEERING/2026-09-stay-on-vercel-upstash.md` for why Supabase is not in use today. This schema exists only in the archived, unreviewed `application/` prototype (`10_ARCHIVE/SUPERSEDED-DOCUMENTS/vero-app-application/migrations/001_initial_schema.sql`).

## Tables (20, as implemented in the archived migration)

`users`, `profiles`, `career_paths`, `cities`, `opportunities`, `bookings`, `payments`, `reviews`, `messages`, `verifications`, `trust_scores`, `portfolio_items`, `dispute_cases`, `referrals`, `badges`, `ambassador_profiles`, `notifications`, `audit_logs`, `user_consents`, `refresh_tokens`.

**CONFLICT:** the archived root `CLAUDE.md` §20 lists only 18 tables — the same list minus `user_consents` and `refresh_tokens`. Both of those exist in the actual migration file and are exactly the tables a DPDP consent record and a JWT refresh-token store would require, so the migration is very likely the more complete, later-written source. Not resolved further here; if `application/` is ever revived, verify against the migration file directly rather than either document's prose description.

## Design intent (from the archived CLAUDE.md §20)

- Separate public profile data, private identity data, verification status, and role metadata.
- Trust-score records store snapshots plus their contributing signals, timestamps, review context, and dispute effects — not a single opaque number (matches `Documents/5`'s multi-signal trust philosophy).
- Booking/opportunity records carry: who booked, who accepted, category, location/city, time/duration, payment state, completion state, review state, dispute state, and proof attachments.
- Portfolio records: images, video links/uploads, descriptions, category tags, verification state, timestamps, related booking references.
- Dispute records: reason, evidence, timestamps, reviewer notes, decision, and impact on trust/payment.

## Compliance-relevant tables

- `user_consents` — DPDP Act Article 5 consent tracking. See `07_BUSINESS/LEGAL-COMPLIANCE.md`.
- `audit_logs` — permanent, 7-year-minimum retention per the compliance intent in `Documents/15`.
- `refresh_tokens` — needed for session revocation; relevant to `08_DECISIONS/ENGINEERING/2026-09-crypto-rie-vs-direct-libs.md`'s open question about which crypto/session approach the app should use if revived.

## Rule

Do not build against this schema without first resolving `08_DECISIONS/ENGINEERING/2026-09-crypto-rie-vs-direct-libs.md` and reviewing the archived app's security posture — it has never been reviewed against `05_ENGINEERING/SECURITY.md`.
