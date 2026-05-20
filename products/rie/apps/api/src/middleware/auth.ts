// ─────────────────────────────────────────────────────────
// RIE JWT Auth Middleware
// Verifies access token and attaches userId to request
// ─────────────────────────────────────────────────────────

import { Request, Response, NextFunction } from 'express';
import { ApiError } from './error-handler';
import { verifyAccessToken } from '@rie/crypto';

/**
 * Authenticate requests via Bearer token
 * Extracts userId from JWT and attaches to request
 */
export function authenticate(req: Request, _res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  const cookieToken = req.cookies?.accessToken;

  const token = cookieToken || (authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null);

  if (!token) {
    return next(ApiError.unauthorized('Missing or invalid auth token'));
  }

  verifyAccessToken(token)
    .then((payload) => {
      if (!payload.sub) {
        return next(ApiError.unauthorized('Invalid token'));
      }

      // Attach userId to request
      (req as any).userId = payload.sub;
      next();
    })
    .catch(() => {
      next(ApiError.unauthorized('Invalid token'));
    });
}

/**
 * Optional auth — doesn't fail if no token present
 */
export function optionalAuth(req: Request, _res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  const cookieToken = req.cookies?.accessToken;

  const token = cookieToken || (authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null);

  if (!token) {
    return next();
  }

  verifyAccessToken(token)
    .then((payload) => {
      if (payload.sub) (req as any).userId = payload.sub;
      next();
    })
    .catch(() => {
      // Ignore invalid tokens in optional auth
      next();
    });
}
