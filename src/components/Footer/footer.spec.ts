import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("includes correct social links", async ({ page }) => {
  const githubLink = page.getByRole("link", { name: "Github" });
  const linkedInLink = page.getByRole("link", { name: "LinkedIn" });

  await expect(githubLink).toHaveAttribute(
    "href",
    "https://github.com/kydecker",
  );
  await expect(linkedInLink).toHaveAttribute(
    "href",
    "https://linkedin.com/in/kyfyi",
  );
});
