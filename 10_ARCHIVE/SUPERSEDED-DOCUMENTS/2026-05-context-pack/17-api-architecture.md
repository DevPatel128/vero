# API Architecture

## Objective
Create API patterns that are predictable, secure, and easy for agents or developers to extend. The API should support the website today and the full product later.

## API philosophy
APIs should be boring in the best way: clear naming, clear input, clear output, clear errors. Avoid cleverness that makes the system hard to debug.

## Core conventions
- use consistent resource names
- keep verbs predictable
- validate inputs strictly
- return useful error messages
- separate public and protected endpoints
- keep response shapes stable

## Resource groups
Potential API groups:
- auth
- users
- profiles
- career-paths
- opportunities
- bookings
- reviews
- trust
- verifications
- disputes
- payments
- messages
- referrals
- ambassadors
- analytics
- admin

## Route principles
- noun-based resources where possible
- avoid duplicate functionality across routes
- keep nested routes understandable
- support pagination where lists can grow
- keep filters explicit

## Validation
Every endpoint should validate:
- required fields
- types
- lengths
- allowed values
- permissions
- upload safety
- payment state where relevant

## Error handling
Errors should be:
- clear
- actionable
- safe
- consistent
- not overly technical for end users

## Auth and permissions
API routes must check:
- authentication
- role
- resource ownership
- admin permissions
- category-specific trust restrictions if necessary

## Realtime and polling
Use realtime for:
- messages
- booking updates
- dispute changes
- admin review states

Use polling only if realtime is not practical. Avoid unnecessary traffic.

## Response design
Keep responses lean. Do not return more data than needed. Use field selection where useful.

## Versioning
Plan for future versions so new features do not break old clients.

## Admin endpoints
Admin APIs should be isolated, logged, and protected. They should never be mixed with public business logic casually.

## API outcome
The result should be an API system that is easy to maintain, test, and expand without confusion.

