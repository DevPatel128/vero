import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { authenticate } from '../middleware/auth';
import { uploadRateLimiter } from '../middleware/rate-limit';
import { ApiError } from '../middleware/error-handler';
import { mediaStorage } from '../services/media-storage';

export const mediaRouter = Router();

mediaRouter.use(uploadRateLimiter);

const uploadUrlSchema = z.object({
  contentType: z.string().min(1),
  domain: z.enum(['fitness', 'content', 'gaming']),
  size: z.coerce.number().int().positive().max(50 * 1024 * 1024),
});

const confirmSchema = z.object({
  key: z.string().min(1),
});

/**
 * GET /media/upload-url
 * Get a presigned S3 PUT URL for direct client upload
 */
mediaRouter.get('/upload-url', authenticate, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = uploadUrlSchema.safeParse({
      contentType: req.query.contentType,
      domain: req.query.domain,
      size: req.query.size ?? '1',
    });

    if (!parsed.success) {
      throw ApiError.badRequest(parsed.error.errors.map((e) => `${e.path}: ${e.message}`).join(', '));
    }

    const userId = (req as any).userId;
    const { contentType, domain, size } = parsed.data;

    const result = await mediaStorage.getPresignedUploadUrl(userId, domain, contentType, size);

    res.json({
      success: true,
      data: result,
      meta: { timestamp: new Date().toISOString() },
    });
  } catch (err: any) {
    if (err.message === 'FILE_TOO_LARGE') return next(ApiError.badRequest('File must be under 50 MB.'));
    if (err.message === 'INVALID_FILE_TYPE') return next(ApiError.badRequest('Unsupported file type.'));
    next(err);
  }
});

/**
 * POST /media/confirm
 * Confirm a completed upload and return the CDN URL
 */
mediaRouter.post('/confirm', authenticate, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = confirmSchema.safeParse(req.body);
    if (!parsed.success) {
      throw ApiError.badRequest(parsed.error.errors.map((e) => `${e.path}: ${e.message}`).join(', '));
    }

    const { key } = parsed.data;
    const url = mediaStorage.getSignedDownloadUrl(key);

    res.json({
      success: true,
      data: { key, url },
      meta: { timestamp: new Date().toISOString() },
    });
  } catch (err) {
    next(err);
  }
});
