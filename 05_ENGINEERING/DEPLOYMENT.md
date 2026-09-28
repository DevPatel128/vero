# Deployment and production approval

> Status: Review · Owner: Dev Patel · Version: 1 · Last updated: 2026-09-21
> Source: The Framework. (imported unchanged apart from this header)
> Split from `ENGINEERING.md`: sections 16 and 20. Section numbers are unchanged so old references still resolve.

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
