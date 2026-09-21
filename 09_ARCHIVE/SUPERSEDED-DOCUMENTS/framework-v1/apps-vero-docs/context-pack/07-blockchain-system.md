# 07 — ALVED Chain System

## What ALVED is
**Authentic Ledger of Validated Evolution Data.** An open spec for verifiable activity records. Each subject (user) has an append-only chain of records, every record signed by the relevant parties.

ALVED is **not** a cryptocurrency. ALVED is **not** a public blockchain. ALVED is a **cryptographically chained, signature-attested record format**, implemented today on Postgres with detached signatures and migratable to a public-write tier later if needed.

## Record shape (canonical)
See `packages/types/src/alved.ts`. The TypeScript interface:

```ts
interface AlvedRecord {
  id: string;             // ULID
  subject: string;        // user handle
  surface: "work" | "discipline" | "value";
  category: string;       // e.g. home-chef, weight-training, household-asset
  occurredAt: string;     // ISO 8601 UTC
  geo?: { city; neighborhood?; country };
  metric?: { value; unit };
  verifier?: { handle; role };
  attestations: AlvedAttestation[];  // ECDSA P-256
  visibility: "public" | "shared" | "private";
  bodyHash: string;       // sha256 over canonical record body
  prevHash: string;       // sha256 of the previous record per subject
}

interface AlvedAttestation {
  signer: string;         // handle of the attester
  publicKey: string;      // base64 SPKI
  signature: string;      // base64 ECDSA signature over bodyHash
  signedAt: string;       // ISO 8601 UTC
  role: "subject" | "counterparty" | "verifier" | "witness";
}
```

## Signing flow
1. Client constructs the record body without `bodyHash`, `prevHash`, `attestations`.
2. Client requests the previous record hash from the server.
3. Client computes `bodyHash` via SHA-256 over the canonical JSON.
4. Each attester signs `bodyHash` using ECDSA P-256 with their private key (Web Crypto API on device).
5. Client sends `{record, attestations}` to the edge function.
6. Edge function verifies each signature using the cached public key from the attester's profile, verifies chain continuity, inserts into `alved_records` append-only table.

## Storage
- Table: `alved_records` — append-only, `INSERT` only, no `UPDATE` or `DELETE`.
- Index by `(subject, occurred_at desc)`, `(category, occurred_at desc)`, `(geo_city, geo_neighborhood)`.
- Body stored as JSONB plus `body_canonical` (string) for hashing repeatability.
- Anchor option (post-launch): nightly merkle root of all new records published to an external public ledger (IPFS / public chain) for tamper-evidence at scale.

## Public JSON-LD endpoint
- Route: `/u/{handle}.jsonld`
- Cached via ISR for 60 seconds.
- Includes public records only.
- Wraps each record in a stable `@context` URI: `https://vroe.app/.well-known/alved/v1`.
- Validates at the JSON-LD playground.

## Verifiability
Any third party can:
1. Fetch the JSON-LD from `/u/{handle}.jsonld`.
2. Fetch the public keys of each attester from `/u/{attester}.jsonld`.
3. Reconstruct `bodyHash` from the canonical body.
4. Verify the signature with the attester's public key.
5. Walk the chain backwards using `prevHash`.

We will publish a verification CLI at `npm i -g @vroe/alved-verify`.

## Visibility model
- **Public** — surfaced on the profile, included in `/u/{handle}.jsonld`, indexable by search.
- **Shared** — accessible only via signed link. Not in JSON-LD.
- **Private** — counts toward trust score but invisible externally.

## Cross-product chain
A user has **one chain per surface** today. We can stitch chains across surfaces with explicit user consent — composing `work`, `discipline`, `value` records into one cross-surface chain for a unified public profile.

## Key rotation
- Attesters can rotate their key. Past signatures remain valid against the old public key — we keep a key history per attester.
- The new key takes effect for new records signed after the rotation timestamp.

## Privacy considerations
- `geo.neighborhood` is included only for public records when the user opts in.
- `metric` is included only when the user opts in.
- `verifier` PII is reduced to handle + role; no PII beyond what was published.

## Why not a public chain at launch?
- Latency + cost.
- Privacy — a public chain leaks signal even when records are private.
- Compliance — DPDP + GDPR data deletion is incompatible with a public chain.
- We anchor merkle roots later, which gives the tamper-evidence without the leakage.

## Blockchain agent rules
Any agent touching ALVED must:
- Use `@vroe/crypto`. Never reimplement crypto.
- Never bypass signature verification on insert.
- Never modify existing rows in `alved_records`.
- Treat the JSON-LD as the contract. Changes go through `packages/types/src/alved.ts` + a version bump.

