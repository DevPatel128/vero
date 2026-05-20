# Security Rules

## Objective
Protect the website, application, users, and data from abuse, manipulation, exposure, and weak implementation. Security should be built in from the start.

## Security philosophy
Security is not separate from trust. If the system is unsafe, the trust system fails. If the forms are weak, the brand credibility suffers. If sensitive data leaks, the product loses legitimacy.

## Core security priorities
- identity protection
- safe auth
- secure forms
- safe uploads
- anti-fraud rules
- payment integrity
- role-based access
- trust protection
- moderation safety

## Authentication and access
Use secure authentication patterns. Protect routes and admin tools. Separate user permissions clearly. Do not assume client-side UI alone is enough for access control.

## Input validation
Validate all user input:
- forms
- file uploads
- profile fields
- comments
- messages
- referral codes
- payment metadata

Assume all inputs can be manipulated.

## Upload security
If users can upload images, videos, or documents:
- validate file type
- validate file size
- scan for unsafe content where possible
- store securely
- avoid public exposure of sensitive assets
- use signed access if needed

## XSS and injection prevention
Avoid unsafe rendering. Do not blindly inject user content into the DOM. Sanitize and escape where appropriate.

## CSRF and session concerns
Protect state-changing actions. Keep session management careful and predictable.

## Admin security
Admin tools should be hidden behind strong access control. Admin actions should be logged. Sensitive moderation tools should not be exposed casually.

## Trust abuse prevention
The trust system can be attacked. Protect against:
- fake accounts
- review abuse
- collusion
- trust farming
- duplicate identities
- spam referrals
- malicious uploads
- manipulation of dispute outcomes

## Payment security
If the system handles payments:
- use reputable providers
- do not expose secrets
- secure callbacks
- verify transactions
- maintain audit logs
- separate display states from settlement states

## Blockchain security
If blockchain is used:
- verify signatures
- secure wallets
- protect contracts
- avoid careless token permissions
- prevent replay attacks
- protect user privacy
- keep contract logic minimal and auditable

## Privacy
Do not expose private data unnecessarily. Distinguish between public proof-of-work data and private identity data.

## Content security
External links, embeds, and media should be reviewed. Avoid third-party scripts that do not add clear value.

## Principle of least privilege
Give each role and process only the access it needs. This reduces damage if something goes wrong.

## Security outcome
The system should feel safe enough for users to trust with identity, reputation, and work history.
