// ─────────────────────────────────────────────────────────
// RIE Score Routes
// ─────────────────────────────────────────────────────────

import { Router, Request, Response, NextFunction } from 'express';
import { scoreEngine } from '../services/score.engine';
import { prisma } from '../lib/prisma';
import { csrfProtection } from '../middleware/csrf';

export const scoreRouter = Router();

const DOMAIN_IDS = ['fitness', 'content', 'gaming'] as const;

function emptyDomainScore(now: Date, periodStart: Date) {
  return {
    raw: 0, effective: 0, tier: 'unranked',
    consistency: 0, effort: 0, improvement: 0, proofReliability: 0,
    periodStart: periodStart.toISOString(),
    periodEnd: now.toISOString(),
  };
}

/**
 * GET /score
 * Returns the full ScoreResponse shape expected by the mobile dashboard
 */
scoreRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).userId;
    const now = new Date();
    const periodStart = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);

    // Calculate all domain scores in parallel
    const domainResults = await Promise.all(
      DOMAIN_IDS.map((domainId) =>
        scoreEngine.calculate({ userId, domainId, periodDays: 90 }).catch(() => null),
      ),
    );

    const scores: Record<string, ReturnType<typeof emptyDomainScore>> = {};
    let totalEffective = 0;
    let activeDomains = 0;

    for (let i = 0; i < DOMAIN_IDS.length; i++) {
      const d = domainResults[i];
      if (d) {
        scores[DOMAIN_IDS[i]] = {
          raw: d.rawScore,
          effective: d.effectiveScore,
          tier: d.tier,
          consistency: d.components.consistency,
          effort: d.components.effort,
          improvement: d.components.improvement,
          proofReliability: d.components.proofQuality,
          periodStart: periodStart.toISOString(),
          periodEnd: now.toISOString(),
        };
        totalEffective += d.effectiveScore;
        activeDomains++;
      } else {
        scores[DOMAIN_IDS[i]] = emptyDomainScore(now, periodStart);
      }
    }

    const overallEffective = activeDomains > 0 ? Math.round(totalEffective / activeDomains) : 0;
    const overallTier = overallEffective >= 950 ? 'master'
      : overallEffective >= 850 ? 'diamond'
      : overallEffective >= 700 ? 'platinum'
      : overallEffective >= 500 ? 'gold'
      : overallEffective >= 300 ? 'silver'
      : overallEffective >= 100 ? 'bronze'
      : 'unranked';

    const overallConsistency = activeDomains > 0
      ? Math.round(DOMAIN_IDS.reduce((s, d) => s + (scores[d]?.consistency ?? 0), 0) / activeDomains)
      : 0;
    const overallEffort = activeDomains > 0
      ? Math.round(DOMAIN_IDS.reduce((s, d) => s + (scores[d]?.effort ?? 0), 0) / activeDomains)
      : 0;

    // Query trust score
    const trustRow = await prisma.trustScore.findUnique({ where: { userId } });
    const trustScore = trustRow
      ? {
          overall: trustRow.overall,
          proofAuthenticity: trustRow.proofAuthenticity,
          behavioralConsistency: trustRow.behavioralConsistency,
          accountMaturity: trustRow.accountMaturity,
          fraudSignals: trustRow.fraudSignals,
          updatedAt: trustRow.updatedAt.toISOString(),
        }
      : {
          overall: 0.7, proofAuthenticity: 0.7, behavioralConsistency: 0.7,
          accountMaturity: 0.5, fraudSignals: 1.0, updatedAt: now.toISOString(),
        };

    // Query last submission per domain
    const lastSubs = await prisma.submission.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      distinct: ['domainId'],
      select: { domainId: true, createdAt: true },
    });

    const lastSubmissions: Record<string, string | null> = { fitness: null, content: null, gaming: null };
    for (const sub of lastSubs) {
      lastSubmissions[sub.domainId] = sub.createdAt.toISOString();
    }

    // Calculate current streaks per domain (consecutive days ending today/yesterday)
    const streakCutoff = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const recentSubs = await prisma.submission.findMany({
      where: { userId, createdAt: { gte: streakCutoff }, verificationStatus: { not: 'rejected' } },
      select: { domainId: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
    });

    const currentStreaks: Record<string, number> = { fitness: 0, content: 0, gaming: 0 };
    for (const domainId of DOMAIN_IDS) {
      const dates = [...new Set(
        recentSubs
          .filter((s) => s.domainId === domainId)
          .map((s) => s.createdAt.toISOString().slice(0, 10)),
      )].sort().reverse();

      if (dates.length === 0) continue;
      const todayStr = now.toISOString().slice(0, 10);
      const yesterdayStr = new Date(now.getTime() - 86400000).toISOString().slice(0, 10);

      if (dates[0] !== todayStr && dates[0] !== yesterdayStr) continue;

      let streak = 0;
      let expectedDate = new Date(dates[0] + 'T00:00:00Z');
      for (const dateStr of dates) {
        const d = new Date(dateStr + 'T00:00:00Z');
        if (d.getTime() === expectedDate.getTime()) {
          streak++;
          expectedDate = new Date(expectedDate.getTime() - 86400000);
        } else {
          break;
        }
      }
      currentStreaks[domainId] = streak;
    }

    res.json({
      success: true,
      data: {
        overallScore: {
          raw: overallEffective,
          effective: overallEffective,
          tier: overallTier,
          consistency: overallConsistency,
          effort: overallEffort,
          improvement: 0,
          proofReliability: 0,
          periodStart: periodStart.toISOString(),
          periodEnd: now.toISOString(),
        },
        scores,
        trustScore,
        currentStreaks,
        lastSubmissions,
      },
      meta: { timestamp: now.toISOString() },
    });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /score/:domainId
 * Get detailed score breakdown for a domain
 */
scoreRouter.get('/:domainId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).userId || 'demo-user';
    const { domainId } = req.params;
    const { period = '90' } = req.query;

    const result = await scoreEngine.calculate({
      userId,
      domainId,
      periodDays: parseInt(period as string),
    });

    res.json({
      success: true,
      data: {
        domainId,
        score: result.effectiveScore,
        rawScore: result.rawScore,
        tier: result.tier,
        components: result.components,
        period: parseInt(period as string),
      },
      meta: { timestamp: new Date().toISOString() },
    });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /score/recalculate
 * Force recalculation of all domain scores
 */
scoreRouter.post('/recalculate', csrfProtection, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).userId || 'demo-user';

    const domains = await prisma.userDomain.findMany({ where: { userId } });

    const results: Record<string, any> = {};
    for (const domain of domains) {
      const result = await scoreEngine.calculate({ userId, domainId: domain.domainId });
      await scoreEngine.calculateAndSave({ userId, domainId: domain.domainId });
      results[domain.domainId] = result;
    }

    res.json({
      success: true,
      data: { recalculated: domains.length, results },
      meta: { timestamp: new Date().toISOString() },
    });
  } catch (err) {
    next(err);
  }
});
