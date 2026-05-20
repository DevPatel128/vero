// ─────────────────────────────────────────────────────────
// RIE Auth Service
// Complete authentication logic using @rie/crypto
// ─────────────────────────────────────────────────────────

import { createHash } from 'crypto';
import { createTokenPair, hashPassword, verifyPassword, encrypt, decrypt, generateSecureToken } from '@rie/crypto';
import { prisma } from '../lib/prisma';
import type { EncryptedData } from '@rie/crypto';
import { emailService, EMAIL_TEMPLATES as emailTemplates } from './email.service';
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

// ── Types ───────────────────────────────────────────────

interface RegisterInput {
  email: string;
  password: string;
  name: string;
  username: string;
  locale?: string;
  timezone?: string;
}

interface LoginInput {
  email: string;
  password: string;
  deviceId?: string;
}

interface TokenPair {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

interface AuthUser {
  id: string;
  username: string;
  email: string;
  name: string;
  locale: string;
  timezone: string;
  mfaEnabled: boolean;
  subscriptionTier: string;
  createdAt: string;
}

interface AuthResult {
  user: AuthUser;
  tokens: TokenPair;
}

// ── Helpers ─────────────────────────────────────────────

function sha256(input: string): string {
  return createHash('sha256').update(input).digest('hex');
}

function getEncryptionKey(): Buffer {
  const hex = process.env.ENCRYPTION_KEY;
  if (!hex || hex.length !== 64) {
    throw new Error('ENCRYPTION_KEY must be a 64-character hex string (32 bytes)');
  }
  return Buffer.from(hex, 'hex');
}

// ── Auth Service ────────────────────────────────────────

export class AuthService {

  /**
   * Register a new user
   * 1. Check uniqueness (email hash & username)
   * 2. Hash password with Argon2id
   * 3. Generate user master key
   * 4. Encrypt PII (email, name) with AES-256-GCM
   * 5. Create user + trust score
   * 6. Return token pair
   */
  async register(input: RegisterInput): Promise<AuthResult> {
    const { email, password, name, username, locale = 'en', timezone = 'UTC' } = input;

    // 1. Check uniqueness
    const emailHash = sha256(email.toLowerCase().trim());
    const existing = await prisma.user.findFirst({
      where: { OR: [{ emailHash }, { username }] },
    });

    if (existing) {
      throw new Error(existing.emailHash === emailHash ? 'EMAIL_EXISTS' : 'USERNAME_EXISTS');
    }

    // 2. Hash password with Argon2id
    const passwordHash = await hashPassword(password);

    // 3. Generate master key for PII encryption
    const masterKeyEnc = Buffer.from(sha256(email.toLowerCase().trim() + Date.now()), 'hex').toString('hex');

    // 4. Encrypt PII fields with AES-256-GCM
    const encryptionKey = getEncryptionKey();
    const encryptedEmail = JSON.stringify(encrypt(email, encryptionKey));
    const encryptedName = JSON.stringify(encrypt(name, encryptionKey));

    // 5. Create user + trust score in transaction
    const user = await prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          email: encryptedEmail,
          emailHash,
          name: encryptedName,
          username,
          passwordHash,
          locale,
          timezone,
          masterKeyEnc,
          subscriptionTier: 'free',
        },
      });

      // Initialize trust score at neutral
      await tx.trustScore.create({
        data: {
          userId: newUser.id,
          overall: 0.7,
          proofAuthenticity: 0.7,
          behavioralConsistency: 0.7,
          accountMaturity: 0.5,
          fraudSignals: 1.0,
        },
      });

      // Audit log
      await tx.auditLog.create({
        data: {
          actorId: newUser.id,
          action: 'user.register',
          targetType: 'user',
          targetId: newUser.id,
        },
      });

      return newUser;
    });

    // 6. Generate tokens
    const tokens = await this.generateTokenPair(user.id);

    // Create session
    await prisma.session.create({
      data: {
        userId: user.id,
        refreshToken: sha256(tokens.refreshToken),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      },
    });

    return {
      user: {
        id: user.id,
        username: user.username,
        email,
        name,
        locale: user.locale,
        timezone: user.timezone,
        mfaEnabled: user.mfaEnabled,
        subscriptionTier: user.subscriptionTier,
        createdAt: user.createdAt.toISOString(),
      },
      tokens,
    };
  }

  /**
   * Login
   * 1. Find user by email hash
   * 2. Verify password
   * 3. Generate token pair
   * 4. Create session
   */
  async login(input: LoginInput): Promise<AuthResult> {
    const { email, password, deviceId } = input;
    const emailHash = sha256(email.toLowerCase().trim());

    // 1. Find user
    const user = await prisma.user.findUnique({ where: { emailHash } });
    if (!user) throw new Error('INVALID_CREDENTIALS');

    // 2. Verify password with Argon2id
    const passwordValid = await verifyPassword(password, user.passwordHash);
    if (!passwordValid) {
      // Audit failed attempt
      await prisma.auditLog.create({
        data: {
          actorId: user.id,
          action: 'user.login_failed',
          targetType: 'user',
          targetId: user.id,
        },
      });
      throw new Error('INVALID_CREDENTIALS');
    }

    // 3. Generate tokens
    const tokens = await this.generateTokenPair(user.id);

    // 4. Create session
    await prisma.session.create({
      data: {
        userId: user.id,
        refreshToken: sha256(tokens.refreshToken),
        deviceId,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    // Audit
    await prisma.auditLog.create({
      data: {
        actorId: user.id,
        action: 'user.login',
        targetType: 'user',
        targetId: user.id,
      },
    });

    const encryptionKey = getEncryptionKey();
    const decryptedEmail = decrypt(JSON.parse(user.email) as EncryptedData, encryptionKey);
    const decryptedName = decrypt(JSON.parse(user.name) as EncryptedData, encryptionKey);

    return {
      user: {
        id: user.id,
        username: user.username,
        email: decryptedEmail,
        name: decryptedName,
        locale: user.locale,
        timezone: user.timezone,
        mfaEnabled: user.mfaEnabled,
        subscriptionTier: user.subscriptionTier,
        createdAt: user.createdAt.toISOString(),
      },
      tokens,
    };
  }

  /**
   * Refresh token — rotate refresh, issue new access
   */
  async refreshTokens(refreshToken: string): Promise<TokenPair> {
    const tokenHash = sha256(refreshToken);
    const session = await prisma.session.findUnique({ where: { refreshToken: tokenHash } });

    if (!session || session.expiresAt < new Date()) {
      throw new Error('SESSION_EXPIRED');
    }

    // Generate new pair
    const tokens = await this.generateTokenPair(session.userId);

    // Rotate: delete old session, create new
    await prisma.$transaction([
      prisma.session.delete({ where: { id: session.id } }),
      prisma.session.create({
        data: {
          userId: session.userId,
          refreshToken: sha256(tokens.refreshToken),
          deviceId: session.deviceId,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
      }),
    ]);

    return tokens;
  }

  /**
   * Revoke all sessions for a user
   */
  async revokeAllSessions(userId: string): Promise<void> {
    await prisma.session.deleteMany({ where: { userId } });
    await prisma.auditLog.create({
      data: {
        actorId: userId,
        action: 'user.revoke_all_sessions',
        targetType: 'user',
        targetId: userId,
      },
    });
  }

  /**
   * Get current user by id (for /auth/me)
   */
  async getMe(userId: string): Promise<{ id: string; username: string; email: string; name: string; subscriptionTier: string; createdAt: string }> {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error('USER_NOT_FOUND');

    const encryptionKey = getEncryptionKey();
    const decryptedEmail = decrypt(JSON.parse(user.email) as EncryptedData, encryptionKey);
    const decryptedName = decrypt(JSON.parse(user.name) as EncryptedData, encryptionKey);

    return {
      id: user.id,
      username: user.username,
      email: decryptedEmail,
      name: decryptedName,
      subscriptionTier: user.subscriptionTier,
      createdAt: user.createdAt.toISOString(),
    };
  }

  /**
   * Update user profile fields
   */
  async updateProfile(userId: string, input: { displayName?: string; username?: string; timezone?: string; location?: string }): Promise<{ id: string; username: string; name: string }> {
    const { displayName, username, timezone, location } = input;

    if (username) {
      const existing = await prisma.user.findFirst({ where: { username, NOT: { id: userId } } });
      if (existing) throw new Error('USERNAME_EXISTS');
    }

    const encryptionKey = getEncryptionKey();
    const updateData: Record<string, unknown> = {};

    if (displayName !== undefined) {
      updateData.name = JSON.stringify(encrypt(displayName, encryptionKey));
    }
    if (username !== undefined) updateData.username = username;
    if (timezone !== undefined) updateData.timezone = timezone;
    if (location !== undefined) {
      const parts = location.split(',').map((s) => s.trim());
      updateData.city = parts[0] ?? null;
      updateData.state = parts[1] ?? null;
      updateData.country = parts[2] ?? null;
    }

    const updated = await prisma.user.update({ where: { id: userId }, data: updateData });
    const decryptedName = decrypt(JSON.parse(updated.name) as EncryptedData, encryptionKey);

    return { id: updated.id, username: updated.username, name: decryptedName };
  }

  /**
   * Register or update a device push token
   */
  async registerDevice(userId: string, token: string, platform: string): Promise<void> {
    const existing = await prisma.userDevice.findFirst({ where: { userId, pushToken: token } });
    if (existing) {
      await prisma.userDevice.update({ where: { id: existing.id }, data: { platform, lastUsedAt: new Date() } });
    } else {
      await prisma.userDevice.create({ data: { userId, pushToken: token, platform, trusted: false } });
    }
  }

  /**
   * Initiate password reset — stores a secure token in Redis (15-min TTL) and sends email
   */
  async forgotPassword(email: string): Promise<void> {
    const emailHash = sha256(email.toLowerCase().trim());
    const user = await prisma.user.findUnique({ where: { emailHash } });
    if (!user) return; // Silently succeed to prevent email enumeration

    const token = await generateSecureToken(32);
    await redis.set(`pwd_reset:${token}`, user.id, 'EX', 900); // 15 minutes

    const encryptionKey = getEncryptionKey();
    const decryptedEmail = decrypt(JSON.parse(user.email) as EncryptedData, encryptionKey);

    const resetUrl = `${process.env.APP_URL || 'rie://'}auth/reset-password?token=${token}`;
    const { subject, html } = emailTemplates.passwordReset(resetUrl);
    await emailService.send({ to: decryptedEmail, subject, html });
  }

  /**
   * Complete password reset — validates Redis token, updates password, revokes all sessions
   */
  async resetPassword(token: string, newPassword: string): Promise<void> {
    const userId = await redis.get(`pwd_reset:${token}`);
    if (!userId) throw new Error('INVALID_OR_EXPIRED_TOKEN');

    const passwordHash = await hashPassword(newPassword);

    await prisma.$transaction([
      prisma.user.update({ where: { id: userId }, data: { passwordHash } }),
      prisma.session.deleteMany({ where: { userId } }),
    ]);

    await redis.del(`pwd_reset:${token}`);

    await prisma.auditLog.create({
      data: {
        actorId: userId,
        action: 'user.password_reset',
        targetType: 'user',
        targetId: userId,
      },
    });
  }

  /**
   * Generate JWT access + refresh token pair using RS256 via @rie/crypto
   */
  private async generateTokenPair(userId: string): Promise<TokenPair> {
    const pair = await createTokenPair({ sub: userId });

    return {
      accessToken: pair.accessToken,
      refreshToken: pair.refreshToken,
      expiresIn: 900,
    };
  }
}

export const authService = new AuthService();
