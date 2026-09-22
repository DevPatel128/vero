import { test, expect } from '@playwright/test';
import { effectivePosition, tierFor, tierLabel } from '../src/lib/waitlist';
import { joinSchema } from '../src/lib/waitlist/schema';
import type { WaitlistEntry } from '../src/lib/waitlist/types';

function entry(position: number, referralCount: number): WaitlistEntry {
  return {
    id: 'w_test',
    email: 'test@example.com',
    name: null,
    role: 'worker',
    city: null,
    useCase: null,
    source: null,
    referredBy: null,
    referralCode: 'code',
    position,
    referralCount,
    joinedAt: new Date().toISOString(),
    token: 'token',
  };
}

test.describe('effectivePosition', () => {
  test('subtracts 5 spots per referral', () => {
    expect(effectivePosition(entry(100, 3))).toBe(85);
  });

  test('is unchanged with no referrals', () => {
    expect(effectivePosition(entry(42, 0))).toBe(42);
  });

  test('floors at 1, never goes negative', () => {
    expect(effectivePosition(entry(3, 5))).toBe(1);
  });
});

test.describe('tierFor', () => {
  test('positions 1 to 1000 are founder', () => {
    expect(tierFor(1)).toBe('founder');
    expect(tierFor(1000)).toBe('founder');
  });

  test('positions 1001 to 5000 are pioneer', () => {
    expect(tierFor(1001)).toBe('pioneer');
    expect(tierFor(5000)).toBe('pioneer');
  });

  test('positions above 5000 are early', () => {
    expect(tierFor(5001)).toBe('early');
  });
});

test.describe('tierLabel', () => {
  test('maps every tier to its display label', () => {
    expect(tierLabel('founder')).toBe('Founding member');
    expect(tierLabel('pioneer')).toBe('Pioneer');
    expect(tierLabel('early')).toBe('Early member');
  });
});

test.describe('joinSchema', () => {
  test('accepts a minimal valid submission', () => {
    const result = joinSchema.safeParse({ email: 'a@example.com', role: 'worker', consent: true });
    expect(result.success).toBe(true);
  });

  test('accepts consent as the string "on", how a native form submits a checkbox', () => {
    const result = joinSchema.safeParse({ email: 'a@example.com', role: 'worker', consent: 'on' });
    expect(result.success).toBe(true);
  });

  test('rejects an invalid email', () => {
    const result = joinSchema.safeParse({ email: 'not-an-email', role: 'worker', consent: true });
    expect(result.success).toBe(false);
  });

  test('rejects a missing consent', () => {
    const result = joinSchema.safeParse({ email: 'a@example.com', role: 'worker' });
    expect(result.success).toBe(false);
  });

  test('rejects an unknown role', () => {
    const result = joinSchema.safeParse({ email: 'a@example.com', role: 'admin', consent: true });
    expect(result.success).toBe(false);
  });

  test('rejects a name over 120 characters', () => {
    const result = joinSchema.safeParse({
      email: 'a@example.com',
      role: 'worker',
      consent: true,
      name: 'x'.repeat(121),
    });
    expect(result.success).toBe(false);
  });
});
