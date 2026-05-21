import { fileStore } from "./file-store";
import { supabaseStore } from "./supabase-store";
import type { WaitlistEntry, WaitlistStore } from "./types";

// Production: Supabase (serverless-safe). Dev: file-backed JSON.
const storeMode = process.env.WAITLIST_STORE ?? "file";
export const waitlist: WaitlistStore =
  storeMode === "supabase" ? supabaseStore : fileStore;

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

