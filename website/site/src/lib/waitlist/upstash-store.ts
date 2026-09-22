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
} as const;

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

    const existingId = await redis.get<string>(emailKey);
    if (existingId) {
      const existing = await redis.get<WaitlistEntry>(K.entry(existingId));
      if (existing) return { entry: existing, created: false };
    }

    const position = await redis.incr(K.counter);

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
      position,
      referralCount: 0,
      joinedAt: new Date().toISOString(),
      token: makeToken(),
    };

    const pipeline = redis.pipeline();
    pipeline.set(K.entry(entry.id), entry);
    pipeline.set(emailKey, entry.id);
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
        const referrer = await redis.get<WaitlistEntry>(K.entry(referrerId));
        if (referrer) {
          const updated = { ...referrer, referralCount: (referrer.referralCount ?? 0) + 1 };
          await redis.set(K.entry(referrerId), updated);
        }
      }
    }

    return { entry, created: true };
  },

  async findByToken(token) {
    const redis = getClient();
    const id = await redis.get<string>(K.byToken(token));
    if (!id) return null;
    return redis.get<WaitlistEntry>(K.entry(id));
  },

  async findByEmail(email) {
    const redis = getClient();
    const id = await redis.get<string>(K.byEmail(normEmail(email)));
    if (!id) return null;
    return redis.get<WaitlistEntry>(K.entry(id));
  },

  async findByCode(code) {
    const redis = getClient();
    const id = await redis.get<string>(K.byCode(code));
    if (!id) return null;
    return redis.get<WaitlistEntry>(K.entry(id));
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
};
