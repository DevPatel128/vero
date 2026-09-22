import { test, expect } from '@playwright/test';

const ORIGIN = 'http://localhost:3000';

function uniqueEmail(tag: string): string {
  return `test-${tag}-${Date.now()}-${Math.random().toString(36).slice(2)}@example.com`;
}

test.describe('POST /api/waitlist/join', () => {
  test('415 on an unsupported content type', async ({ request }) => {
    const res = await request.post('/api/waitlist/join', {
      headers: { Origin: ORIGIN, 'Content-Type': 'text/plain' },
      data: 'not a form',
    });
    expect(res.status()).toBe(415);
  });

  test('422 on an invalid email', async ({ request }) => {
    const res = await request.post('/api/waitlist/join', {
      headers: { Origin: ORIGIN },
      data: { email: 'not-an-email', role: 'worker', consent: 'true' },
    });
    expect(res.status()).toBe(422);
  });

  test('403 with no Origin and no Referer', async ({ request }) => {
    const res = await request.post('/api/waitlist/join', {
      data: { email: uniqueEmail('noorigin'), role: 'worker', consent: 'true' },
    });
    expect(res.status()).toBe(403);
  });

  test('403 with a cross-site Origin', async ({ request }) => {
    const res = await request.post('/api/waitlist/join', {
      headers: { Origin: 'https://evil.example.com' },
      data: { email: uniqueEmail('wrongorigin'), role: 'worker', consent: 'true' },
    });
    expect(res.status()).toBe(403);
  });

  test('a filled-in honeypot is rejected before it reaches the honeypot check', async ({ request }) => {
    // joinSchema caps `website` at length 0, so a bot that fills it in
    // never reaches route.ts's own "if (data.website...) silent accept"
    // branch at all -- validation rejects it first. Both are valid ways to
    // repel a bot; this asserts what actually happens, not the code
    // comment's "silent accept" description of a branch that is, as
    // written, unreachable.
    const res = await request.post('/api/waitlist/join', {
      headers: { Origin: ORIGIN },
      data: { email: uniqueEmail('honeypot'), role: 'worker', consent: 'true', website: 'http://spam.example.com' },
    });
    expect(res.status()).toBe(422);
    const body = await res.json();
    expect(body.error).toBe('invalid_input');
    expect(body).not.toHaveProperty('token');
  });

  test('201 for a new signup, with a token; a duplicate gets 200 and no token', async ({ request }) => {
    const email = uniqueEmail('dup');
    const payload = { email, role: 'worker', consent: 'true' };

    const first = await request.post('/api/waitlist/join', {
      headers: { Origin: ORIGIN },
      data: payload,
    });
    expect(first.status()).toBe(201);
    const firstBody = await first.json();
    expect(firstBody.created).toBe(true);
    expect(typeof firstBody.token).toBe('string');
    expect(firstBody.token.length).toBeGreaterThan(0);

    const second = await request.post('/api/waitlist/join', {
      headers: { Origin: ORIGIN },
      data: payload,
    });
    expect(second.status()).toBe(200);
    const secondBody = await second.json();
    expect(secondBody.created).toBe(false);
    // The whole point of this security fix: no token, no position, no tier
    // on a repeat submission of someone else's email.
    expect(secondBody).not.toHaveProperty('token');
    expect(secondBody).not.toHaveProperty('position');
    expect(secondBody).not.toHaveProperty('tier');
  });

  test('a referral moves the referrer up 5 spots', async ({ request }) => {
    const joined = await request.post('/api/waitlist/join', {
      headers: { Origin: ORIGIN },
      data: { email: uniqueEmail('referrer'), role: 'worker', consent: 'true' },
    });
    const referrer = await joined.json();
    const beforePosition: number = referrer.position;

    // The join response has no referral code, so read it back off the
    // referrer's own rendered page rather than reconstructing it here.
    // ("Your referral code: <span>{code}</span>" isn't one text run once
    // rendered; the share link in the <code> block is, so match on that.)
    const beforeHtml = await (await request.get(`/waitlist/${referrer.token}`)).text();
    const match = beforeHtml.match(/waitlist\?ref=([a-f0-9]{8})/);
    expect(match).not.toBeNull();
    const code = match![1];

    const referredJoin = await request.post('/api/waitlist/join', {
      headers: { Origin: ORIGIN },
      data: { email: uniqueEmail('via-referral'), role: 'worker', consent: 'true', referredBy: code },
    });
    expect(referredJoin.status()).toBe(201);

    const afterHtml = await (await request.get(`/waitlist/${referrer.token}`)).text();
    // effectivePosition drops by 5 per referral (floored at 1); confirm the
    // referrer's own page reflects it, rather than re-deriving the number.
    // React SSRs a "<!-- -->" boundary comment between the "#" and the
    // digits (they're separate JSX expressions), so match around it
    // instead of a plain substring check.
    const posMatch = afterHtml.match(/text-ink-900">#(?:<!--\s*-->)?(\d+)</);
    expect(posMatch).not.toBeNull();
    expect(Number(posMatch![1])).toBe(Math.max(1, beforePosition - 5));
  });
});

test.describe('POST /api/investors/request', () => {
  test('422 on missing required fields', async ({ request }) => {
    const res = await request.post('/api/investors/request', {
      headers: { Origin: ORIGIN },
      multipart: { name: 'A', email: 'not-an-email' },
    });
    expect(res.status()).toBe(422);
  });

  test('403 with no Origin and no Referer', async ({ request }) => {
    const res = await request.post('/api/investors/request', {
      multipart: {
        name: 'Test Person',
        email: uniqueEmail('inv-noorigin'),
        firm: 'Test Fund',
        nda: 'true',
      },
    });
    expect(res.status()).toBe(403);
  });

  test('a filled-in honeypot is rejected before it reaches the honeypot check', async ({ request }) => {
    // Same story as the join route: schema.company is capped at length 0,
    // so this 422s at validation, never reaching route.ts's own honeypot
    // branch.
    const res = await request.post('/api/investors/request', {
      headers: { Origin: ORIGIN },
      multipart: {
        name: 'Test Person',
        email: uniqueEmail('inv-honeypot'),
        firm: 'Test Fund',
        nda: 'true',
        company: 'http://spam.example.com',
      },
    });
    expect(res.status()).toBe(422);
  });

  test('201 for a valid request', async ({ request }) => {
    const res = await request.post('/api/investors/request', {
      headers: { Origin: ORIGIN },
      multipart: {
        name: 'Test Person',
        email: uniqueEmail('inv-valid'),
        firm: 'Test Fund',
        nda: 'true',
      },
    });
    expect(res.status()).toBe(201);
  });
});

test.describe('GET /api/health', () => {
  test('reports the waitlist store is reachable, with no user data', async ({ request }) => {
    const res = await request.get('/api/health');
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body).toEqual({ ok: true });
  });
});
