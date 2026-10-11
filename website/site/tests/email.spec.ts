import { test, expect } from '@playwright/test';
import { sendEmail, REPLY_TO } from '../src/lib/email';

test('every outgoing email sets reply_to to the Vroe Labs inbox and keeps From on the verified domain', async () => {
  const realFetch = globalThis.fetch;
  let sent: Record<string, unknown> = {};
  globalThis.fetch = (async (_url: unknown, init?: RequestInit) => {
    sent = JSON.parse(String(init?.body));
    return new Response('{}', { status: 200 });
  }) as typeof fetch;
  const prevKey = process.env.RESEND_API_KEY;
  const prevFrom = process.env.WAITLIST_FROM_EMAIL;
  process.env.RESEND_API_KEY = 'test-key';
  delete process.env.WAITLIST_FROM_EMAIL;
  try {
    await sendEmail('someone@example.com', 'Subject', 'Body');
    expect(REPLY_TO).toBe('vroelabs@gmail.com');
    expect(sent.reply_to).toBe('vroelabs@gmail.com');
    expect(sent.from).toBe('hello@vero.app');
    expect(String(sent.from)).not.toContain('gmail.com');
  } finally {
    globalThis.fetch = realFetch;
    if (prevKey === undefined) delete process.env.RESEND_API_KEY; else process.env.RESEND_API_KEY = prevKey;
    if (prevFrom !== undefined) process.env.WAITLIST_FROM_EMAIL = prevFrom;
  }
});
