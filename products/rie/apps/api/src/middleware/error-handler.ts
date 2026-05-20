import { Request, Response, NextFunction } from 'express';
import type { ApiResponse } from '@rie/shared';

/**
 * Global error handler
 * Catches all unhandled errors, returns structured API response
 * Never exposes internal error details to client
 */
export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction): void {
  console.error('[ERROR]', {
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });

  const statusCode = (err as any).statusCode || 500;
  const response: ApiResponse<null> = {
    success: false,
    error: {
      code: (err as any).code || 'INTERNAL_ERROR',
      message: statusCode === 500
        ? 'An unexpected error occurred. Please try again.'
        : err.message,
    },
    meta: {
      timestamp: new Date().toISOString(),
    },
  };

  res.status(statusCode).json(response);
}

/**
 * Custom API error class
 */
export class ApiError extends Error {
  statusCode: number;
  code: string;

  constructor(statusCode: number, code: string, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.name = 'ApiError';
  }

  static badRequest(message: string, code = 'BAD_REQUEST') {
    return new ApiError(400, code, message);
  }

  static unauthorized(message = 'Authentication required') {
    return new ApiError(401, 'UNAUTHORIZED', message);
  }

  static forbidden(message = 'Access denied') {
    return new ApiError(403, 'FORBIDDEN', message);
  }

  static notFound(message = 'Resource not found') {
    return new ApiError(404, 'NOT_FOUND', message);
  }

  static conflict(message: string) {
    return new ApiError(409, 'CONFLICT', message);
  }

  static tooManyRequests(message = 'Rate limit exceeded') {
    return new ApiError(429, 'RATE_LIMITED', message);
  }
}
