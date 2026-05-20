import "server-only";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

type LimiterKey = "api" | "ai" | "auth" | "email";

const WINDOWS: Record<LimiterKey, { tokens: number; window: `${number} s` }> = {
  api:   { tokens: 60, window: "60 s" },
  ai:    { tokens: 20, window: "60 s" },
  auth:  { tokens: 10, window: "60 s" },
  email: { tokens: 5,  window: "60 s" },
};

let _redis: Redis | null | undefined;
const _limiters: Partial<Record<LimiterKey, Ratelimit>> = {};

function stripQuotes(s: string): string {
  return s.replace(/^["']|["']$/g, "").trim();
}

function getRedis(): Redis | null {
  if (_redis !== undefined) return _redis;
  const rawUrl = process.env.UPSTASH_REDIS_REST_URL;
  const rawToken = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!rawUrl || !rawToken) {
    _redis = null;
    return null;
  }
  const url = stripQuotes(rawUrl);
  const token = stripQuotes(rawToken);
  if (!url.startsWith("https://")) {
    console.warn("[rate-limit] UPSTASH_REDIS_REST_URL must start with https; disabling rate limiting");
    _redis = null;
    return null;
  }
  try {
    _redis = new Redis({ url, token });
  } catch (err) {
    console.warn("[rate-limit] Redis init failed; disabling rate limiting", err);
    _redis = null;
  }
  return _redis;
}

function getLimiter(key: LimiterKey): Ratelimit | null {
  if (_limiters[key]) return _limiters[key]!;
  const redis = getRedis();
  if (!redis) return null;
  const cfg = WINDOWS[key];
  _limiters[key] = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(cfg.tokens, cfg.window),
    prefix: `trove:${key}`,
    analytics: true,
  });
  return _limiters[key]!;
}

export async function limit(key: LimiterKey, identifier: string) {
  const lim = getLimiter(key);
  if (!lim) return { success: true, limit: 0, remaining: 0, reset: 0 };
  return lim.limit(identifier);
}

export const limiters = new Proxy({} as Record<LimiterKey, Ratelimit | null>, {
  get(_t, prop: LimiterKey) {
    return getLimiter(prop);
  },
});
