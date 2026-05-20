import { Router, Request, Response, NextFunction } from 'express';
import { authenticate } from '../middleware/auth';
import { prisma } from '../lib/prisma';

export const badgesRouter = Router();

/**
 * GET /badges
 * Return all badge definitions with earned status for the authenticated user.
 */
badgesRouter.get('/', authenticate, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).userId;

    const [allBadges, earnedBadges] = await Promise.all([
      prisma.badge.findMany({ orderBy: { category: 'asc' } }),
      prisma.userBadge.findMany({ where: { userId }, select: { badgeId: true, earnedAt: true } }),
    ]);

    const earnedMap = new Map(earnedBadges.map((ub) => [ub.badgeId, ub.earnedAt.toISOString()]));

    const badges = allBadges.map((b) => ({
      id: b.id,
      name: b.name,
      category: b.category,
      domainId: b.domainId,
      icon: b.icon,
      description: b.description,
      earned: earnedMap.has(b.id),
      earnedAt: earnedMap.get(b.id) ?? null,
    }));

    res.json({
      success: true,
      data: { badges },
      meta: { timestamp: new Date().toISOString() },
    });
  } catch (err) {
    next(err);
  }
});
