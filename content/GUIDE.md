# Browse by Product — Non-Tech Guide

## Vero — Proof-of-Work Identity

**What?** Platform that verifies you've actually done the work. Connects apprenticeships, gigs, local jobs, and credentials. India-first (Bengaluru neighborhoods first).

**Who cares?** Workers (prove skills), employers (verify hires), platforms (trust data).

**Where?** `/products/vero/`
- **Read first:** `products/vero/README.md`
- **Design system:** `/docs/context-pack/11-design-system.md`
- **UI rules:** `/docs/context-pack/03-ui-ux-rules.md`
- **Growth:** `/docs/context-pack/09-growth-engine.md`

---

## RIE — Proof-of-Discipline

**What?** Cryptographic proof you actually did fitness/content/gaming. Built for digital nomads + creators. Already has Express API + mobile app.

**Who cares?** Content creators (prove consistency), fitness influencers (prove claims), communities (verify active members).

**Where?** `/products/rie/`
- **Read first:** `products/rie/README.md` or check `products/rie/apps/`
- **Crypto:** `products/rie/packages/@rie/crypto/` (RS256 JWT, Argon2id, AES-256)
- **Known issues:** JWT base64 → RS256, SHA256 password → Argon2id, fake S3 signing

---

## Trove — Data Provenance

**What?** Track where data comes from + when it changed. Future vertical for supply chain / anti-counterfeiting.

**Where?** `/products/trove/`
- **Read first:** `products/trove/README.md` (minimal; in early stage)

---

## Website

Marketing site + landing pages. Separate from products.

**Where?** `/website/`

---

## How They Connect

```
Vero (worker proof) ← → RIE (discipline proof) ← → Trove (data provenance)
       ↓
   ALVED Protocol (shared trust graph)
       ↓
   @rie/crypto (auth + encryption)
```

**Key:** All three share ALVED protocol. Identity verified in Vero → discipline tracked in RIE → data provenance in Trove.

---

## Quick Tasks

| Task | Go to |
|------|-------|
| "How do I add a feature?" | Product's `README.md` → `CLAUDE.md` |
| "What's the brand voice?" | `/docs/context-pack/14-copywriting-tone.md` |
| "How do we handle user data?" | `/docs/context-pack/06-trust-system.md` + `12-security-rules.md` |
| "What should Vero look like?" | `/docs/context-pack/11-design-system.md` |
| "What's next on roadmap?" | `/docs/context-pack/15-roadmap.md` |
| "I'm lost" | Read `/INDEX.md` again, then this file |

---

## Things NOT to Do

1. **Don't reimplement crypto.** Use `@rie/crypto` for auth/encryption/hashing.
2. **Don't store session tokens unsafely.** DPDP Act requires compliance. Use RS256 JWT, Argon2id passwords.
3. **Don't ship without compliance check.** India-first = DPDP Act 2023 mandatory.
4. **Don't create separate trust graph.** Use ALVED protocol everywhere.
5. **Don't ignore design system.** Brand consistency matters at launch.

