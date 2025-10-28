# E2E Testing Documentation

## Overview

This directory contains End-to-End (E2E) tests for the HUBTRAC Mobile Tire Service website using **Playwright**.

## Test Structure

```
tests/
└── e2e/
    ├── homepage.spec.ts          # Homepage tests (sections, layout, images)
    ├── contact-form.spec.ts      # Contact form validation and submission
    ├── language-switcher.spec.ts # Multi-language functionality
    └── product-gallery.spec.ts   # Product gallery/carousel tests
```

## Running Tests

### Prerequisites

1. Install dependencies:
```bash
npm install
```

2. Ensure Playwright browsers are installed:
```bash
npx playwright install
```

### Test Commands

#### Run all tests (headless mode)
```bash
npm run test:e2e
```

#### Run tests with browser visible (headed mode)
```bash
npm run test:e2e:headed
```

#### Run tests in interactive UI mode
```bash
npm run test:e2e:ui
```

#### Debug tests step by step
```bash
npm run test:e2e:debug
```

#### View test report
```bash
npm run test:e2e:report
```

### Browser-Specific Tests

#### Run tests in Chromium only
```bash
npm run test:e2e:chromium
```

#### Run tests in Firefox only
```bash
npm run test:e2e:firefox
```

#### Run tests in Safari/WebKit only
```bash
npm run test:e2e:webkit
```

#### Run mobile tests only
```bash
npm run test:e2e:mobile
```

### Run Specific Test File

```bash
npx playwright test tests/e2e/homepage.spec.ts
```

### Run Specific Test Case

```bash
npx playwright test -g "should display all main sections"
```

## Test Coverage

### 1. Homepage Tests (`homepage.spec.ts`)

**What is tested:**
- Page loads successfully without errors
- All main sections are visible (Hero, Stats, Services, Products, Benefits, Contact, Footer)
- CTA button scrolls to contact section
- Product gallery displays correctly
- Images load without errors
- Responsive design on mobile
- Mobile menu functionality (if exists)

**Key Assertions:**
- Page title contains "HUBTRAC"
- No critical console errors
- All section IDs are present
- Images have valid naturalWidth (loaded successfully)

### 2. Contact Form Tests (`contact-form.spec.ts`)

**What is tested:**
- Form displays with all required fields
- Real-time validation on field blur
- Visual indicators for valid/invalid fields (green/red borders, icons)
- Character limits enforcement
- Character counters display
- Form submission with valid data
- Toast notifications appear after submission
- Form clears after successful submission
- Phone number format validation
- Accessibility (labels, ARIA attributes)
- Keyboard navigation

**Key Assertions:**
- All form fields are visible
- Validation errors show for empty/invalid fields
- Success indicators appear for valid fields
- Toast notifications display
- Form is keyboard navigable

### 3. Language Switcher Tests (`language-switcher.spec.ts`)

**What is tested:**
- Language buttons display (SK, EN, DE)
- Switching between languages
- Content updates on language change
- localStorage persistence
- Language selection persists across page reloads
- Form labels update when language changes
- Active language is visually highlighted
- Rapid language switching doesn't break
- Works on mobile viewport

**Key Assertions:**
- At least 2 language options available
- Content changes to selected language
- localStorage stores correct locale
- Language persists after reload

### 4. Product Gallery Tests (`product-gallery.spec.ts`)

**What is tested:**
- Product cards display
- Tire categories are visible (HIGHWAY, MIXED, URBAN, COACH)
- Product images load successfully
- Carousel navigation (prev/next buttons)
- Carousel indicators/dots work
- Image click/modal interaction
- Keyboard navigation support
- Hover effects don't break layout
- Responsive on mobile
- Swipe gestures on mobile
- Lazy loading of images
- Network resource limits

**Key Assertions:**
- At least 3 tire categories visible
- Images have naturalWidth > 0 (loaded)
- Carousel navigation exists
- Works on mobile viewport
- Reasonable network request count

## Test Configuration

Configuration is in `playwright.config.ts`:

### Test Environment
- **Base URL:** `http://localhost:3000` (or `PLAYWRIGHT_BASE_URL` env var)
- **Test Directory:** `./tests/e2e`
- **Timeout:** 30s per test
- **Retries:** 2 on CI, 0 locally
- **Parallel:** Yes (fully parallel)

### Browsers Tested
- **Desktop:** Chromium, Firefox, WebKit (Safari)
- **Mobile:** Pixel 5 (Chrome), iPhone 12 (Safari)

### Reporting
- **HTML Report:** `playwright-report/` directory
- **List Reporter:** Console output
- **Screenshots:** On failure only
- **Videos:** On failure only
- **Traces:** On first retry

### Web Server
The config automatically starts the Next.js dev server before running tests:
```bash
npm run dev
```

## Writing New Tests

### Test Template

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should do something', async ({ page }) => {
    // Arrange
    const element = page.locator('#my-element');

    // Act
    await element.click();

    // Assert
    await expect(element).toBeVisible();
  });
});
```

### Best Practices

1. **Use descriptive test names:**
   ```typescript
   test('should display all main sections')
   test('should show validation errors for empty fields')
   ```

2. **Wait for elements properly:**
   ```typescript
   await expect(element).toBeVisible();
   await page.waitForLoadState('networkidle');
   ```

3. **Use semantic locators:**
   ```typescript
   page.getByRole('button', { name: /submit/i })
   page.getByLabel(/email/i)
   page.getByText('Contact Us')
   ```

4. **Handle dynamic content:**
   ```typescript
   await page.waitForTimeout(300); // Short wait for animations
   await page.waitForSelector('#element', { timeout: 5000 });
   ```

5. **Test accessibility:**
   ```typescript
   await expect(page.getByLabel(/name/i)).toBeVisible();
   ```

6. **Clean up after tests:**
   ```typescript
   test.afterEach(async ({ page }) => {
     await page.evaluate(() => localStorage.clear());
   });
   ```

## Debugging Tests

### Visual Debugging
```bash
npm run test:e2e:headed
```

### Interactive UI Mode
```bash
npm run test:e2e:ui
```

### Step-through Debugging
```bash
npm run test:e2e:debug
```

### Inspect Specific Element
```typescript
await page.pause(); // Add to test code
```

### View Test Report
```bash
npm run test:e2e:report
```

## CI/CD Integration

### GitHub Actions

Example workflow (`.github/workflows/e2e-tests.yml`):

```yaml
name: E2E Tests

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run build
      - run: npm run test:e2e
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

### Environment Variables

Set `PLAYWRIGHT_BASE_URL` to test against production:

```bash
PLAYWRIGHT_BASE_URL=https://hubtrac-1.vercel.app npm run test:e2e
```

## Common Issues and Solutions

### Issue: "Browser not installed"
**Solution:**
```bash
npx playwright install chromium
```

### Issue: "Port 3000 already in use"
**Solution:**
- Kill existing process: `lsof -ti:3000 | xargs kill`
- Or change port in `playwright.config.ts`

### Issue: "Tests timeout"
**Solution:**
- Increase timeout in config: `timeout: 60000`
- Or add `test.setTimeout(60000)` in test file

### Issue: "Element not visible"
**Solution:**
- Add explicit wait: `await element.waitFor({ state: 'visible' })`
- Scroll into view: `await element.scrollIntoViewIfNeeded()`

### Issue: "Flaky tests"
**Solution:**
- Use `toBeVisible()` instead of checking display property
- Add proper waits instead of arbitrary timeouts
- Use `waitForLoadState('networkidle')`

## Performance Testing

### Lighthouse Integration (Optional)

Add lighthouse to tests:

```typescript
import { test } from '@playwright/test';
import { playAudit } from 'playwright-lighthouse';

test('should pass lighthouse audit', async ({ page }) => {
  await page.goto('/');
  await playAudit({
    page,
    thresholds: {
      performance: 90,
      accessibility: 90,
      'best-practices': 90,
      seo: 90,
    },
  });
});
```

## Resources

- [Playwright Documentation](https://playwright.dev/)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Playwright API Reference](https://playwright.dev/docs/api/class-playwright)
- [Test Selectors](https://playwright.dev/docs/selectors)
- [Test Assertions](https://playwright.dev/docs/test-assertions)

## Maintenance

- **Update tests** when UI changes
- **Add tests** for new features
- **Remove tests** for deprecated features
- **Review test reports** regularly
- **Keep Playwright updated:** `npm update @playwright/test`

---

*Last Updated: 2025-10-28*
*Playwright Version: 1.56.1*
