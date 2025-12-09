import { test, expect } from '@playwright/test';
import { signIn } from './helpers/auth';

test.describe('Transaction History Page', () => {
  test.beforeEach(async ({ page }) => {
    // Sign in before each test
    await signIn(page);
    
    // Navigate to transaction-history page
    await page.goto('/transaction-history');
    await page.waitForLoadState('networkidle');
  });

  test('should load transaction-history page and take screenshot', async ({ page }) => {
    // Verify we're on the transaction-history page
    await expect(page).toHaveURL('/transaction-history');
    
    // Wait for content to load
    await page.waitForTimeout(2000);

    // Take full page screenshot
    await page.screenshot({ 
      path: 'e2e/screenshots/06-transaction-history-page.png', 
      fullPage: true 
    });
  });

  test('should show transaction list', async ({ page }) => {
    await page.waitForTimeout(2000);

    // Take screenshot of transaction list
    await page.screenshot({ 
      path: 'e2e/screenshots/06-transaction-history-list.png', 
      fullPage: true 
    });
  });

  test('should show bank account selector', async ({ page }) => {
    await page.waitForTimeout(2000);

    // Try to find and click bank selector if it exists
    const bankSelector = page.locator('button').filter({ hasText: /Select|Bank/ }).first();
    if (await bankSelector.isVisible()) {
      await bankSelector.click();
      await page.waitForTimeout(500);

      // Take screenshot with dropdown
      await page.screenshot({ 
        path: 'e2e/screenshots/06-transaction-history-bank-selector.png', 
        fullPage: true 
      });
    } else {
      // Take regular screenshot
      await page.screenshot({ 
        path: 'e2e/screenshots/06-transaction-history-bank-selector.png', 
        fullPage: true 
      });
    }
  });

  test('should show transaction details', async ({ page }) => {
    await page.waitForTimeout(2000);

    // Scroll to see more transactions
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
    await page.waitForTimeout(500);

    // Take screenshot
    await page.screenshot({ 
      path: 'e2e/screenshots/06-transaction-history-details.png', 
      fullPage: true 
    });
  });

  test('should show pagination if available', async ({ page }) => {
    await page.waitForTimeout(2000);

    // Scroll to bottom to see pagination
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    // Take screenshot
    await page.screenshot({ 
      path: 'e2e/screenshots/06-transaction-history-pagination.png', 
      fullPage: true 
    });
  });

  test('should navigate to next page if pagination exists', async ({ page }) => {
    await page.waitForTimeout(2000);

    // Look for next button
    const nextButton = page.locator('button:has-text("Next")');
    if (await nextButton.isVisible() && await nextButton.isEnabled()) {
      await nextButton.click();
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000);

      // Take screenshot of page 2
      await page.screenshot({ 
        path: 'e2e/screenshots/06-transaction-history-page-2.png', 
        fullPage: true 
      });
    }
  });
});
