# VROE Labs — Unified Trust Platform

Three proof-of-X products built on shared ALVED protocol.

## Products

- **Vero:** Proof-of-Work identity (Turborepo monorepo)
- **RIE:** Proof-of-Discipline (Express API + Expo mobile)
- **Trove:** Proof-of-Provenance (data tracking)
- **Website:** Marketing + landing

## Quick Start

```bash
# Navigate to specific product
cd products/vero        # Turborepo
cd products/rie         # Express+Expo
cd products/trove       # Supabase app
cd website              # Next.js site
```

## Navigation

- **Non-technical?** Read `/content/GUIDE.md`
- **Technical?** Start with `/INDEX.md`
- **Documentation?** `/docs/` (context pack 00-20)
- **Shared code?** `/shared/` (crypto, types, ALVED protocol)

## Key Files

| File | Purpose |
|------|---------|
| `/INDEX.md` | Technical overview |
| `/content/GUIDE.md` | Non-tech product guide |
| `/docs/README.md` | How to load context pack |
| `/docs/context-pack/` | 00-20 strategy → implementation |
| `/shared/README.md` | Cross-product libs |

## Principles

1. **ALVED protocol:** Single trust graph across all products
2. **Crypto reuse:** No reimplementation (@rie/crypto)
3. **India-first:** DPDP Act compliance mandatory
4. **Public spec:** ALVED published before ship

---

See `/INDEX.md` for full details.
