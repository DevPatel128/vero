# Database Schema Principles

## Objective
Define database logic in a way that supports trust, verification, growth, and future expansion while staying maintainable.

## Database philosophy
The database should represent reality clearly. It should not store everything in one giant blob or create duplicated structures that are hard to maintain. The model should be auditable and modular.

## Core entities
Likely core tables or collections include:
- users
- profiles
- career_paths
- opportunities
- bookings
- reviews
- messages
- verifications
- trust_scores
- portfolio_items
- dispute_cases
- payments
- referrals
- badges
- cities
- ambassador_profiles
- notifications
- audit_logs

## Identity data
Separate:
- public profile data
- private identity data
- verification status
- role metadata

This keeps the product safer and more flexible.

## Trust data
Trust should not be one field only. Store:
- score snapshots
- contributing signals
- timestamps
- review context
- dispute effects
- category-specific values if needed

That makes the system explainable and auditable.

## Booking data
A booking or gig record should include:
- who booked
- who accepted
- category
- location or city
- time or duration
- payment state
- completion state
- review state
- dispute state
- proof attachments if needed

## Portfolio data
Portfolio items should support:
- images
- video links or uploads
- descriptions
- category tags
- verification state
- timestamps
- related booking or achievement references

## Dispute data
Dispute records should track:
- reason
- evidence
- timestamps
- reviewer notes
- decision
- impact on trust or payment

## Referral and ambassador data
Track:
- who referred whom
- referral source
- activation quality
- retention quality
- ambassador contribution
- trust of the referral network

## Blockchain-ready structure
If blockchain is added later, design fields so they can map to on-chain attestations or hashes without rewriting the whole schema.

## Performance principles
- index frequently queried fields
- avoid overusing JSON for core relations
- normalize where it helps clarity
- denormalize only for performance where justified
- archive stale or low-value data if needed

## Privacy and access
Do not expose private fields broadly. Use role-aware access rules. Sensitive verification data should be protected.

## Schema outcome
The schema should support a product that is trustworthy, scalable, and explainable.
