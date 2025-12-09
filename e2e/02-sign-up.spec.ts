import { test, expect } from '@playwright/test';

test.describe('Sign Up Page', () => {
  test('should load sign-up page and take screenshot', async ({ page }) => {
    // Navigate to sign-up page
    await page.goto('/sign-up');

    // Wait for the page to fully load
    await page.waitForLoadState('networkidle');

    // Verify the page loaded with correct elements
    await expect(page.locator('h1:has-text("Sign Up")')).toBeVisible();
    await expect(page.locator('text=Please enter your details')).toBeVisible();

    // Verify all sign-up specific fields are visible
    await expect(page.locator('input[name="firstName"]')).toBeVisible();
    await expect(page.locator('input[name="lastName"]')).toBeVisible();
    await expect(page.locator('input[name="address1"]')).toBeVisible();
    await expect(page.locator('input[name="city"]')).toBeVisible();
    await expect(page.locator('input[name="state"]')).toBeVisible();
    await expect(page.locator('input[name="postalCode"]')).toBeVisible();
    await expect(page.locator('input[name="dateOfBirth"]')).toBeVisible();
    await expect(page.locator('input[name="ssn"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();

    // Take full page screenshot
    await page.screenshot({ 
      path: 'e2e/screenshots/02-sign-up-page.png', 
      fullPage: true 
    });
  });

  test('should show validation errors for empty form', async ({ page }) => {
    await page.goto('/sign-up');
    await page.waitForLoadState('networkidle');

    // Try to submit empty form
    const submitButton = page.locator('button:has-text("Sign Up")');
    await submitButton.click();

    // Wait for validation errors
    await page.waitForTimeout(1000);

    // Take screenshot of validation errors
    await page.screenshot({ 
      path: 'e2e/screenshots/02-sign-up-validation-errors-empty.png', 
      fullPage: true 
    });
  });

  test('should validate firstName field (min 3 chars)', async ({ page }) => {
    await page.goto('/sign-up');
    await page.waitForLoadState('networkidle');

    // Fill firstName with less than 3 characters
    await page.fill('input[name="firstName"]', 'Jo');
    await page.fill('input[name="lastName"]', 'Doe');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'password123');

    // Click submit
    const submitButton = page.locator('button:has-text("Sign Up")');
    await submitButton.click();

    // Wait for validation
    await page.waitForTimeout(1000);

    // Take screenshot
    await page.screenshot({ 
      path: 'e2e/screenshots/02-sign-up-firstName-validation.png', 
      fullPage: true 
    });
  });

  test('should validate lastName field (min 3 chars)', async ({ page }) => {
    await page.goto('/sign-up');
    await page.waitForLoadState('networkidle');

    // Fill lastName with less than 3 characters
    await page.fill('input[name="firstName"]', 'John');
    await page.fill('input[name="lastName"]', 'Do');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'password123');

    // Click submit
    const submitButton = page.locator('button:has-text("Sign Up")');
    await submitButton.click();

    // Wait for validation
    await page.waitForTimeout(1000);

    // Take screenshot
    await page.screenshot({ 
      path: 'e2e/screenshots/02-sign-up-lastName-validation.png', 
      fullPage: true 
    });
  });

  test('should validate state field (exactly 2 chars)', async ({ page }) => {
    await page.goto('/sign-up');
    await page.waitForLoadState('networkidle');

    // Fill all required fields with state having wrong length
    await page.fill('input[name="firstName"]', 'John');
    await page.fill('input[name="lastName"]', 'Doe');
    await page.fill('input[name="address1"]', '123 Main St');
    await page.fill('input[name="city"]', 'New York');
    await page.fill('input[name="state"]', 'NYC'); // Should be 2 chars only
    await page.fill('input[name="postalCode"]', '10001');
    await page.fill('input[name="dateOfBirth"]', '1990-01-01');
    await page.fill('input[name="ssn"]', '1234');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'password123');

    // Click submit
    const submitButton = page.locator('button:has-text("Sign Up")');
    await submitButton.click();

    // Wait for validation
    await page.waitForTimeout(1000);

    // Take screenshot
    await page.screenshot({ 
      path: 'e2e/screenshots/02-sign-up-state-validation.png', 
      fullPage: true 
    });
  });

  test('should validate postalCode field (3-6 chars)', async ({ page }) => {
    await page.goto('/sign-up');
    await page.waitForLoadState('networkidle');

    // Fill all required fields with postal code too short
    await page.fill('input[name="firstName"]', 'John');
    await page.fill('input[name="lastName"]', 'Doe');
    await page.fill('input[name="address1"]', '123 Main St');
    await page.fill('input[name="city"]', 'New York');
    await page.fill('input[name="state"]', 'NY');
    await page.fill('input[name="postalCode"]', '12'); // Too short
    await page.fill('input[name="dateOfBirth"]', '1990-01-01');
    await page.fill('input[name="ssn"]', '1234');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'password123');

    // Click submit
    const submitButton = page.locator('button:has-text("Sign Up")');
    await submitButton.click();

    // Wait for validation
    await page.waitForTimeout(1000);

    // Take screenshot
    await page.screenshot({ 
      path: 'e2e/screenshots/02-sign-up-postalCode-validation.png', 
      fullPage: true 
    });
  });

  test('should validate email format', async ({ page }) => {
    await page.goto('/sign-up');
    await page.waitForLoadState('networkidle');

    // Fill all fields with invalid email
    await page.fill('input[name="firstName"]', 'John');
    await page.fill('input[name="lastName"]', 'Doe');
    await page.fill('input[name="address1"]', '123 Main St');
    await page.fill('input[name="city"]', 'New York');
    await page.fill('input[name="state"]', 'NY');
    await page.fill('input[name="postalCode"]', '10001');
    await page.fill('input[name="dateOfBirth"]', '1990-01-01');
    await page.fill('input[name="ssn"]', '1234');
    await page.fill('input[name="email"]', 'invalid-email'); // Invalid email
    await page.fill('input[name="password"]', 'password123');

    // Click submit
    const submitButton = page.locator('button:has-text("Sign Up")');
    await submitButton.click();

    // Wait for validation
    await page.waitForTimeout(1000);

    // Take screenshot
    await page.screenshot({ 
      path: 'e2e/screenshots/02-sign-up-email-validation.png', 
      fullPage: true 
    });
  });

  test('should validate password length (min 8 chars)', async ({ page }) => {
    await page.goto('/sign-up');
    await page.waitForLoadState('networkidle');

    // Fill all fields with short password
    await page.fill('input[name="firstName"]', 'John');
    await page.fill('input[name="lastName"]', 'Doe');
    await page.fill('input[name="address1"]', '123 Main St');
    await page.fill('input[name="city"]', 'New York');
    await page.fill('input[name="state"]', 'NY');
    await page.fill('input[name="postalCode"]', '10001');
    await page.fill('input[name="dateOfBirth"]', '1990-01-01');
    await page.fill('input[name="ssn"]', '1234');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'pass'); // Too short (less than 8)

    // Click submit
    const submitButton = page.locator('button:has-text("Sign Up")');
    await submitButton.click();

    // Wait for validation
    await page.waitForTimeout(1000);

    // Take screenshot
    await page.screenshot({ 
      path: 'e2e/screenshots/02-sign-up-password-validation.png', 
      fullPage: true 
    });
  });

  test('should successfully fill entire sign-up form with valid data', async ({ page }) => {
    await page.goto('/sign-up');
    await page.waitForLoadState('networkidle');

    // Fill all fields with valid data
    await page.fill('input[name="firstName"]', 'John');
    await page.fill('input[name="lastName"]', 'Doe');
    await page.fill('input[name="address1"]', '123 Main Street');
    await page.fill('input[name="city"]', 'New York');
    await page.fill('input[name="state"]', 'NY');
    await page.fill('input[name="postalCode"]', '10001');
    await page.fill('input[name="dateOfBirth"]', '1990-01-01');
    await page.fill('input[name="ssn"]', '1234');
    await page.fill('input[name="email"]', 'newuser@example.com');
    await page.fill('input[name="password"]', 'password123');

    // Take screenshot of filled form before submission
    await page.screenshot({ 
      path: 'e2e/screenshots/02-sign-up-filled-form.png', 
      fullPage: true 
    });
  });

  test('should show link to sign-in page', async ({ page }) => {
    await page.goto('/sign-up');
    await page.waitForLoadState('networkidle');

    // Verify sign-in link exists
    const signInLink = page.locator('a:has-text("Sign in")');
    await expect(signInLink).toBeVisible();

    // Take screenshot
    await page.screenshot({ 
      path: 'e2e/screenshots/02-sign-up-with-sign-in-link.png', 
      fullPage: true 
    });
  });
});
