// ─────────────────────────────────────────────────────────
// RIE Notification Service
// Push, email, and in-app notification system
// ─────────────────────────────────────────────────────────

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ── Types ───────────────────────────────────────────────

type NotificationType =
  | 'streak_reminder'
  | 'streak_broken'
  | 'submission_verified'
  | 'submission_rejected'
  | 'score_update'
  | 'tier_change'
  | 'badge_earned'
  | 'trust_change'
  | 'penalty_issued'
  | 'grace_day_available'
  | 'leaderboard_change'
  | 'system';

interface NotificationPayload {
  userId: string;
  type: NotificationType;
  title: string;
  body: string;
  data?: Record<string, unknown>;
  channels?: ('push' | 'email' | 'in_app')[];
}

interface NotificationRecord {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  body: string;
  read: boolean;
  createdAt: Date;
}

// ── Notification Templates ──────────────────────────────

const TEMPLATES: Record<NotificationType, { title: (d: any) => string; body: (d: any) => string }> = {
  streak_reminder: {
    title: () => 'Keep your streak alive 🔥',
    body: (d) => `You haven't submitted today. Your ${d.streak}-day streak is at risk.`,
  },
  streak_broken: {
    title: () => 'Streak broken',
    body: (d) => `Your ${d.domain} streak of ${d.oldStreak} days has ended. Start rebuilding today.`,
  },
  submission_verified: {
    title: () => 'Proof verified ✓',
    body: (d) => `Your ${d.activity} submission has been verified. +${d.scoreChange} score.`,
  },
  submission_rejected: {
    title: () => 'Submission rejected',
    body: (d) => `Your ${d.activity} submission could not be verified. Reason: ${d.reason}`,
  },
  score_update: {
    title: () => 'Score updated',
    body: (d) => `Your ${d.domain} score is now ${d.newScore} (${d.change > 0 ? '+' : ''}${d.change}).`,
  },
  tier_change: {
    title: (d) => d.direction === 'up' ? 'Tier promotion! 🎉' : 'Tier changed',
    body: (d) => `You've ${d.direction === 'up' ? 'been promoted to' : 'moved to'} ${d.newTier}.`,
  },
  badge_earned: {
    title: () => 'New badge earned! 🏆',
    body: (d) => `You've earned the "${d.badgeName}" badge.`,
  },
  trust_change: {
    title: () => 'Trust score updated',
    body: (d) => `Your trust score is now ${d.newTrust.toFixed(2)}. ${d.newTrust > 0.8 ? 'Excellent credibility.' : 'Keep submitting verified proofs.'}`,
  },
  penalty_issued: {
    title: () => 'Penalty notice',
    body: (d) => `A ${d.level} penalty has been applied: ${d.reason}. Score impact: ${d.impact}.`,
  },
  grace_day_available: {
    title: () => 'Grace day available',
    body: () => 'Missed yesterday? Use a grace day to preserve your streak.',
  },
  leaderboard_change: {
    title: () => 'Rank change',
    body: (d) => `You've moved to #${d.newRank} in ${d.scope} rankings (was #${d.oldRank}).`,
  },
  system: {
    title: (d) => d.title,
    body: (d) => d.body,
  },
};

// ── Service ─────────────────────────────────────────────

export class NotificationService {

  /**
   * Send a notification using templates
   */
  async send(type: NotificationType, userId: string, data: Record<string, unknown> = {}): Promise<void> {
    const template = TEMPLATES[type];
    const title = template.title(data);
    const body = template.body(data);

    await this.dispatch({
      userId,
      type,
      title,
      body,
      data,
      channels: this.getChannels(type),
    });
  }

  /**
   * Dispatch notification to all specified channels
   */
  private async dispatch(payload: NotificationPayload): Promise<void> {
    const channels = payload.channels || ['in_app'];

    await Promise.allSettled(
      channels.map(channel => {
        switch (channel) {
          case 'in_app':
            return this.sendInApp(payload);
          case 'push':
            return this.sendPush(payload);
          case 'email':
            return this.sendEmail(payload);
        }
      })
    );
  }

  /**
   * Store in-app notification
   */
  private async sendInApp(payload: NotificationPayload): Promise<void> {
    await prisma.auditLog.create({
      data: {
        actorId: 'system',
        action: `notification.${payload.type}`,
        targetType: 'user',
        targetId: payload.userId,
        metadata: {
          title: payload.title,
          body: payload.body,
          data: payload.data,
        } as any,
      },
    });
  }

  /**
   * Send push notification (stub — needs FCM/APNs integration)
   */
  private async sendPush(payload: NotificationPayload): Promise<void> {
    console.log(`[Push] → ${payload.userId}: ${payload.title}`);
    // TODO: Integrate with FCM for Android, APNs for iOS
  }

  /**
   * Send email notification (stub — needs SMTP/SES integration)
   */
  private async sendEmail(payload: NotificationPayload): Promise<void> {
    console.log(`[Email] → ${payload.userId}: ${payload.title}`);
    // TODO: Integrate with SES or Resend
  }

  /**
   * Determine channels based on notification type
   */
  private getChannels(type: NotificationType): ('push' | 'email' | 'in_app')[] {
    const CRITICAL: NotificationType[] = ['streak_broken', 'penalty_issued', 'tier_change'];
    const IMPORTANT: NotificationType[] = ['submission_rejected', 'trust_change', 'badge_earned'];

    if (CRITICAL.includes(type)) return ['in_app', 'push', 'email'];
    if (IMPORTANT.includes(type)) return ['in_app', 'push'];
    return ['in_app'];
  }

  /**
   * Check and send streak reminders (called by cron)
   */
  async checkStreakReminders(): Promise<void> {
    const domains = await prisma.userDomain.findMany({
      where: {
        currentStreak: { gt: 0 },
        lastActivityAt: { lt: new Date(Date.now() - 20 * 60 * 60 * 1000) }, // 20h since last
      },
      include: { user: { select: { id: true } } },
    });

    for (const domain of domains) {
      await this.send('streak_reminder', domain.userId, {
        streak: domain.currentStreak,
        domain: domain.domainId,
      });
    }
  }
}

export const notificationService = new NotificationService();
