# Shared — Cross-Product Libraries

Utilities, types, crypto, config shared by Vero, RIE, Trove.

## Key Packages

- `@rie/crypto` — Auth, encryption, hashing
  - RS256 JWT
  - Argon2id password hashing
  - AES-256-GCM encryption
  - ECDSA signing
- `@vroe/alved` — ALVED protocol (trust graph, credential validation)
- `@vroe/types` — Shared TypeScript types (User, Credential, Event)
- `@vroe/constants` — Config, URLs, error codes

## Rules

1. **No reimplementation.** Reuse crypto libs. Don't DIY JWT, hashing, encryption.
2. **One source of truth.** Changes to shared code → test in all products before merge.
3. **Version carefully.** Monorepo internal: symlink. External packages: semver.

## Setup

```bash
# Products link to shared packages
# Vero: products/vero/packages/ → symlink to /shared/packages/

# RIE:
cd products/rie
npm install
# (already has @rie/crypto in node_modules)
```

---

Currently minimal. Add here as new shared patterns emerge.
