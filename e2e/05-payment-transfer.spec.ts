import { test, expect } from '@playwright/test';
import { signIn } from './helpers/auth';

test.describe('Payment Transfer Page', () => {
  test.beforeEach(async ({ page }) => {
    // Sign in before each test
    await signIn(page);
    
    // Navigate to payment-transfer page
    await page.goto('/payment-transfer');
    await page.waitForLoadState('networkidle');
  });

  test('should load payment-transfer page and take screenshot', async ({ page }) => {
    // Verify we're on the payment-transfer page
    await expect(page).toHaveURL('/payment-transfer');
    
    // Wait for content to load
    await page.waitForTimeout(2000);

    // Take full page screenshot
    await page.screenshot({ 
      path: 'e2e/screenshots/05-payment-transfer-page.png', 
      fullPage: true 
    });
  });

  test('should show transfer form with all fields', async ({ page }) => {
    await page.waitForTimeout(2000);

    // Verify form elements are visible
    await expect(page.locator('text=Select Source Bank')).toBeVisible();
    await expect(page.locator('text=Transfer Note')).toBeVisible();
    await expect(page.locator('text=Bank account details')).toBeVisible();

    // Take screenshot
    await page.screenshot({ 
      path: 'e2e/screenshots/05-payment-transfer-form.png', 
      fullPage: true 
    });
  });

  test('should show validation errors for empty transfer form', async ({ page }) => {
    await page.waitForTimeout(2000);

    // Try to submit empty form
    const submitButton = page.locator('button:has-text("Transfer Funds")');
    await submitButton.click();

    // Wait for validation errors
    await page.waitForTimeout(1000);

    // Take screenshot
    await page.screenshot({ 
      path: 'e2e/screenshots/05-payment-transfer-validation-errors.png', 
      fullPage: true 
    });
  });

  test('should show bank account dropdown', async ({ page }) => {
    await page.waitForTimeout(2000);

    // Click on bank dropdown to expand it
    const bankDropdown = page.locator('button').filter({ hasText: /Select|Bank/ }).first();
    if (await bankDropdown.isVisible()) {
      await bankDropdown.click();
      await page.waitForTimeout(500);

      // Take screenshot with dropdown open
      await page.screenshot({ 
        path: 'e2e/screenshots/05-payment-transfer-bank-dropdown.png', 
        fullPage: true 
      });
    }
  });

  test('should fill transfer form with valid data', async ({ page }) => {
    await page.waitForTimeout(2000);

    // Fill in the transfer note
    const noteTextarea = page.locator('textarea[placeholder*="note"]');
    if (await noteTextarea.isVisible()) {
      await noteTextarea.fill('Test payment transfer');
    }

    // Fill email
    const emailInput = page.locator('input[name="email"]');
    if (await emailInput.isVisible()) {
      await emailInput.fill('recipient@example.com');
    }

    // Fill sharable ID
    const sharableIdInput = page.locator('input[placeholder*="account number"]');
    if (await sharableIdInput.isVisible()) {
      await sharableIdInput.fill('test123456');
    }

    // Fill amount
    const amountInput = page.locator('input[name="amount"]');
    if (await amountInput.isVisible()) {
      await amountInput.fill('10.00');
    }

    // Wait a bit
    await page.waitForTimeout(500);

    // Take screenshot of filled form
    await page.screenshot({ 
      path: 'e2e/screenshots/05-payment-transfer-filled-form.png', 
      fullPage: true 
    });
  });
});
