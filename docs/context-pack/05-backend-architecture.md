# Backend Architecture

## Objective
Create a backend structure that supports trust, profiles, opportunities, verification, messaging, payments, and future blockchain layers without becoming overly complex too early.

## Core backend philosophy
Keep the backend simple enough to launch quickly, but structured enough to scale. The architecture should support a small initial launch in Bengaluru and later expand to more cities and categories.

## Recommended stack
- Supabase Auth
- PostgreSQL
- Supabase Storage
- Supabase Realtime
- serverless functions where needed
- external payment providers as required

## Backend modules
- users
- profiles
- career_paths
- opportunities
- bookings
- reviews
- messages
- portfolio_uploads
- verifications
- trust_scores
- disputes
- payments
- notifications
- referrals
- ambassador_profiles
- analytics_events
- blockchain_records if enabled

## Design rules
1. Normalize core data.
2. Avoid duplicated fields unless intentionally denormalized for performance.
3. Keep trust-related data auditable.
4. Separate private and public profile data.
5. Separate admin operations from user-facing flows.
6. Protect sensitive data.
7. Plan for data growth from the start.

## Identity and auth
Auth should support:
- email
- phone
- optional social login
- optional wallet identity later
- role-based access control

Support at least these roles:
- user
- client
- ambassador
- mentor
- admin
- moderator
- operator

## Profile data
A profile should include:
- basic identity
- selected career path
- public proof-of-work data
- trust score
- verification flags
- portfolio items
- activity history
- client interactions
- apprenticeship history
- badges
- city
- availability

## Opportunity flow
A user should be able to:
- discover opportunities
- apply or express interest
- be matched
- confirm terms
- complete work
- receive payment
- receive review
- update trust and profile history

## Payments
Initial support can use normal fiat payment flows. Later, the system can support blockchain and stablecoin rails for selected markets. The backend should be structured so payment providers can be swapped or extended without rewriting the entire system.

## Realtime
Use realtime sparingly for:
- messages
- booking updates
- dispute updates
- trust notifications
- admin review states

Do not subscribe to too much realtime data on the client. That creates complexity and performance cost.

## Storage
Store uploads safely and separately:
- profile images
- portfolio images
- verification documents
- work proof images
- videos
- certificates

Validate file type, size, and safety. Keep access controls strict.

## Auditability
Trust and dispute systems should be auditable. Important changes should be logged with timestamps and actor identity where appropriate. This helps moderation, transparency, and future investigations.

## Scalability
Structure the backend to handle growth in:
- users
- uploads
- bookings
- reputation records
- moderation queues
- city-based activity
- referral traffic
- verification activity

## Security
The backend should default to least privilege. Use row-level security where appropriate. Never expose sensitive fields without a reason. Protect admin routes and internal operations carefully.

## Future compatibility
The backend should later support:
- blockchain records
- on-chain credentials
- stablecoin payments
- portable reputation
- cross-platform verification

## Implementation rule
Build the simplest backend that can support trust. Do not overcomplicate with distributed systems too early.

