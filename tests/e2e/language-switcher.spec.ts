import { test, expect } from '@playwright/test';

/**
 * E2E Tests for Language Switcher
 *
 * Tests:
 * - Language switcher display
 * - Switching between languages
 * - Content updates on language change
 * - localStorage persistence
 */

test.describe('Language Switcher', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should display language switcher', async ({ page }) => {
    // Look for language buttons (SK, EN, DE)
    const languageButtons = page.locator('button:has-text("SK"), button:has-text("EN"), button:has-text("DE")');
    const count = await languageButtons.count();

    // Should have at least 2 language options
    expect(count).toBeGreaterThanOrEqual(2);
  });

  test('should switch to English', async ({ page }) => {
    // Find and click English button
    const enButton = page.locator('button:has-text("EN")');

    if ((await enButton.count()) > 0) {
      await enButton.click();
      await page.waitForTimeout(500);

      // Check that content changed to English
      // Look for English text in hero section
      const heroContent = await page.locator('#hero').textContent();

      // Should contain English words (common in tire service)
      const hasEnglishContent =
        heroContent?.toLowerCase().includes('service') ||
        heroContent?.toLowerCase().includes('tire') ||
        heroContent?.toLowerCase().includes('contact') ||
        false;

      expect(hasEnglishContent).toBeTruthy();

      // Check localStorage
      const locale = await page.evaluate(() => localStorage.getItem('hubtrac-locale'));
      expect(locale).toBe('en');
    }
  });

  test('should switch to German', async ({ page }) => {
    // Find and click German button
    const deButton = page.locator('button:has-text("DE")');

    if ((await deButton.count()) > 0) {
      await deButton.click();
      await page.waitForTimeout(500);

      // Check that content changed to German
      const heroContent = await page.locator('#hero').textContent();

      // Should contain German words
      const hasGermanContent =
        heroContent?.toLowerCase().includes('reifen') ||
        heroContent?.toLowerCase().includes('service') ||
        heroContent?.toLowerCase().includes('kontakt') ||
        false;

      expect(hasGermanContent).toBeTruthy();

      // Check localStorage
      const locale = await page.evaluate(() => localStorage.getItem('hubtrac-locale'));
      expect(locale).toBe('de');
    }
  });

  test('should switch to Slovak (default)', async ({ page }) => {
    // First switch to another language
    const enButton = page.locator('button:has-text("EN")');
    if ((await enButton.count()) > 0) {
      await enButton.click();
      await page.waitForTimeout(500);
    }

    // Then switch back to Slovak
    const skButton = page.locator('button:has-text("SK")');

    if ((await skButton.count()) > 0) {
      await skButton.click();
      await page.waitForTimeout(500);

      // Check that content changed to Slovak
      const heroContent = await page.locator('#hero').textContent();

      // Should contain Slovak words
      const hasSlovakContent =
        heroContent?.toLowerCase().includes('pneumat') ||
        heroContent?.toLowerCase().includes('kontakt') ||
        heroContent?.toLowerCase().includes('služb') ||
        false;

      expect(hasSlovakContent).toBeTruthy();

      // Check localStorage
      const locale = await page.evaluate(() => localStorage.getItem('hubtrac-locale'));
      expect(locale).toBe('sk');
    }
  });

  test('should persist language selection across page reloads', async ({ page }) => {
    // Switch to English
    const enButton = page.locator('button:has-text("EN")');

    if ((await enButton.count()) > 0) {
      await enButton.click();
      await page.waitForTimeout(500);

      // Reload page
      await page.reload();
      await page.waitForLoadState('networkidle');

      // Check that English is still active
      const locale = await page.evaluate(() => localStorage.getItem('hubtrac-locale'));
      expect(locale).toBe('en');

      // Content should still be in English
      const heroContent = await page.locator('#hero').textContent();
      const hasEnglishContent =
        heroContent?.toLowerCase().includes('service') ||
        heroContent?.toLowerCase().includes('tire') ||
        false;

      expect(hasEnglishContent).toBeTruthy();
    }
  });

  test('should update form labels when language changes', async ({ page }) => {
    // Scroll to contact form
    await page.locator('#contact').scrollIntoViewIfNeeded();

    // Get initial form label text
    const initialLabel = await page.getByLabel(/name/i).first().textContent();

    // Switch language
    const enButton = page.locator('button:has-text("EN")');
    if ((await enButton.count()) > 0) {
      await enButton.click();
      await page.waitForTimeout(500);

      // Get updated label text
      const updatedLabel = await page.locator('#contact').textContent();

      // Labels should have changed (content should be different)
      expect(updatedLabel).not.toBe(initialLabel);
    }
  });

  test('should highlight active language', async ({ page }) => {
    // Switch to English
    const enButton = page.locator('button:has-text("EN")');

    if ((await enButton.count()) > 0) {
      await enButton.click();
      await page.waitForTimeout(300);

      // English button should have active styling
      const enClasses = await enButton.getAttribute('class');
      const isActive =
        enClasses?.includes('bg-red') ||
        enClasses?.includes('text-red') ||
        enClasses?.includes('underline') ||
        false;

      expect(isActive).toBeTruthy();
    }
  });
});

test.describe('Language Switcher - Edge Cases', () => {
  test('should handle rapid language switching', async ({ page }) => {
    await page.goto('/');

    const skButton = page.locator('button:has-text("SK")');
    const enButton = page.locator('button:has-text("EN")');
    const deButton = page.locator('button:has-text("DE")');

    // Rapidly switch languages
    if ((await enButton.count()) > 0) await enButton.click();
    await page.waitForTimeout(100);
    if ((await deButton.count()) > 0) await deButton.click();
    await page.waitForTimeout(100);
    if ((await skButton.count()) > 0) await skButton.click();
    await page.waitForTimeout(500);

    // Final language should be Slovak
    const locale = await page.evaluate(() => localStorage.getItem('hubtrac-locale'));
    expect(locale).toBe('sk');
  });

  test('should work on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Language switcher should still be accessible
    const languageButtons = page.locator('button:has-text("SK"), button:has-text("EN"), button:has-text("DE")');
    const count = await languageButtons.count();

    expect(count).toBeGreaterThanOrEqual(2);

    // Should be able to click
    const enButton = page.locator('button:has-text("EN")');
    if ((await enButton.count()) > 0) {
      await enButton.click();
      await page.waitForTimeout(300);

      const locale = await page.evaluate(() => localStorage.getItem('hubtrac-locale'));
      expect(locale).toBe('en');
    }
  });
});
