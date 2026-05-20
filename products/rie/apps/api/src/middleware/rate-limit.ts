import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import Redis from 'ioredis';

// Create a Redis client. Uses localhost if REDIS_URL is not set.
const redisClient = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

// Extractor function to handle IP correctly even behind load balancers
const keyGenerator = (req: any) => {
  return (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim()
    || req.ip
    || 'unknown';
};

/**
 * Global rate limiter — 60 requests per minute per IP
 */
export const rateLimiter = rateLimit({
  windowMs: 60 * 1000,  // 1 minute
  max: 60,               // 60 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  store: new RedisStore({
    // @ts-expect-error - ioredis call signature mismatch with rate-limit-redis
    sendCommand: (...args: string[]) => redisClient.call(...args),
    prefix: 'rl:global:',
  }),
  keyGenerator,
  message: {
    success: false,
    error: {
      code: 'RATE_LIMIT_EXCEEDED',
      message: 'Too many requests. Please try again later.',
    },
  },
});

/**
 * Strict rate limiter for auth endpoints — 10 per minute
 * Prevents credential stuffing and brute force / Phishing botnets
 */
export const authRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  store: new RedisStore({
    // @ts-expect-error - ioredis call signature mismatch
    sendCommand: (...args: string[]) => redisClient.call(...args),
    prefix: 'rl:auth:',
  }),
  keyGenerator,
  message: {
    success: false,
    error: {
      code: 'AUTH_RATE_LIMIT',
      message: 'Too many authentication attempts. Please wait.',
    },
  },
});

/**
 * Upload rate limiter — 30 concurrent per user per minute
 */
export const uploadRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  store: new RedisStore({
    // @ts-expect-error - ioredis call signature mismatch
    sendCommand: (...args: string[]) => redisClient.call(...args),
    prefix: 'rl:upload:',
  }),
  keyGenerator,
  message: {
    success: false,
    error: {
      code: 'UPLOAD_RATE_LIMIT',
      message: 'Upload limit reached. Please wait before submitting more proof.',
    },
  },
});
