// ─────────────────────────────────────────────────────────
// RIE API Server
// Express + TypeScript with full security middleware stack
// ─────────────────────────────────────────────────────────

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import { securityHeaders } from './middleware/security-headers';
import { rateLimiter } from './middleware/rate-limit';
import { requestLogger } from './middleware/request-logger';
import { errorHandler } from './middleware/error-handler';
import { authenticate } from './middleware/auth';
import { authRouter } from './routes/auth';
import { healthRouter } from './routes/health';
import { submissionRouter } from './routes/submissions';
import { scoreRouter } from './routes/scores';
import { rankingsRouter } from './routes/rankings';
import { integrationRouter } from './routes/integrations';
import { badgesRouter } from './routes/badges';
import { mediaRouter } from './routes/media';

// ── Environment Validation ──────────────────────────────

function validateEnv(): void {
  const required = [
    'DATABASE_URL',
    'REDIS_URL',
    'JWT_PRIVATE_KEY',
    'JWT_PUBLIC_KEY',
    'ENCRYPTION_KEY',
  ];

  const optional = [
    'RESEND_API_KEY',
    'AWS_ACCESS_KEY_ID',
    'AWS_SECRET_ACCESS_KEY',
    'FCM_SERVER_KEY',
    'FCM_PROJECT_ID',
    'S3_BUCKET',
    'S3_REGION',
    'S3_ACCESS_KEY',
    'S3_SECRET_KEY',
    'S3_ENDPOINT',
  ];

  const missing = required.filter(key => !process.env[key]);

  for (const key of missing) {
    console.error(`[ENV] Missing required environment variable: ${key}`);
  }

  for (const key of optional) {
    if (!process.env[key]) {
      console.warn(`[ENV] Optional environment variable not set: ${key}`);
    }
  }

  if (missing.length > 0) {
    console.error(`[ENV] Server cannot start: ${missing.length} required variable(s) missing.`);
    process.exit(1);
  }
}

validateEnv();

const app = express();
const PORT = process.env.PORT || 4000;

// ── Security Middleware (order matters) ─────────────────

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:', 'https:'],
      connectSrc: ["'self'"],
      fontSrc: ["'self'", 'https://fonts.gstatic.com'],
      objectSrc: ["'none'"],
      frameSrc: ["'none'"],
    },
  },
  crossOriginEmbedderPolicy: true,
  crossOriginOpenerPolicy: true,
  crossOriginResourcePolicy: { policy: 'same-origin' },
  hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
}));

app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-Signature', 'X-Request-Timestamp'],
  maxAge: 86400,
}));

app.use(securityHeaders);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use(compression());
app.use(rateLimiter);
app.use(requestLogger);

// ── Public Routes ───────────────────────────────────────

app.use('/health', healthRouter);
app.use('/auth', authRouter);

// ── Authenticated Routes ────────────────────────────────

app.use('/submissions', authenticate, submissionRouter);
app.use('/score', authenticate, scoreRouter);
app.use('/rankings', authenticate, rankingsRouter);
app.use('/integrations', integrationRouter);
app.use('/badges', authenticate, badgesRouter);
app.use('/media', authenticate, mediaRouter);
// /devices/push-token is mounted under /auth in authRouter

// ── Error Handling ──────────────────────────────────────

app.use(errorHandler);

// ── Start ───────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`
  ┌─────────────────────────────────────┐
  │                                     │
  │   RIE API Server v2.0               │
  │   The Discipline App                │
  │                                     │
  │   Port: ${PORT}                        │
  │   Env:  ${process.env.NODE_ENV || 'development'}               │
  │                                     │
  │   Routes:                           │
  │     POST /auth/register             │
  │     POST /auth/login                │
  │     POST /auth/refresh              │
  │     POST /submissions               │
  │     GET  /submissions               │
  │     GET  /score                     │
  │     GET  /score/:domainId           │
  │     POST /score/recalculate         │
  │     GET  /rankings                  │
  │     GET  /rankings/me               │
  │                                     │
  └─────────────────────────────────────┘
  `);
});

export default app;
