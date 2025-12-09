import { test, expect } from '@playwright/test';

test.describe('Sign In Page', () => {
  test('should load sign-in page and take screenshot', async ({ page }) => {
    // Navigate to sign-in page
    await page.goto('/sign-in');

    // Wait for the page to fully load
    await page.waitForLoadState('networkidle');

    // Verify the page loaded with correct elements
    await expect(page.locator('h1:has-text("Sign In")')).toBeVisible();
    await expect(page.locator('text=Please enter your details')).toBeVisible();

    // Take full page screenshot
    await page.screenshot({ 
      path: 'e2e/screenshots/01-sign-in-page.png', 
      fullPage: true 
    });
  });

  test('should show validation errors for empty form', async ({ page }) => {
    await page.goto('/sign-in');
    await page.waitForLoadState('networkidle');

    // Try to submit empty form
    const submitButton = page.locator('button:has-text("Sign In")');
    await submitButton.click();

    // Wait for validation errors
    await page.waitForTimeout(1000);

    // Take screenshot of validation errors
    await page.screenshot({ 
      path: 'e2e/screenshots/01-sign-in-validation-errors.png', 
      fullPage: true 
    });
  });

  test('should show validation error for invalid email', async ({ page }) => {
    await page.goto('/sign-in');
    await page.waitForLoadState('networkidle');

    // Fill in invalid email
    await page.fill('input[name="email"]', 'invalid-email');
    await page.fill('input[name="password"]', 'short');

    // Click submit
    const submitButton = page.locator('button:has-text("Sign In")');
    await submitButton.click();

    // Wait for validation
    await page.waitForTimeout(1000);

    // Take screenshot
    await page.screenshot({ 
      path: 'e2e/screenshots/01-sign-in-invalid-email.png', 
      fullPage: true 
    });
  });

  test('should show validation error for short password', async ({ page }) => {
    await page.goto('/sign-in');
    await page.waitForLoadState('networkidle');

    // Fill in valid email but short password
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'short');

    // Click submit
    const submitButton = page.locator('button:has-text("Sign In")');
    await submitButton.click();

    // Wait for validation
    await page.waitForTimeout(1000);

    // Take screenshot
    await page.screenshot({ 
      path: 'e2e/screenshots/01-sign-in-short-password.png', 
      fullPage: true 
    });
  });

  test('should successfully sign in with valid credentials', async ({ page }) => {
    await page.goto('/sign-in');
    await page.waitForLoadState('networkidle');

    // Fill in the demo credentials from README
    await page.fill('input[name="email"]', 'demo@banking.com');
    await page.fill('input[name="password"]', 'demo123456');

    // Take screenshot before submit
    await page.screenshot({ 
      path: 'e2e/screenshots/01-sign-in-filled-form.png', 
      fullPage: true 
    });

    // Click submit
    const submitButton = page.locator('button:has-text("Sign In")');
    await submitButton.click();

    // Wait for navigation to home page
    await page.waitForURL('/', { timeout: 10000 });

    // Verify we're on the home page
    await expect(page).toHaveURL('/');

    // Take screenshot of successful redirect
    await page.screenshot({ 
      path: 'e2e/screenshots/01-sign-in-success-redirect.png', 
      fullPage: true 
    });
  });
});
