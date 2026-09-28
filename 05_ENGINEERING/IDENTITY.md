# Identity, Authentication & Authorization

> Status: Draft · Owner: Dev Patel · Version: 1 · Last updated: 2026-09-28
> Source: Wolf v3 framework, `05_ENGINEERING/IDENTITY.md` (imported unchanged apart from this header and "Applied in this repo")

Separate:
IDENTITY → AUTHENTICATION → SESSION → AUTHORIZATION → AUDIT.

## Requirements
- unique identity
- secure credential handling
- MFA where risk warrants
- session expiry/revocation
- secure recovery
- RBAC/ABAC as appropriate
- server-side authorization
- object-level authorization
- tenant isolation
- service/agent identities
- least privilege
- audit trail

AI agents must have explicit identities and permissions. Never rely on model instructions as the authorization boundary.

## Applied in this repo

`website/site` has no user accounts and no authentication today — it is a marketing site plus a waitlist form; there is nothing to authenticate. The archived `application/` prototype (`10_ARCHIVE/SUPERSEDED-DOCUMENTS/vero-app-application/`) implemented identity via Supabase auth plus Argon2id password hashing and JOSE-signed tokens (`Documents/10`), but it is unbuilt and not deployed — this file's requirements become live scope only when that layer, or a replacement, ships. When it does, dual-signature work records (`PRODUCT.md`'s core capabilities) require object-level authorization: a record can only be created with both parties' identities attesting to it, which is the product's core trust mechanism, not an incidental access-control detail.
