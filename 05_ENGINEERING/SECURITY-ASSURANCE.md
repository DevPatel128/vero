# Security Assurance

> Status: Draft · Owner: Dev Patel · Version: 1 · Last updated: 2026-09-28
> Source: Wolf v3 framework, `05_ENGINEERING/SECURITY-ASSURANCE.md` (imported unchanged apart from this header and "Applied in this repo")

Security requirement → threat → control → implementation → verification → evidence → residual risk → approval.

Use as appropriate:
- NIST SSDF
- OWASP ASVS
- OWASP SAMM
- system-specific threat modeling

Security claims must point to verifiable evidence. Material residual risk requires explicit authorized human acceptance.

## Applied in this repo

The verification/evidence step for this PR is `/security-review`'s findings, reported in the PR body per `00_START_HERE/REVIEW_AGENT.md`'s pattern. No independent OWASP ASVS or SAMM assessment has run against `website/site`; the threat model in `THREAT-MODEL.md` and this PR's fixes are the current assurance evidence. Any residual risk the review surfaces is either fixed before merge or explicitly accepted by Dev Patel in the PR — not silently shipped.
