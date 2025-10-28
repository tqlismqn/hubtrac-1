import { test, expect } from '@playwright/test';

/**
 * E2E Tests for Homepage
 *
 * Tests critical user flows:
 * - Page loads correctly
 * - All sections are visible
 * - Navigation works
 * - Responsive design
 */

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    // Set localStorage to dismiss cookie consent
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.setItem('hubtrac-cookie-consent', 'accepted');
    });

    // Reload page with cookie consent dismissed
    await page.goto('/');

    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');
  });

  test('should load successfully', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/HUBTRAC Mobile Tire Service/i);

    // Check no console errors
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    // Wait a bit to catch any errors
    await page.waitForTimeout(2000);

    // Allow only expected errors (like 404s for missing assets)
    const criticalErrors = errors.filter(
      (error) => !error.includes('404') && !error.includes('Failed to load resource')
    );

    expect(criticalErrors).toHaveLength(0);
  });

  test('should display all main sections', async ({ page }) => {
    // Hero section
    const hero = page.locator('#hero');
    await expect(hero).toBeVisible();
    await expect(hero.locator('h1')).toBeVisible();

    // Stats section
    const stats = page.locator('#stats');
    await expect(stats).toBeVisible();

    // Services section
    const services = page.locator('#services');
    await expect(services).toBeVisible();

    // Products section
    const products = page.locator('#products');
    await expect(products).toBeVisible();

    // Benefits section
    const benefits = page.locator('#benefits');
    await expect(benefits).toBeVisible();

    // Contact section
    const contact = page.locator('#contact');
    await expect(contact).toBeVisible();

    // Footer
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });

  test('should have working CTA button in hero', async ({ page }) => {
    // Find and click CTA button
    const ctaButton = page.getByRole('button', { name: /kontaktujte nás/i });
    await expect(ctaButton).toBeVisible();

    await ctaButton.click();

    // Should scroll to contact section
    await page.waitForTimeout(1000); // Wait for smooth scroll

    const contactSection = page.locator('#contact');
    await expect(contactSection).toBeInViewport();
  });

  test('should display product gallery', async ({ page }) => {
    // Navigate to products section
    await page.locator('#products').scrollIntoViewIfNeeded();

    // Check if products section is visible
    const productsSection = page.locator('#products');
    await expect(productsSection).toBeVisible();

    // Check if there are product cards (grid items)
    const productCards = page.locator('#products .grid > div');
    const count = await productCards.count();

    expect(count).toBeGreaterThan(0);

    // Check first product card is visible and has content
    const firstCard = productCards.first();
    await expect(firstCard).toBeVisible();

    // Check if it has text content (product name/description)
    const hasText = await firstCard.textContent();
    expect(hasText).toBeTruthy();
    expect(hasText!.length).toBeGreaterThan(0);
  });

  test('should have responsive navigation', async ({ page }) => {
    // Check if navigation exists
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
  });

  test('should render footer with contact info', async ({ page }) => {
    // Scroll to footer
    const footer = page.locator('footer');
    await footer.scrollIntoViewIfNeeded();

    // Check footer is visible
    await expect(footer).toBeVisible();

    // Check for social links or contact info
    const hasContent = await footer.locator('a, p').count();
    expect(hasContent).toBeGreaterThan(0);
  });

  test('should load images without errors', async ({ page }) => {
    // Wait for all images to load
    await page.waitForLoadState('networkidle');

    // Wait a bit more for images to load
    await page.waitForTimeout(2000);

    // Check specific sections have images
    const heroSection = page.locator('#hero');
    const productsSection = page.locator('#products');

    // Check hero section is visible
    await expect(heroSection).toBeVisible();

    // Check products section has images
    const productImages = page.locator('#products img');
    const imageCount = await productImages.count();

    // If there are images, check they loaded
    if (imageCount > 0) {
      const firstImage = productImages.first();
      await expect(firstImage).toBeVisible();

      // Check naturalWidth > 0 means image loaded successfully
      const naturalWidth = await firstImage.evaluate((el: HTMLImageElement) => el.naturalWidth);
      expect(naturalWidth).toBeGreaterThan(0);
    }
  });
});

test.describe('Homepage - Mobile', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('should be responsive on mobile', async ({ page }) => {
    // Set localStorage to dismiss cookie consent
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.setItem('hubtrac-cookie-consent', 'accepted');
    });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check hero is visible on mobile
    const hero = page.locator('#hero');
    await expect(hero).toBeVisible();

    // Check all sections stack properly
    const sections = ['#hero', '#stats', '#services', '#products', '#benefits', '#contact'];

    for (const selector of sections) {
      const section = page.locator(selector);
      await expect(section).toBeVisible();
    }
  });

  test('should have working mobile menu', async ({ page }) => {
    // Set localStorage to dismiss cookie consent
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.setItem('hubtrac-cookie-consent', 'accepted');
    });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Look for mobile menu button (hamburger)
    const mobileMenuButton = page.locator('button[aria-label*="menu"]').or(
      page.locator('button[aria-label*="Menu"]')
    );

    // Check if mobile menu exists (not all sites have it)
    const exists = await mobileMenuButton.count();

    if (exists > 0) {
      await mobileMenuButton.click();
      await page.waitForTimeout(500);

      // Menu should open
      const menu = page.locator('[role="menu"]').or(page.locator('nav'));
      await expect(menu).toBeVisible();
    }
  });
});
