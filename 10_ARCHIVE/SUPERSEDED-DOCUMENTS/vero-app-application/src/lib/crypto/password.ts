import { hash, verify } from "@node-rs/argon2";

// Argon2id = 2 (numeric form used to avoid const-enum issues under isolatedModules)
const ARGON2_OPTIONS = {
  algorithm: 2 as const,
  memoryCost: 65536,
  timeCost: 3,
  parallelism: 4,
};

export async function hashPassword(plaintext: string): Promise<string> {
  return hash(plaintext, ARGON2_OPTIONS);
}

export async function verifyPassword(
  hashed: string,
  plaintext: string,
): Promise<boolean> {
  try {
    return await verify(hashed, plaintext);
  } catch {
    return false;
  }
}
