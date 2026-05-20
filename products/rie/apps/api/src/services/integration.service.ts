// ─────────────────────────────────────────────────────────
// RIE Integration Service
// Connectors for Apple Health, GitHub, Steam, Riot, Chess.com
// ─────────────────────────────────────────────────────────

import Redis from 'ioredis';
import { encrypt, decrypt } from '@rie/crypto';
import type { EncryptedData } from '@rie/crypto';
import { prisma } from '../lib/prisma';

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

function getEncryptionKey(): Buffer {
  const hex = process.env.ENCRYPTION_KEY;
  if (!hex || hex.length !== 64) throw new Error('ENCRYPTION_KEY must be a 64-character hex string');
  return Buffer.from(hex, 'hex');
}

// ── Types ───────────────────────────────────────────────

export interface IntegrationResult {
  provider: string;
  connected: boolean;
  data?: Record<string, unknown>;
  error?: string;
}

export interface ActivityProof {
  provider: string;
  activityType: string;
  timestamp: string;
  duration?: number;
  metrics?: Record<string, number>;
  raw: Record<string, unknown>;
}

// ── Provider Configs ────────────────────────────────────

export const INTEGRATIONS = {
  // ── Fitness ────────────────────────────────────────
  appleHealth: {
    name: 'Apple Health',
    domain: 'fitness',
    dataTypes: ['workouts', 'steps', 'heartRate', 'activeEnergy', 'distance'],
    proofType: 'device' as const,
    trustLevel: 0.9,
  },
  googleFit: {
    name: 'Google Fit',
    domain: 'fitness',
    dataTypes: ['activities', 'steps', 'calories', 'distance'],
    proofType: 'device' as const,
    trustLevel: 0.9,
  },
  strava: {
    name: 'Strava',
    domain: 'fitness',
    authUrl: 'https://www.strava.com/oauth/authorize',
    tokenUrl: 'https://www.strava.com/oauth/token',
    apiBase: 'https://www.strava.com/api/v3',
    scopes: ['read', 'activity:read'],
    proofType: 'api' as const,
    trustLevel: 0.95,
  },

  // ── Content Creation ───────────────────────────────
  github: {
    name: 'GitHub',
    domain: 'content',
    authUrl: 'https://github.com/login/oauth/authorize',
    tokenUrl: 'https://github.com/login/oauth/access_token',
    apiBase: 'https://api.github.com',
    scopes: ['read:user', 'repo'],
    proofType: 'api' as const,
    trustLevel: 0.95,
    dataTypes: ['commits', 'pullRequests', 'repositories', 'contributions'],
  },
  youtube: {
    name: 'YouTube',
    domain: 'content',
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    apiBase: 'https://www.googleapis.com/youtube/v3',
    scopes: ['https://www.googleapis.com/auth/youtube.readonly'],
    proofType: 'api' as const,
    trustLevel: 0.95,
    dataTypes: ['uploads', 'views', 'subscribers', 'watchTime'],
  },

  // ── Gaming ────────────────────────────────────────
  steam: {
    name: 'Steam',
    domain: 'gaming',
    apiBase: 'https://api.steampowered.com',
    proofType: 'api' as const,
    trustLevel: 0.9,
    dataTypes: ['recentGames', 'achievements', 'playtime', 'ownedGames'],
  },
  riot: {
    name: 'Riot Games',
    domain: 'gaming',
    apiBase: 'https://americas.api.riotgames.com',
    proofType: 'api' as const,
    trustLevel: 0.95,
    dataTypes: ['matchHistory', 'rank', 'winRate', 'champions'],
    games: ['League of Legends', 'Valorant', 'TFT'],
  },
  chess: {
    name: 'Chess.com',
    domain: 'gaming',
    apiBase: 'https://api.chess.com/pub',
    proofType: 'api' as const,
    trustLevel: 0.95,
    dataTypes: ['games', 'rating', 'puzzles', 'tournaments'],
  },
} as const;

// ── Integration Service ─────────────────────────────────

export class IntegrationService {

  /**
   * Generate OAuth authorization URL and persist state in Redis (10-minute TTL)
   */
  async getAuthUrl(provider: keyof typeof INTEGRATIONS, userId: string, redirectUri: string): Promise<string> {
    const config = INTEGRATIONS[provider] as any;
    if (!config.authUrl) throw new Error(`${provider} does not support OAuth`);

    const state = Buffer.from(JSON.stringify({ userId, provider })).toString('base64url');
    await redis.set(`oauth:state:${state}`, userId, 'EX', 600);

    const params = new URLSearchParams({
      client_id: process.env[`${provider.toUpperCase()}_CLIENT_ID`] || '',
      redirect_uri: redirectUri,
      scope: (config.scopes || []).join(' '),
      state,
      response_type: 'code',
    });

    return `${config.authUrl}?${params.toString()}`;
  }

  /**
   * Validate OAuth state param against Redis; throws if invalid or expired.
   * Deletes the key after validation (one-time use).
   */
  async validateOAuthState(state: string): Promise<string> {
    const userId = await redis.get(`oauth:state:${state}`);
    if (!userId) throw new Error('Invalid OAuth state');
    await redis.del(`oauth:state:${state}`);
    return userId;
  }

  /**
   * Fetch recent activities from a provider
   */
  async fetchActivities(provider: string, accessToken: string): Promise<ActivityProof[]> {
    switch (provider) {
      case 'github':
        return this.fetchGitHubActivity(accessToken);
      case 'strava':
        return this.fetchStravaActivity(accessToken);
      case 'chess':
        return this.fetchChessActivity(accessToken);
      default:
        return [];
    }
  }

  private async fetchGitHubActivity(token: string): Promise<ActivityProof[]> {
    const res = await fetch('https://api.github.com/user/events?per_page=10', {
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json' },
    });
    const events = await res.json();

    return events
      .filter((e: any) => ['PushEvent', 'PullRequestEvent', 'CreateEvent'].includes(e.type))
      .map((e: any) => ({
        provider: 'github',
        activityType: e.type === 'PushEvent' ? 'Code Commit' : e.type === 'PullRequestEvent' ? 'Pull Request' : 'Repository',
        timestamp: e.created_at,
        metrics: e.type === 'PushEvent' ? { commits: e.payload?.commits?.length || 0 } : {},
        raw: { id: e.id, repo: e.repo?.name, type: e.type },
      }));
  }

  private async fetchStravaActivity(token: string): Promise<ActivityProof[]> {
    const res = await fetch('https://www.strava.com/api/v3/athlete/activities?per_page=10', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const activities = await res.json();

    return activities.map((a: any) => ({
      provider: 'strava',
      activityType: a.type || 'Workout',
      timestamp: a.start_date,
      duration: Math.round((a.elapsed_time || 0) / 60),
      metrics: { distance: a.distance, calories: a.calories, heartRate: a.average_heartrate },
      raw: { id: a.id, name: a.name, type: a.type },
    }));
  }

  /**
   * Exchange OAuth authorization code for access token and store encrypted in DB
   */
  async exchangeCode(provider: keyof typeof INTEGRATIONS, userId: string, code: string, redirectUri: string): Promise<void> {
    const config = INTEGRATIONS[provider] as any;
    if (!config.tokenUrl) throw new Error(`${provider} does not support OAuth token exchange`);

    const clientId = process.env[`${provider.toUpperCase()}_CLIENT_ID`] || '';
    const clientSecret = process.env[`${provider.toUpperCase()}_CLIENT_SECRET`] || '';

    const params = new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
    });

    const headers: Record<string, string> = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    };

    const res = await fetch(config.tokenUrl, { method: 'POST', headers, body: params.toString() });
    const data = await res.json() as any;

    if (!data.access_token) throw new Error(`Token exchange failed: ${data.error || 'no access_token'}`);

    const encryptionKey = getEncryptionKey();
    const encryptedToken = JSON.stringify(encrypt(data.access_token, encryptionKey));
    const encryptedRefresh = data.refresh_token
      ? JSON.stringify(encrypt(data.refresh_token, encryptionKey))
      : null;

    await prisma.integration.upsert({
      where: { userId_provider: { userId, provider } },
      create: {
        userId,
        provider,
        encryptedToken,
        refreshToken: encryptedRefresh,
        expiresAt: data.expires_in ? new Date(Date.now() + data.expires_in * 1000) : null,
        scope: (config.scopes || []).join(' '),
      },
      update: {
        encryptedToken,
        refreshToken: encryptedRefresh,
        expiresAt: data.expires_in ? new Date(Date.now() + data.expires_in * 1000) : null,
        updatedAt: new Date(),
      },
    });
  }

  /**
   * Load decrypted access token for a provider
   */
  async loadToken(userId: string, provider: string): Promise<string | null> {
    const integration = await prisma.integration.findUnique({
      where: { userId_provider: { userId, provider } },
    });
    if (!integration) return null;

    const encryptionKey = getEncryptionKey();
    return decrypt(JSON.parse(integration.encryptedToken) as EncryptedData, encryptionKey);
  }

  /**
   * List connected integrations for a user
   */
  async listConnected(userId: string): Promise<string[]> {
    const integrations = await prisma.integration.findMany({ where: { userId }, select: { provider: true } });
    return integrations.map((i) => i.provider);
  }

  /**
   * Disconnect an integration
   */
  async disconnect(userId: string, provider: string): Promise<void> {
    await prisma.integration.deleteMany({ where: { userId, provider } });
  }

  private async fetchChessActivity(username: string): Promise<ActivityProof[]> {
    const now = new Date();
    const res = await fetch(`https://api.chess.com/pub/player/${username}/games/${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, '0')}`);
    const data = await res.json();

    return (data.games || []).slice(-10).map((g: any) => ({
      provider: 'chess',
      activityType: `Chess (${g.time_class})`,
      timestamp: new Date(g.end_time * 1000).toISOString(),
      metrics: { rating: g.white?.rating || g.black?.rating },
      raw: { url: g.url, result: g.white?.result || g.black?.result },
    }));
  }
}

export const integrationService = new IntegrationService();
