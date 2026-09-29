# Security

> Status: Review · Owner: Dev Patel · Version: 1 · Last updated: 2026-09-21
> Source: The Framework. (imported unchanged apart from this header)
> Split from `ENGINEERING.md`: sections 2, 6-12 and 19 (repository, authentication, authorization, RLS, least privilege, auditability, CIA, data minimization, incident response). Section numbers are unchanged so old references still resolve.

## 2. Repository and GitHub security

Assume the repository may be public.

### Never commit

- API keys
- access tokens
- passwords
- private keys
- certificates containing private material
- database credentials
- production credentials
- `.env` secrets
- production datasets
- unnecessary personal or sensitive data
- internal infrastructure secrets

### Repository requirements

- Use `.gitignore` correctly.
- Keep secrets in environment/secret management systems.
- Use secret scanning where available.
- Use dependency/security scanning where appropriate.
- Pin or lock dependencies.
- Review dependency changes.
- Protect important branches.
- Require review for consequential changes.
- Remove secrets from history if accidentally committed.
- Rotate/revoke exposed credentials immediately.
- Keep examples using placeholders, never real credentials.

### Public-repo test

A repository is public-safe only when publishing the source does not expose credentials, private data or a practical path to unauthorized production access.


## 6. Authentication

Authentication answers:

> Who are you?

Use a trusted identity system where practical.

Consider:

- secure session handling
- credential protection
- account recovery
- session expiration
- multi-factor authentication when risk warrants it
- protection against account enumeration where relevant
- secure logout/revocation

Never treat authentication as authorization.


## 7. Authorization

Authorization answers:

> What are you allowed to do?

Every protected resource/action should have an explicit authorization rule.

```text
Identity
   ↓
Role / permission
   ↓
Resource
   ↓
Action
```

Default to deny when authorization is not established.


## 8. Row-Level Security

For user-specific data in Supabase/PostgreSQL, use RLS where applicable.

Policies should enforce the actual ownership/authorization boundary.

Do not rely only on frontend checks.

Test both:

- allowed access
- denied access


## 9. Least privilege

Every user, service, function and infrastructure component should receive only the permissions required for its job.

```text
Required permission
       ↓
Minimum permission
       ↓
Specific resource
       ↓
Specific action
```

Avoid broad administrative credentials in application code.

Review permissions when architecture or responsibilities change.


## 10. Accountability and auditability

Audit important security and business events, not every interaction.

Useful audit fields:

- who
- what
- when
- target/resource
- result

Prioritize:

- account changes
- permission changes
- administrative actions
- sensitive-data access
- financial actions
- security events
- important state changes

Do not log secrets or unnecessary sensitive data.


## 11. CIA triad

### Confidentiality

Only authorized parties can access data.

### Integrity

Data and system state cannot be changed improperly.

### Availability

The service and required data remain usable within the product's expected reliability requirements.

For consequential systems, assess all three before release.

```text
             SECURITY
                │
      ┌─────────┼─────────┐
      ▼         ▼         ▼
CONFIDENTIALITY INTEGRITY AVAILABILITY
```


## 12. Data minimization

Collect, store and expose only data required for the product.

For each sensitive field ask:

- Why do we need it?
- Who needs access?
- How long do we need it?
- Can we avoid storing it?
- What happens if it leaks?

Less sensitive data generally means less security risk, storage, operational burden and cost.


## 19. Security incident response

For suspected credential or security exposure:

```text
Suspect
 ↓
Contain
 ↓
Revoke / rotate credentials
 ↓
Assess exposure
 ↓
Restore secure state
 ↓
Verify
 ↓
Document
 ↓
Review
```

Do not leave known exposed credentials active while investigating.
