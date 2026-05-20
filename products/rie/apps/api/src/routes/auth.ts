import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { authRateLimiter } from '../middleware/rate-limit';
import { ApiError } from '../middleware/error-handler';
import { authService } from '../services/auth.service';
import { authenticate } from '../middleware/auth';
import { csrfProtection } from '../middleware/csrf';

export const authRouter = Router();

// Apply stricter rate limiting to all auth routes
authRouter.use(authRateLimiter);

// ── Validation Schemas ──────────────────────────────────

const updateProfileSchema = z.object({
  displayName: z.string().min(1).max(100).optional(),
  username: z.string().min(3).max(30).regex(/^[a-zA-Z0-9_]+$/).optional(),
  timezone: z.string().max(64).optional(),
  location: z.string().max(200).optional(),
});

const pushTokenSchema = z.object({
  token: z.string().min(1).max(512),
  platform: z.enum(['ios', 'android', 'web']),
});

const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

const resetPasswordSchema = z.object({
  token: z.string().min(1),
  newPassword: z.string().min(8).max(128),
});

const registerSchema = z.object({
  email: z.string().email().max(255),
  password: z.string().min(8).max(128),
  name: z.string().min(1).max(100),
  username: z.string().min(3).max(30).regex(/^[a-zA-Z0-9_]+$/),
  locale: z.string().default('en'),
  timezone: z.string().default('UTC'),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  deviceId: z.string().optional(),
});

const refreshSchema = z.object({
  refreshToken: z.string().min(1),
});

// ── Helper: Validate request body with Zod ──────────────

function validate<T>(schema: z.ZodSchema<T>) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const errors = result.error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ');
      return next(ApiError.badRequest(`Validation failed: ${errors}`, 'VALIDATION_ERROR'));
    }
    req.body = result.data;
    next();
  };
}

// ── Routes ──────────────────────────────────────────────

/**
 * POST /auth/register
 * Create a new user account
 */
authRouter.post('/register', csrfProtection, validate(registerSchema), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await authService.register(req.body);

    const isProd = process.env.NODE_ENV === 'production';
    res.cookie('accessToken', result.tokens.accessToken, { httpOnly: true, secure: isProd, sameSite: 'lax', maxAge: 15 * 60 * 1000 });
    res.cookie('refreshToken', result.tokens.refreshToken, { httpOnly: true, secure: isProd, sameSite: 'lax', maxAge: 7 * 24 * 60 * 60 * 1000 });

    res.status(201).json({
      success: true,
      data: {
        user: result.user,
        accessToken: result.tokens.accessToken,
        refreshToken: result.tokens.refreshToken,
      },
      meta: { timestamp: new Date().toISOString() },
    });
  } catch (err: any) {
    if (err.message === 'EMAIL_EXISTS') {
      return next(ApiError.conflict('An account with this email already exists.'));
    }
    if (err.message === 'USERNAME_EXISTS') {
      return next(ApiError.conflict('This username is already taken.'));
    }
    next(err);
  }
});

/**
 * POST /auth/login
 * Authenticate and receive token pair
 */
authRouter.post('/login', csrfProtection, validate(loginSchema), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await authService.login(req.body);

    const isProd = process.env.NODE_ENV === 'production';
    res.cookie('accessToken', result.tokens.accessToken, { httpOnly: true, secure: isProd, sameSite: 'lax', maxAge: 15 * 60 * 1000 });
    res.cookie('refreshToken', result.tokens.refreshToken, { httpOnly: true, secure: isProd, sameSite: 'lax', maxAge: 7 * 24 * 60 * 60 * 1000 });

    res.json({
      success: true,
      data: {
        user: result.user,
        accessToken: result.tokens.accessToken,
        refreshToken: result.tokens.refreshToken,
      },
      meta: { timestamp: new Date().toISOString() },
    });
  } catch (err: any) {
    if (err.message === 'INVALID_CREDENTIALS') {
      return next(ApiError.unauthorized('Invalid email or password.'));
    }
    next(err);
  }
});

/**
 * POST /auth/refresh
 * Rotate refresh token and get new access token
 */
authRouter.post('/refresh', csrfProtection, validate(refreshSchema), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tokens = await authService.refreshTokens(req.body.refreshToken);

    const isProd = process.env.NODE_ENV === 'production';
    res.cookie('accessToken', tokens.accessToken, { httpOnly: true, secure: isProd, sameSite: 'lax', maxAge: 15 * 60 * 1000 });
    res.cookie('refreshToken', tokens.refreshToken, { httpOnly: true, secure: isProd, sameSite: 'lax', maxAge: 7 * 24 * 60 * 60 * 1000 });

    res.json({
      success: true,
      data: { message: 'Tokens refreshed' },
      meta: { timestamp: new Date().toISOString() },
    });
  } catch (err: any) {
    if (err.message === 'SESSION_EXPIRED') {
      return next(ApiError.unauthorized('Session expired. Please sign in again.'));
    }
    next(err);
  }
});

/**
 * DELETE /auth/sessions
 * Revoke all sessions (sign out everywhere)
 */
authRouter.delete('/sessions', csrfProtection, authenticate, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).userId;
    await authService.revokeAllSessions(userId);

    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    res.json({
      success: true,
      data: { message: 'All sessions revoked.' },
      meta: { timestamp: new Date().toISOString() },
    });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /auth/me
 * Return current user from valid JWT
 */
authRouter.get('/me', authenticate, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).userId;
    const user = await authService.getMe(userId);
    res.json({
      success: true,
      data: user,
      meta: { timestamp: new Date().toISOString() },
    });
  } catch (err) {
    next(err);
  }
});

/**
 * PUT /auth/profile
 * Update authenticated user's profile
 */
authRouter.put('/profile', authenticate, validate(updateProfileSchema), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).userId;
    const updated = await authService.updateProfile(userId, req.body);
    res.json({
      success: true,
      data: updated,
      meta: { timestamp: new Date().toISOString() },
    });
  } catch (err: any) {
    if (err.message === 'USERNAME_EXISTS') {
      return next(ApiError.conflict('This username is already taken.'));
    }
    next(err);
  }
});

/**
 * POST /devices/push-token
 * Register a device push token (called after login)
 */
authRouter.post('/devices/push-token', authenticate, validate(pushTokenSchema), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).userId;
    await authService.registerDevice(userId, req.body.token, req.body.platform);
    res.json({
      success: true,
      data: { message: 'Push token registered.' },
      meta: { timestamp: new Date().toISOString() },
    });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /auth/forgot-password
 * Initiate password reset (sends email with reset link)
 */
authRouter.post('/forgot-password', authRateLimiter, validate(forgotPasswordSchema), async (req: Request, res: Response, next: NextFunction) => {
  try {
    await authService.forgotPassword(req.body.email);
    // Always return 200 to prevent email enumeration
    res.json({
      success: true,
      data: { message: 'If an account exists, a reset email has been sent.' },
      meta: { timestamp: new Date().toISOString() },
    });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /auth/reset-password
 * Complete password reset using token from email
 */
authRouter.post('/reset-password', authRateLimiter, validate(resetPasswordSchema), async (req: Request, res: Response, next: NextFunction) => {
  try {
    await authService.resetPassword(req.body.token, req.body.newPassword);
    res.json({
      success: true,
      data: { message: 'Password updated successfully.' },
      meta: { timestamp: new Date().toISOString() },
    });
  } catch (err: any) {
    if (err.message === 'INVALID_OR_EXPIRED_TOKEN') {
      return next(ApiError.badRequest('Reset link is invalid or has expired.', 'INVALID_TOKEN'));
    }
    next(err);
  }
});
