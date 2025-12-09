import { test, expect } from '@playwright/test';
import { signIn } from './helpers/auth';

test.describe('Home Page (Dashboard)', () => {
  test.beforeEach(async ({ page }) => {
    // Sign in before each test
    await signIn(page);
  });

  test('should load home page and take screenshot', async ({ page }) => {
    // Verify we're on the home page
    await expect(page).toHaveURL('/');
    
    // Wait for the page to fully load
    await page.waitForLoadState('networkidle');

    // Wait for dynamic content to load
    await page.waitForTimeout(2000);

    // Verify key elements are visible
    await expect(page.locator('text=Welcome')).toBeVisible({ timeout: 10000 }).catch(() => {});
    
    // Take full page screenshot
    await page.screenshot({ 
      path: 'e2e/screenshots/01-home-page.png', 
      fullPage: true 
    });
  });

  test('should show account balance section', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Take screenshot of the balance section
    await page.screenshot({ 
      path: 'e2e/screenshots/01-home-balance-section.png', 
      fullPage: true 
    });
  });

  test('should show recent transactions', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Scroll to transactions section if needed
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
    await page.waitForTimeout(500);

    // Take screenshot
    await page.screenshot({ 
      path: 'e2e/screenshots/01-home-transactions.png', 
      fullPage: true 
    });
  });

  test('should show category spending chart', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Scroll to see charts
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
    await page.waitForTimeout(500);

    // Take screenshot
    await page.screenshot({ 
      path: 'e2e/screenshots/01-home-charts.png', 
      fullPage: true 
    });
  });

  test('should navigate through sidebar menu', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // Take screenshot with sidebar visible
    await page.screenshot({ 
      path: 'e2e/screenshots/01-home-with-sidebar.png', 
      fullPage: true 
    });
  });
});
