export type WaitlistRole = "professional" | "business";

export type WaitlistEntry = {
  id: string;
  email: string;
  name: string | null;
  role: WaitlistRole;
  city: string | null;
  useCase: string | null;
  source: string | null;
  referredBy: string | null;
  referralCode: string;
  position: number;
  referralCount: number;
  joinedAt: string;
  token: string;
};

export type WaitlistStats = {
  total: number;
  professionals: number;
  businesses: number;
};

export interface WaitlistStore {
  add(input: {
    email: string;
    name: string | null;
    role: WaitlistRole;
    city: string | null;
    useCase: string | null;
    source: string | null;
    referredBy: string | null;
  }): Promise<{ entry: WaitlistEntry; created: boolean }>;

  findByToken(token: string): Promise<WaitlistEntry | null>;
  findByEmail(email: string): Promise<WaitlistEntry | null>;
  findByCode(code: string): Promise<WaitlistEntry | null>;
  stats(): Promise<WaitlistStats>;
}

