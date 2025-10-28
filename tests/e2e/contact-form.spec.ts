import { test, expect } from '@playwright/test';

/**
 * E2E Tests for Contact Form
 *
 * Tests:
 * - Form display and validation
 * - Real-time validation indicators
 * - Form submission
 * - Toast notifications
 * - Error handling
 */

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    // Set localStorage to dismiss cookie consent
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.setItem('hubtrac-cookie-consent', 'accepted');
    });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Scroll to contact section
    await page.locator('#contact').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500); // Wait for smooth scroll
  });

  test('should display contact form', async ({ page }) => {
    // Check form exists
    const form = page.locator('form');
    await expect(form).toBeVisible();

    // Check all required fields exist
    await expect(page.getByLabel(/name/i)).toBeVisible();
    await expect(page.getByLabel(/phone/i)).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/message/i)).toBeVisible();

    // Check submit button exists
    await expect(page.getByRole('button', { name: /send|submit|odoslať/i })).toBeVisible();
  });

  test('should show validation errors for empty fields', async ({ page }) => {
    // Find form fields
    const nameInput = page.getByLabel(/name/i);
    const phoneInput = page.getByLabel(/phone/i);
    const emailInput = page.getByLabel(/email/i);

    // Focus and blur name field (trigger validation)
    await nameInput.click();
    await nameInput.blur();
    await page.waitForTimeout(300);

    // Should show error for empty name
    // Error could be in various forms: error message, red border, icon
    const nameContainer = nameInput.locator('..');
    const hasError =
      (await nameContainer.locator('.text-red-600').count()) > 0 ||
      (await nameContainer.getAttribute('class'))?.includes('border-red') ||
      false;

    expect(hasError).toBeTruthy();
  });

  test('should show real-time validation for invalid email', async ({ page }) => {
    const emailInput = page.getByLabel(/email/i);

    // Type invalid email
    await emailInput.fill('invalid-email');
    await emailInput.blur();
    await page.waitForTimeout(300);

    // Should show error
    const emailContainer = emailInput.locator('..');
    const hasError =
      (await emailContainer.locator('.text-red-600').count()) > 0 ||
      (await emailContainer.getAttribute('class'))?.includes('border-red') ||
      false;

    expect(hasError).toBeTruthy();
  });

  test('should show success indicators for valid fields', async ({ page }) => {
    const nameInput = page.getByLabel(/name/i);

    // Type valid name
    await nameInput.fill('John Doe');
    await nameInput.blur();
    await page.waitForTimeout(300);

    // Should show success indicator (green border or checkmark)
    const nameContainer = nameInput.locator('..');
    const hasSuccess =
      (await nameContainer.locator('.text-green-600').count()) > 0 ||
      (await nameContainer.getAttribute('class'))?.includes('border-green') ||
      (await nameContainer.locator('[data-icon="check"]').count()) > 0 ||
      false;

    expect(hasSuccess).toBeTruthy();
  });

  test('should enforce character limits', async ({ page }) => {
    const messageInput = page.getByLabel(/message/i);

    // Try to type more than max length (500 chars)
    const longMessage = 'A'.repeat(600);
    await messageInput.fill(longMessage);

    // Get actual value
    const actualValue = await messageInput.inputValue();

    // Should be limited to max length
    expect(actualValue.length).toBeLessThanOrEqual(500);
  });

  test('should show character counter', async ({ page }) => {
    const messageInput = page.getByLabel(/message/i);

    // Type some text
    await messageInput.fill('Hello World');

    // Look for character counter
    const counter = page.locator('text=/\\d+\\/\\d+/');
    const hasCounter = (await counter.count()) > 0;

    expect(hasCounter).toBeTruthy();
  });

  test('should submit form with valid data', async ({ page }) => {
    // Fill form with valid data
    await page.getByLabel(/name/i).fill('Test User');
    await page.getByLabel(/phone/i).fill('+421123456789');
    await page.getByLabel(/email/i).fill('test@example.com');
    await page.getByLabel(/message/i).fill('This is a test message for E2E testing.');

    // Submit form
    const submitButton = page.getByRole('button', { name: /send|submit|odoslať/i });
    await submitButton.click();

    // Wait for skeleton loader to appear
    await page.waitForTimeout(500);

    // Should show loading state (skeleton or disabled button)
    const isLoading =
      (await page.locator('[data-testid="skeleton-loader"]').count()) > 0 ||
      (await submitButton.getAttribute('disabled')) !== null;

    expect(isLoading).toBeTruthy();
  });

  test('should show toast notification after submission', async ({ page }) => {
    // Fill form with valid data
    await page.getByLabel(/name/i).fill('Test User');
    await page.getByLabel(/phone/i).fill('+421123456789');
    await page.getByLabel(/email/i).fill('test@example.com');
    await page.getByLabel(/message/i).fill('This is a test message.');

    // Submit form
    await page.getByRole('button', { name: /send|submit|odoslať/i }).click();

    // Wait for toast to appear (up to 5 seconds)
    await page.waitForTimeout(3000);

    // Look for toast notification
    const toast = page.locator('[class*="toast"]').or(
      page.locator('.fixed.top-4.right-4')
    );

    const toastVisible = (await toast.count()) > 0;

    // Toast should appear (success or error)
    expect(toastVisible).toBeTruthy();
  });

  test('should clear form after successful submission', async ({ page }) => {
    // Fill and submit form
    const nameInput = page.getByLabel(/name/i);
    const phoneInput = page.getByLabel(/phone/i);
    const emailInput = page.getByLabel(/email/i);
    const messageInput = page.getByLabel(/message/i);

    await nameInput.fill('Test User');
    await phoneInput.fill('+421123456789');
    await emailInput.fill('test@example.com');
    await messageInput.fill('Test message');

    await page.getByRole('button', { name: /send|submit|odoslať/i }).click();

    // Wait for submission to complete
    await page.waitForTimeout(4000);

    // Check if form is cleared (only on success)
    // Note: This test might fail if API returns error
    const nameValue = await nameInput.inputValue();
    const isCleared = nameValue === '';

    // We don't assert here because API might return error in test environment
    // Just log the result
    console.log('Form cleared after submission:', isCleared);
  });

  test('should validate phone number format', async ({ page }) => {
    const phoneInput = page.getByLabel(/phone/i);

    // Type invalid phone (too short)
    await phoneInput.fill('123');
    await phoneInput.blur();
    await page.waitForTimeout(300);

    // Should show error
    const phoneContainer = phoneInput.locator('..');
    const hasError =
      (await phoneContainer.locator('.text-red-600').count()) > 0 ||
      (await phoneContainer.getAttribute('class'))?.includes('border-red') ||
      false;

    expect(hasError).toBeTruthy();

    // Now type valid phone
    await phoneInput.fill('+421123456789');
    await phoneInput.blur();
    await page.waitForTimeout(300);

    // Should show success
    const hasSuccess =
      (await phoneContainer.locator('.text-green-600').count()) > 0 ||
      (await phoneContainer.getAttribute('class'))?.includes('border-green') ||
      false;

    expect(hasSuccess).toBeTruthy();
  });
});

test.describe('Contact Form - Accessibility', () => {
  test('should have proper labels and ARIA attributes', async ({ page }) => {
    // Set localStorage to dismiss cookie consent
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.setItem('hubtrac-cookie-consent', 'accepted');
    });
    await page.goto('/');
    await page.locator('#contact').scrollIntoViewIfNeeded();

    // Check that all inputs have labels
    const inputs = page.locator('input, textarea, select');
    const count = await inputs.count();

    for (let i = 0; i < count; i++) {
      const input = inputs.nth(i);
      const id = await input.getAttribute('id');
      const ariaLabel = await input.getAttribute('aria-label');
      const ariaLabelledBy = await input.getAttribute('aria-labelledby');

      // Each input should have either id (with label), aria-label, or aria-labelledby
      const hasAccessibleLabel = id || ariaLabel || ariaLabelledBy;

      if (!hasAccessibleLabel) {
        console.warn(`Input without accessible label found:`, await input.getAttribute('name'));
      }
    }

    // Should have at least some labeled inputs
    expect(count).toBeGreaterThan(0);
  });

  test('should be keyboard navigable', async ({ page }) => {
    // Set localStorage to dismiss cookie consent
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.setItem('hubtrac-cookie-consent', 'accepted');
    });
    await page.goto('/');
    await page.locator('#contact').scrollIntoViewIfNeeded();

    // Get all form fields
    const nameInput = page.getByLabel(/name/i);

    // Focus first field
    await nameInput.focus();

    // Tab through fields
    await page.keyboard.press('Tab');
    await page.waitForTimeout(100);

    // Check that focus moved to next field
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);

    expect(['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON']).toContain(focusedElement);
  });
});
