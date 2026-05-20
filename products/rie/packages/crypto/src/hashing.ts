// ─────────────────────────────────────────────────────────
// RIE Password Hashing — Argon2id
// Memory-hard, resistant to GPU/ASIC attacks
// ─────────────────────────────────────────────────────────

import argon2 from 'argon2';

const ARGON2_OPTIONS: argon2.Options = {
  type: argon2.argon2id,
  memoryCost: 65536,     // 64 MB
  timeCost: 3,           // 3 iterations
  parallelism: 4,        // 4 threads
  hashLength: 32,        // 256-bit hash
};

/**
 * Hash a password using Argon2id
 * Returns a self-contained hash string with salt and parameters
 */
export async function hashPassword(password: string): Promise<string> {
  return argon2.hash(password, ARGON2_OPTIONS);
}

/**
 * Verify a password against an Argon2id hash
 * Constant-time comparison built into argon2 library
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  try {
    return await argon2.verify(hash, password);
  } catch {
    return false;
  }
}

/**
 * Check if a hash needs rehashing (e.g., after config change)
 */
export function needsRehash(hash: string): boolean {
  return argon2.needsRehash(hash, ARGON2_OPTIONS);
}
