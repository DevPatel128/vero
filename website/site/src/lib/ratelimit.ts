import { getDb } from "@/lib/cloudflare";

export type Limiter = { prefix: string; requests: number; windowSeconds: number };

/**
 * Fixed-window counters in Cloudflare D1. With no D1 binding (local dev and
 * tests) limiting is skipped. It also fails open on any error: a broken
 * limiter must never block a legitimate request.
 */
export const joinLimiter: Limiter = { prefix: "join", requests: 5, windowSeconds: 10 * 60 };
export const investorIpLimiter: Limiter = { prefix: "investor-ip", requests: 3, windowSeconds: 60 * 60 };
export const investorEmailLimiter: Limiter = { prefix: "investor-email", requests: 2, windowSeconds: 24 * 60 * 60 };

/** Returns true if the request may proceed. */
export async function withinLimit(limiter: Limiter, identifier: string): Promise<boolean> {
  const db = getDb();
  if (!db) return true;
  try {
    const now = Math.floor(Date.now() / 1000);
    const windowStart = now - (now % limiter.windowSeconds);
    const row = await db
      .prepare(
        `INSERT INTO rate_limits (key, window_start, count) VALUES (?, ?, 1)
         ON CONFLICT(key, window_start) DO UPDATE SET count = count + 1
         RETURNING count`,
      )
      .bind(`${limiter.prefix}:${identifier}`, windowStart)
      .first<{ count: number }>();

    // Occasional cleanup of expired windows keeps the table small.
    if (Math.random() < 0.01) {
      await db.prepare("DELETE FROM rate_limits WHERE window_start < ?").bind(now - 2 * 24 * 60 * 60).run();
    }
    return (row?.count ?? 1) <= limiter.requests;
  } catch (err) {
    console.error("ratelimit error", err);
    return true;
  }
}

/** Best-effort client IP. Cloudflare sets cf-connecting-ip. */
export function clientIp(req: Request): string {
  const cf = req.headers.get("cf-connecting-ip");
  if (cf) return cf.trim();
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}
