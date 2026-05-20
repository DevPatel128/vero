// ─────────────────────────────────────────────────────────
// Trust Engine Tests
//
// Drives TrustEngine.recalculate() with mocked prisma and
// asserts exact output values based on the engine's formula:
//
//   overall = proofAuth×0.35 + behavioral×0.25
//           + maturity×0.20 + fraud×0.20
//
// Signal reference (see trust.engine.ts for full logic):
//   proofAuth  = max(0.3, highQuality/total) | 0.7 if no submissions
//   behavioral = 0.6 if < 5 subs | 1 − variance/100 (clamped [0.3, 1])
//   maturity   = 0.3 + age×(0.4/30) if < 30d; 0.7 + (age−30)×(0.3/60) if < 90d; 1.0 if ≥ 90d
//   fraud      = max(0, 1.0 − penalties×0.15 − rejections×0.05)
// ─────────────────────────────────────────────────────────

import { TrustEngine } from '../trust.engine';

// ── Mock @prisma/client ──────────────────────────────────

// var declarations are hoisted so jest.mock() factory closures can reference
// them without hitting the temporal dead zone.
/* eslint-disable no-var */
var mockSubmissionCount = jest.fn();
var mockSubmissionFindMany = jest.fn();
var mockUserFindUnique = jest.fn();
var mockPenaltyCount = jest.fn();
var mockTrustScoreUpsert = jest.fn();
/* eslint-enable no-var */

// Use arrow-function wrappers so each method resolves the var at call time,
// not at PrismaClient construction time (module init, before var assignments).
jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    submission: {
      count: (...args: unknown[]) => mockSubmissionCount(...args),
      findMany: (...args: unknown[]) => mockSubmissionFindMany(...args),
    },
    user: {
      findUnique: (...args: unknown[]) => mockUserFindUnique(...args),
    },
    penalty: {
      count: (...args: unknown[]) => mockPenaltyCount(...args),
    },
    trustScore: {
      upsert: (...args: unknown[]) => mockTrustScoreUpsert(...args),
    },
  })),
}));

// ── submission.count call discriminator ─────────────────
//
// recalculate() calls submission.count three times:
//   1. proofAuth — total verified:            { verificationStatus: 'verified' }        (no proofType)
//   2. proofAuth — high-quality verified:     { verificationStatus: 'verified', proofType: { in: [...] } }
//   3. fraud     — recent rejections:         { verificationStatus: 'rejected' }
//
// We discriminate on verificationStatus and proofType presence.

type SubmissionCountArgs = {
  where?: {
    verificationStatus?: string;
    proofType?: { in?: string[] };
  };
};

function makeSubmissionCountMock(
  totalVerified: number,
  highQuality: number,
  rejections: number,
): jest.Mock {
  return jest.fn().mockImplementation((args: SubmissionCountArgs) => {
    if (args.where?.verificationStatus === 'rejected') return Promise.resolve(rejections);
    if (args.where?.proofType?.in) return Promise.resolve(highQuality);
    return Promise.resolve(totalVerified);
  });
}

// ── Helpers ──────────────────────────────────────────────

function daysAgo(n: number): Date {
  return new Date(Date.now() - n * 24 * 60 * 60 * 1000);
}

/** Default boilerplate stubs (reset each test in beforeEach) */
function stubBase(overrides: {
  totalVerified?: number;
  highQuality?: number;
  rejections?: number;
  submissionDates?: Date[];
  createdAt?: Date;
  penalties?: number;
} = {}): void {
  const {
    totalVerified = 0,
    highQuality = 0,
    rejections = 0,
    submissionDates = [],
    createdAt = daysAgo(91),
    penalties = 0,
  } = overrides;

  mockSubmissionCount.mockImplementation(
    makeSubmissionCountMock(totalVerified, highQuality, rejections),
  );
  mockSubmissionFindMany.mockResolvedValue(
    submissionDates.map(d => ({ createdAt: d })),
  );
  mockUserFindUnique.mockResolvedValue({ createdAt });
  mockPenaltyCount.mockResolvedValue(penalties);
  mockTrustScoreUpsert.mockResolvedValue({});
}

// ── Test Suite ───────────────────────────────────────────

describe('TrustEngine', () => {
  let engine: TrustEngine;

  beforeEach(() => {
    jest.clearAllMocks();
    engine = new TrustEngine();
  });

  // ── Behavioral Consistency ────────────────────────────

  describe('behavioral consistency', () => {
    it('does not throw and returns a valid [0,1] score with 0 submissions', async () => {
      // 0 submissions → proofAuth=0.7 (neutral), behavioral=0.6 (< 5), maturity=1.0, fraud=1.0
      // overall = 0.7×0.35 + 0.6×0.25 + 1.0×0.20 + 1.0×0.20 = 0.245+0.15+0.2+0.2 = 0.795
      stubBase({ submissionDates: [] });

      const score = await engine.recalculate('u1');

      expect(typeof score).toBe('number');
      expect(score).toBeGreaterThanOrEqual(0);
      expect(score).toBeLessThanOrEqual(1);
      expect(score).toBeCloseTo(0.795, 2);
    });

    it('returns behavioral consistency of 0.6 when fewer than 5 submissions exist', async () => {
      // 2 submissions → < 5 → behavioral = 0.6
      // proofAuth: 2 total, 0 high-quality → max(0.3, 0/2) = 0.3
      // maturity: 91 days → 1.0; fraud: no penalties/rejections → 1.0
      // overall = 0.3×0.35 + 0.6×0.25 + 1.0×0.20 + 1.0×0.20
      //         = 0.105 + 0.15 + 0.20 + 0.20 = 0.655
      stubBase({
        totalVerified: 2,
        highQuality: 0,
        submissionDates: [
          new Date('2026-01-01T10:00:00Z'),
          new Date('2026-01-02T11:00:00Z'),
        ],
      });

      const score = await engine.recalculate('u1');

      expect(score).toBeCloseTo(0.655, 2);
    });
  });

  // ── Account Maturity ──────────────────────────────────

  describe('account maturity', () => {
    it('gives low maturity (0.3) for an account created today (age = 0 days)', async () => {
      // maturity at day 0 = 0.3 + 0×(0.4/30) = 0.3
      // proofAuth = 0.7 (0 total subs), behavioral = 0.6, fraud = 1.0
      // overall = 0.7×0.35 + 0.6×0.25 + 0.3×0.20 + 1.0×0.20
      //         = 0.245 + 0.15 + 0.06 + 0.20 = 0.655
      stubBase({ createdAt: new Date() });

      const score = await engine.recalculate('u1');

      expect(score).toBeCloseTo(0.655, 2);
    });

    it('gives full maturity (1.0) for an account created 91+ days ago', async () => {
      // maturity = 1.0; proofAuth = 0.7, behavioral = 0.6, fraud = 1.0
      // overall = 0.7×0.35 + 0.6×0.25 + 1.0×0.20 + 1.0×0.20 = 0.795
      stubBase({ createdAt: daysAgo(91) });

      const score = await engine.recalculate('u1');

      expect(score).toBeCloseTo(0.795, 2);
    });
  });

  // ── Fraud Signals ─────────────────────────────────────

  describe('fraud signals', () => {
    it('reduces fraud signal by 0.15 per active penalty (2 penalties → fraud = 0.7)', async () => {
      // fraud = 1.0 − 2×0.15 − 0×0.05 = 0.7
      // proofAuth = 0.7, behavioral = 0.6, maturity = 1.0
      // overall = 0.7×0.35 + 0.6×0.25 + 1.0×0.20 + 0.7×0.20
      //         = 0.245 + 0.15 + 0.20 + 0.14 = 0.735
      stubBase({ penalties: 2 });

      const score = await engine.recalculate('u1');

      expect(score).toBeCloseTo(0.735, 2);
    });

    it('reduces fraud signal by 0.05 per recent rejection (3 rejections → fraud = 0.85)', async () => {
      // fraud = 1.0 − 0×0.15 − 3×0.05 = 0.85
      // proofAuth = 0.7, behavioral = 0.6, maturity = 1.0
      // overall = 0.7×0.35 + 0.6×0.25 + 1.0×0.20 + 0.85×0.20
      //         = 0.245 + 0.15 + 0.20 + 0.17 = 0.765
      stubBase({ rejections: 3, totalVerified: 0, highQuality: 0 });

      const score = await engine.recalculate('u1');

      expect(score).toBeCloseTo(0.765, 2);
    });
  });

  // ── Clamping ──────────────────────────────────────────

  describe('score clamping', () => {
    it('clamps the fraud component to 0 and keeps overall in [0, 1] with extreme penalties', async () => {
      // 100 active penalties → raw fraud = 1.0 − 100×0.15 = −14.0 → clamped to 0
      // proofAuth = 0.7, behavioral = 0.6, maturity = 1.0, fraud = 0
      // overall = 0.7×0.35 + 0.6×0.25 + 1.0×0.20 + 0×0.20
      //         = 0.245 + 0.15 + 0.20 + 0 = 0.595
      stubBase({ penalties: 100 });

      const score = await engine.recalculate('u1');

      expect(score).toBeGreaterThanOrEqual(0);
      expect(score).toBeLessThanOrEqual(1);
      expect(score).toBeCloseTo(0.595, 2);
    });
  });

  // ── Persistence ───────────────────────────────────────

  describe('persistence', () => {
    it('calls trustScore.upsert once with the returned overall score', async () => {
      stubBase();

      const score = await engine.recalculate('u1');

      expect(mockTrustScoreUpsert).toHaveBeenCalledTimes(1);
      expect(mockTrustScoreUpsert).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { userId: 'u1' },
          create: expect.objectContaining({ overall: score }),
          update: expect.objectContaining({ overall: score }),
        }),
      );
    });
  });
});
