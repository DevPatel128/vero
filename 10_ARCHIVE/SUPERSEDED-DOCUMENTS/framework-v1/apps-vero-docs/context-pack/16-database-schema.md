# 16 — Database Schema

## Engine
**Supabase Postgres 16.** Row-Level Security (RLS) ON for every public-schema table.

## Tables (canonical)

### `users`
```
id              uuid pk
handle          text unique
phone_e164      text unique
email           text unique nullable
kind            enum('worker','business','admin')
display_name    text
neighborhood    text
locale          text default 'en-IN'
kyc_status      enum('none','pending','verified','revoked')
trust_score     numeric(5,2)
created_at      timestamptz
updated_at      timestamptz
deleted_at      timestamptz nullable
```
RLS: each row readable by `id = auth.uid()` or by admin role.

### `businesses`
```
id              uuid pk references users(id)
name            text
gst             text nullable
pan             text nullable
business_type   text
verified_at     timestamptz nullable
```

### `jobs`
```
id              uuid pk
business_id     uuid fk users
title           text
description     text
category        text
neighborhood    text
geo_lat         double precision
geo_lng         double precision
pay_inr         numeric(10,2)
state           enum('draft','open','pending_acceptance','in_progress','completed','disputed','cancelled')
escrow_state    enum('none','init','funded','released','refunded')
posted_at       timestamptz
expires_at      timestamptz
```
Indices: `(neighborhood, category, state)`, `(geo_lat, geo_lng)` via PostGIS, `(business_id, state)`.

### `applications`
```
id              uuid pk
job_id          uuid fk
worker_id       uuid fk users
state           enum('applied','accepted','rejected','withdrawn')
applied_at      timestamptz
```

### `alved_records` (append-only)
```
id              ulid pk
subject         text fk users.handle
surface         enum('work','discipline','value')
category        text
occurred_at     timestamptz
geo             jsonb
metric          jsonb
verifier        jsonb
attestations    jsonb        -- array of { signer, publicKey, signature, signedAt, role }
visibility      enum('public','shared','private')
body_canonical  text         -- the canonical JSON used to compute body_hash
body_hash       text         -- sha256
prev_hash       text         -- sha256 of prior record per subject
created_at      timestamptz
```
Constraints: `INSERT` only. No `UPDATE` / `DELETE` via RLS.
Indices: `(subject, occurred_at desc)`, `(category, occurred_at desc)`, `(geo->>'city', geo->>'neighborhood')`.

### `attestation_keys`
```
user_id         uuid fk
public_key      text (SPKI base64)
created_at      timestamptz
revoked_at      timestamptz nullable
```

### `escrow_events`
```
id              uuid pk
job_id          uuid fk
event_type      text
amount_inr      numeric(10,2)
razorpay_ref    text
verified_sig    bool
occurred_at     timestamptz
```

### `disputes`
```
id              uuid pk
job_id          uuid fk
opened_by       uuid fk users
state           enum('open','reviewing','resolved_worker','resolved_business','cancelled')
opened_at       timestamptz
resolved_at     timestamptz nullable
admin_notes     text nullable
```

### `audit_log`
```
id              uuid pk
actor_id        uuid fk users
action          text
target_type     text
target_id       text
metadata        jsonb
ip              inet
user_agent      text
occurred_at     timestamptz
```
Partitioned by month. Retention: 7 years for financial events, 1 year otherwise.

### `notifications`
```
id              uuid pk
user_id         uuid fk
channel         enum('email','sms','push','in_app')
template        text
payload         jsonb
sent_at         timestamptz nullable
read_at         timestamptz nullable
```

### `referrals`
```
id              uuid pk
referrer_id     uuid fk
referee_id      uuid fk
state           enum('pending','activated','expired')
activated_at    timestamptz nullable
```

## Row-Level Security policies
- `users`: row visible if `id = auth.uid()` OR caller has admin role.
- `jobs`: visible to all authenticated; mutations restricted to `business_id = auth.uid()`.
- `alved_records`: `SELECT` if visibility is public OR `subject = auth.uid()` OR shared-link signed token; `INSERT` only via edge function with verified signatures.
- `audit_log`: `SELECT` admin-only.
- `escrow_events`: `SELECT` for involved parties only.

## Backups
- PITR enabled.
- Daily full snapshot.
- Cross-region replica (warm).
- Monthly restore test.

## Migrations
- Managed via Supabase migrations + `sqlx` or `kysely` in CI.
- Each migration includes a `down`.
- Breaking changes go through deprecation window.

## Future extensions
- Anchor merkle root of new ALVED records to an external public ledger.
- Move full-text search to Typesense if Postgres FTS struggles at scale.

