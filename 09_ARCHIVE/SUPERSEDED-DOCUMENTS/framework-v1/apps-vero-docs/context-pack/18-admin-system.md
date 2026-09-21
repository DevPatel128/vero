# 18 — Admin System

## Mission
The admin panel is the **operations dashboard** — moderation, dispute resolution, support tooling, observability. It is not a marketing surface.

## Access
- Email OTP + mandatory TOTP.
- IP allowlist.
- Per-admin role (super-admin, ops, support, finance).
- Audit-logged actions.
- Sessions capped at 1 hour. Re-auth required for sensitive actions.

## Modules

### Dashboard
- Active users this week / month.
- Records minted / day.
- Open disputes.
- Open support tickets.
- Escrow held / released today.
- System health (status of MSG91, Razorpay, DigiLocker).

### Users
- Search by handle / phone / email / Aadhaar hash.
- View profile + audit history.
- Actions: suspend, restore, force re-KYC, merge duplicates.
- All actions audit-logged.

### Jobs
- Filter by neighborhood, category, state.
- View timeline of state changes.
- Force a state transition (rare; requires reason + co-sign).

### Disputes
- Queue ordered by age.
- Both parties' evidence side-by-side.
- Outcome attached to both ALVED records.
- 72-hour target resolution.
- Bulk operations forbidden — each dispute resolved individually.

### ALVED records
- Cannot edit. View only.
- Can attach an admin-annotation (off-chain note) explaining moderation action.
- Search by subject, category, neighborhood, date.

### Escrow + payouts
- View pending / held / released.
- Trigger manual retry on stuck transactions.
- Reconciliation report with Razorpay.

### Moderation queue
- Reported profiles, reported records, reported jobs.
- AI-assisted triage (LLM tags severity; human always decides).

### Audit log
- Read-only.
- Filter by actor / action / target.
- Exportable as CSV (encrypted).

### Feature flags
- Per-user / per-segment / per-neighborhood.
- Used for staged rollouts.

### Announcements
- Banner system. Versioned. Targetable.

## Permissions
| Role         | Capabilities                                                       |
| ------------ | ------------------------------------------------------------------ |
| support      | Read profiles, read jobs, read disputes, write notes, send emails  |
| ops          | + Resolve disputes, suspend users, force state transitions         |
| finance      | + Reconcile escrow, trigger payouts, export financial CSV          |
| super-admin  | + Manage admins, manage feature flags, key rotation                |

## Co-sign requirements
- Bulk suspend: 2 admins, ops or super.
- Manual payout: 2 admins, finance + ops.
- KYC override: 2 admins, super only.
- Audit log export: 2 admins, super + finance.

## Audit log entry format
```
{
  "actor_id": "...",
  "action": "user.suspended",
  "target_type": "user",
  "target_id": "...",
  "reason": "free text required",
  "co_signer_id": "optional",
  "metadata": { ... },
  "occurred_at": "...",
  "ip": "...",
  "user_agent": "..."
}
```

## Support tooling
- Ticket system (in-app + email).
- Macro responses approved by ops lead.
- Customer impersonation: forbidden by default. Only via the audited "support access" flow with user consent token.

## Observability for ops
- Sentry alerts integrated.
- PostHog dashboards embedded.
- Status page links inline.

## Anti-patterns
- Bulk operations without co-sign.
- Editing ALVED records.
- Bypassing RLS in support tooling.
- Admin actions outside business hours without reason.

## Future
- AI-summarized dispute briefs.
- Quarterly admin access review automated.
- SOC 2 evidence collection automated.

