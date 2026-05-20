// ─────────────────────────────────────────────────────────
// RIE Score Calculation Engine
// Weighted formula: Consistency 40% + Effort 25% +
//   Improvement 20% + Proof Quality 15%
// ─────────────────────────────────────────────────────────

import { PrismaClient } from '@prisma/client';
import { evaluateBadges } from './badge.engine';

const prisma = new PrismaClient();

// ── Weight Constants ────────────────────────────────────

const WEIGHTS = {
  consistency: 0.40,
  effort: 0.25,
  improvement: 0.20,
  proofQuality: 0.15,
} as const;

const MAX_RAW = 1000;

// ── Tier Thresholds ─────────────────────────────────────

const TIERS = [
  { min: 900, name: 'master' },
  { min: 800, name: 'diamond' },
  { min: 650, name: 'platinum' },
  { min: 500, name: 'gold' },
  { min: 350, name: 'silver' },
  { min: 200, name: 'bronze' },
  { min: 0, name: 'unranked' },
] as const;

function getTier(score: number): string {
  return TIERS.find(t => score >= t.min)?.name || 'unranked';
}

// ── Component Calculators ───────────────────────────────

interface ScoreInput {
  userId: string;
  domainId: string;
  periodDays?: number;
}

/**
 * Consistency Score (0-100)
 * Based on: streak length, adherence rate, missed days
 */
async function calcConsistency(userId: string, domainId: string, periodDays: number): Promise<number> {
  const since = new Date(Date.now() - periodDays * 24 * 60 * 60 * 1000);

  const submissions = await prisma.submission.findMany({
    where: {
      userId,
      domainId,
      verificationStatus: 'verified',
      createdAt: { gte: since },
    },
    select: { createdAt: true },
    orderBy: { createdAt: 'asc' },
  });

  if (submissions.length === 0) return 0;

  // Count unique active days
  const activeDays = new Set(
    submissions.map(s => s.createdAt.toISOString().split('T')[0])
  ).size;

  const adherenceRate = Math.min(activeDays / periodDays, 1.0);

  // Get streak data
  const domain = await prisma.userDomain.findUnique({
    where: { userId_domainId: { userId, domainId } },
  });

  const currentStreak = domain?.currentStreak || 0;
  const streakBonus = Math.min(currentStreak / 90, 1.0); // Max at 90 days

  // Weighted: 60% adherence + 40% streak
  return Math.round((adherenceRate * 60 + streakBonus * 40));
}

/**
 * Effort & Difficulty Score (0-100)
 * Based on: avg effort rating, difficulty distribution
 */
async function calcEffort(userId: string, domainId: string, periodDays: number): Promise<number> {
  const since = new Date(Date.now() - periodDays * 24 * 60 * 60 * 1000);

  const submissions = await prisma.submission.findMany({
    where: {
      userId,
      domainId,
      verificationStatus: 'verified',
      createdAt: { gte: since },
    },
    select: { effortScore: true, qualityScore: true },
  });

  if (submissions.length === 0) return 0;

  const avgEffort = submissions.reduce((sum, s) => sum + (s.effortScore || 0), 0) / submissions.length;
  const avgQuality = submissions.reduce((sum, s) => sum + (s.qualityScore || 0), 0) / submissions.length;

  // Normalize to 0-100
  return Math.round(Math.min((avgEffort * 50 + avgQuality * 50), 100));
}

/**
 * Improvement Score (0-100)
 * Based on: progress over baseline, period-over-period growth
 */
async function calcImprovement(userId: string, domainId: string, periodDays: number): Promise<number> {
  const domain = await prisma.userDomain.findUnique({
    where: { userId_domainId: { userId, domainId } },
  });

  if (!domain?.baselineData) return 50; // Neutral if no baseline

  // Compare current period vs previous period
  const now = Date.now();
  const currentStart = new Date(now - periodDays * 24 * 60 * 60 * 1000);
  const previousStart = new Date(now - periodDays * 2 * 24 * 60 * 60 * 1000);

  const [currentSubs, previousSubs] = await Promise.all([
    prisma.submission.count({
      where: { userId, domainId, verificationStatus: 'verified', createdAt: { gte: currentStart } },
    }),
    prisma.submission.count({
      where: {
        userId, domainId, verificationStatus: 'verified',
        createdAt: { gte: previousStart, lt: currentStart },
      },
    }),
  ]);

  if (previousSubs === 0) return 60; // New user bonus

  const growthRate = (currentSubs - previousSubs) / previousSubs;
  // Cap growth bonus at +50%, penalize decline
  const growthScore = Math.max(0, Math.min(100, 50 + growthRate * 50));

  return Math.round(growthScore);
}

/**
 * Proof Quality Score (0-100)
 * Based on: proof type distribution (API > device > media > manual)
 */
async function calcProofQuality(userId: string, domainId: string, periodDays: number): Promise<number> {
  const since = new Date(Date.now() - periodDays * 24 * 60 * 60 * 1000);

  const submissions = await prisma.submission.findMany({
    where: {
      userId,
      domainId,
      verificationStatus: 'verified',
      createdAt: { gte: since },
    },
    select: { proofType: true, riskScore: true },
  });

  if (submissions.length === 0) return 0;

  const PROOF_WEIGHTS: Record<string, number> = {
    api: 1.0,
    device: 0.9,
    video: 0.7,
    image_metadata: 0.6,
    manual_detailed: 0.4,
    manual: 0.2,
  };

  const proofScore = submissions.reduce((sum, s) => {
    const weight = PROOF_WEIGHTS[s.proofType] || 0.3;
    const riskPenalty = 1 - (s.riskScore || 0);
    return sum + weight * riskPenalty;
  }, 0) / submissions.length;

  return Math.round(proofScore * 100);
}

// ── Main Score Calculator ───────────────────────────────

export class ScoreEngine {

  /**
   * Calculate discipline score for a user in a domain
   */
  async calculate(input: ScoreInput): Promise<{
    rawScore: number;
    effectiveScore: number;
    tier: string;
    components: { consistency: number; effort: number; improvement: number; proofQuality: number };
  }> {
    const { userId, domainId, periodDays = 90 } = input;

    // Calculate all components in parallel
    const [consistency, effort, improvement, proofQuality] = await Promise.all([
      calcConsistency(userId, domainId, periodDays),
      calcEffort(userId, domainId, periodDays),
      calcImprovement(userId, domainId, periodDays),
      calcProofQuality(userId, domainId, periodDays),
    ]);

    // Weighted sum → normalize to 0-1000
    const weighted =
      consistency * WEIGHTS.consistency +
      effort * WEIGHTS.effort +
      improvement * WEIGHTS.improvement +
      proofQuality * WEIGHTS.proofQuality;

    const rawScore = Math.round(weighted * (MAX_RAW / 100));

    // Apply trust modifier
    const trustScore = await prisma.trustScore.findUnique({ where: { userId } });
    const trustModifier = trustScore?.overall || 0.7;
    const effectiveScore = Math.round(rawScore * trustModifier);

    const tier = getTier(effectiveScore);

    return { rawScore, effectiveScore, tier, components: { consistency, effort, improvement, proofQuality } };
  }

  /**
   * Calculate & persist score
   */
  async calculateAndSave(input: ScoreInput): Promise<void> {
    const result = await this.calculate(input);
    const now = new Date();
    const periodStart = new Date(now.getTime() - (input.periodDays || 90) * 24 * 60 * 60 * 1000);

    await prisma.score.upsert({
      where: {
        userId_domainId_periodStart: {
          userId: input.userId,
          domainId: input.domainId,
          periodStart,
        },
      },
      create: {
        userId: input.userId,
        domainId: input.domainId,
        rawScore: result.rawScore,
        effectiveScore: result.effectiveScore,
        tier: result.tier,
        consistency: result.components.consistency,
        effort: result.components.effort,
        improvement: result.components.improvement,
        proofReliability: result.components.proofQuality,
        periodStart,
        periodEnd: now,
      },
      update: {
        rawScore: result.rawScore,
        effectiveScore: result.effectiveScore,
        tier: result.tier,
        consistency: result.components.consistency,
        effort: result.components.effort,
        improvement: result.components.improvement,
        proofReliability: result.components.proofQuality,
        periodEnd: now,
        calculatedAt: now,
      },
    });

    // Fire-and-forget badge evaluation — badge failures must not break score saves
    await evaluateBadges(input.userId, input.domainId).catch(err =>
      console.error('Badge evaluation failed:', err),
    );
  }

  /**
   * Calculate overall score across all domains
   */
  async calculateOverall(userId: string): Promise<{
    overall: number;
    tier: string;
    domains: Record<string, number>;
  }> {
    const userDomains = await prisma.userDomain.findMany({ where: { userId } });

    if (userDomains.length === 0) return { overall: 0, tier: 'unranked', domains: {} };

    const domainScores: Record<string, number> = {};
    let total = 0;

    for (const domain of userDomains) {
      const result = await this.calculate({ userId, domainId: domain.domainId });
      domainScores[domain.domainId] = result.effectiveScore;
      total += result.effectiveScore;
    }

    const overall = Math.round(total / userDomains.length);
    return { overall, tier: getTier(overall), domains: domainScores };
  }
}

export const scoreEngine = new ScoreEngine();
