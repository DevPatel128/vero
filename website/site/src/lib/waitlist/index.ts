import { fileStore } from "./file-store";
import { upstashStore } from "./upstash-store";
import type { WaitlistEntry, WaitlistStore } from "./types";

const hasUpstash = Boolean(
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN,
);

// On Vercel the file store cannot work (read-only filesystem), so a missing
// or partial Upstash config must fail at startup, not silently fall back to
// a store that will error on every request.
if (process.env.VERCEL && !hasUpstash) {
  throw new Error(
    "UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN must both be set in this environment.",
  );
}

// Upstash Redis when configured (required in prod), file-backed in local dev.
export const waitlist: WaitlistStore = hasUpstash ? upstashStore : fileStore;

/**
 * Position math:
 *   shown position = absolute position − (5 × referralCount)
 *   floor at 1.
 */
export function effectivePosition(entry: WaitlistEntry): number {
  const adjusted = entry.position - entry.referralCount * 5;
  return adjusted < 1 ? 1 : adjusted;
}

/**
 * Founding-member tier: first 1000 are founders.
 */
export function tierFor(position: number): "founder" | "pioneer" | "early" {
  if (position <= 1000) return "founder";
  if (position <= 5000) return "pioneer";
  return "early";
}

export function tierLabel(t: ReturnType<typeof tierFor>): string {
  switch (t) {
    case "founder":
      return "Founding member";
    case "pioneer":
      return "Pioneer";
    case "early":
      return "Early member";
  }
}
