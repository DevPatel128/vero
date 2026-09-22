import { test, expect } from '@playwright/test';

test('waitlist conversion funnel', async ({ page }) => {
  const email = `test-${Date.now()}-${Math.random().toString(36).slice(2)}@example.com`;

  await page.goto('/');
  // Case-insensitive: the rendered title is "VERO", not "Vero".
  await expect(page).toHaveTitle(/VERO/i);

  await page.goto('/waitlist?as=worker');
  await page.locator('input[type="email"]').fill(email);
  await page.locator('input[name="consent"]').check();
  await page.locator('button[type="submit"]').click();

  // A fresh email always creates a new entry, so this lands on the
  // personal /waitlist/[token] page, not /waitlist/thanks.
  await expect(page).toHaveURL(/\/waitlist\/.+/);
  await expect(page.locator('h1')).toContainText('Welcome', { timeout: 10000 });
});

test('a duplicate submission does not reach the token page', async ({ page }) => {
  const email = `test-dup-${Date.now()}-${Math.random().toString(36).slice(2)}@example.com`;

  await page.goto('/waitlist?as=worker');
  await page.locator('input[type="email"]').fill(email);
  await page.locator('input[name="consent"]').check();
  await page.locator('button[type="submit"]').click();
  await expect(page).toHaveURL(/\/waitlist\/.+/);

  // Same email again, from scratch.
  await page.goto('/waitlist?as=worker');
  await page.locator('input[type="email"]').fill(email);
  await page.locator('input[name="consent"]').check();
  await page.locator('button[type="submit"]').click();

  // No token in the response this time (see the join-route security fix),
  // so the client falls back to the generic thanks page rather than a
  // token URL built from someone else's data.
  await expect(page).toHaveURL(/\/waitlist\/thanks/, { timeout: 10000 });
});
