import { getDb } from "@/lib/cloudflare";
import { d1Store } from "./d1-store";
import type { WaitlistEntry, WaitlistStore } from "./types";

async function resolveStore(): Promise<WaitlistStore> {
  const db = getDb();
  if (db) return d1Store(db);
  // The file store needs a writable filesystem, so it is for local dev and
  // tests only. In production a missing D1 binding must fail loudly.
  if (process.env.NODE_ENV === "production") {
    throw new Error("D1 binding `DB` is not available in this environment.");
  }
  const { fileStore } = await import("./file-store");
  return fileStore;
}

// Resolved per call because Cloudflare bindings exist only inside a request.
export const waitlist: WaitlistStore = {
  add: async (input) => (await resolveStore()).add(input),
  findByToken: async (t) => (await resolveStore()).findByToken(t),
  findByEmail: async (e) => (await resolveStore()).findByEmail(e),
  findByCode: async (c) => (await resolveStore()).findByCode(c),
  stats: async () => (await resolveStore()).stats(),
  async health() {
    try {
      return await (await resolveStore()).health();
    } catch {
      return false;
    }
  },
};

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
