import { test, expect } from "@playwright/test";

test.describe("Landing page", () => {
  test("renders hero and primary CTA", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/money/i);
    await expect(page.getByRole("link", { name: /start tracking/i }).first()).toBeVisible();
  });

  test("navigates to pricing", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /pricing/i }).first().click();
    await expect(page).toHaveURL(/\/pricing/);
    await expect(page.getByText("Free")).toBeVisible();
    await expect(page.getByText(/most popular/i)).toBeVisible();
  });

  test("blog index lists posts", async ({ page }) => {
    await page.goto("/blog");
    await expect(page.getByRole("heading", { level: 1, name: /journal/i })).toBeVisible();
  });

  test("renders robots.txt", async ({ page }) => {
    const res = await page.request.get("/robots.txt");
    expect(res.ok()).toBe(true);
    const body = await res.text();
    expect(body).toContain("GPTBot");
    expect(body).toContain("ClaudeBot");
  });

  test("renders sitemap.xml", async ({ page }) => {
    const res = await page.request.get("/sitemap.xml");
    expect(res.ok()).toBe(true);
  });

  test("renders llms.txt", async ({ page }) => {
    const res = await page.request.get("/llms.txt");
    expect(res.ok()).toBe(true);
    const body = await res.text();
    expect(body).toContain("Trove");
  });
});
