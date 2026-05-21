import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";
import type {
  WaitlistEntry,
  WaitlistRole,
  WaitlistStats,
  WaitlistStore,
} from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "waitlist.json");

type FileShape = {
  entries: WaitlistEntry[];
  version: 1;
};

async function ensureFile(): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.access(DATA_FILE);
  } catch {
    const initial: FileShape = { entries: [], version: 1 };
    await fs.writeFile(DATA_FILE, JSON.stringify(initial, null, 2), "utf8");
  }
}

async function readAll(): Promise<FileShape> {
  await ensureFile();
  const raw = await fs.readFile(DATA_FILE, "utf8");
  try {
    const parsed = JSON.parse(raw) as FileShape;
    if (!parsed.entries) return { entries: [], version: 1 };
    return parsed;
  } catch {
    return { entries: [], version: 1 };
  }
}

async function writeAll(shape: FileShape): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(shape, null, 2), "utf8");
}

function makeCode(): string {
  return crypto.randomBytes(4).toString("hex");
}

function makeToken(): string {
  return crypto.randomBytes(18).toString("base64url");
}

function makeId(): string {
  return "w_" + crypto.randomBytes(8).toString("hex");
}

function normEmail(e: string): string {
  return e.trim().toLowerCase();
}

// In-process lock for write concurrency (single-process dev)
let writing: Promise<unknown> = Promise.resolve();
function withLock<T>(fn: () => Promise<T>): Promise<T> {
  const next = writing.then(fn, fn);
  writing = next.catch(() => undefined);
  return next;
}

export const fileStore: WaitlistStore = {
  async add(input) {
    return withLock(async () => {
      const shape = await readAll();
      const email = normEmail(input.email);

      const existing = shape.entries.find((e) => e.email === email);
      if (existing) {
        return { entry: existing, created: false };
      }

      const position = shape.entries.length + 1;
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

      shape.entries.push(entry);

      if (input.referredBy) {
        const referrer = shape.entries.find(
          (e) => e.referralCode === input.referredBy,
        );
        if (referrer) {
          referrer.referralCount = (referrer.referralCount ?? 0) + 1;
        }
      }

      await writeAll(shape);
      return { entry, created: true };
    });
  },

  async findByToken(token) {
    const shape = await readAll();
    return shape.entries.find((e) => e.token === token) ?? null;
  },

  async findByEmail(email) {
    const shape = await readAll();
    const e = normEmail(email);
    return shape.entries.find((entry) => entry.email === e) ?? null;
  },

  async findByCode(code) {
    const shape = await readAll();
    return shape.entries.find((e) => e.referralCode === code) ?? null;
  },

  async stats(): Promise<WaitlistStats> {
    const shape = await readAll();
    const professionals = shape.entries.filter((e) => e.role === "professional").length;
    const businesses = shape.entries.filter((e) => e.role === "business").length;
    return { total: shape.entries.length, professionals, businesses };
  },
};

