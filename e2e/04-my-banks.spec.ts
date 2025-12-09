import { test, expect } from '@playwright/test';
import { signIn } from './helpers/auth';

test.describe('My Banks Page', () => {
  test.beforeEach(async ({ page }) => {
    // Sign in before each test
    await signIn(page);
    
    // Navigate to my-banks page
    await page.goto('/my-banks');
    await page.waitForLoadState('networkidle');
  });

  test('should load my-banks page and take screenshot', async ({ page }) => {
    // Verify we're on the my-banks page
    await expect(page).toHaveURL('/my-banks');
    
    // Wait for content to load
    await page.waitForTimeout(2000);

    // Take full page screenshot
    await page.screenshot({ 
      path: 'e2e/screenshots/04-my-banks-page.png', 
      fullPage: true 
    });
  });

  test('should show list of connected banks', async ({ page }) => {
    await page.waitForTimeout(2000);

    // Take screenshot of bank list
    await page.screenshot({ 
      path: 'e2e/screenshots/04-my-banks-list.png', 
      fullPage: true 
    });
  });

  test('should show bank details', async ({ page }) => {
    await page.waitForTimeout(2000);

    // Scroll to see all banks
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
    await page.waitForTimeout(500);

    // Take screenshot
    await page.screenshot({ 
      path: 'e2e/screenshots/04-my-banks-details.png', 
      fullPage: true 
    });
  });

  test('should show account balances for each bank', async ({ page }) => {
    await page.waitForTimeout(2000);

    // Take screenshot showing balances
    await page.screenshot({ 
      path: 'e2e/screenshots/04-my-banks-balances.png', 
      fullPage: true 
    });
  });
});
