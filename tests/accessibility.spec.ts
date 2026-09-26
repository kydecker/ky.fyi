import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const paths = [
  "/",
  "/about",
  "/arrangements",
  "/colophon",
  "/guestbook",
  "/now",
  "/posts",
  "/projects",
  "/resume",
  "/webrings",
  "/404",
];

test.describe("all pages", () => {
  for (const path of paths) {
    test(`${path} page should not have any automatically detectable accessibility issues`, async ({
      page,
    }, testInfo) => {
      await page.goto(path);

      const accessibilityScanResults = await new AxeBuilder({
        page,
      }).analyze();

      await testInfo.attach("accessibility-scan-results", {
        body: JSON.stringify(accessibilityScanResults, null, 2),
        contentType: "application/json",
      });

      expect(accessibilityScanResults.violations).toHaveLength(0);
    });
  }
});
