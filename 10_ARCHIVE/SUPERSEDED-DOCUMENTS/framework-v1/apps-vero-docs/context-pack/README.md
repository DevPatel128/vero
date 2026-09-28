# Vero Context Pack

This pack is the **product-side source of truth** for Vero. Marketing copy in `/website/vero` points back here when it needs to know what the product actually does.

It is structured as 21 single-purpose Markdown files (00 through 20). Each file answers one question. Agents and humans load only the files they need.

> If you are wiring an AI agent (Claude, Cursor, Gemini, Codex, Antigravity, Paperclip), put the files into the agent's context as plain Markdown. They are written to compose cleanly.

## File map

| #   | File                            | One-liner                                             |
| --- | ------------------------------- | ----------------------------------------------------- |
| 00  | `00-project-overview.md`        | What Vero is, why it exists                           |
| 01  | `01-product-philosophy.md`      | Proof over claims, trust over noise                   |
| 02  | `02-brand-system.md`            | Voice, palette, type, motion                          |
| 03  | `03-ui-ux-rules.md`             | Layout, interaction, accessibility                    |
| 04  | `04-frontend-architecture.md`   | Next.js 16 + React 19 + Tailwind v4 layout            |
| 05  | `05-backend-architecture.md`    | Supabase + edge functions + Razorpay                  |
| 06  | `06-trust-system.md`            | Trust graph, signals, anti-abuse                      |
| 07  | `07-blockchain-system.md`       | ALVED chain, ECDSA P-256, JSON-LD                     |
| 08  | `08-career-paths.md`            | Apprenticeship → gig → trusted worker pipeline        |
| 09  | `09-growth-engine.md`           | Activation, retention, programmatic SEO, viral loops  |
| 10  | `10-onboarding-system.md`       | Worker / business onboarding flows                    |
| 11  | `11-design-system.md`           | Tokens, components, states                            |
| 12  | `12-security-rules.md`          | Crypto, auth, headers, DPDP                           |
| 13  | `13-performance-rules.md`       | Lighthouse targets, budgets, payload limits           |
| 14  | `14-copywriting-tone.md`        | Voice rules, do / don't                               |
| 15  | `15-roadmap.md`                 | Milestones to GA + beyond                             |
| 16  | `16-database-schema.md`         | Postgres tables, RLS, indices                         |
| 17  | `17-api-architecture.md`        | REST + edge + webhook surfaces                        |
| 18  | `18-admin-system.md`            | Admin UI, moderation, audit log                       |
| 19  | `19-deployment-system.md`       | Vercel, regions, env, rollout                         |
| 20  | `20-ai-agent-rules.md`          | Contract for any AI agent editing Vero                |

## Usage recipes

| Task                                 | Load                                  |
| ------------------------------------ | ------------------------------------- |
| Marketing copy                       | 00, 01, 02, 14, 10                    |
| Frontend feature                     | 00, 03, 04, 11, 13                    |
| Trust feature                        | 00, 01, 06, 12                        |
| ALVED / chain feature                | 00, 01, 07, 12, 16                    |
| Backend feature                      | 00, 04, 05, 16, 17, 18                |
| Onboarding redesign                  | 00, 01, 03, 10, 14                    |
| Security review                      | 00, 05, 12, 16, 17                    |
| Roadmap planning                     | 00, 01, 15                            |
| Compliance check                     | 00, 12, plus `/docs/COMPLIANCE.md`    |
| New agent                            | 00, 20                                |

## Conventions

- **Plain Markdown.** No exotic formatting. AI agents handle it cleanly.
- **One topic per file.** If a topic spans two files, link, don't duplicate.
- **Update both files when a system changes.** The roadmap (15) is the calendar; everything else is the system.
- **Treat 20 (AI agent rules) as the contract.** Override it only in writing.

