import { Redis } from "@upstash/redis";
import type { WaitlistEntry, WaitlistStats, WaitlistStore } from "./types";

function getClient(): Redis {
  return Redis.fromEnv();
}

const K = {
  counter: "wl:counter",
  workerCount: "wl:role:worker",
  bizCount: "wl:role:business",
  entry: (id: string) => `wl:entry:${id}`,
  byEmail: (email: string) => `wl:email:${email}`,
  byToken: (token: string) => `wl:token:${token}`,
  byCode: (code: string) => `wl:code:${code}`,
  referrals: (id: string) => `wl:referrals:${id}`,
} as const;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * The referral count used to live only on the entry blob, updated with a
 * get-then-set that raced under concurrent referrals (two referrers
 * finishing at once could overwrite each other's increment). Referrals now
 * increment a standalone counter key instead. An entry written before this
 * change has no counter key yet, so its blob value is the fallback.
 */
async function withReferralCount(redis: Redis, entry: WaitlistEntry): Promise<WaitlistEntry> {
  const count = await redis.get<number>(K.referrals(entry.id));
  return count === null ? entry : { ...entry, referralCount: count };
}

function randomHex(bytes: number): string {
  const arr = new Uint8Array(bytes);
  crypto.getRandomValues(arr);
  return Array.from(arr, (b) => b.toString(16).padStart(2, "0")).join("");
}

function randomBase64url(bytes: number): string {
  const arr = new Uint8Array(bytes);
  crypto.getRandomValues(arr);
  return btoa(String.fromCharCode(...arr))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function makeCode(): string {
  return randomHex(4);
}

function makeToken(): string {
  return randomBase64url(18);
}

function makeId(): string {
  return "w_" + randomHex(8);
}

function normEmail(e: string): string {
  return e.trim().toLowerCase();
}

export const upstashStore: WaitlistStore = {
  async add(input) {
    const redis = getClient();
    const email = normEmail(input.email);
    const emailKey = K.byEmail(email);

    const entry: WaitlistEntry = {
      id: makeId(),
      email,
      name: input.name?.trim() || null,
      role: input.role,
      city: input.city?.trim() || null,
      useCase: input.useCase?.trim() || null,
      source: input.source?.trim() || null,
      referredBy: input.referredBy || null,
      referralCode: makeCode(),
      position: 0, // set below, only if this request wins the email claim
      referralCount: 0,
      joinedAt: new Date().toISOString(),
      token: makeToken(),
    };

    // Atomically claim the email first. SET ... NX is the compare-and-set
    // this needs: if two requests race for the same email, only one can
    // write this key, so only one can go on to create an entry. The
    // previous version checked "does this email exist" and created the
    // entry as two separate steps, so two concurrent submissions for the
    // same email could both pass the check and both create an entry (one
    // orphaned, one double-counted in the role totals).
    const claimed = await redis.set(emailKey, entry.id, { nx: true });

    if (claimed !== "OK") {
      // Someone else holds this email. Their write can still be landing,
      // so give it a moment before reading, and retry a couple of times.
      for (let attempt = 0; attempt < 3; attempt++) {
        await sleep(50 * (attempt + 1));
        const existingId = await redis.get<string>(emailKey);
        if (existingId) {
          const existing = await redis.get<WaitlistEntry>(K.entry(existingId));
          if (existing) return { entry: await withReferralCount(redis, existing), created: false };
        }
      }
      throw new Error("waitlist: email claimed but entry not found after retries");
    }

    // Won the claim: this is the only request that will create this entry.
    entry.position = await redis.incr(K.counter);

    const pipeline = redis.pipeline();
    pipeline.set(K.entry(entry.id), entry);
    pipeline.set(K.byToken(entry.token), entry.id);
    pipeline.set(K.byCode(entry.referralCode), entry.id);
    if (entry.role === "worker") {
      pipeline.incr(K.workerCount);
    } else {
      pipeline.incr(K.bizCount);
    }
    await pipeline.exec();

    if (input.referredBy) {
      const referrerId = await redis.get<string>(K.byCode(input.referredBy));
      if (referrerId) {
        // Atomic increment, not a read-modify-write of the entry blob, so
        // two referrals landing at once can no longer clobber each other.
        await redis.incr(K.referrals(referrerId));
      }
    }

    return { entry, created: true };
  },

  async findByToken(token) {
    const redis = getClient();
    const id = await redis.get<string>(K.byToken(token));
    if (!id) return null;
    const entry = await redis.get<WaitlistEntry>(K.entry(id));
    return entry ? withReferralCount(redis, entry) : null;
  },

  async findByEmail(email) {
    const redis = getClient();
    const id = await redis.get<string>(K.byEmail(normEmail(email)));
    if (!id) return null;
    const entry = await redis.get<WaitlistEntry>(K.entry(id));
    return entry ? withReferralCount(redis, entry) : null;
  },

  async findByCode(code) {
    const redis = getClient();
    const id = await redis.get<string>(K.byCode(code));
    if (!id) return null;
    const entry = await redis.get<WaitlistEntry>(K.entry(id));
    return entry ? withReferralCount(redis, entry) : null;
  },

  async stats(): Promise<WaitlistStats> {
    const redis = getClient();
    const [total, workers, businesses] = await Promise.all([
      redis.get<number>(K.counter),
      redis.get<number>(K.workerCount),
      redis.get<number>(K.bizCount),
    ]);
    return {
      total: total ?? 0,
      workers: workers ?? 0,
      businesses: businesses ?? 0,
    };
  },

  async health() {
    try {
      const redis = getClient();
      // A cheap, always-present key. Reachability only; the value is not used.
      await redis.get(K.counter);
      return true;
    } catch {
      return false;
    }
  },
};
