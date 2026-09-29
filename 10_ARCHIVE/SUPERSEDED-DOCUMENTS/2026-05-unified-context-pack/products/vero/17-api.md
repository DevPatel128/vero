# 17 — API

## Goal
Document how the product talks to itself and other systems.

## Must cover
- Public product surfaces
- Authenticated surfaces
- Webhooks and callbacks
- Idempotency expectations
- Error patterns
- Versioning discipline

## API rule
The API should be easy to reason about and hard to misuse.

## Anti-patterns
- Unversioned behavior changes
- Undocumented webhook flows
- Error responses that do not help recovery

