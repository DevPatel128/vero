# CLAUDE.md — Agent Instructions

For Claude Code / AI agents working in VROE Labs monorepo.

## Context

Three proof-of-X products:
- **Vero:** Proof-of-work identity (worker credentials, verification)
- **RIE:** Proof-of-discipline (fitness, content, gaming proof)
- **Trove:** Proof-of-provenance (supply chain / data integrity)

All share ALVED protocol (trust graph) + @rie/crypto (auth, encryption).

## Key Files to Load

By task type (load BEFORE coding):

| Task | Load | Also read |
|------|------|-----------|
| **Frontend** | 00, 03, 04, 11, 13 | `/products/vero/README.md` |
| **Backend** | 00, 04, 05, 16, 17 | `/shared/README.md` |
| **Security/Auth** | 00, 01, 06, 12 | `/docs/context-pack/12-security-rules.md` |
| **Brand/Copy** | 00, 01, 02, 14 | `/content/GUIDE.md` |
| **Roadmap/Scope** | 00, 01, 15 | `/docs/context-pack/15-roadmap.md` |

Location: `/docs/context-pack/[FILE].md`

## Critical Rules

1. **Crypto:** Use `@rie/crypto`. Never DIY JWT, hashing, or encryption.
2. **ALVED protocol:** All identity/trust logic uses shared protocol. Check `/shared/README.md`.
3. **India compliance:** DPDP Act 2023 mandatory. Passwords = Argon2id. JWTs = RS256. See `/docs/context-pack/12-security-rules.md`.
4. **Monorepo:** `/products/vero/` is Turborepo. `/products/rie/` is standalone Express. Link shared packages.

## Products Root

```
/products/vero/       → Turborepo (apps/, packages/, services/, docs/)
/products/rie/        → Express API + Expo mobile (apps/, packages/)
/products/trove/      → Supabase app (src/, tests/)
```

## First Time?

1. Read `/INDEX.md` (technical) or `/content/GUIDE.md` (non-tech)
2. Navigate to product: `/products/vero/`, `/products/rie/`, `/products/trove/`
3. Load context files from `/docs/context-pack/` by task type (see table above)
4. Check `/shared/README.md` for shared libraries

## Questions?

- **Product scope?** `/docs/context-pack/15-roadmap.md`
- **Design system?** `/docs/context-pack/11-design-system.md`
- **API design?** `/docs/context-pack/17-api-architecture.md`
- **Lost?** Read `/INDEX.md`

