import { Page } from '@playwright/test';

/**
 * E2E Test Helpers
 */

/**
 * Dismiss cookie consent banner by setting localStorage
 * @param page - Playwright Page object
 */
export async function dismissCookieConsent(page: Page) {
  await page.goto('/');
  await page.evaluate(() => {
    localStorage.setItem('hubtrac-cookie-consent', 'accepted');
  });
  await page.goto('/');
  await page.waitForLoadState('networkidle');
}

/**
 * Navigate to homepage with cookie consent dismissed
 * @param page - Playwright Page object
 */
export async function navigateToHomepage(page: Page) {
  await dismissCookieConsent(page);
}

/**
 * Scroll to section smoothly
 * @param page - Playwright Page object
 * @param sectionId - Section ID (e.g., 'contact', 'products')
 */
export async function scrollToSection(page: Page, sectionId: string) {
  await page.locator(`#${sectionId}`).scrollIntoViewIfNeeded();
  await page.waitForTimeout(500); // Wait for smooth scroll animation
}
