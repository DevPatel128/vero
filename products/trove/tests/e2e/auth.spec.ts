import { test, expect } from "@playwright/test";

test.describe("Auth flow", () => {
  test("login page renders and validates", async ({ page }) => {
    await page.goto("/login");
    await expect(page.getByRole("heading", { name: /welcome back/i })).toBeVisible();
    await page.getByRole("button", { name: /sign in/i }).click();
    await expect(page.getByText(/valid email/i)).toBeVisible();
  });

  test("register page renders and validates", async ({ page }) => {
    await page.goto("/register");
    await expect(page.getByRole("heading", { name: /create your account/i })).toBeVisible();
    await page.getByLabel(/password/i).fill("short");
    await page.getByRole("button", { name: /create account/i }).click();
    await expect(page.getByText(/8 characters/i)).toBeVisible();
  });

  test("protected route redirects to login", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page).toHaveURL(/\/login/);
  });
});
