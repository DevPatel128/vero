import { test, expect } from "@playwright/test";

test.describe("Public API", () => {
  test("health endpoint returns ok", async ({ request }) => {
    const res = await request.get("/api/health");
    expect(res.ok()).toBe(true);
    const body = await res.json();
    expect(body.status).toBe("ok");
  });

  test("contact endpoint validates input", async ({ request }) => {
    const res = await request.post("/api/contact", { data: { name: "x", email: "not-an-email", topic: "general", message: "short" } });
    expect(res.status()).toBe(422);
  });

  test("transactions endpoint requires auth", async ({ request }) => {
    const res = await request.get("/api/transactions");
    expect(res.status()).toBe(401);
  });
});
