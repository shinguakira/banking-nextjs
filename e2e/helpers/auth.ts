import { Page } from '@playwright/test';

/**
 * Helper function to sign in a user
 * Uses the demo credentials from README
 */
export async function signIn(page: Page): Promise<void> {
  // Navigate to sign-in page
  await page.goto('/sign-in');
  await page.waitForLoadState('networkidle');

  // Fill in the demo credentials
  await page.fill('input[name="email"]', 'demo@banking.com');
  await page.fill('input[name="password"]', 'demo123456');

  // Click submit
  const submitButton = page.locator('button:has-text("Sign In")');
  await submitButton.click();

  // Wait for navigation to home page
  await page.waitForURL('/', { timeout: 10000 });
}
