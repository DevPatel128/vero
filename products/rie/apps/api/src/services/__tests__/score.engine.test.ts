// ─────────────────────────────────────────────────────────
// Score Engine Tests
// All assertions are grounded in the engine's exact weight
// constants (consistency 40%, effort 25%, improvement 20%,
// proofQuality 15%) and tier thresholds.
// ─────────────────────────────────────────────────────────

import { ScoreEngine } from '../score.engine';

// ── Mock @prisma/client ──────────────────────────────────

// var declarations are hoisted so jest.mock() factory closures can reference
// them without hitting the temporal dead zone.
/* eslint-disable no-var */
var mockSubmissionFindMany = jest.fn();
var mockSubmissionCount = jest.fn();
var mockUserDomainFindUnique = jest.fn();
var mockTrustScoreFindUnique = jest.fn();
var mockScoreUpsert = jest.fn();
/* eslint-enable no-var */

// Use arrow-function wrappers so each method resolves the var at call time,
// not at PrismaClient construction time (module init, before var assignments).
jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    submission: {
      findMany: (...args: unknown[]) => mockSubmissionFindMany(...args),
      count: (...args: unknown[]) => mockSubmissionCount(...args),
    },
    userDomain: {
      findUnique: (...args: unknown[]) => mockUserDomainFindUnique(...args),
    },
    trustScore: {
      findUnique: (...args: unknown[]) => mockTrustScoreFindUnique(...args),
    },
    score: {
      upsert: (...args: unknown[]) => mockScoreUpsert(...args),
    },
  })),
}));

// ── Mock badge.engine (fire-and-forget — must not interfere) ──

jest.mock('../badge.engine', () => ({
  evaluateBadges: jest.fn().mockResolvedValue(undefined),
}));

// ── Score math reference ─────────────────────────────────
//
// Component scores are 0-100.
// rawScore = round((c×0.40 + e×0.25 + i×0.20 + p×0.15) × 10)
// effectiveScore = round(rawScore × trustModifier)
//
// Stubs used in these tests:
//
// ZERO STUB (all zero):
//   findMany → []  for every call
//   userDomain → null (improvement returns 50, consistency returns 0)
//   trust → 1.0
//   → c=0, e=0, i=50, p=0
//   → weighted = 0+0+10+0 = 10  → rawScore = 100
//
// EFFORT ONLY (effort=1, quality=1):
//   findMany for effortScore/qualityScore → [{effortScore:1, qualityScore:1}]
//   findMany for createdAt → []           (consistency → 0)
//   findMany for proofType → []           (proofQuality → 0)
//   userDomain → null                     (improvement → 50)
//   → c=0, e=100, i=50, p=0
//   → weighted = 0+25+10+0 = 35  → rawScore = 350
//
// MAX SCORE STUB (all components = 100 except improvement=50):
//   consistency: 90 unique days in 90-day window + streak=90
//     → adherence=1.0, streakBonus=1.0 → c = round(60+40) = 100
//   effort: [{effortScore:1, qualityScore:1}] → e = 100
//   improvement: userDomain=null → i = 50
//   proofQuality: [{proofType:'api', riskScore:0}] → p = round(1.0×100) = 100
//   → weighted = 100×0.40 + 100×0.25 + 50×0.20 + 100×0.15
//              = 40 + 25 + 10 + 15 = 90
//   → rawScore = round(90 × 10) = 900
//   With trust=1.0 → effectiveScore = 900 → tier = "master"

// ── Stub factories ────────────────────────────────────────

/** All components return their zero/neutral values. rawScore = 100, trust = 1.0. */
function stubZeroScore(): void {
  mockSubmissionFindMany.mockResolvedValue([]);
  mockSubmissionCount.mockResolvedValue(0);
  mockUserDomainFindUnique.mockResolvedValue(null);
  mockTrustScoreFindUnique.mockResolvedValue({ overall: 1.0 });
  mockScoreUpsert.mockResolvedValue({});
}

/**
 * Discriminate the three findMany calls by their select shape:
 *   - { effortScore, qualityScore }  → calcEffort
 *   - { createdAt }                  → calcConsistency
 *   - { proofType, riskScore }       → calcProofQuality
 */
function stubEffortOnly(): void {
  mockSubmissionFindMany.mockImplementation(
    (args: { select?: Record<string, boolean> }) => {
      const sel = args.select ?? {};
      if ('effortScore' in sel) {
        return Promise.resolve([{ effortScore: 1, qualityScore: 1 }]);
      }
      // createdAt (consistency) and proofType (proofQuality) → empty → 0
      return Promise.resolve([]);
    },
  );
  mockSubmissionCount.mockResolvedValue(0);
  mockUserDomainFindUnique.mockResolvedValue(null); // improvement → 50
  mockTrustScoreFindUnique.mockResolvedValue({ overall: 1.0 });
  mockScoreUpsert.mockResolvedValue({});
}

/**
 * Max-score stub: consistency=100, effort=100, improvement=50, proofQuality=100.
 * rawScore = 900, effectiveScore = 900 × trustModifier.
 */
function stubMaxScore(trustModifier: number): void {
  // Build 90 distinct calendar-day dates within the 90-day window
  const consistencyDates = Array.from({ length: 90 }, (_, i) => {
    const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
    d.setHours(0, 0, 0, 0);
    return { createdAt: d };
  });

  mockSubmissionFindMany.mockImplementation(
    (args: { select?: Record<string, boolean> }) => {
      const sel = args.select ?? {};
      if ('effortScore' in sel) {
        return Promise.resolve([{ effortScore: 1, qualityScore: 1 }]);
      }
      if ('createdAt' in sel) {
        return Promise.resolve(consistencyDates);
      }
      if ('proofType' in sel) {
        return Promise.resolve([{ proofType: 'api', riskScore: 0 }]);
      }
      return Promise.resolve([]);
    },
  );
  mockSubmissionCount.mockResolvedValue(0);
  // currentStreak=90 → streakBonus = min(90/90, 1.0) = 1.0
  // improvement: no baselineData → returns 50
  mockUserDomainFindUnique.mockResolvedValue({ currentStreak: 90, baselineData: null });
  mockTrustScoreFindUnique.mockResolvedValue({ overall: trustModifier });
  mockScoreUpsert.mockResolvedValue({});
}

// ── Test Suite ───────────────────────────────────────────

describe('ScoreEngine', () => {
  let engine: ScoreEngine;

  beforeEach(() => {
    jest.clearAllMocks();
    engine = new ScoreEngine();
  });

  // ── Tier boundary tests ───────────────────────────────

  describe('getTier via calculate() — tier boundaries', () => {
    it('returns "unranked" when effectiveScore is below 200', async () => {
      // Zero stub: no submissions → consistency=0, effort=0, proofQuality=0.
      // improvement has no baseline → returns 50 (neutral).
      // weighted = 0+0+(50×0.20)+0 = 10 → rawScore = 100
      // With trust=1.0 → effectiveScore = 100 → "unranked" (threshold is 200)
      stubZeroScore(); // trust already set to 1.0

      const result = await engine.calculate({ userId: 'u1', domainId: 'd1' });

      expect(result.rawScore).toBe(100);
      expect(result.effectiveScore).toBe(100);
      expect(result.tier).toBe('unranked');
    });

    it('returns "bronze" when effectiveScore is exactly 200', async () => {
      // EFFORT ONLY stub: rawScore = 350.
      // Set trust = 200/350 → effectiveScore = round(350 × (200/350)) = 200
      stubEffortOnly();
      mockTrustScoreFindUnique.mockResolvedValue({ overall: 200 / 350 });

      const result = await engine.calculate({ userId: 'u1', domainId: 'd1' });

      expect(result.rawScore).toBe(350);
      expect(result.effectiveScore).toBe(200);
      expect(result.tier).toBe('bronze');
    });

    it('returns "silver" when effectiveScore is exactly 350', async () => {
      // EFFORT ONLY stub: rawScore = 350, trust = 1.0 → effectiveScore = 350
      stubEffortOnly();

      const result = await engine.calculate({ userId: 'u1', domainId: 'd1' });

      expect(result.rawScore).toBe(350);
      expect(result.effectiveScore).toBe(350);
      expect(result.tier).toBe('silver');
    });

    it('returns "gold" when effectiveScore is exactly 500', async () => {
      // MAX stub: rawScore = 900.  Trust = 500/900 → effectiveScore = round(500) = 500
      stubMaxScore(500 / 900);

      const result = await engine.calculate({ userId: 'u1', domainId: 'd1' });

      expect(result.rawScore).toBe(900);
      expect(result.effectiveScore).toBe(500);
      expect(result.tier).toBe('gold');
    });

    it('returns "platinum" when effectiveScore is exactly 650', async () => {
      // MAX stub: rawScore = 900.  Trust = 650/900 → effectiveScore = round(650) = 650
      stubMaxScore(650 / 900);

      const result = await engine.calculate({ userId: 'u1', domainId: 'd1' });

      expect(result.rawScore).toBe(900);
      expect(result.effectiveScore).toBe(650);
      expect(result.tier).toBe('platinum');
    });

    it('returns "diamond" when effectiveScore is exactly 800', async () => {
      // MAX stub: rawScore = 900.  Trust = 800/900 → effectiveScore = round(800) = 800
      stubMaxScore(800 / 900);

      const result = await engine.calculate({ userId: 'u1', domainId: 'd1' });

      expect(result.rawScore).toBe(900);
      expect(result.effectiveScore).toBe(800);
      expect(result.tier).toBe('diamond');
    });

    it('returns "master" when effectiveScore reaches 900', async () => {
      // MAX stub: rawScore = 900, trust = 1.0 → effectiveScore = 900
      stubMaxScore(1.0);

      const result = await engine.calculate({ userId: 'u1', domainId: 'd1' });

      expect(result.rawScore).toBe(900);
      expect(result.effectiveScore).toBe(900);
      expect(result.tier).toBe('master');
    });
  });

  // ── Component & result shape tests ───────────────────

  describe('result shape', () => {
    it('exposes all four component scores and keeps rawScore within 0–1000', async () => {
      stubEffortOnly();

      const result = await engine.calculate({ userId: 'u1', domainId: 'd1' });

      expect(result.components).toMatchObject({
        consistency: expect.any(Number),
        effort: expect.any(Number),
        improvement: expect.any(Number),
        proofQuality: expect.any(Number),
      });
      expect(result.rawScore).toBeGreaterThanOrEqual(0);
      expect(result.rawScore).toBeLessThanOrEqual(1000);
    });
  });

  // ── Trust modifier test ───────────────────────────────

  describe('trust modifier', () => {
    it('applies trustModifier so effectiveScore = round(rawScore × trustModifier)', async () => {
      // EFFORT ONLY: rawScore = 350, trustModifier = 0.5 → effectiveScore = 175
      stubEffortOnly();
      mockTrustScoreFindUnique.mockResolvedValue({ overall: 0.5 });

      const result = await engine.calculate({ userId: 'u1', domainId: 'd1' });

      expect(result.rawScore).toBe(350);
      expect(result.effectiveScore).toBe(Math.round(350 * 0.5)); // 175
    });
  });
});
