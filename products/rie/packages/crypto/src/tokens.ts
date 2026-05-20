// ─────────────────────────────────────────────────────────
// RIE JWT Token Management — RS256
// Short-lived access tokens + rotatable refresh tokens
// ─────────────────────────────────────────────────────────

import { SignJWT, jwtVerify, generateKeyPair as joseGenerateKeyPair, importPKCS8, importSPKI } from 'jose';
import type { JWTPayload, KeyLike } from 'jose';
import { generateSecureToken } from './key-management';

const ISSUER = 'rie-discipline-platform';
const AUDIENCE = 'rie-api';
const ACCESS_TOKEN_EXPIRY = '15m';
const REFRESH_TOKEN_EXPIRY = '7d';

export interface TokenPayload extends JWTPayload {
  sub: string;        // user ID
  email?: string;
  deviceId?: string;
  tier?: string;
  scope?: string[];
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
  accessExpiresAt: Date;
  refreshExpiresAt: Date;
}

let _privateKey: KeyLike | null = null;
let _publicKey: KeyLike | null = null;

/**
 * Initialize JWT keys from PEM strings
 * In production, these come from AWS Secrets Manager
 */
export async function initializeKeys(privateKeyPem: string, publicKeyPem: string): Promise<void> {
  _privateKey = await importPKCS8(privateKeyPem, 'RS256');
  _publicKey = await importSPKI(publicKeyPem, 'RS256');
}

/**
 * Generate a new RS256 key pair for JWT signing
 * Run once during initial setup, store securely
 */
export async function generateJWTKeyPair(): Promise<{ privateKey: string; publicKey: string }> {
  const { privateKey, publicKey } = await joseGenerateKeyPair('RS256', {
    modulusLength: 2048,
  });

  const privatePem = (privateKey as any).export({ type: 'pkcs8', format: 'pem' }) as string;
  const publicPem = (publicKey as any).export({ type: 'spki', format: 'pem' }) as string;

  return { privateKey: privatePem, publicKey: publicPem };
}

/**
 * Create an access token (15 min)
 */
export async function createAccessToken(payload: TokenPayload): Promise<string> {
  if (!_privateKey) throw new Error('JWT keys not initialized');

  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'RS256', typ: 'JWT' })
    .setIssuedAt()
    .setIssuer(ISSUER)
    .setAudience(AUDIENCE)
    .setExpirationTime(ACCESS_TOKEN_EXPIRY)
    .setJti(generateSecureToken(16))
    .sign(_privateKey);
}

/**
 * Create a refresh token (7 days)
 * Refresh tokens are opaque + stored server-side for rotation
 */
export function createRefreshToken(): { token: string; expiresAt: Date } {
  const token = generateSecureToken(48);
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);
  return { token, expiresAt };
}

/**
 * Create a full token pair
 */
export async function createTokenPair(payload: TokenPayload): Promise<TokenPair> {
  const accessToken = await createAccessToken(payload);
  const { token: refreshToken, expiresAt: refreshExpiresAt } = createRefreshToken();

  const accessExpiresAt = new Date();
  accessExpiresAt.setMinutes(accessExpiresAt.getMinutes() + 15);

  return {
    accessToken,
    refreshToken,
    accessExpiresAt,
    refreshExpiresAt,
  };
}

/**
 * Verify and decode an access token
 */
export async function verifyAccessToken(token: string): Promise<TokenPayload> {
  if (!_publicKey) throw new Error('JWT keys not initialized');

  const { payload } = await jwtVerify(token, _publicKey, {
    issuer: ISSUER,
    audience: AUDIENCE,
  });

  return payload as TokenPayload;
}
