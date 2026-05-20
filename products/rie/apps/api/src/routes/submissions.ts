// ─────────────────────────────────────────────────────────
// RIE Submission Routes
// ─────────────────────────────────────────────────────────

import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { uploadRateLimiter } from '../middleware/rate-limit';
import { ApiError } from '../middleware/error-handler';
import { submissionService } from '../services/submission.service';
import { prisma } from '../lib/prisma';
import { csrfProtection } from '../middleware/csrf';

export const submissionRouter = Router();

// Stricter rate limit for uploads
submissionRouter.use(uploadRateLimiter);

// ── Validation ──────────────────────────────────────────

const submitSchema = z.object({
  domainId: z.enum(['fitness', 'content', 'gaming']),
  activityType: z.string().min(1).max(100),
  proofType: z.enum(['api', 'device', 'video', 'image_metadata', 'image_bare', 'manual_detailed', 'manual']),
  mediaRef: z.string().optional(),
  content: z.string().min(1),
  userSignature: z.string().min(1),
  metadata: z.record(z.unknown()).optional(),
  duration: z.number().min(0).max(1440).optional(),
  intensity: z.enum(['Low', 'Medium', 'High', 'Maximum']).optional(),
});

// ── Routes ──────────────────────────────────────────────

/**
 * POST /submissions
 * Submit proof for verification
 */
submissionRouter.post('/', csrfProtection, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = submitSchema.safeParse(req.body);
    if (!parsed.success) {
      throw ApiError.badRequest(parsed.error.errors.map(e => `${e.path}: ${e.message}`).join(', '));
    }

    // userId would come from auth middleware
    const userId = (req as any).userId || 'demo-user';

    const result = await submissionService.submit({
      userId,
      ...parsed.data,
    });

    res.status(201).json({
      success: true,
      data: result,
      meta: { timestamp: new Date().toISOString() },
    });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /submissions
 * List user's submissions
 */
submissionRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).userId || 'demo-user';
    const { domainId, status, limit = '20', offset = '0' } = req.query;

    // Build where clause
    const where: any = { userId };
    if (domainId) where.domainId = domainId;
    if (status) where.verificationStatus = status;

    const [submissions, total] = await Promise.all([
      prisma.submission.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: Math.min(parseInt(limit as string), 50),
        skip: parseInt(offset as string),
        select: {
          id: true,
          domainId: true,
          activityType: true,
          proofType: true,
          verificationStatus: true,
          qualityScore: true,
          effortScore: true,
          createdAt: true,
          verifiedAt: true,
        },
      }),
      prisma.submission.count({ where }),
    ]);

    res.json({
      success: true,
      data: { submissions, total },
      meta: { limit: parseInt(limit as string), offset: parseInt(offset as string), timestamp: new Date().toISOString() },
    });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /submissions/:id
 * Get a single submission's full detail
 */
submissionRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).userId || 'demo-user';
    const submission = await prisma.submission.findFirst({
      where: { id: req.params.id, userId },
      select: {
        id: true,
        domainId: true,
        activityType: true,
        proofType: true,
        mediaRef: true,
        verificationStatus: true,
        riskScore: true,
        qualityScore: true,
        effortScore: true,
        rejectionReason: true,
        metadata: true,
        createdAt: true,
        verifiedAt: true,
      },
    });

    if (!submission) throw ApiError.notFound('Submission not found');

    res.json({
      success: true,
      data: submission,
      meta: { timestamp: new Date().toISOString() },
    });
  } catch (err) {
    next(err);
  }
});
