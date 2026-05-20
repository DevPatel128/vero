// ─────────────────────────────────────────────────────────
// RIE Rankings Routes
// ─────────────────────────────────────────────────────────

import { Router, Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';

export const rankingsRouter = Router();

/**
 * GET /rankings
 * Global leaderboard with cursor-based pagination
 * Accepts: scope (global|national|city), domain (fitness|content|gaming), cursor, limit
 */
rankingsRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      scope = 'global',
      domain,
      country,
      city,
      cursor,
      limit = '50',
    } = req.query;

    const take = Math.min(parseInt(limit as string, 10) || 50, 100);
    const domainId = (domain as string) || 'overall';

    // Build user filter for geo scope
    const userWhere: Record<string, unknown> = {};
    if (scope === 'national' && country) userWhere.country = country;
    if (scope === 'city' && city) userWhere.city = city;

    const scoreWhere: Record<string, unknown> = { domainId };
    if (Object.keys(userWhere).length > 0) scoreWhere.user = userWhere;

    const scores = await prisma.score.findMany({
      where: scoreWhere,
      orderBy: { effectiveScore: 'desc' },
      take: take + 1,
      cursor: cursor ? { id: cursor as string } : undefined,
      select: {
        id: true,
        effectiveScore: true,
        tier: true,
        domainId: true,
        user: { select: { id: true, username: true, country: true, city: true } },
      },
    });

    const hasNextPage = scores.length > take;
    const page = hasNextPage ? scores.slice(0, take) : scores;
    const nextCursor = hasNextPage ? page[page.length - 1].id : undefined;

    // Calculate rank offset for cursor pagination
    let rankOffset = 0;
    if (cursor) {
      rankOffset = await prisma.score.count({
        where: { ...scoreWhere, effectiveScore: { gt: page[0]?.effectiveScore ?? 0 } },
      });
    }

    const entries = page.map((s, i) => ({
      rank: rankOffset + i + 1,
      userId: s.user.id,
      username: s.user.username,
      score: s.effectiveScore,
      tier: s.tier,
      country: s.user.country ?? undefined,
      city: s.user.city ?? undefined,
    }));

    res.json({
      success: true,
      data: { entries, nextCursor },
      meta: { limit: take, timestamp: new Date().toISOString() },
    });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /rankings/me
 * Current user's rank
 */
rankingsRouter.get('/me', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).userId || 'demo-user';
    const { domain, domainId: domainIdParam } = req.query;
    const domainId = (domain as string) || (domainIdParam as string) || 'overall';

    const userScore = await prisma.score.findFirst({
      where: { userId, domainId: domainId as string },
    });

    if (!userScore) {
      return res.json({
        success: true,
        data: { rank: null, score: 0, tier: 'unranked' },
        meta: { timestamp: new Date().toISOString() },
      });
    }

    // Count how many users have higher scores
    const rank = await prisma.score.count({
      where: {
        domainId: domainId as string,
        effectiveScore: { gt: userScore.effectiveScore },
      },
    }) + 1;

    res.json({
      success: true,
      data: {
        rank,
        score: userScore.effectiveScore,
        tier: userScore.tier,
        domainId: domainId,
      },
      meta: { timestamp: new Date().toISOString() },
    });
  } catch (err) {
    next(err);
  }
});
