# Engineering Framework

## Purpose

Build products that are secure, simple, reliable, observable, performant and cost-efficient without unnecessary infrastructure or complexity.

Engineering exists to turn an approved product and experience into a production system.

## Engineering decision framework

Every meaningful technical change must answer:

### Why should we make this change?

What requirement, problem, risk or opportunity requires it?

### What impact will it have?

Describe:
- expected user impact
- security impact
- reliability impact
- performance impact
- operational impact
- maintenance impact
- expected measurable results
- risks and trade-offs

### How will we do it?

Describe:
- architecture
- implementation
- dependencies
- migration requirements
- testing
- deployment
- rollback/recovery

### How much will it cost?

Consider:
- compute
- database
- storage
- network
- third-party services
- developer time
- maintenance
- operational complexity

### Is the cost justified?

Compare expected value against total cost.

Always prefer the lowest-cost approach that satisfies required security, reliability, performance, compliance and product requirements.

Do not pay for complexity that does not produce proportional value.

---

## 1. Engineering principles

- Secure by default.
- Least privilege.
- Public-repository safe.
- Smallest practical architecture.
- One source of truth.
- Measure before optimizing.
- Fail safely.
- Recover deliberately.
- Observe production.
- Automate repetitive work.
- Minimize sensitive data.
- Minimize infrastructure.
- Lowest justified cost.
- Human approval for consequential production decisions.

---

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

---

## 3. Architecture

Choose the simplest architecture that satisfies the product requirements.

Before adding a service ask:

- Why does it exist?
- What requirement does it satisfy?
- Can an existing component do the job?
- What does it add to cost?
- What does it add to operational complexity?
- What new security boundary does it create?
- What happens if it fails?

Prefer fewer components when they provide the required result.

### Architecture flow

```text
Requirement
    ↓
Simplest viable design
    ↓
Security review
    ↓
Performance review
    ↓
Cost review
    ↓
Implementation
```

---

## 4. Cloudflare

Use Cloudflare services only when they solve a real requirement.

Potential components include:

```text
DNS
CDN / caching
WAF
DDoS protection
Workers
R2
Rate limiting
Headers
Secrets
Observability
```

### Cloudflare rules

- Minimize public exposure.
- Apply appropriate security controls.
- Keep secrets outside source code.
- Use caching where it reduces latency/cost without causing stale or incorrect data.
- Use rate limiting where abuse or cost exposure warrants it.
- Keep Worker logic small and measurable.
- Avoid adding Cloudflare products without a requirement.
- Measure performance before and after material optimization.
- Estimate recurring cost before adopting paid usage.

---

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

---

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

---

## 8. Row-Level Security

For user-specific data in Supabase/PostgreSQL, use RLS where applicable.

Policies should enforce the actual ownership/authorization boundary.

Do not rely only on frontend checks.

Test both:

- allowed access
- denied access

---

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

---

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

---

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

---

## 12. Data minimization

Collect, store and expose only data required for the product.

For each sensitive field ask:

- Why do we need it?
- Who needs access?
- How long do we need it?
- Can we avoid storing it?
- What happens if it leaks?

Less sensitive data generally means less security risk, storage, operational burden and cost.

---

## 13. Performance

Optimize for actual requirements.

Measure:

- latency
- CPU
- memory
- network
- database queries
- storage
- payload size
- cache behavior
- cold starts where relevant

Order of work:

```text
Correctness
   ↓
Security
   ↓
Reliability
   ↓
Measure
   ↓
Optimize
```

Do not trade correctness or security for theoretical performance.

---

## 14. Cost optimization

Consider total cost, not only infrastructure pricing.

```text
Compute
+ Database
+ Storage
+ Network
+ Third-party services
+ Developer time
+ Maintenance
+ Operational complexity
= Total cost
```

For significant choices:

1. Estimate cost.
2. Identify cheaper alternatives.
3. Compare expected outcomes.
4. Select the lowest-cost option that meets requirements.
5. Record why a more expensive option is justified when one is chosen.

Avoid premature scale infrastructure.

---

## 15. Testing

Test according to risk.

Possible layers:

- unit
- integration
- end-to-end
- API
- authorization
- RLS
- security
- performance
- failure/recovery

High-risk paths require stronger testing.

Security tests must verify both permitted and denied behavior.

---

## 16. Deployment

```text
CODE
 ↓
CHECK
 ↓
TEST
 ↓
SECURITY SCAN
 ↓
BUILD
 ↓
PREVIEW
 ↓
HUMAN APPROVAL
 ↓
PRODUCTION
```

Production changes should have a rollback or recovery path appropriate to their risk.

---

## 17. Observability

Minimum useful observability:

- logs
- metrics
- errors
- health
- alerts

Observability must not become a source of data leakage.

Never log:

- passwords
- tokens
- private keys
- unnecessary personal data
- sensitive payloads without a justified need

---

## 18. Failure and recovery

For important components ask:

- What can fail?
- How will we detect it?
- What happens to the user?
- Can the system fail safely?
- How do we recover?
- How do we verify recovery?

```text
Detect
 ↓
Contain
 ↓
Recover
 ↓
Verify
 ↓
Document
 ↓
Improve
```

---

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

---

## 20. Production approval

Human approval is required for consequential changes involving:

- production deployment
- security exceptions
- permissions
- sensitive data
- authentication/authorization
- major infrastructure
- legal/compliance risk
- irreversible migrations
- material cost increases

---

## 21. Engineering quality gate

A system is engineering-complete when:

- source can safely be public
- secrets are protected
- authentication is correct
- authorization is explicit
- least privilege is applied
- data access is appropriately protected
- CIA risks are considered
- important actions are auditable
- performance is measured where material
- cost is justified
- appropriate tests pass
- failure/recovery is understood
- production is observable
- human approval requirements are satisfied
