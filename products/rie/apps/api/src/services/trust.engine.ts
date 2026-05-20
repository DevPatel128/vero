// ─────────────────────────────────────────────────────────
// RIE Trust Score Engine
// Composite trust evaluation across 4 signals
// ─────────────────────────────────────────────────────────

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ── Trust Signal Weights ────────────────────────────────

const TRUST_WEIGHTS = {
  proofAuthenticity: 0.35,
  behavioralConsistency: 0.25,
  accountMaturity: 0.20,
  fraudSignals: 0.20,
} as const;

// ── Trust Engine ────────────────────────────────────────

export class TrustEngine {

  /**
   * Recalculate trust score for a user
   */
  async recalculate(userId: string): Promise<number> {
    const [proofAuth, behavioral, maturity, fraud] = await Promise.all([
      this.calcProofAuthenticity(userId),
      this.calcBehavioralConsistency(userId),
      this.calcAccountMaturity(userId),
      this.calcFraudSignals(userId),
    ]);

    const overall =
      proofAuth * TRUST_WEIGHTS.proofAuthenticity +
      behavioral * TRUST_WEIGHTS.behavioralConsistency +
      maturity * TRUST_WEIGHTS.accountMaturity +
      fraud * TRUST_WEIGHTS.fraudSignals;

    await prisma.trustScore.upsert({
      where: { userId },
      create: {
        userId,
        overall,
        proofAuthenticity: proofAuth,
        behavioralConsistency: behavioral,
        accountMaturity: maturity,
        fraudSignals: fraud,
      },
      update: {
        overall,
        proofAuthenticity: proofAuth,
        behavioralConsistency: behavioral,
        accountMaturity: maturity,
        fraudSignals: fraud,
      },
    });

    return overall;
  }

  /**
   * Proof Authenticity (0-1)
   * Ratio of API/device proofs vs manual
   */
  private async calcProofAuthenticity(userId: string): Promise<number> {
    const total = await prisma.submission.count({
      where: { userId, verificationStatus: 'verified' },
    });

    if (total === 0) return 0.7; // Neutral

    const highQuality = await prisma.submission.count({
      where: {
        userId,
        verificationStatus: 'verified',
        proofType: { in: ['api', 'device'] },
      },
    });

    return Math.max(0.3, highQuality / total);
  }

  /**
   * Behavioral Consistency (0-1)
   * Submission pattern regularity
   */
  private async calcBehavioralConsistency(userId: string): Promise<number> {
    const submissions = await prisma.submission.findMany({
      where: { userId, verificationStatus: 'verified', createdAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } },
      select: { createdAt: true },
    });

    if (submissions.length < 5) return 0.6;

    // Check variance in submission times
    const hours = submissions.map(s => s.createdAt.getHours());

    // Guard: fewer than 3 data points produces a meaningless variance (0 for a
    // single entry inflates trust). Return neutral score instead.
    if (hours.length < 3) return 0.5;

    const mean = hours.reduce((a, b) => a + b, 0) / hours.length;
    const variance = hours.reduce((sum, h) => sum + Math.pow(h - mean, 2), 0) / hours.length;

    // Low variance = consistent = higher trust
    return Math.max(0.3, Math.min(1.0, 1.0 - variance / 100));
  }

  /**
   * Account Maturity (0-1)
   * Based on account age and activity
   */
  private async calcAccountMaturity(userId: string): Promise<number> {
    const user = await prisma.user.findUnique({ where: { id: userId }, select: { createdAt: true } });
    if (!user) return 0;

    const ageInDays = (Date.now() - user.createdAt.getTime()) / (24 * 60 * 60 * 1000);

    // Ramp up: 0.3 at day 0, 0.7 at day 30, 1.0 at day 90
    if (ageInDays >= 90) return 1.0;
    if (ageInDays >= 30) return 0.7 + (ageInDays - 30) * (0.3 / 60);
    return 0.3 + ageInDays * (0.4 / 30);
  }

  /**
   * Fraud Signals (0-1, where 1.0 = no fraud)
   */
  private async calcFraudSignals(userId: string): Promise<number> {
    let score = 1.0;

    // Check penalties
    const activePenalties = await prisma.penalty.count({
      where: { userId, expiresAt: { gte: new Date() } },
    });

    score -= activePenalties * 0.15;

    // Check rejected submissions
    const rejections = await prisma.submission.count({
      where: { userId, verificationStatus: 'rejected', createdAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } },
    });

    score -= rejections * 0.05;

    return Math.max(0, score);
  }
}

export const trustEngine = new TrustEngine();
