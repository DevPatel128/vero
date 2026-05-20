// ─────────────────────────────────────────────────────────
// RIE Badge Evaluation Engine
// Evaluates and awards badges based on user activity.
// All DB reads are batched at the top — no per-badge queries.
// ─────────────────────────────────────────────────────────

import { prisma } from '../lib/prisma';

// ── Criteria Type Definitions ───────────────────────────

interface StreakCriteria {
  type: 'streak';
  domain: string;
  days: number;
}

interface ScoreCriteria {
  type: 'score';
  domain: string;
  min: number;
}

interface SubmissionsCriteria {
  type: 'submissions';
  count: number;
}

interface TrustCriteria {
  type: 'trust';
  min: number;
}

type BadgeCriteria = StreakCriteria | ScoreCriteria | SubmissionsCriteria | TrustCriteria;

// ── Helpers ─────────────────────────────────────────────

function parseCriteria(raw: unknown): BadgeCriteria | null {
  if (!raw || typeof raw !== 'object') return null;
  const c = raw as Record<string, unknown>;
  if (typeof c.type !== 'string') return null;

  switch (c.type) {
    case 'streak':
      if (typeof c.domain === 'string' && typeof c.days === 'number') {
        return { type: 'streak', domain: c.domain, days: c.days };
      }
      break;
    case 'score':
      if (typeof c.domain === 'string' && typeof c.min === 'number') {
        return { type: 'score', domain: c.domain, min: c.min };
      }
      break;
    case 'submissions':
      if (typeof c.count === 'number') {
        return { type: 'submissions', count: c.count };
      }
      break;
    case 'trust':
      if (typeof c.min === 'number') {
        return { type: 'trust', min: c.min };
      }
      break;
  }

  return null;
}

// ── Badge Evaluator ─────────────────────────────────────

/**
 * Evaluate all unearned badges for a user and award any that are now met.
 * Optionally scoped to a specific domain — domain-agnostic criteria are always
 * evaluated regardless.
 */
export async function evaluateBadges(userId: string, domainId?: string): Promise<void> {
  // Batch all reads up front to avoid per-badge round trips
  const [
    allBadges,
    earnedBadges,
    userDomains,
    scores,
    trustScore,
    submissionCount,
  ] = await Promise.all([
    prisma.badge.findMany(),
    prisma.userBadge.findMany({
      where: { userId },
      select: { badgeId: true },
    }),
    prisma.userDomain.findMany({
      where: { userId },
      select: { domainId: true, currentStreak: true },
    }),
    prisma.score.findMany({
      where: { userId },
      select: { domainId: true, rawScore: true },
    }),
    prisma.trustScore.findUnique({
      where: { userId },
      select: { overall: true },
    }),
    prisma.submission.count({
      where: { userId, verificationStatus: 'verified' },
    }),
  ]);

  const earnedSet = new Set(earnedBadges.map(ub => ub.badgeId));

  // Index domain data for O(1) lookups
  const streakByDomain = new Map(userDomains.map(d => [d.domainId, d.currentStreak]));
  const scoreByDomain = new Map(scores.map(s => [s.domainId, s.rawScore]));
  const trustOverall = trustScore?.overall ?? 0;

  const awards: Promise<unknown>[] = [];

  for (const badge of allBadges) {
    if (earnedSet.has(badge.id)) continue;

    const criteria = parseCriteria(badge.criteria);
    if (!criteria) continue;

    let met = false;

    switch (criteria.type) {
      case 'streak': {
        const streak = streakByDomain.get(criteria.domain) ?? 0;
        met = streak >= criteria.days;
        break;
      }
      case 'score': {
        const raw = scoreByDomain.get(criteria.domain) ?? 0;
        met = raw >= criteria.min;
        break;
      }
      case 'submissions': {
        met = submissionCount >= criteria.count;
        break;
      }
      case 'trust': {
        met = trustOverall >= criteria.min;
        break;
      }
    }

    if (met) {
      awards.push(
        prisma.userBadge.create({
          data: { userId, badgeId: badge.id, earnedAt: new Date() },
        }),
      );
    }
  }

  if (awards.length > 0) {
    await Promise.all(awards);
  }
}
