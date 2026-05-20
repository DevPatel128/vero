// ─────────────────────────────────────────────────────────
// RIE Core Types
// ─────────────────────────────────────────────────────────

// ── Scores ──────────────────────────────────────────────

export type ScoreTier = 'unranked' | 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond' | 'master';

export interface DisciplineScore {
  raw: number;           // 0–1000
  effective: number;     // raw × trust modifier
  tier: ScoreTier;
  consistency: number;   // 0–100
  effort: number;        // 0–100
  improvement: number;   // 0–100
  proofReliability: number; // 0–100
  periodStart: string;
  periodEnd: string;
}

export interface TrustScore {
  overall: number;           // 0.0–1.0
  proofAuthenticity: number; // 0.0–1.0
  behavioralConsistency: number;
  accountMaturity: number;
  fraudSignals: number;      // inverse — higher is better
  updatedAt: string;
}

export function getTier(score: number): ScoreTier {
  if (score >= 950) return 'master';
  if (score >= 850) return 'diamond';
  if (score >= 700) return 'platinum';
  if (score >= 500) return 'gold';
  if (score >= 300) return 'silver';
  if (score >= 100) return 'bronze';
  return 'unranked';
}

export function getEffectiveScore(raw: number, trustScore: number): number {
  return Math.round(raw * (0.5 + 0.5 * trustScore));
}

// ── Domains ─────────────────────────────────────────────

export type DomainId = 'fitness' | 'content' | 'gaming';

export interface Domain {
  id: DomainId;
  name: string;
  icon: string;
  description: string;
}

export const DOMAINS: Record<DomainId, Domain> = {
  fitness: { id: 'fitness', name: 'Fitness', icon: 'dumbbell', description: 'Physical training & health' },
  content: { id: 'content', name: 'Content Creation', icon: 'video', description: 'Publishing & creative output' },
  gaming: { id: 'gaming', name: 'Gaming', icon: 'controller', description: 'Competitive play & skill improvement' },
};

// ── Users ───────────────────────────────────────────────

export interface User {
  id: string;
  email: string;
  name: string;
  username: string;
  locale: SupportedLocale;
  timezone: string;
  mfaEnabled: boolean;
  subscriptionTier: SubscriptionTier;
  createdAt: string;
}

export type SubscriptionTier = 'free' | 'premium' | 'pro';

export interface UserProfile {
  user: User;
  scores: Record<DomainId, DisciplineScore>;
  overallScore: DisciplineScore;
  trustScore: TrustScore;
  activeDomains: DomainId[];
  currentStreaks: Record<DomainId, number>;
  level: number;
  xp: number;
  badges: Badge[];
}

// ── Submissions ─────────────────────────────────────────

export type ProofType = 'api' | 'device' | 'video' | 'image_metadata' | 'image_bare' | 'manual_detailed' | 'manual_bare';

export type VerificationStatus = 'pending' | 'verified' | 'rejected' | 'disputed';

export interface Submission {
  id: string;
  userId: string;
  domainId: DomainId;
  proofType: ProofType;
  mediaRef?: string;
  contentHash: string;
  userSignature: string;
  serverSignature?: string;
  verificationStatus: VerificationStatus;
  riskScore: number;
  createdAt: string;
  verifiedAt?: string;
}

export const PROOF_RELIABILITY: Record<ProofType, number> = {
  api: 1.0,
  device: 1.0,
  video: 0.8,
  image_metadata: 0.7,
  image_bare: 0.5,
  manual_detailed: 0.3,
  manual_bare: 0.1,
};

// ── Badges ──────────────────────────────────────────────

export type BadgeCategory = 'streak' | 'milestone' | 'mastery' | 'community' | 'special';

export interface Badge {
  id: string;
  name: string;
  category: BadgeCategory;
  domainId?: DomainId;
  icon: string;
  earnedAt?: string;
}

// ── Penalties ───────────────────────────────────────────

export type PenaltyLevel = 'warning' | 'minor' | 'major' | 'severe' | 'ban';

export interface Penalty {
  id: string;
  userId: string;
  level: PenaltyLevel;
  reason: string;
  scoreImpact: number;
  expiresAt?: string;
  appealed: boolean;
  appealResult?: 'pending' | 'upheld' | 'overturned';
}

// ── Leaderboard ─────────────────────────────────────────

export type GeoScope = 'global' | 'national' | 'state' | 'city';

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  avatarUrl?: string;
  effectiveScore: number;
  tier: ScoreTier;
  trustVerified: boolean;
  streak: number;
  isCurrentUser: boolean;
}

// ── i18n ────────────────────────────────────────────────

export type SupportedLocale =
  | 'en' | 'zh-CN' | 'hi' | 'es' | 'fr'
  | 'ar' | 'bn' | 'pt-BR' | 'ru' | 'ja';

export const SUPPORTED_LOCALES: SupportedLocale[] = [
  'en', 'zh-CN', 'hi', 'es', 'fr', 'ar', 'bn', 'pt-BR', 'ru', 'ja',
];

export const RTL_LOCALES: SupportedLocale[] = ['ar'];

export function isRTL(locale: SupportedLocale): boolean {
  return RTL_LOCALES.includes(locale);
}

// ── API Responses ───────────────────────────────────────

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
  meta?: {
    page?: number;
    total?: number;
    timestamp: string;
  };
}
