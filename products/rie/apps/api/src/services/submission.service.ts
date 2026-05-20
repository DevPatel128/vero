// ─────────────────────────────────────────────────────────
// RIE Submission Pipeline
// Handles proof ingestion, verification, and score update
// ─────────────────────────────────────────────────────────

import { PrismaClient } from '@prisma/client';
import { createHash, randomBytes } from 'crypto';
import { scoreEngine } from './score.engine';

const prisma = new PrismaClient();

// ── Types ───────────────────────────────────────────────

interface SubmissionInput {
  userId: string;
  domainId: string;
  activityType: string;
  proofType: string;
  mediaRef?: string;
  content: Buffer | string;
  userSignature: string;
  metadata?: Record<string, unknown>;
  duration?: number;
  intensity?: string;
}

interface VerificationResult {
  status: 'verified' | 'rejected';
  riskScore: number;
  qualityScore: number;
  effortScore: number;
  reason?: string;
}

// ── Submission Service ──────────────────────────────────

export class SubmissionService {

  /**
   * Full submission pipeline:
   * 1. Content hash for dedup
   * 2. Risk assessment
   * 3. Verification
   * 4. Store + sign
   * 5. Update streak
   * 6. Recalculate score
   */
  async submit(input: SubmissionInput): Promise<{ id: string; status: string }> {
    const contentHash = createHash('sha256')
      .update(typeof input.content === 'string' ? input.content : input.content)
      .digest('hex');

    // 1. Dedup check
    const duplicate = await prisma.submission.findFirst({
      where: { contentHash, userId: input.userId },
    });

    if (duplicate) {
      throw new Error('DUPLICATE_SUBMISSION');
    }

    // 2. Verify proof
    const verification = await this.verify(input);

    // 3. Create submission
    const submission = await prisma.submission.create({
      data: {
        userId: input.userId,
        domainId: input.domainId,
        activityType: input.activityType,
        proofType: input.proofType,
        mediaRef: input.mediaRef,
        contentHash,
        userSignature: input.userSignature,
        serverSignature: this.generateServerSignature(contentHash),
        verificationStatus: verification.status,
        riskScore: verification.riskScore,
        qualityScore: verification.qualityScore,
        effortScore: verification.effortScore,
        metadata: input.metadata as any,
        rejectionReason: verification.reason,
        verifiedAt: verification.status === 'verified' ? new Date() : null,
      },
    });

    // 4. If verified, update streak & recalculate score
    if (verification.status === 'verified') {
      await this.updateStreak(input.userId, input.domainId);
      // Async score recalculation — don't block the response
      scoreEngine.calculateAndSave({
        userId: input.userId,
        domainId: input.domainId,
      }).catch(err => console.error('[ScoreEngine] Recalculation failed:', err));
    }

    // 5. Audit log
    await prisma.auditLog.create({
      data: {
        actorId: input.userId,
        action: `submission.${verification.status}`,
        targetType: 'submission',
        targetId: submission.id,
        metadata: {
          domainId: input.domainId,
          activityType: input.activityType,
          proofType: input.proofType,
          riskScore: verification.riskScore,
        } as any,
      },
    });

    return { id: submission.id, status: verification.status };
  }

  /**
   * Verification pipeline — runs checks in parallel
   */
  private async verify(input: SubmissionInput): Promise<VerificationResult> {
    const [riskScore, qualityScore, effortScore] = await Promise.all([
      this.assessRisk(input),
      this.assessQuality(input),
      this.assessEffort(input),
    ]);

    // Reject if high risk
    if (riskScore > 0.7) {
      return {
        status: 'rejected',
        riskScore,
        qualityScore,
        effortScore,
        reason: 'HIGH_RISK_SCORE',
      };
    }

    return { status: 'verified', riskScore, qualityScore, effortScore };
  }

  /**
   * Risk assessment (0.0-1.0)
   * Checks for: rapid submissions, time anomalies, device trust
   */
  private async assessRisk(input: SubmissionInput): Promise<number> {
    let risk = 0;

    // Check rapid submissions (>5 in last 10 minutes = suspicious)
    const recentCount = await prisma.submission.count({
      where: {
        userId: input.userId,
        createdAt: { gte: new Date(Date.now() - 10 * 60 * 1000) },
      },
    });

    if (recentCount > 5) risk += 0.3;
    if (recentCount > 10) risk += 0.3;

    // Manual proof is inherently riskier
    if (input.proofType === 'manual') risk += 0.2;
    if (input.proofType === 'manual_detailed') risk += 0.1;

    // API/device proof is more trusted
    if (input.proofType === 'api') risk -= 0.1;
    if (input.proofType === 'device') risk -= 0.05;

    return Math.max(0, Math.min(1, risk));
  }

  /**
   * Quality assessment (0.0-1.0)
   */
  private async assessQuality(input: SubmissionInput): Promise<number> {
    let quality = 0.5; // Base

    // API-verified content = higher quality
    if (input.proofType === 'api') quality += 0.3;
    if (input.proofType === 'device') quality += 0.25;
    if (input.proofType === 'video') quality += 0.15;
    if (input.proofType === 'image_metadata') quality += 0.1;

    // Duration bonus
    if (input.duration && input.duration > 30) quality += 0.1;
    if (input.duration && input.duration > 60) quality += 0.05;

    return Math.max(0, Math.min(1, quality));
  }

  /**
   * Effort assessment (0.0-1.0)
   */
  private async assessEffort(input: SubmissionInput): Promise<number> {
    let effort = 0.5;

    // Intensity-based
    const intensityMap: Record<string, number> = { 'Low': -0.1, 'Medium': 0, 'High': 0.15, 'Maximum': 0.3 };
    if (input.intensity) effort += intensityMap[input.intensity] || 0;

    // Duration-based
    if (input.duration) {
      if (input.duration >= 60) effort += 0.2;
      else if (input.duration >= 30) effort += 0.1;
      else if (input.duration >= 15) effort += 0.05;
    }

    return Math.max(0, Math.min(1, effort));
  }

  /**
   * Update user's streak for a domain
   */
  private async updateStreak(userId: string, domainId: string): Promise<void> {
    const domain = await prisma.userDomain.findUnique({
      where: { userId_domainId: { userId, domainId } },
    });

    if (!domain) return;

    const today = new Date().toISOString().split('T')[0];
    const lastActivity = domain.lastActivityAt?.toISOString().split('T')[0];

    let newStreak = domain.currentStreak;

    if (lastActivity === today) {
      // Already submitted today, no change
      return;
    }

    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    if (lastActivity === yesterday) {
      newStreak += 1; // Continue streak
    } else if (lastActivity) {
      // Determine how many grace days this user is allowed per streak cycle
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { subscriptionTier: true },
      });

      const graceDayLimit = (user?.subscriptionTier === 'free' || !user) ? 1 : 2;

      // Count grace days already consumed in the current 48-hour window
      const usedGraceDays = await prisma.graceDay.count({
        where: { userId, domainId, usedAt: { gte: new Date(Date.now() - 48 * 60 * 60 * 1000) } },
      });

      if (usedGraceDays < graceDayLimit) {
        await prisma.graceDay.create({
          data: { userId, domainId, usedAt: new Date(), autoTriggered: false },
        });
        newStreak = domain.currentStreak + 1;
      } else {
        newStreak = 1; // Grace day limit exceeded — break the streak
      }
    } else {
      newStreak = 1; // First submission
    }

    await prisma.userDomain.update({
      where: { userId_domainId: { userId, domainId } },
      data: {
        currentStreak: newStreak,
        bestStreak: Math.max(domain.bestStreak, newStreak),
        lastActivityAt: new Date(),
      },
    });
  }

  /**
   * Generate server-side signature for proof chain
   */
  private generateServerSignature(contentHash: string): string {
    // In production, use ECDSA from @rie/crypto
    const serverSecret = process.env.SERVER_SIGNING_KEY || 'rie-dev-signing-key';
    return createHash('sha256').update(`${contentHash}:${serverSecret}:${Date.now()}`).digest('hex');
  }
}

export const submissionService = new SubmissionService();
