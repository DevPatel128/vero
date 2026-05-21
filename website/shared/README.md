# VROE Labs — Shared Marketing Surface

Cross-product copy, ALVED protocol pages, careers, press, legal. The umbrella surface.

## Folder map

```
shared/
├── pages/
│   ├── vroe.md                # Umbrella home (vroe.app/)
│   ├── alved.md               # Protocol explainer (vroe.app/alved)
│   ├── about.md               # Why VROE Labs exists
│   ├── manifesto.md
│   ├── careers.md
│   ├── press.md
│   ├── investors.md           # Lightweight, signal-of-life
│   ├── security.md            # Umbrella security posture
│   ├── status.md              # Static page; live status at /status
│   ├── changelog.md
│   ├── docs.md                # Index to product docs
│   └── faq.md
├── legal/
│   ├── terms.md
│   ├── privacy.md
│   ├── cookies.md
│   ├── refund.md
│   ├── grievance.md           # India IT Rules 2021 grievance officer
│   ├── responsible-disclosure.md
│   ├── accessibility.md
│   └── acceptable-use.md
├── copy/
│   ├── company.md             # Boilerplate "About VROE Labs" paragraph
│   ├── manifesto.md
│   └── press-kit.md
├── schema/
│   ├── organization.jsonld    # The single Organization JSON-LD used everywhere
│   ├── breadcrumbs.jsonld     # Reusable BreadcrumbList wrapper
│   └── faq.jsonld
└── seo/
    ├── llms.txt.fragment
    ├── robots.fragment
    └── sitemap-entries.yaml
```

## Pages

| Page                    | Route                  | Purpose                                                            |
| ----------------------- | ---------------------- | ------------------------------------------------------------------ |
| VROE umbrella           | `/`                    | What VROE Labs is, the three-product map, the protocol             |
| ALVED                   | `/alved`               | Cross-product protocol explainer, public spec link                 |
| About                   | `/about`               | Why we exist                                                       |
| Manifesto               | `/manifesto`           | Long-form belief — trust infrastructure as the next decade         |
| Careers                 | `/careers`             | Open roles, hiring principles                                      |
| Press                   | `/press`               | Boilerplate + media contact + asset links                          |
| Investors               | `/investors`           | Light page until raise. Signal-of-life.                            |
| Security                | `/security`            | Umbrella security                                                  |
| Status                  | `/status`              | Service status                                                     |
| Changelog               | `/changelog`           | Cross-product changelog                                            |
| Docs                    | `/docs`                | Index to ALVED spec + per-product developer docs                   |
| FAQ                     | `/faq`                 | Cross-product FAQ                                                  |
| Terms                   | `/legal/terms`         | Master ToS                                                         |
| Privacy                 | `/legal/privacy`       | Master privacy notice. Region-aware via children pages.            |
| Cookies                 | `/legal/cookies`       |                                                                    |
| Refund                  | `/legal/refund`        |                                                                    |
| Grievance officer       | `/legal/grievance`     | Required by India IT Rules 2021                                     |
| Responsible disclosure  | `/legal/security`      |                                                                    |
| Accessibility           | `/legal/accessibility` | WCAG 2.2 AA statement                                              |
| Acceptable use          | `/legal/acceptable-use`|                                                                    |

## Compliance scope

Shared/legal pages are the **most regulated** surface. Region matrix:

| Region         | Pages affected                                            |
| -------------- | --------------------------------------------------------- |
| India (DPDP)   | `privacy`, `grievance`, every product page with PII claim |
| EU (GDPR)      | `privacy`, `cookies`, `terms`                             |
| US (CCPA)      | `privacy`, `cookies`                                      |
| Brazil (LGPD)  | `privacy`                                                 |
| China (PIPL)   | `privacy` (if China launch)                               |
| South Africa (POPIA) | `privacy`                                            |

See [`/docs/COMPLIANCE.md`](../../docs/COMPLIANCE.md) for the full matrix.

## Voice

VROE Labs umbrella copy is **the most quiet** voice in the system. The umbrella sells confidence in the team and the thesis, not any individual product. Read the manifesto draft for calibration.

