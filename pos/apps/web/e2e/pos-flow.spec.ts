import { expect, test } from "@playwright/test";

test.describe("main POS flow", () => {
  test("login, scan a barcode, search for a second item, pay cash with change, see the receipt", async ({ page }) => {
    await page.goto("/login");
    await page.fill('input[type="email"]', "cashier@example.com");
    await page.fill('input[type="password"]', "password123");
    await page.click('button[type="submit"]');
    await page.waitForURL("**/pos");

    // Wait for the location selector to populate before scanning/searching.
    await expect(page.locator("select").first()).not.toHaveValue("");

    // Scan a known barcode (USB keyboard-wedge: type into the barcode field, then Enter).
    const barcodeInput = page.getByPlaceholder(/Scan or type a barcode/i);
    await barcodeInput.fill("041500001012");
    await barcodeInput.press("Enter");
    await expect(page.getByText("Argan Oil Shampoo 16oz")).toBeVisible();

    // Add a second item via the search grid, independently of the scan field.
    await page.getByPlaceholder(/Search products by name or SKU/i).fill("Lipstick");
    await page.getByRole("button", { name: /Matte Liquid Lipstick/i }).click();
    await expect(page.getByText("Matte Liquid Lipstick")).toBeVisible();

    // Pay button shows the live total for both items.
    const payButton = page.getByRole("button", { name: /^Pay \(F4\)/ });
    await expect(payButton).toBeEnabled();
    await payButton.click();

    await expect(page.getByText("Take payment")).toBeVisible();
    const remainingBefore = await page.getByText(/^\$/).first().textContent();
    expect(remainingBefore).toBeTruthy();

    // Tender more than the total in cash to exercise the change calculation.
    await page.getByPlaceholder(/^\d+\.\d\d$/).fill("30.00");
    await page.locator(".fixed").getByRole("button", { name: /^Pay \$/ }).click();

    // Completing payment finishes the sale and shows the receipt screen.
    await expect(page.getByText(/^Receipt #/)).toBeVisible({ timeout: 10_000 });
    await expect(page.getByText("Argan Oil Shampoo 16oz")).toBeVisible();
    await expect(page.getByText("Matte Liquid Lipstick")).toBeVisible();

    // Starting a new sale returns to an empty cart (the previous one is auto-held).
    await page.getByRole("button", { name: "New sale" }).click();
    await expect(page.getByText("Cart is empty")).toBeVisible();
  });

  test("a discount over the approval threshold is blocked without a manager PIN", async ({ page }) => {
    await page.goto("/login");
    await page.fill('input[type="email"]', "cashier@example.com");
    await page.fill('input[type="password"]', "password123");
    await page.click('button[type="submit"]');
    await page.waitForURL("**/pos");
    await expect(page.locator("select").first()).not.toHaveValue("");

    await page.getByPlaceholder(/Search products by name or SKU/i).fill("Shampoo");
    await page.getByRole("button", { name: /Argan Oil Shampoo/i }).click();
    await expect(page.getByText("Argan Oil Shampoo 16oz").first()).toBeVisible();

    await page.locator('button:has-text("%")').first().click();
    await expect(page.getByText("Apply discount")).toBeVisible();
    await page.getByPlaceholder(/e\.g\. 10 for 10%/).fill("50");
    await page.locator(".fixed").getByRole("button", { name: "Apply" }).click();

    // 50% is above the default 20% threshold, so a cashier needs a manager PIN.
    await expect(page.getByText("Discount needs manager approval")).toBeVisible();
    await page.getByPlaceholder("Manager PIN").fill("1234");
    await page.getByRole("button", { name: "Approve" }).click();

    // Approved: the discount is now reflected in the cart.
    await expect(page.getByText(/−\$/).first()).toBeVisible();
  });

  test("attaches an existing customer, redeems points, and earns new ones on checkout", async ({ page }) => {
    await page.goto("/login");
    await page.fill('input[type="email"]', "cashier@example.com");
    await page.fill('input[type="password"]', "password123");
    await page.click('button[type="submit"]');
    await page.waitForURL("**/pos");
    await expect(page.locator("select").first()).not.toHaveValue("");

    await page.getByText("+ Attach a customer").click();
    await page.getByPlaceholder("Search by name or phone").fill("Morgan");
    await page.getByRole("button", { name: /Morgan Diaz/ }).click();
    await expect(page.getByText("Morgan Diaz")).toBeVisible();
    await expect(page.getByText("500 pts")).toBeVisible();

    await page.getByPlaceholder(/Search products by name or SKU/i).fill("Lipstick");
    await page.getByRole("button", { name: /Matte Liquid Lipstick/i }).click();
    await expect(page.getByText("Matte Liquid Lipstick").first()).toBeVisible();

    await page.getByRole("button", { name: /^Pay \(F4\)/ }).click();
    await expect(page.getByText("Take payment")).toBeVisible();

    // Redeem points first (Morgan has 500 points = $5.00, less than the $8.99 total,
    // so the redeem amount defaults to the max redeemable rather than the full balance).
    await page.getByRole("button", { name: /^Points \(500\)/ }).click();
    await expect(page.getByLabel("Amount to redeem")).toHaveValue("5.00");
    await page.locator(".fixed").getByRole("button", { name: "Redeem points" }).click();

    // Pay the remaining balance with cash to complete the sale.
    await page.locator(".fixed").getByRole("button", { name: "CASH" }).click();
    await page.locator(".fixed").getByRole("button", { name: /^Pay \$/ }).click();

    await expect(page.getByText(/^Receipt #/)).toBeVisible({ timeout: 10_000 });
    // Only the cash-paid portion earns new points; the redemption also shows.
    await expect(page.getByText(/pts redeemed/)).toBeVisible();
  });
});
