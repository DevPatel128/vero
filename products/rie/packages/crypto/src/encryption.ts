// ─────────────────────────────────────────────────────────
// RIE Cryptographic Security Layer
// AES-256-GCM Encryption with per-user key derivation
// ─────────────────────────────────────────────────────────

import { randomBytes, createCipheriv, createDecipheriv, createHash } from 'crypto';
import { deriveKey } from './key-management';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16;
const AUTH_TAG_LENGTH = 16;
const ENCODING: BufferEncoding = 'base64';

export interface EncryptedData {
  ciphertext: string;  // base64
  iv: string;          // base64
  tag: string;         // base64
  version: number;     // for key rotation
}

/**
 * Encrypt plaintext using AES-256-GCM
 * Returns structured encrypted data with IV and auth tag
 */
export function encrypt(plaintext: string, key: Buffer): EncryptedData {
  if (key.length !== 32) {
    throw new Error('Encryption key must be exactly 32 bytes (256 bits)');
  }

  const iv = randomBytes(IV_LENGTH);
  const cipher = createCipheriv(ALGORITHM, key, iv, { authTagLength: AUTH_TAG_LENGTH });

  let ciphertext = cipher.update(plaintext, 'utf8', ENCODING);
  ciphertext += cipher.final(ENCODING);

  const tag = cipher.getAuthTag();

  return {
    ciphertext,
    iv: iv.toString(ENCODING),
    tag: tag.toString(ENCODING),
    version: 1,
  };
}

/**
 * Decrypt AES-256-GCM encrypted data
 * Verifies auth tag to ensure data integrity
 */
export function decrypt(encrypted: EncryptedData, key: Buffer): string {
  if (key.length !== 32) {
    throw new Error('Decryption key must be exactly 32 bytes (256 bits)');
  }

  const iv = Buffer.from(encrypted.iv, ENCODING);
  const tag = Buffer.from(encrypted.tag, ENCODING);
  const decipher = createDecipheriv(ALGORITHM, key, iv, { authTagLength: AUTH_TAG_LENGTH });

  decipher.setAuthTag(tag);

  let plaintext = decipher.update(encrypted.ciphertext, ENCODING, 'utf8');
  plaintext += decipher.final('utf8');

  return plaintext;
}

/**
 * Encrypt a field for database storage (PII column encryption)
 * Uses per-user derived key via HKDF
 */
export function encryptField(value: string, userMasterKey: Buffer, fieldName: string): string {
  const fieldKey = deriveKey(userMasterKey, `field:${fieldName}`, 32);
  const encrypted = encrypt(value, fieldKey);
  return JSON.stringify(encrypted);
}

/**
 * Decrypt a field from database storage
 */
export function decryptField(storedValue: string, userMasterKey: Buffer, fieldName: string): string {
  const fieldKey = deriveKey(userMasterKey, `field:${fieldName}`, 32);
  const encrypted: EncryptedData = JSON.parse(storedValue);
  return decrypt(encrypted, fieldKey);
}

/**
 * Generate a SHA-256 content hash for proof integrity
 */
export function contentHash(data: Buffer | string): string {
  return createHash('sha256')
    .update(typeof data === 'string' ? data : data)
    .digest('hex');
}
