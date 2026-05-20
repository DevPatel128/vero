// ─────────────────────────────────────────────────────────
// RIE Push Notification Service
// Firebase Cloud Messaging (Android) + APNs (iOS)
// ─────────────────────────────────────────────────────────

interface PushPayload {
  token: string;
  title: string;
  body: string;
  data?: Record<string, string>;
  badge?: number;
  sound?: string;
}

export class PushService {

  /**
   * Send push to a single device
   */
  async sendToDevice(payload: PushPayload): Promise<void> {
    if (!process.env.FCM_SERVER_KEY) {
      throw new Error('FCM_SERVER_KEY is not set');
    }
    await this.sendViaFCM(payload);
  }

  /**
   * Send push to all devices for a user
   */
  async sendToUser(userId: string, title: string, body: string, data?: Record<string, string>): Promise<void> {
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    const devices = await prisma.userDevice.findMany({
      where: { userId, pushToken: { not: null } },
      select: { pushToken: true },
    });

    await Promise.allSettled(
      devices.map((d: any) => this.sendToDevice({ token: d.pushToken, title, body, data }))
    );
  }

  /**
   * Send via Firebase Cloud Messaging HTTP v1 API
   */
  private async sendViaFCM(payload: PushPayload): Promise<void> {
    const serverKey = process.env.FCM_SERVER_KEY!;
    const projectId = process.env.FCM_PROJECT_ID;
    if (!projectId) throw new Error('FCM_PROJECT_ID is not set');

    const message = {
      message: {
        token: payload.token,
        notification: {
          title: payload.title,
          body: payload.body,
        },
        android: {
          priority: 'high' as const,
          notification: {
            sound: payload.sound || 'default',
          },
        },
        apns: {
          payload: {
            aps: {
              sound: payload.sound || 'default',
              badge: payload.badge,
            },
          },
        },
        data: payload.data,
      },
    };

    const res = await fetch(
      `https://fcm.googleapis.com/v1/projects/${projectId}/messages:send`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${serverKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      },
    );

    if (!res.ok) {
      const body = await res.text();
      throw new Error(`FCM API error ${res.status}: ${body}`);
    }
  }

  /**
   * Register device push token
   */
  async registerToken(userId: string, deviceId: string, pushToken: string, platform: 'ios' | 'android'): Promise<void> {
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    await prisma.userDevice.upsert({
      where: { id: deviceId },
      create: { id: deviceId, userId, pushToken, platform, trusted: false },
      update: { pushToken, platform },
    });
  }
}

export const pushService = new PushService();
