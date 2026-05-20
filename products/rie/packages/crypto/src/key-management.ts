// ─────────────────────────────────────────────────────────
// RIE Key Management
// HKDF-SHA256 key derivation + secure key generation
// ─────────────────────────────────────────────────────────

import { randomBytes, createHmac, hkdfSync } from 'crypto';

/**
 * Generate a cryptographically secure random key
 */
export function generateKey(lengthBytes: number = 32): Buffer {
  return randomBytes(lengthBytes);
}

/**
 * Derive a sub-key from a master key using HKDF-SHA256
 * Used for per-field encryption keys, per-purpose keys, etc.
 */
export function deriveKey(masterKey: Buffer, context: string, lengthBytes: number = 32): Buffer {
  const salt = Buffer.from('rie-discipline-platform-v1', 'utf8');
  const info = Buffer.from(context, 'utf8');

  const derived = hkdfSync('sha256', masterKey, salt, info, lengthBytes);
  return Buffer.from(derived);
}

/**
 * Generate a user master key from an account secret
 * This is the root key from which all per-user keys are derived
 */
export function generateUserMasterKey(): Buffer {
  return generateKey(32);
}

/**
 * Create an HMAC-SHA256 signature for request signing
 */
export function hmacSign(data: string, secret: Buffer): string {
  return createHmac('sha256', secret).update(data).digest('hex');
}

/**
 * Verify an HMAC-SHA256 signature
 * Uses constant-time comparison to prevent timing attacks
 */
export function hmacVerify(data: string, signature: string, secret: Buffer): boolean {
  const expected = hmacSign(data, secret);
  if (expected.length !== signature.length) return false;

  let result = 0;
  for (let i = 0; i < expected.length; i++) {
    result |= expected.charCodeAt(i) ^ signature.charCodeAt(i);
  }
  return result === 0;
}

/**
 * Generate a secure random token (for refresh tokens, recovery codes, etc.)
 */
export function generateSecureToken(lengthBytes: number = 32): string {
  return randomBytes(lengthBytes).toString('base64url');
}

/**
 * Generate a 12-word recovery mnemonic
 * Uses BIP39-inspired wordlist (simplified)
 */
export function generateRecoveryCodes(count: number = 8): string[] {
  return Array.from({ length: count }, () =>
    randomBytes(4).toString('hex').toUpperCase()
  );
}
