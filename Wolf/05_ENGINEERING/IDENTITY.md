# Identity, Authentication & Authorization

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
