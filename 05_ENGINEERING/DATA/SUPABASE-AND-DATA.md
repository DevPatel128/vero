# Data: Supabase

> Status: Review · Owner: Dev Patel · Version: 1 · Last updated: 2026-09-21
> Source: The Framework. (imported unchanged apart from this header)
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
