// ─────────────────────────────────────────────────────────
// RIE CSRF Protection Middleware
// Strategy: Origin/Referer header validation (double-submit)
// Skipped for Bearer token auth (stateless, not CSRF-vulnerable)
// ─────────────────────────────────────────────────────────

import { Request, Response, NextFunction } from 'express';

const STATE_MUTATING_METHODS = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

function parseOriginHost(req: Request): string | null {
  const origin = req.headers.origin;
  if (origin) {
    try {
      return new URL(origin).host;
    } catch {
      return null;
    }
  }

  const referer = req.headers.referer;
  if (referer) {
    try {
      return new URL(referer).host;
    } catch {
      return null;
    }
  }

  return null;
}

function getAllowedHosts(): Set<string> {
  const raw = process.env.ALLOWED_ORIGINS || 'http://localhost:3000';
  return new Set(
    raw
      .split(',')
      .map(s => s.trim())
      .filter(Boolean)
      .map(origin => {
        try {
          return new URL(origin).host;
        } catch {
          return origin;
        }
      }),
  );
}

export function csrfProtection(req: Request, res: Response, next: NextFunction): void {
  if (!STATE_MUTATING_METHODS.has(req.method)) {
    return next();
  }

  // Bearer token requests are stateless and not CSRF-vulnerable
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return next();
  }

  const requestHost = parseOriginHost(req);

  if (!requestHost) {
    // No Origin or Referer on a cookie-authenticated state-mutating request — reject
    res.status(403).json({ error: 'CSRF check failed' });
    return;
  }

  const allowedHosts = getAllowedHosts();
  if (!allowedHosts.has(requestHost)) {
    res.status(403).json({ error: 'CSRF check failed' });
    return;
  }

  next();
}
