# HUBTRAC Project Optimization Roadmap

**Document Version:** 1.0
**Created:** 2025-01-28
**Last Updated:** 2025-01-28
**Projects:** hubtrac-1, hubtrac-2
**Status:** Planning Phase

---

## Executive Summary

This roadmap outlines comprehensive optimization opportunities for the HUBTRAC WordPress → Vercel Migration project following the successful performance optimization completed on 2025-01-28 (56% FCP improvement). The roadmap is organized into three implementation phases: Quick Wins (1-2 weeks), Short-term (1-2 months), and Long-term (3-6 months).

**Key Metrics from Recent Optimization:**
- First Contentful Paint: 1,236ms → 548ms (56% improvement)
- DOM Content Loaded: 1,122ms → 460ms (59% improvement)
- 404 Errors: 4 → 0 (100% elimination)

**Total Identified Opportunities:** 10 categories, 28 specific improvements
**Estimated ROI:** 15-30% additional performance gains, improved SEO ranking, better user experience

---

## Table of Contents

1. [Phase 1: Quick Wins (1-2 weeks)](#phase-1-quick-wins-1-2-weeks)
2. [Phase 2: Short-term (1-2 months)](#phase-2-short-term-1-2-months)
3. [Phase 3: Long-term (3-6 months)](#phase-3-long-term-3-6-months)
4. [Implementation Matrix](#implementation-matrix)
5. [Success Criteria & KPIs](#success-criteria--kpis)
6. [Risk Assessment](#risk-assessment)
7. [Dependencies](#dependencies)
8. [Appendix: Technical Details](#appendix-technical-details)

---

## Phase 1: Quick Wins (1-2 weeks)

**Goal:** Address low-hanging fruit with high impact and minimal effort
**Expected Impact:** 10-15% performance improvement, SEO boost
**Total Effort:** 12-16 hours

### 1.1 SEO & Social Media Images

**Priority:** 🔴 Critical
**Effort:** 3-4 hours
**Impact:** High (SEO, social sharing)

**Tasks:**
- [ ] Create Open Graph image (1200×630px) for Facebook/LinkedIn sharing
- [ ] Create Twitter Card image (1200×675px) for X/Twitter sharing
- [ ] Create Apple Touch Icon (180×180px) for iOS home screen
- [ ] Generate images with HUBTRAC branding using existing logo/colors
- [ ] Add images to `/public/` directory
- [ ] Update `layout.tsx` with new meta tags

**Implementation:**
```typescript
// src/app/layout.tsx
export const metadata: Metadata = {
  openGraph: {
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'HUBTRAC Mobile Tire Service - Commercial Truck Tires',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/twitter-image.jpg'],
  },
  icons: {
    apple: '/apple-touch-icon.png',
  },
};
```

**Success Criteria:**
- ✅ All images display correctly when URL shared on Facebook/Twitter/LinkedIn
- ✅ Apple Touch Icon appears when site added to iOS home screen
- ✅ No 404 errors for new image files
- ✅ Images load in < 500ms

**Dependencies:** None

---

### 1.2 Fix Sitemap Issues

**Priority:** 🔴 Critical
**Effort:** 2-3 hours
**Impact:** High (SEO crawlability)

**Tasks:**
- [ ] Remove references to non-existent pages (`/services`, `/contact`)
- [ ] Fix multi-language route structure (currently incorrect)
- [ ] Add actual existing pages (only `/`, `/about`, `/privacy`, `/terms`)
- [ ] Verify sitemap.xml generates correctly at build time
- [ ] Test with Google Search Console sitemap validator

**Current Issues in `src/app/sitemap.ts`:**
```typescript
// ❌ WRONG - these pages don't exist
{
  url: `${baseUrl}/services`,  // No /services page!
  url: `${baseUrl}/contact`,   // No /contact page!
}

// ❌ WRONG - language routing doesn't work this way
{
  url: `${baseUrl}/en`,  // Client-side only, not routes
  url: `${baseUrl}/sk`,
  url: `${baseUrl}/de`,
}
```

**Correct Implementation:**
```typescript
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://hubtrac-1.vercel.app'; // Update per project
  const currentDate = new Date();

  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}
```

**Success Criteria:**
- ✅ Sitemap contains only existing pages
- ✅ No 404 errors when Google crawls sitemap URLs
- ✅ Google Search Console shows 0 sitemap errors
- ✅ All URLs return 200 status codes

**Dependencies:** None

---

### 1.3 Google Search Console Verification

**Priority:** 🟡 High
**Effort:** 1 hour
**Impact:** Medium (SEO tracking)

**Tasks:**
- [ ] Create Google Search Console account (if not exists)
- [ ] Add property for hubtrac-1.vercel.app
- [ ] Add property for hubtrac-2.vercel.app
- [ ] Verify ownership via HTML meta tag
- [ ] Replace placeholder verification code in `layout.tsx`
- [ ] Submit sitemap to GSC
- [ ] Set up email alerts for crawl errors

**Current Code:**
```typescript
// src/app/layout.tsx
verification: {
  google: 'your-google-site-verification-code-here',  // ❌ Placeholder
},
```

**Implementation:**
```typescript
verification: {
  google: 'abc123xyz456...', // ✅ Real verification code from GSC
},
```

**Success Criteria:**
- ✅ Both sites verified in Google Search Console
- ✅ Sitemap submitted and indexed
- ✅ Email alerts configured for crawl errors
- ✅ Initial crawl report shows 0 errors

**Dependencies:** 1.2 (Fix Sitemap Issues)

---

### 1.4 PWA Icon Generation

**Priority:** 🟡 High
**Effort:** 2 hours
**Impact:** Medium (PWA, mobile UX)

**Tasks:**
- [ ] Create 192×192 PNG icon from existing logo
- [ ] Create 512×512 PNG icon from existing logo
- [ ] Optimize PNGs with ImageOptim or similar
- [ ] Add icons to `/public/` directory
- [ ] Update `manifest.json` to reference new icons
- [ ] Test installation on Android device
- [ ] Verify icons appear correctly in app drawer

**Implementation:**
```json
// public/manifest.json
{
  "icons": [
    {
      "src": "/favicon.ico",
      "sizes": "48x48",
      "type": "image/x-icon"
    },
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ]
}
```

**Success Criteria:**
- ✅ Icons display correctly when installed as PWA on Android
- ✅ Icons display correctly when installed as PWA on iOS
- ✅ No 404 errors for icon files
- ✅ Icons load in < 200ms

**Dependencies:** None

---

### 1.5 Basic Security Headers

**Priority:** 🟡 High
**Effort:** 2-3 hours
**Impact:** Medium (security, SEO)

**Tasks:**
- [ ] Add `vercel.json` configuration file
- [ ] Implement Content-Security-Policy (CSP) header
- [ ] Implement X-Frame-Options header
- [ ] Implement X-Content-Type-Options header
- [ ] Implement Referrer-Policy header
- [ ] Test headers with securityheaders.com
- [ ] Verify no functionality breaks with CSP

**Implementation:**
```json
// vercel.json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "SAMEORIGIN"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://www.google-analytics.com;"
        }
      ]
    }
  ]
}
```

**Success Criteria:**
- ✅ All headers present in HTTP responses
- ✅ securityheaders.com score: A or A+
- ✅ No console errors due to CSP violations
- ✅ All site functionality works with headers enabled

**Dependencies:** None

---

### 1.6 Accessibility Quick Fixes

**Priority:** 🟢 Medium
**Effort:** 2-3 hours
**Impact:** Medium (UX, compliance)

**Tasks:**
- [ ] Run Lighthouse accessibility audit
- [ ] Fix color contrast issues (if any)
- [ ] Add missing alt text to images
- [ ] Ensure all interactive elements have proper ARIA labels
- [ ] Test keyboard navigation (Tab, Enter, Esc)
- [ ] Verify screen reader compatibility (VoiceOver/NVDA)
- [ ] Add skip-to-content link

**Common Issues to Check:**
```typescript
// ❌ WRONG - no alt text
<Image src="/tire.webp" alt="" />

// ✅ CORRECT - descriptive alt text
<Image src="/tire.webp" alt="HUBTRAC Highway T21 commercial truck tire" />

// ❌ WRONG - no ARIA label on button
<button onClick={handleClick}>
  <ChevronRight />
</button>

// ✅ CORRECT - ARIA label present
<button onClick={handleClick} aria-label="Next slide">
  <ChevronRight />
</button>
```

**Success Criteria:**
- ✅ Lighthouse accessibility score: 95+
- ✅ All images have descriptive alt text
- ✅ Color contrast ratio: 4.5:1 minimum
- ✅ Keyboard navigation works on all pages
- ✅ Screen reader announces all interactive elements

**Dependencies:** None

---

## Phase 2: Short-term (1-2 months)

**Goal:** Implement medium-complexity improvements requiring more planning
**Expected Impact:** 5-10% additional performance, better analytics, improved SEO
**Total Effort:** 20-30 hours

### 2.1 Vercel Analytics Integration

**Priority:** 🟡 High
**Effort:** 2-3 hours
**Impact:** Medium (data-driven decisions)

**Tasks:**
- [ ] Enable Vercel Analytics in project settings
- [ ] Install `@vercel/analytics` package
- [ ] Add Analytics component to root layout
- [ ] Configure custom events tracking
- [ ] Set up conversion tracking (contact form submissions)
- [ ] Create dashboard for monitoring
- [ ] Document key metrics to track

**Implementation:**
```bash
npm install @vercel/analytics
```

```typescript
// src/app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

**Custom Events:**
```typescript
// Track contact form submissions
import { track } from '@vercel/analytics';

const handleSubmit = async (e) => {
  e.preventDefault();
  track('contact_form_submit', {
    language: currentLocale,
    page: 'homepage',
  });
  // ... submit logic
};
```

**Success Criteria:**
- ✅ Analytics data appears in Vercel dashboard
- ✅ Custom events tracked correctly
- ✅ Zero impact on page load performance
- ✅ Privacy-compliant (no cookies required)

**Dependencies:** None

---

### 2.2 Google Analytics 4 Integration

**Priority:** 🟡 High
**Effort:** 3-4 hours
**Impact:** Medium (detailed analytics)

**Tasks:**
- [ ] Create GA4 property in Google Analytics
- [ ] Get measurement ID (G-XXXXXXXXXX)
- [ ] Install `next-third-parties` for optimized loading
- [ ] Add GoogleAnalytics component to layout
- [ ] Configure enhanced measurement
- [ ] Set up goals/conversions
- [ ] Create custom events for tire category views
- [ ] Test with GA4 DebugView

**Implementation:**
```bash
npm install @next/third-parties
```

```typescript
// src/app/layout.tsx
import { GoogleAnalytics } from '@next/third-parties/google';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <GoogleAnalytics gaId="G-XXXXXXXXXX" />
      </body>
    </html>
  );
}
```

**Custom Events:**
```typescript
// Track tire category views
import { sendGAEvent } from '@next/third-parties/google';

const handleCategoryClick = (category: string) => {
  sendGAEvent('event', 'view_tire_category', {
    category_name: category,
    language: currentLocale,
  });
};
```

**Success Criteria:**
- ✅ Real-time data appears in GA4 dashboard
- ✅ Custom events tracked correctly
- ✅ Conversion goals configured and tracking
- ✅ Zero impact on Core Web Vitals

**Dependencies:** None

---

### 2.3 Image Optimization Audit

**Priority:** 🟡 High
**Effort:** 4-6 hours
**Impact:** Medium (performance)

**Tasks:**
- [ ] Audit all images in `/public/images/`
- [ ] Identify oversized images (> 200KB)
- [ ] Re-compress large WebP files with lower quality
- [ ] Implement responsive image sizes with `sizes` attribute
- [ ] Add lazy loading to below-fold images
- [ ] Consider using blur placeholders for LCP images
- [ ] Test with WebPageTest.org

**Current Image Analysis Needed:**
```bash
# Check image sizes
find public/images -name "*.webp" -exec du -h {} \; | sort -rh

# Identify candidates for optimization
find public/images -name "*.webp" -size +200k
```

**Optimization Targets:**
- Hero images: < 150KB
- Product images: < 100KB
- Icon images: < 50KB
- Certificate thumbnails: < 80KB

**Implementation:**
```typescript
// Responsive sizing example
<Image
  src="/images/tire-highway-t21.webp"
  alt="Highway T21 tire"
  width={600}
  height={600}
  quality={85} // Lower to 75-80 for smaller files
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  loading="lazy"
  placeholder="blur"
  blurDataURL="data:image/..." // Generate with sharp
/>
```

**Success Criteria:**
- ✅ All images < 200KB
- ✅ Cumulative Layout Shift (CLS) < 0.1
- ✅ Lazy loading implemented on 80%+ of images
- ✅ No visible quality degradation

**Dependencies:** None

---

### 2.4 Multi-language SEO Enhancement

**Priority:** 🟢 Medium
**Effort:** 6-8 hours
**Impact:** Medium (international SEO)

**Tasks:**
- [ ] Research proper multi-language SEO implementation
- [ ] Add `<link rel="alternate" hreflang="x">` tags
- [ ] Create language-specific metadata
- [ ] Implement canonical URLs
- [ ] Consider implementing true language routing (optional)
- [ ] Test with Google Search Console international targeting
- [ ] Document SEO best practices for multi-language

**Current Challenge:**
Client-side language switching doesn't create separate URLs for each language, which limits SEO effectiveness.

**Option A: Keep Client-side (Simpler)**
```typescript
// Add hreflang tags even for client-side switching
export const metadata: Metadata = {
  alternates: {
    canonical: 'https://hubtrac-1.vercel.app',
    languages: {
      'sk-SK': 'https://hubtrac-1.vercel.app',
      'de-DE': 'https://hubtrac-1.vercel.app',
      'en-US': 'https://hubtrac-1.vercel.app',
    },
  },
};
```

**Option B: Implement URL-based Routing (Complex)**
```
https://hubtrac-1.vercel.app/sk/
https://hubtrac-1.vercel.app/de/
https://hubtrac-1.vercel.app/en/
```

Requires refactoring to Next.js i18n routing with separate page paths.

**Success Criteria:**
- ✅ hreflang tags present in HTML
- ✅ Google Search Console shows no hreflang errors
- ✅ Each language version indexed separately (if Option B)
- ✅ No duplicate content penalties

**Dependencies:** Research and client decision on routing approach

---

### 2.5 Contact Form Enhancement

**Priority:** 🟢 Medium
**Effort:** 4-5 hours
**Impact:** Medium (conversions)

**Tasks:**
- [ ] Integrate with email service (Formspree/Web3Forms/EmailJS)
- [ ] Add form validation with error messages
- [ ] Implement loading states during submission
- [ ] Add success/error toast notifications
- [ ] Track form submissions with analytics events
- [ ] Add honeypot field for spam protection
- [ ] Test email delivery to client inbox
- [ ] Add auto-reply confirmation email

**Current State:** Contact form exists but not functional (no backend)

**Implementation Options:**

**Option A: Web3Forms (Free tier: 250/month)**
```typescript
const handleSubmit = async (data: FormData) => {
  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
      name: data.name,
      email: data.email,
      message: data.message,
    }),
  });

  if (response.ok) {
    toast.success('Message sent successfully!');
    track('contact_form_success');
  }
};
```

**Option B: Formspree (Free tier: 50/month)**
```typescript
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
  <input type="text" name="name" required />
  <input type="email" name="email" required />
  <textarea name="message" required></textarea>
  <button type="submit">Send</button>
</form>
```

**Success Criteria:**
- ✅ Form submissions delivered to client email
- ✅ User receives confirmation message
- ✅ Spam protection active
- ✅ Form submission tracked in analytics
- ✅ Mobile-friendly form UX

**Dependencies:** 2.1 or 2.2 (Analytics) for tracking

---

### 2.6 Performance Monitoring Setup

**Priority:** 🟢 Medium
**Effort:** 3-4 hours
**Impact:** Medium (proactive optimization)

**Tasks:**
- [ ] Set up Vercel Speed Insights
- [ ] Configure Core Web Vitals monitoring
- [ ] Create performance budget alerts
- [ ] Set up automated Lighthouse CI in GitHub Actions
- [ ] Create performance dashboard
- [ ] Document performance baselines
- [ ] Configure Slack/email alerts for regressions

**Implementation:**
```bash
npm install @vercel/speed-insights
```

```typescript
// src/app/layout.tsx
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
```

**Performance Budget:**
```json
// .github/workflows/lighthouse.yml
{
  "performance": 95,
  "accessibility": 95,
  "best-practices": 95,
  "seo": 95,
  "first-contentful-paint": 1000,
  "largest-contentful-paint": 2000,
  "cumulative-layout-shift": 0.1,
  "total-blocking-time": 200
}
```

**Success Criteria:**
- ✅ Real User Monitoring (RUM) data visible in dashboard
- ✅ Alerts configured for performance regressions
- ✅ Lighthouse CI runs on every PR
- ✅ Performance budget enforced in CI

**Dependencies:** 2.1 (Vercel Analytics)

---

## Phase 3: Long-term (3-6 months)

**Goal:** Strategic improvements requiring significant development effort
**Expected Impact:** Future-proofing, advanced features, competitive advantage
**Total Effort:** 40-60 hours

### 3.1 Service Worker & Offline Support

**Priority:** 🟢 Medium
**Effort:** 8-12 hours
**Impact:** Low (progressive enhancement)

**Tasks:**
- [ ] Research Next.js PWA implementation with `next-pwa`
- [ ] Implement service worker for offline caching
- [ ] Define caching strategy (cache-first vs network-first)
- [ ] Create offline fallback page
- [ ] Test offline functionality on various devices
- [ ] Implement background sync for contact form
- [ ] Add install prompt for PWA
- [ ] Test on iOS and Android

**Implementation:**
```bash
npm install next-pwa
```

```javascript
// next.config.js
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});

module.exports = withPWA({
  // existing config
});
```

**Caching Strategy:**
- Static assets (images, fonts): Cache-first
- HTML pages: Network-first with fallback
- API calls: Network-only
- Contact form: Background sync when offline

**Success Criteria:**
- ✅ Site works offline (read-only)
- ✅ Install prompt appears on mobile
- ✅ Lighthouse PWA score: 100
- ✅ Form submissions queue when offline

**Dependencies:** 1.4 (PWA Icons)

---

### 3.2 True Multi-language Routing

**Priority:** 🟢 Medium
**Effort:** 12-16 hours
**Impact:** Medium (SEO, UX)

**Tasks:**
- [ ] Research Next.js i18n routing patterns
- [ ] Implement `/[lang]/` dynamic routes
- [ ] Refactor components to accept lang parameter
- [ ] Migrate client-side dictionary system to server-side
- [ ] Update sitemap with language-specific URLs
- [ ] Implement language detection and redirect
- [ ] Create language switcher that changes URL
- [ ] Test SEO impact with Google Search Console
- [ ] Update all documentation

**Current Structure:**
```
/ (client-side language switching)
/about (client-side language switching)
```

**New Structure:**
```
/sk/ (Slovak homepage)
/de/ (German homepage)
/en/ (English homepage)
/sk/about (Slovak about page)
/de/about (German about page)
/en/about (English about page)
```

**Implementation:**
```typescript
// app/[lang]/layout.tsx
export async function generateStaticParams() {
  return [{ lang: 'sk' }, { lang: 'de' }, { lang: 'en' }];
}

export default async function LocaleLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const dict = getDictionary(lang);

  return (
    <html lang={lang}>
      <body>{children}</body>
    </html>
  );
}
```

**Success Criteria:**
- ✅ Each language has unique URL
- ✅ Language switcher changes URL
- ✅ All pages remain static (○ Static)
- ✅ SEO improves for international search
- ✅ No duplicate content penalties

**Dependencies:** 2.4 (Multi-language SEO research)

---

### 3.3 GitHub Actions CI/CD Pipeline

**Priority:** 🟢 Medium
**Effort:** 6-8 hours
**Impact:** Low (developer experience)

**Tasks:**
- [ ] Create `.github/workflows/ci.yml`
- [ ] Set up automated build checks on PR
- [ ] Add TypeScript type checking
- [ ] Add ESLint validation
- [ ] Add Lighthouse CI for performance regression detection
- [ ] Add Playwright E2E tests (if implemented)
- [ ] Configure branch protection rules
- [ ] Add status badges to README

**Implementation:**
```yaml
# .github/workflows/ci.yml
name: CI

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Type check
        run: npx tsc --noEmit

      - name: Lint
        run: npm run lint

      - name: Build
        run: npm run build

      - name: Run Lighthouse CI
        uses: treosh/lighthouse-ci-action@v10
        with:
          urls: |
            http://localhost:3000
          uploadArtifacts: true
```

**Success Criteria:**
- ✅ CI runs on every PR
- ✅ Build failures block merge
- ✅ Performance regressions detected
- ✅ CI completes in < 5 minutes

**Dependencies:** None

---

### 3.4 E2E Testing with Playwright

**Priority:** 🔵 Low
**Effort:** 10-14 hours
**Impact:** Low (quality assurance)

**Tasks:**
- [ ] Install Playwright and dependencies
- [ ] Create test structure in `/tests/e2e/`
- [ ] Write tests for critical user flows:
  - Homepage loads and displays hero
  - Language switcher changes content
  - Product gallery displays all categories
  - Certificate modal opens PDFs
  - Contact form validation works
  - Mobile navigation works
- [ ] Set up test CI in GitHub Actions
- [ ] Create test documentation
- [ ] Configure visual regression testing

**Implementation:**
```bash
npm install -D @playwright/test
npx playwright install
```

```typescript
// tests/e2e/homepage.spec.ts
import { test, expect } from '@playwright/test';

test('homepage loads and displays hero section', async ({ page }) => {
  await page.goto('/');

  // Check hero title is visible
  await expect(page.locator('h1')).toBeVisible();

  // Check CTA button is clickable
  await expect(page.locator('text="Contact Us"')).toBeEnabled();
});

test('language switcher changes content', async ({ page }) => {
  await page.goto('/');

  // Default Slovak
  await expect(page.locator('h1')).toContainText('Mobilný servis');

  // Switch to German
  await page.click('[aria-label="Language selector"]');
  await page.click('text="Deutsch"');

  await expect(page.locator('h1')).toContainText('Mobiler Service');
});
```

**Success Criteria:**
- ✅ All critical flows tested
- ✅ Tests run in CI on every PR
- ✅ Test suite completes in < 3 minutes
- ✅ Tests catch regressions before deploy

**Dependencies:** 3.3 (GitHub Actions setup)

---

### 3.5 Advanced Image Optimization

**Priority:** 🔵 Low
**Effort:** 6-8 hours
**Impact:** Low (marginal performance gains)

**Tasks:**
- [ ] Implement AVIF format for modern browsers
- [ ] Add picture element with WebP/AVIF fallbacks
- [ ] Implement blur placeholders for all images
- [ ] Consider lazy-loading image library (e.g., `react-lazy-load-image-component`)
- [ ] Implement critical CSS for above-fold images
- [ ] Test with different network throttling conditions
- [ ] Measure impact on LCP (Largest Contentful Paint)

**Implementation:**
```typescript
// Advanced image component with AVIF support
<picture>
  <source
    srcSet="/images/tire.avif"
    type="image/avif"
  />
  <source
    srcSet="/images/tire.webp"
    type="image/webp"
  />
  <Image
    src="/images/tire.jpg"
    alt="Highway T21 tire"
    width={600}
    height={600}
    loading="lazy"
    placeholder="blur"
    blurDataURL="data:image/svg+xml;base64,..."
  />
</picture>
```

**Generate blur placeholders:**
```bash
npm install plaiceholder sharp
```

```typescript
import { getPlaiceholder } from 'plaiceholder';

const { base64 } = await getPlaiceholder('/path/to/image.jpg');
```

**Success Criteria:**
- ✅ AVIF images served to modern browsers
- ✅ All images have blur placeholders
- ✅ LCP improves by 5-10%
- ✅ No CLS (Cumulative Layout Shift) regressions

**Dependencies:** 2.3 (Image Optimization Audit)

---

### 3.6 Accessibility Compliance (WCAG 2.1 AA)

**Priority:** 🔵 Low
**Effort:** 8-12 hours
**Impact:** Low (compliance, UX)

**Tasks:**
- [ ] Conduct full WCAG 2.1 AA audit
- [ ] Fix all color contrast issues
- [ ] Ensure all forms have proper labels
- [ ] Add ARIA landmarks to page structure
- [ ] Implement focus management for modals
- [ ] Add skip navigation links
- [ ] Test with multiple screen readers (NVDA, JAWS, VoiceOver)
- [ ] Create accessibility statement page
- [ ] Document accessibility features

**Key Areas:**
- Perceivable: Text alternatives, time-based media, adaptable, distinguishable
- Operable: Keyboard accessible, enough time, seizures, navigable
- Understandable: Readable, predictable, input assistance
- Robust: Compatible with assistive technologies

**Implementation:**
```typescript
// Example: Focus management in modal
import { useEffect, useRef } from 'react';

const Modal = ({ isOpen, onClose }) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Content aria-labelledby="modal-title">
        <Dialog.Title id="modal-title">Certificate Details</Dialog.Title>
        <Dialog.Description>
          View and download our ISO certifications
        </Dialog.Description>

        {/* Content */}

        <Dialog.Close ref={closeButtonRef} aria-label="Close modal">
          <X />
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  );
};
```

**Success Criteria:**
- ✅ Lighthouse accessibility score: 100
- ✅ No WCAG 2.1 AA violations
- ✅ All interactive elements keyboard accessible
- ✅ Screen reader navigation seamless
- ✅ Accessibility statement published

**Dependencies:** 1.6 (Accessibility Quick Fixes)

---

## Implementation Matrix

| Task | Priority | Effort | Impact | Dependencies | Phase | Status |
|------|----------|--------|--------|--------------|-------|--------|
| **1.1** SEO & Social Images | 🔴 Critical | 3-4h | High | None | 1 | ⏳ Planned |
| **1.2** Fix Sitemap | 🔴 Critical | 2-3h | High | None | 1 | ⏳ Planned |
| **1.3** Google Search Console | 🟡 High | 1h | Medium | 1.2 | 1 | ⏳ Planned |
| **1.4** PWA Icons | 🟡 High | 2h | Medium | None | 1 | ⏳ Planned |
| **1.5** Security Headers | 🟡 High | 2-3h | Medium | None | 1 | ⏳ Planned |
| **1.6** Accessibility Fixes | 🟢 Medium | 2-3h | Medium | None | 1 | ⏳ Planned |
| **2.1** Vercel Analytics | 🟡 High | 2-3h | Medium | None | 2 | ⏳ Planned |
| **2.2** Google Analytics 4 | 🟡 High | 3-4h | Medium | None | 2 | ⏳ Planned |
| **2.3** Image Optimization | 🟡 High | 4-6h | Medium | None | 2 | ⏳ Planned |
| **2.4** Multi-lang SEO | 🟢 Medium | 6-8h | Medium | Research | 2 | ⏳ Planned |
| **2.5** Contact Form | 🟢 Medium | 4-5h | Medium | 2.1/2.2 | 2 | ⏳ Planned |
| **2.6** Performance Monitoring | 🟢 Medium | 3-4h | Medium | 2.1 | 2 | ⏳ Planned |
| **3.1** Service Worker | 🟢 Medium | 8-12h | Low | 1.4 | 3 | ⏳ Planned |
| **3.2** True i18n Routing | 🟢 Medium | 12-16h | Medium | 2.4 | 3 | ⏳ Planned |
| **3.3** GitHub Actions CI | 🟢 Medium | 6-8h | Low | None | 3 | ⏳ Planned |
| **3.4** E2E Testing | 🔵 Low | 10-14h | Low | 3.3 | 3 | ⏳ Planned |
| **3.5** Advanced Images | 🔵 Low | 6-8h | Low | 2.3 | 3 | ⏳ Planned |
| **3.6** WCAG Compliance | 🔵 Low | 8-12h | Low | 1.6 | 3 | ⏳ Planned |

**Total Estimated Effort:** 72-102 hours
**Expected Timeline:** 3-6 months
**Expected Impact:** 15-30% additional performance improvement, improved SEO, better UX

---

## Success Criteria & KPIs

### Performance Metrics

**Target Goals (Post-Roadmap):**
- [ ] First Contentful Paint: < 500ms (currently 548ms)
- [ ] Largest Contentful Paint: < 1.5s
- [ ] Cumulative Layout Shift: < 0.1
- [ ] Time to Interactive: < 2s
- [ ] Total Blocking Time: < 200ms
- [ ] Lighthouse Performance Score: 98+

**Measurement Tools:**
- Vercel Speed Insights (real user monitoring)
- Google PageSpeed Insights
- WebPageTest.org
- Lighthouse CI

---

### SEO Metrics

**Target Goals:**
- [ ] Google Search Console: 0 sitemap errors
- [ ] Google Search Console: 0 mobile usability issues
- [ ] Organic search traffic: +30% (6 months)
- [ ] Average position in SERPs: Top 10 for key terms
- [ ] Indexed pages: 8 pages (4 per language × 2 if implementing i18n routing)
- [ ] Backlinks: Track and grow over time

**Key Search Terms (Slovak/German/English):**
- "mobilný servis pneumatík" / "mobiler Reifenservice" / "mobile tire service"
- "pneumatiky pre kamióny" / "LKW-Reifen" / "truck tires"
- "LINGLONG pneumatiky" / "LINGLONG Reifen" / "LINGLONG tires"

---

### User Experience Metrics

**Target Goals:**
- [ ] Bounce rate: < 40%
- [ ] Average session duration: > 2 minutes
- [ ] Pages per session: > 2.5
- [ ] Contact form conversion rate: > 3%
- [ ] Mobile users: > 60% of traffic
- [ ] Returning visitors: > 20%

---

### Technical Quality Metrics

**Target Goals:**
- [ ] Lighthouse Accessibility Score: 100
- [ ] Lighthouse Best Practices Score: 100
- [ ] Lighthouse SEO Score: 100
- [ ] Lighthouse PWA Score: 100 (Phase 3)
- [ ] securityheaders.com Grade: A+
- [ ] WCAG 2.1 AA Compliance: 100%
- [ ] TypeScript strict mode: 0 errors
- [ ] ESLint warnings: 0

---

### Business Metrics

**Target Goals:**
- [ ] Lead generation: +50% via contact form
- [ ] Cost per lead: Track and optimize
- [ ] Geographic reach: Expand to new regions
- [ ] Language distribution: Track SK vs DE vs EN traffic
- [ ] Mobile conversions: Match or exceed desktop

---

## Risk Assessment

### High Risk Items

**1. Multi-language Routing Refactor (3.2)**
- **Risk:** Breaking existing functionality, SEO regression
- **Mitigation:** Implement on staging first, use 301 redirects, test extensively
- **Contingency:** Keep client-side switching as fallback

**2. Security Headers Implementation (1.5)**
- **Risk:** Breaking third-party integrations (analytics, fonts)
- **Mitigation:** Implement incrementally, test each header separately
- **Contingency:** Relax CSP if needed, use report-only mode first

**3. Contact Form Integration (2.5)**
- **Risk:** Email delivery issues, spam attacks
- **Mitigation:** Use reputable service (Web3Forms/Formspree), implement honeypot
- **Contingency:** Have backup email service ready

---

### Medium Risk Items

**4. Service Worker Implementation (3.1)**
- **Risk:** Caching issues causing stale content
- **Mitigation:** Use versioned caching, implement update prompts
- **Contingency:** Disable service worker if issues arise

**5. Image Optimization (2.3, 3.5)**
- **Risk:** Quality degradation, slower build times
- **Mitigation:** Test image quality thresholds, optimize build process
- **Contingency:** Revert to original images if quality suffers

---

### Low Risk Items

**6. Analytics Integration (2.1, 2.2)**
- **Risk:** Privacy concerns, GDPR compliance
- **Mitigation:** Use privacy-friendly options (Vercel Analytics), add cookie banner if needed
- **Contingency:** Use server-side analytics only

---

## Dependencies

### External Dependencies

**Required Third-party Services:**
- Google Search Console (free)
- Google Analytics 4 (free)
- Vercel Analytics (free tier)
- Email service (Web3Forms/Formspree free tier)
- Image optimization tools (sharp-cli, ImageOptim)

**Optional Services:**
- Canva (for image generation)
- Lighthouse CI (free)
- securityheaders.com (free)

---

### Technical Dependencies

**Package Installations:**
```json
{
  "dependencies": {
    "@vercel/analytics": "^1.x",
    "@vercel/speed-insights": "^1.x",
    "@next/third-parties": "^14.x"
  },
  "devDependencies": {
    "next-pwa": "^5.x",
    "plaiceholder": "^3.x",
    "@playwright/test": "^1.x"
  }
}
```

---

### Knowledge Dependencies

**Research Required:**
- Next.js i18n routing best practices (for 3.2)
- WCAG 2.1 AA compliance requirements (for 3.6)
- CSP header configuration (for 1.5)
- Service worker caching strategies (for 3.1)

**Documentation to Review:**
- Next.js documentation: https://nextjs.org/docs
- Vercel documentation: https://vercel.com/docs
- Playwright documentation: https://playwright.dev
- WCAG guidelines: https://www.w3.org/WAI/WCAG21/quickref/

---

## Appendix: Technical Details

### A. Recommended Tools

**Performance Analysis:**
- [WebPageTest](https://www.webpagetest.org/) - Detailed performance analysis
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci) - Automated performance testing
- [Bundle Analyzer](https://www.npmjs.com/package/@next/bundle-analyzer) - JavaScript bundle analysis

**Image Optimization:**
- [sharp-cli](https://github.com/vseventer/sharp-cli) - Command-line image processing
- [ImageOptim](https://imageoptim.com/) - Mac app for image compression
- [Squoosh](https://squoosh.app/) - Web-based image optimizer

**SEO Tools:**
- [Google Search Console](https://search.google.com/search-console) - Search performance monitoring
- [Screaming Frog](https://www.screamingfrog.co.uk/seo-spider/) - Site crawler
- [Ahrefs Webmaster Tools](https://ahrefs.com/webmaster-tools) - SEO analysis

**Accessibility Testing:**
- [axe DevTools](https://www.deque.com/axe/devtools/) - Browser extension for a11y testing
- [WAVE](https://wave.webaim.org/) - Web accessibility evaluation tool
- [Accessibility Insights](https://accessibilityinsights.io/) - Microsoft's a11y testing tool

**Analytics:**
- [Vercel Analytics](https://vercel.com/analytics) - Privacy-friendly analytics
- [Google Analytics 4](https://analytics.google.com/) - Comprehensive analytics
- [Plausible](https://plausible.io/) - Privacy-focused alternative

---

### B. Environment Variables

**Required `.env.local` variables:**

```bash
# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Google Search Console
NEXT_PUBLIC_GOOGLE_VERIFICATION=abc123xyz456

# Email Service (Web3Forms example)
NEXT_PUBLIC_WEB3FORMS_KEY=your-access-key-here

# Vercel Analytics (automatically provided by Vercel)
# VERCEL_ANALYTICS_ID - No manual setup needed
```

---

### C. Build Configuration Updates

**vercel.json (Security Headers & Redirects):**
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "SAMEORIGIN"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "camera=(), microphone=(), geolocation=()"
        },
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://www.google-analytics.com https://analytics.google.com; frame-src 'self';"
        }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/services",
      "destination": "/",
      "permanent": true
    },
    {
      "source": "/contact",
      "destination": "/",
      "permanent": true
    }
  ]
}
```

**next.config.js (PWA & Bundle Analyzer):**
```javascript
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(
  withPWA({
    // Existing Next.js config
    images: {
      formats: ['image/avif', 'image/webp'],
      deviceSizes: [640, 750, 828, 1080, 1200, 1920],
      imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },
    experimental: {
      optimizeCss: true,
    },
  })
);
```

---

### D. Testing Checklist Template

**Pre-deployment Checklist:**

```markdown
## Performance
- [ ] `npm run build` shows all pages as ○ Static
- [ ] First Contentful Paint < 1s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Cumulative Layout Shift < 0.1
- [ ] Total Blocking Time < 200ms
- [ ] Lighthouse Performance Score > 95

## SEO
- [ ] Sitemap.xml generates correctly
- [ ] Robots.txt configured properly
- [ ] All pages have unique meta descriptions
- [ ] Open Graph images display on social media
- [ ] Google Search Console shows 0 errors
- [ ] Structured data validates

## Accessibility
- [ ] Lighthouse Accessibility Score > 95
- [ ] All images have alt text
- [ ] Color contrast ratio > 4.5:1
- [ ] Keyboard navigation works
- [ ] Screen reader announces correctly
- [ ] Focus indicators visible

## Functionality
- [ ] Language switcher works on all pages
- [ ] All internal links work
- [ ] Contact form validates and submits
- [ ] Certificate modals open PDFs
- [ ] Product gallery displays all categories
- [ ] Mobile navigation works

## Security
- [ ] Security headers present
- [ ] No console errors or warnings
- [ ] No 404 errors
- [ ] HTTPS enforced
- [ ] CSP configured correctly

## Analytics
- [ ] Google Analytics tracking works
- [ ] Vercel Analytics active
- [ ] Custom events fire correctly
- [ ] Conversions tracked

## Cross-browser
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)
```

---

### E. Post-Implementation Review Template

**After each phase, conduct a review:**

```markdown
## Phase [N] Review - [Date]

### Completed Tasks
- [x] Task 1 - [Notes]
- [x] Task 2 - [Notes]

### Metrics Before/After
| Metric | Before | After | Change |
|--------|--------|-------|--------|
| FCP | Xms | Yms | Z% |
| LCP | Xms | Yms | Z% |
| CLS | X | Y | Z% |

### Issues Encountered
1. Issue description
   - Resolution:
   - Time spent:

### Lessons Learned
- Lesson 1
- Lesson 2

### Recommendations for Next Phase
- Recommendation 1
- Recommendation 2

### Sign-off
- [ ] All success criteria met
- [ ] Documentation updated
- [ ] Client notified
- [ ] Ready for next phase
```

---

## Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-01-28 | Claude Code | Initial roadmap creation |

---

## Contact & Support

**Project Lead:** Thomas Gradinar
**Repository:** https://github.com/[username]/hubtrac-1, hubtrac-2
**Deployment:** Vercel
**Documentation:** /docs/ in each repository

**External Resources:**
- Next.js Discord: https://nextjs.org/discord
- Vercel Support: https://vercel.com/support
- Stack Overflow: Tag `next.js`

---

**End of Roadmap**
