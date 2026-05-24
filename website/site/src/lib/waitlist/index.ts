import { fileStore } from "./file-store";
import type { WaitlistEntry, WaitlistStore } from "./types";

// Single shared store. File-backed for dev + low-volume prod.
// Swap to a Supabase / Postgres impl by adding another module + env switch.
export const waitlist: WaitlistStore = fileStore;

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
