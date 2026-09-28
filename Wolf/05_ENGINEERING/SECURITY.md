# Security

## Core model
Confidentiality + Integrity + Availability + Accountability.

## Controls
- private by default
- minimum attack surface
- no public database/admin/internal service exposure
- controlled ingress
- TLS
- secure headers
- rate limiting
- WAF where justified
- input validation
- output encoding
- secure secrets management
- encryption in transit/at rest where appropriate
- least privilege
- explicit authorization
- audit logging
- secure dependencies
- vulnerability management
- threat modeling
- incident response
- backups and recovery

## No open ports by default
Every externally reachable port/service must have an explicit requirement, owner, authentication/authorization model, monitoring and justification.

## Security exception
Any intentional weakening requires documented risk, compensating controls, expiry/review date and human approval.

## Public-source safety
Publishing source must not expose secrets or provide an unmitigated path to production access.
