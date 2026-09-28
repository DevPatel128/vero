# Threat Model

> Status: Draft · Owner: Dev Patel · Version: 1 · Last updated: 2026-09-28
> Sources: Wolf v3 framework, `05_ENGINEERING/THREAT-MODEL.md`; this PR's security-review of `website/site`

Use STRIDE and agentic-AI threats where relevant.

Consider:
prompt injection, indirect prompt injection, goal hijacking, tool misuse, identity/privilege abuse, supply-chain compromise, unexpected code execution, data leakage, memory/context poisoning, insecure agent-to-agent communication, orchestration compromise, resource abuse, SSRF, RCE, auth bypass, data exfiltration and denial of service.

For each threat:
asset, attacker, entry point, impact, likelihood, control, detection, response, residual risk, owner.

## Applied to `website/site` (the only production system)

| Asset | Attacker | Entry point | Impact | Control (this PR) | Residual risk |
|---|---|---|---|---|---|
| Waitlist email/token | Untrusted web client | `POST /api/waitlist/join` | Token leak / email enumeration on duplicate signup | Fixed: duplicate join no longer returns the token (`fix(security): stop returning the waitlist token on a duplicate join`) | None identified beyond standard web exposure |
| Waitlist/investor endpoints | Untrusted web client, scripted abuse | Both public `POST` routes | Spam, resource abuse | Origin check + `@upstash/ratelimit` (fail-open) | Rate limiting is fail-open by design (availability over strict enforcement); accepted, not residual-unknown |
| Waitlist signup count | Concurrent requests | `add()` in `upstash-store.ts` | Duplicate signup / miscounted referrals under race | Atomic `SET ... NX` | None identified |
| Cross-site POST | Malicious third-party site | Both public `POST` routes | CSRF-equivalent forged submission | Origin==Host check (`same-origin.ts`) | None identified for a store with no session cookie |

No AI agent runs inside the deployed application; the agentic-threat categories above (prompt injection, tool misuse, orchestration compromise) apply to the development-time AI assistant working on this repo, not to `website/site` at runtime, and are addressed by `00_START_HERE/AI_OPERATING_RULES.md` and `09_AUDIT/AI_GOVERNANCE.md` rather than by a runtime control in the product.
