import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const routes = ["/", "/features", "/pricing", "/about", "/contact", "/security", "/integrations", "/blog", "/docs", "/privacy", "/terms", "/login", "/register"];

for (const route of routes) {
  test(`@a11y ${route} has no critical axe violations`, async ({ page }: { page: Page }) => {
    await page.goto(route);
    // Cast bridges minor type drift between @playwright/test and the version axe ships against.
    const results = await new AxeBuilder({ page: page as never }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
    const critical = results.violations.filter((v) => v.impact === "critical" || v.impact === "serious");
    expect(critical, JSON.stringify(critical, null, 2)).toEqual([]);
  });
}
