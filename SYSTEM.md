# SYSTEM.md

## Shape
```
browser → Worker (routes, auth, db.ts) → D1 | R2 | KV
                 ↘ Resend · Sentry · PostHog
```

## Data model (every user table: user_id NOT NULL, index leads with user_id)
| Table | Columns | Class | Writable by client |
|---|---|---|---|

## Env vars and secrets (names only; values in Worker secrets)
| Name | Where | Purpose |
|---|---|---|

## Endpoints
| Method path | Auth | Authz rule | Input schema | Limits | Idempotent | Errors |
|---|---|---|---|---|---|---|

## Authorization matrix
| Action | anon | user (own) | admin |
|---|---|---|---|

## Threat model (lite)
| Asset | Actor | Attack path | Mitigation | Residual risk |
|---|---|---|---|---|

## Limits and cost
| Resource | Free limit | Current use | Headroom |
|---|---|---|---|
