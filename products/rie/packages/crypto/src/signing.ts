// ─────────────────────────────────────────────────────────
// RIE Digital Signatures — ECDSA P-256
// Proof chain integrity for submissions
// ─────────────────────────────────────────────────────────

import { generateKeyPairSync, createSign, createVerify, KeyObject } from 'crypto';

const CURVE = 'prime256v1'; // P-256
const SIGN_ALGORITHM = 'SHA256';

export interface KeyPair {
  publicKey: string;   // PEM format
  privateKey: string;  // PEM format
}

/**
 * Generate an ECDSA P-256 key pair for device registration
 * Private key stays on device, public key registered with server
 */
export function generateKeyPair(): KeyPair {
  const { publicKey, privateKey } = generateKeyPairSync('ec', {
    namedCurve: CURVE,
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
  });

  return { publicKey, privateKey };
}

/**
 * Sign data with ECDSA P-256 private key
 * Used for proof chain: user signs content hash of submission
 */
export function sign(data: string, privateKeyPem: string): string {
  const signer = createSign(SIGN_ALGORITHM);
  signer.update(data);
  signer.end();
  return signer.sign(privateKeyPem, 'base64');
}

/**
 * Verify an ECDSA P-256 signature
 * Server verifies user's signature against registered public key
 */
export function verify(data: string, signature: string, publicKeyPem: string): boolean {
  try {
    const verifier = createVerify(SIGN_ALGORITHM);
    verifier.update(data);
    verifier.end();
    return verifier.verify(publicKeyPem, signature, 'base64');
  } catch {
    return false;
  }
}

/**
 * Create a proof chain entry
 * hash → sign(hash, deviceKey) → {hash, signature, deviceId, timestamp}
 */
export interface ProofChainEntry {
  contentHash: string;
  signature: string;
  deviceId: string;
  timestamp: string;
}

export function createProofChain(
  contentHash: string,
  privateKey: string,
  deviceId: string
): ProofChainEntry {
  const timestamp = new Date().toISOString();
  const payload = `${contentHash}:${deviceId}:${timestamp}`;
  const signature = sign(payload, privateKey);

  return { contentHash, signature, deviceId, timestamp };
}

export function verifyProofChain(
  entry: ProofChainEntry,
  publicKey: string
): boolean {
  const payload = `${entry.contentHash}:${entry.deviceId}:${entry.timestamp}`;
  return verify(payload, entry.signature, publicKey);
}
