import { fileStore } from "./file-store";
import { upstashStore } from "./upstash-store";
import type { WaitlistEntry, WaitlistStore } from "./types";

// Upstash Redis in prod (UPSTASH_REDIS_REST_URL set), file-backed in dev.
export const waitlist: WaitlistStore =
  process.env.UPSTASH_REDIS_REST_URL ? upstashStore : fileStore;

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
