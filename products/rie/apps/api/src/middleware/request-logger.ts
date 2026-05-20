import { Request, Response, NextFunction } from 'express';

/**
 * Request logger — logs method, path, status, duration
 * Never logs PII (no body, no auth headers, no user data)
 */
export function requestLogger(req: Request, res: Response, next: NextFunction): void {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const log = {
      method: req.method,
      path: req.path,
      status: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip,
      userAgent: req.headers['user-agent']?.substring(0, 50),
    };

    if (res.statusCode >= 400) {
      console.error('[API]', JSON.stringify(log));
    } else if (duration > 1000) {
      console.warn('[API] SLOW', JSON.stringify(log));
    }
    // Don't log successful fast requests in production to reduce noise
  });

  next();
}
