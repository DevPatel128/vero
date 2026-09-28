# {{PRODUCT}} Context Pack

Product-side source of truth for **{{PRODUCT}}**. 21 single-purpose files (00-20).

## File map

| #   | File                            | One-liner                                                |
| --- | ------------------------------- | -------------------------------------------------------- |
| 00  | `00-project-overview.md`        | What {{PRODUCT}} is, why it exists                       |
| 01  | `01-product-philosophy.md`      | The decision filter                                      |
| 02  | `02-brand-system.md`            | Voice, palette, type, motion                             |
| 03  | `03-ui-ux-rules.md`             | Layout, interaction, accessibility                       |
| 04  | `04-frontend-architecture.md`   | Stack + routing + components                             |
| 05  | `05-backend-architecture.md`    | Services + data flows                                    |
| 06  | `06-trust-system.md`            | Trust signals + anti-abuse                               |
| 07  | `07-blockchain-system.md`       | Chain / signing format (rename if not applicable)        |
| 08  | `08-career-paths.md`            | User progression                                         |
| 09  | `09-growth-engine.md`           | North star, activation, retention, SEO/AEO/LLMO          |
| 10  | `10-onboarding-system.md`       | First-time + recovery flows                              |
| 11  | `11-design-system.md`           | Tokens + components + states                             |
| 12  | `12-security-rules.md`          | Crypto, auth, headers, threat model                      |
| 13  | `13-performance-rules.md`       | Targets + budgets                                        |
| 14  | `14-copywriting-tone.md`        | Voice rules                                              |
| 15  | `15-roadmap.md`                 | Now / next / later                                       |
| 16  | `16-database-schema.md`         | Tables + RLS                                             |
| 17  | `17-api-architecture.md`        | REST + webhooks                                          |
| 18  | `18-admin-system.md`            | Admin UI + audit                                         |
| 19  | `19-deployment-system.md`       | Hosting + env + CI/CD                                    |
| 20  | `20-ai-agent-rules.md`          | Contract for AI agents                                   |

## Usage recipes
| Task                            | Load                                  |
| ------------------------------- | ------------------------------------- |
| Marketing copy                  | 00, 01, 02, 14, 10                    |
| Frontend feature                | 00, 03, 04, 11, 13                    |
| Trust feature                   | 00, 01, 06, 12                        |
| Chain feature                   | 00, 01, 07, 12, 16                    |
| Backend feature                 | 00, 04, 05, 16, 17, 18                |
| Onboarding redesign             | 00, 01, 03, 10, 14                    |
| Roadmap planning                | 00, 01, 15                            |
| Compliance check                | 00, 12, plus `/docs/COMPLIANCE.md`    |
| New agent                       | 00, 20                                |

## Conventions
- Plain Markdown.
- One topic per file.
- Update both this file and `15-roadmap.md` when a system changes.
- Treat 20 as the agent contract.

