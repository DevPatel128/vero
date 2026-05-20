# Trove API

> REST. JSON in, JSON out. Bearer auth via API keys (Pro+) or session cookies (in-product).

## Authentication

```http
Authorization: Bearer trove_live_sk_...
```

Or, for browser requests, the Supabase auth cookie set by `middleware.ts`.

## Errors

```json
{ "error": { "code": "validation_error", "message": "amount must be positive", "details": {} } }
```

Codes: `unauthorized`, `forbidden`, `validation_error`, `rate_limited`, `db_error`, `ai_unavailable`, `stripe_error`, `config_error`, `invalid_json`, `send_failed`.

## Rate limits

| Bucket | Window | Limit |
|--------|--------|-------|
| `api`   | 60s | 60 req |
| `ai`    | 60s | 20 req |
| `auth`  | 60s | 10 req |
| `email` | 60s | 5 req  |

Headers returned: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`.

## Endpoints

### Health

```http
GET /api/health
```

```json
{ "status": "ok", "service": "trove", "version": "2.0.0", "timestamp": "..." }
```

### Transactions

```http
GET    /api/transactions?page=1&limit=50&category=Food&direction=debit&search=uber
POST   /api/transactions
PATCH  /api/transactions/:id
DELETE /api/transactions/:id
```

POST body:

```json
{
  "amount": 12.50,
  "merchant": "Uber",
  "description": "Trip to airport",
  "direction": "debit",
  "occurred_at": "2026-05-15T08:00:00Z",
  "category": "Transport",
  "tags": ["travel"],
  "notes": "Reimbursable"
}
```

### Insights (Pro+)

```http
POST /api/insights
```

Generates an AI summary of the last 30 days. Returns `{ text, insight_id }`. Rate limited 20/min.

### Onboarding

```http
POST /api/onboarding
```

### Contact

```http
POST /api/contact
```

Sends a routed email. Rate limited 5/min per IP.

### Profile

```http
POST /api/profile    (form-encoded)
```

### Support tickets

```http
POST /api/support/tickets
```

### Stripe

```http
POST /api/stripe/checkout?cadence=monthly|yearly   (303 redirect)
POST /api/stripe/portal                             (303 redirect)
POST /api/stripe/webhook                            (signed by Stripe)
```

### Cron (Vercel only, Bearer with `CRON_SECRET`)

```http
GET /api/cron/refresh-subscriptions
GET /api/cron/digest-emails
GET /api/cron/cleanup-sessions
```

## Webhooks (outbound, planned for v2.1)

| Event                    | Description |
|--------------------------|-------------|
| `transaction.created`    | A new transaction appears |
| `subscription.detected`  | A new recurring charge is detected |
| `budget.exceeded`        | A budget hits 100% |
| `goal.achieved`          | A goal reaches its target |

Subscribe via `POST /api/webhooks` (coming soon).
