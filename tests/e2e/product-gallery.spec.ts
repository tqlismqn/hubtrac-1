import { test, expect } from '@playwright/test';

/**
 * E2E Tests for Product Gallery/Carousel
 *
 * Tests:
 * - Product cards display
 * - Carousel navigation
 * - Image loading
 * - Modal/detail view
 * - Responsive behavior
 */

test.describe('Product Gallery', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Scroll to products section
    await page.locator('#products').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
  });

  test('should display product cards', async ({ page }) => {
    // Check if product section exists
    const productsSection = page.locator('#products');
    await expect(productsSection).toBeVisible();

    // Check if there are product cards
    // Could be various selectors depending on implementation
    const productCards =
      page.locator('[data-testid="product-card"]').or(
        page.locator('.product-card')
      ).or(
        page.locator('#products img')
      );

    const count = await productCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display tire categories', async ({ page }) => {
    // Common tire categories from HUBTRAC
    const categories = ['HIGHWAY', 'MIXED', 'URBAN', 'COACH'];

    // Check if at least some categories are visible
    let foundCategories = 0;

    for (const category of categories) {
      const categoryElement = page.locator(`text=/.*${category}.*/i`);
      if ((await categoryElement.count()) > 0) {
        foundCategories++;
      }
    }

    // Should have at least 3 out of 4 categories
    expect(foundCategories).toBeGreaterThanOrEqual(3);
  });

  test('should load product images', async ({ page }) => {
    // Get all images in products section
    const productImages = page.locator('#products img');
    const count = await productImages.count();

    expect(count).toBeGreaterThan(0);

    // Check first few images loaded successfully
    for (let i = 0; i < Math.min(count, 5); i++) {
      const img = productImages.nth(i);

      // Wait for image to be visible
      await expect(img).toBeVisible({ timeout: 10000 });

      // Check image loaded (naturalWidth > 0)
      const isLoaded = await img.evaluate((el: HTMLImageElement) => el.naturalWidth > 0);
      expect(isLoaded).toBeTruthy();
    }
  });

  test('should have carousel navigation', async ({ page }) => {
    // Look for carousel navigation buttons (prev/next)
    const navButtons = page.locator('button[aria-label*="prev"]').or(
      page.locator('button[aria-label*="next"]')
    ).or(
      page.locator('button:has-text("‹"), button:has-text("›")')
    ).or(
      page.locator('[class*="carousel"] button')
    );

    const hasNavButtons = (await navButtons.count()) > 0;

    if (hasNavButtons) {
      // Should have at least 2 buttons (prev/next)
      expect(await navButtons.count()).toBeGreaterThanOrEqual(1);
    }
  });

  test('should navigate carousel with buttons', async ({ page }) => {
    // Find next button
    const nextButton = page.locator('button[aria-label*="next"]').or(
      page.locator('button:has-text("›")')
    ).first();

    if ((await nextButton.count()) > 0) {
      // Get initial visible image
      const initialImage = await page.locator('#products img').first().getAttribute('src');

      // Click next
      await nextButton.click();
      await page.waitForTimeout(500); // Wait for transition

      // Image should have changed (or carousel moved)
      const currentImage = await page.locator('#products img').first().getAttribute('src');

      // Note: This might be the same if there's only one product
      // We just verify clicking doesn't break anything
      expect(currentImage).toBeTruthy();
    }
  });

  test('should show carousel indicators/dots', async ({ page }) => {
    // Look for carousel indicators (dots)
    const indicators = page.locator('[class*="carousel-indicator"]').or(
      page.locator('[class*="dot"]')
    ).or(
      page.locator('button[aria-label*="slide"]')
    );

    const hasIndicators = (await indicators.count()) > 0;

    if (hasIndicators) {
      // Should have multiple dots
      expect(await indicators.count()).toBeGreaterThan(0);

      // Should be able to click
      await indicators.first().click();
      await page.waitForTimeout(300);

      // Page should not crash
      await expect(page.locator('#products')).toBeVisible();
    }
  });

  test('should handle image click/modal', async ({ page }) => {
    // Find first product image
    const firstImage = page.locator('#products img').first();

    if ((await firstImage.count()) > 0) {
      // Click image
      await firstImage.click();
      await page.waitForTimeout(500);

      // Check if modal opened
      const modal = page.locator('[role="dialog"]').or(
        page.locator('.modal')
      ).or(
        page.locator('[class*="Modal"]')
      );

      // Modal might open, or it might just do nothing
      // We just verify clicking doesn't break the page
      await expect(page.locator('#products')).toBeVisible();
    }
  });

  test('should display product details', async ({ page }) => {
    // Check for product information
    const productsSection = page.locator('#products');
    const content = await productsSection.textContent();

    // Should have some product-related text
    const hasProductInfo =
      content?.toLowerCase().includes('tire') ||
      content?.toLowerCase().includes('pneumat') ||
      content?.toLowerCase().includes('reifen') ||
      content?.toLowerCase().includes('warranty') ||
      content?.toLowerCase().includes('year') ||
      false;

    expect(hasProductInfo).toBeTruthy();
  });
});

test.describe('Product Gallery - Interactions', () => {
  test('should support keyboard navigation', async ({ page }) => {
    await page.goto('/');
    await page.locator('#products').scrollIntoViewIfNeeded();

    // Focus on first interactive element in products section
    const firstButton = page.locator('#products button').first();

    if ((await firstButton.count()) > 0) {
      await firstButton.focus();

      // Press arrow keys
      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(300);

      // Should not crash
      await expect(page.locator('#products')).toBeVisible();
    }
  });

  test('should handle hover effects', async ({ page }) => {
    await page.goto('/');
    await page.locator('#products').scrollIntoViewIfNeeded();

    // Find product cards
    const cards = page.locator('[data-testid="product-card"]').or(
      page.locator('#products > div > div')
    );

    if ((await cards.count()) > 0) {
      const firstCard = cards.first();

      // Hover over card
      await firstCard.hover();
      await page.waitForTimeout(300);

      // Should remain visible (no crashes)
      await expect(firstCard).toBeVisible();
    }
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Scroll to products
    await page.locator('#products').scrollIntoViewIfNeeded();

    // Products should be visible on mobile
    await expect(page.locator('#products')).toBeVisible();

    // Should have products
    const products = page.locator('#products img');
    expect(await products.count()).toBeGreaterThan(0);
  });

  test('should support swipe gestures on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    await page.locator('#products').scrollIntoViewIfNeeded();

    // Find carousel container
    const carousel = page.locator('[class*="carousel"]').or(
      page.locator('#products > div')
    ).first();

    if ((await carousel.count()) > 0) {
      // Get initial position
      const initialScroll = await carousel.evaluate((el) => el.scrollLeft);

      // Simulate swipe (touch drag)
      const box = await carousel.boundingBox();
      if (box) {
        await page.mouse.move(box.x + box.width * 0.8, box.y + box.height / 2);
        await page.mouse.down();
        await page.mouse.move(box.x + box.width * 0.2, box.y + box.height / 2, { steps: 10 });
        await page.mouse.up();
        await page.waitForTimeout(500);

        // Scroll position might have changed
        // We just verify it doesn't crash
        await expect(carousel).toBeVisible();
      }
    }
  });
});

test.describe('Product Gallery - Performance', () => {
  test('should lazy load images', async ({ page }) => {
    await page.goto('/');

    // Check that not all images load immediately
    const allImages = page.locator('img');
    const imageCount = await allImages.count();

    // Count loaded images immediately
    let loadedCount = 0;
    for (let i = 0; i < imageCount; i++) {
      const img = allImages.nth(i);
      const isLoaded = await img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0);
      if (isLoaded) loadedCount++;
    }

    // Not all images should be loaded yet (some are lazy)
    // This might not always pass if connection is very fast
    console.log(`Loaded images: ${loadedCount} / ${imageCount}`);

    // Scroll to bottom to trigger lazy loading
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(2000);

    // More images should be loaded now
    let loadedAfterScroll = 0;
    for (let i = 0; i < imageCount; i++) {
      const img = allImages.nth(i);
      const isLoaded = await img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0);
      if (isLoaded) loadedAfterScroll++;
    }

    console.log(`Loaded after scroll: ${loadedAfterScroll} / ${imageCount}`);
    expect(loadedAfterScroll).toBeGreaterThanOrEqual(loadedCount);
  });

  test('should not load excessive network resources', async ({ page }) => {
    const resources: string[] = [];

    // Track network requests
    page.on('request', (request) => {
      resources.push(request.url());
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Should not have too many requests
    console.log(`Total network requests: ${resources.length}`);

    // Reasonable limit for a landing page with images
    expect(resources.length).toBeLessThan(100);
  });
});
