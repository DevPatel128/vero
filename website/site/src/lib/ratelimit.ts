import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const hasUpstash = Boolean(
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN,
);

/**
 * Rate limiting is backed by the same Upstash Redis as the waitlist store.
 * With no Redis configured (local dev without Upstash env vars) this
 * returns null and callers must fail open: never let a broken or absent
 * limiter block a legitimate request.
 */
function makeLimiter(prefix: string, requests: number, window: `${number} ${"s" | "m" | "h"}`) {
  if (!hasUpstash) return null;
  return new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(requests, window),
    prefix: `rl:${prefix}`,
    analytics: false,
  });
}

export const joinLimiter = makeLimiter("join", 5, "10 m");
export const investorIpLimiter = makeLimiter("investor-ip", 3, "60 m");
export const investorEmailLimiter = makeLimiter("investor-email", 2, "24 h");

/**
 * Returns true if the request may proceed. Fails open (returns true) when
 * no limiter is configured, or when the limiter itself errors, so an
 * Upstash outage degrades to "no rate limiting" rather than blocking every
 * legitimate signup; the error is logged either way.
 */
export async function withinLimit(
  limiter: Ratelimit | null,
  identifier: string,
): Promise<boolean> {
  if (!limiter) return true;
  try {
    const { success } = await limiter.limit(identifier);
    return success;
  } catch (err) {
    console.error("ratelimit error", err);
    return true;
  }
}

/** Best-effort client IP from Vercel's forwarding headers. */
export function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}
