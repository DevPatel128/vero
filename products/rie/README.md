# RIE — Proof-of-Discipline

Cryptographic proof of activity across fitness, content, gaming.

**Tech Stack:**
- API: Express + TypeScript
- Mobile: Expo (React Native)
- DB: Postgres + Prisma
- Crypto: @rie/crypto (Argon2id, AES-256-GCM, RS256, ECDSA)

**Known Issues:**
- JWT: using base64, needs RS256 migration
- Passwords: SHA256, needs Argon2id
- S3 signing: fake stub
- Email: stubs only
- Tests: missing

**See:** `/docs/context-pack/05-backend-architecture.md` for design.
