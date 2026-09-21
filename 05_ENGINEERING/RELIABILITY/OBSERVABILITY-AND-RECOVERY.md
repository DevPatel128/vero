# Observability, failure and recovery

> Status: Review · Owner: Dev Patel · Version: 1 · Last updated: 2026-09-21
> Source: The Framework. (imported unchanged apart from this header)
> Split from `ENGINEERING.md`: sections 17 and 18. Section numbers are unchanged so old references still resolve.

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
