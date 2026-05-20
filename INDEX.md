# VROE Labs — Unified Trust Platform

Vero (proof-of-work) + RIE (proof-of-discipline) + Trove (data integrity). All built on ALVED protocol.

## Start Here

- **What is this?** Three interconnected identity/trust products under VROE Labs. Vero handles verified work credentials. RIE tracks discipline/fitness/content proof. Trove manages data provenance.
- **First-timer?** Read `/docs/context-pack/00-project-overview.md` → `/products/[product]/README.md`
- **Need setup?** Each product has own `/products/[product]/README.md`

## Folder Map

| Folder | Purpose |
|--------|---------|
| `/products/vero` | Web identity platform (Turborepo: Next.js 16 + React 19 + Tailwind) |
| `/products/rie` | Discipline app (Express+TS API + Expo mobile) |
| `/products/trove` | Data provenance system |
| `/website` | Marketing site + landing |
| `/shared` | Cross-product utilities (ALVED protocol, crypto) |
| `/docs` | Context pack (00-20 files) + setup guides |
| `/content` | Navigation & guides |

## Quick Links

- **Product Guides:** `/content/GUIDE.md`
- **Architecture:** `/docs/context-pack/04-frontend-architecture.md` + `05-backend-architecture.md`
- **API Design:** `/docs/context-pack/17-api-architecture.md`
- **Trust System:** `/docs/context-pack/06-trust-system.md`
- **Security:** `/docs/context-pack/12-security-rules.md`
- **Roadmap:** `/docs/context-pack/15-roadmap.md`

## Development

All three products share ALVED protocol + crypto (`@rie/crypto`). No reimplementation of auth/crypto—use shared libs.

```bash
# Monorepo root: products/vero/
cd products/vero
pnpm install
pnpm dev

# RIE standalone
cd products/rie
npm install
npm run dev
```

## Key Decisions

1. **ALVED Protocol:** Public spec before ship. Competitive wedge.
2. **Crypto reuse:** `@rie/crypto` across all products. Single source of truth.
3. **India-first:** DPDP Act 2023 compliance, Razorpay PA, DigiLocker ID.
4. **Monetization:** SMB SaaS + 5% escrow (vs Urban Company 25%).

---

Non-technical? Start with `/content/GUIDE.md` instead.
