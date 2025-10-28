# SEO Quick Start Guide - HUBTRAC Mobile Tire Service

**5-Minute Quick Reference** for updating critical SEO elements

---

## 1. Update Domain URL (CRITICAL - Do First)

Find and replace `https://hubtrac-mobile-service.vercel.app` with your actual domain in these 5 files:

### File 1: `/src/app/layout.tsx`
```typescript
// Line 17
metadataBase: new URL('https://YOUR-DOMAIN.com'),

// Line 65
url: 'https://YOUR-DOMAIN.com',

// Line 86
canonical: 'https://YOUR-DOMAIN.com',

// Lines 88-90
languages: {
  'en': 'https://YOUR-DOMAIN.com/en',
  'sk': 'https://YOUR-DOMAIN.com/sk',
  'de': 'https://YOUR-DOMAIN.com/de',
},
```

### File 2: `/src/app/sitemap.ts`
```typescript
// Line 4
const baseUrl = 'https://YOUR-DOMAIN.com';
```

### File 3: `/src/app/robots.ts`
```typescript
// Line 4
const baseUrl = 'https://YOUR-DOMAIN.com';
```

### File 4: `/src/components/StructuredData.tsx`
```typescript
// Lines 13, 19, 22, 35, 37, 38, 58, 59, 73, 106, 140
// Replace all instances of hubtrac-mobile-service.vercel.app with YOUR-DOMAIN.com
```

### File 5: `/src/lib/seo-config.ts`
```typescript
// Line 10
baseUrl: 'https://YOUR-DOMAIN.com',
```

**Fast Method**: Use global find/replace in your editor:
```
Find: https://hubtrac-mobile-service.vercel.app
Replace: https://YOUR-DOMAIN.com
```

---

## 2. Add Google Analytics (5 minutes)

### Step 1: Create GA4 Property
1. Go to https://analytics.google.com
2. Click "Admin" → "Create Property"
3. Get your Measurement ID (format: `G-XXXXXXXXXX`)

### Step 2: Add to Environment
Create `/hubtrac-1/.env.local`:
```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Step 3: Enable Analytics
In `/src/app/layout.tsx`, add to the `<head>` section:
```typescript
import { AnalyticsScript } from '@/lib/analytics';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Add this line */}
        <AnalyticsScript />

        <link rel="icon" href="/favicon.ico" sizes="any" />
        {/* ... rest of head */}
      </head>
      {/* ... */}
    </html>
  );
}
```

---

## 3. Add Company Information (5 minutes)

Edit `/src/components/StructuredData.tsx`:

### Update Phone Number
```typescript
// Line 15
telephone: '+421-XXX-XXX-XXX', // Replace with actual phone

// Line 47
telephone: '+421-XXX-XXX-XXX', // Replace with actual phone
```

### Update Address
```typescript
// Lines 48-53
address: {
  '@type': 'PostalAddress',
  streetAddress: 'Your Street Address',
  addressLocality: 'Your City',
  postalCode: 'Your ZIP',
  addressCountry: 'SK', // SK, DE, or AT
},
```

### Update Coordinates
```typescript
// Lines 54-58
geo: {
  '@type': 'GeoCoordinates',
  latitude: 48.1486,  // Your latitude
  longitude: 17.1077, // Your longitude
},
```

**Find Your Coordinates**: Go to Google Maps, right-click your location, copy coordinates.

---

## 4. Create Required Images (30 minutes)

Create these images and place in `/public/` folder:

| Image | Size | Format | Purpose |
|-------|------|--------|---------|
| `favicon.ico` | 32x32px | ICO | Browser tab icon |
| `icon.svg` | Scalable | SVG | Modern browsers icon |
| `apple-touch-icon.png` | 180x180px | PNG | iOS home screen |
| `icon-192.png` | 192x192px | PNG | PWA icon (small) |
| `icon-512.png` | 512x512px | PNG | PWA icon (large) |
| `og-image.jpg` | 1200x630px | JPG | Facebook/LinkedIn share |
| `twitter-image.jpg` | 1200x600px | JPG | Twitter share |
| `logo.png` | Variable | PNG | Company logo |

**Quick Tool**: Use Canva, Figma, or Photoshop to create these images.

**OG Image Tips**:
- Include company logo
- Add tagline: "Professional Mobile Tire Service"
- Use brand colors (#DC2626 red)
- Keep text large and readable

---

## 5. Verify Google Search Console (10 minutes)

### Step 1: Add Property
1. Go to https://search.google.com/search-console
2. Click "Add Property"
3. Enter your domain URL

### Step 2: Verify Ownership
Choose "HTML tag" method:

1. Copy verification code from Search Console
2. Edit `/src/app/layout.tsx`:
```typescript
// Line 94
verification: {
  google: 'YOUR-VERIFICATION-CODE', // Paste code here
},
```
3. Deploy your site
4. Click "Verify" in Search Console

### Step 3: Submit Sitemap
1. In Search Console, go to "Sitemaps"
2. Enter: `sitemap.xml`
3. Click "Submit"

---

## 6. Update Page Titles & Descriptions

### Homepage: `/src/app/page.tsx`
Add at the top of the file:
```typescript
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home', // Will become "Home | HUBTRAC Mobile Service"
  description: 'Professional mobile tire service for commercial trucks...',
};
```

### Create About Page: `/src/app/about/page.tsx`
```typescript
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about HUBTRAC mobile tire service...',
};

export default function AboutPage() {
  return (
    <div>
      <h1>About HUBTRAC Mobile Tire Service</h1>
      {/* Your content */}
    </div>
  );
}
```

---

## 7. Test Your SEO (15 minutes)

Run these tests before launch:

### Test 1: Sitemap
Visit: `https://YOUR-DOMAIN.com/sitemap.xml`
Should show XML sitemap with all pages.

### Test 2: Robots.txt
Visit: `https://YOUR-DOMAIN.com/robots.txt`
Should show robot directives.

### Test 3: Structured Data
1. Go to: https://search.google.com/test/rich-results
2. Enter your homepage URL
3. Fix any errors shown

### Test 4: Mobile-Friendly
1. Go to: https://search.google.com/test/mobile-friendly
2. Enter your homepage URL
3. Ensure it passes

### Test 5: PageSpeed
1. Go to: https://pagespeed.web.dev/
2. Enter your homepage URL
3. Target: 95+ score on mobile and desktop

### Test 6: Open Graph
1. Go to: https://developers.facebook.com/tools/debug/
2. Enter your homepage URL
3. Check preview looks correct

---

## 8. Monitor Performance (Daily for First Week)

### Google Search Console
Check daily:
- Coverage (are pages being indexed?)
- Performance (impressions, clicks, CTR)
- Core Web Vitals (LCP, FID, CLS)
- Mobile Usability (any issues?)

### Google Analytics
Check daily:
- Real-time users
- User acquisition sources
- Page views
- Bounce rate
- Average session duration

### PageSpeed Insights
Check weekly:
- Performance score (target 95+)
- Core Web Vitals
- Opportunities for improvement

---

## Common Issues & Quick Fixes

### Issue: Sitemap Not Working
**Fix**: Check that `/src/app/sitemap.ts` is correctly exported. Restart dev server.

### Issue: Images Not Loading
**Fix**: Ensure images are in `/public/` folder, not `/src/`. Use `/image.png` not `./image.png`.

### Issue: Analytics Not Tracking
**Fix**:
1. Check `.env.local` has correct GA_MEASUREMENT_ID
2. Verify `<AnalyticsScript />` is in layout.tsx
3. Check browser console for errors
4. Wait 24 hours for data to appear

### Issue: Low PageSpeed Score
**Fix**:
1. Convert all images to WebP format
2. Use Next.js Image component
3. Enable lazy loading
4. Minimize JavaScript

### Issue: Search Console Errors
**Fix**:
1. Check Coverage report for specific errors
2. Common fix: Add missing alt text to images
3. Fix broken links
4. Ensure all pages have unique titles

---

## Priority Checklist (Do in Order)

1. [ ] Update domain URL in all 5 files (5 min)
2. [ ] Add Google Analytics ID (5 min)
3. [ ] Add company phone, address, coordinates (5 min)
4. [ ] Create 8 required images (30 min)
5. [ ] Verify Google Search Console (10 min)
6. [ ] Submit sitemap to Search Console (2 min)
7. [ ] Test sitemap.xml loads (1 min)
8. [ ] Test robots.txt loads (1 min)
9. [ ] Validate structured data (5 min)
10. [ ] Run PageSpeed test (5 min)
11. [ ] Test on mobile device (5 min)
12. [ ] Check Analytics is tracking (24 hours later)

**Total Time**: 1-2 hours

---

## Need More Help?

- Full documentation: `/docs/SEO.md`
- Complete checklist: `/docs/SEO-CHECKLIST.md`
- Implementation summary: `/docs/SEO-IMPLEMENTATION-SUMMARY.md`

---

**Last Updated**: 2025-10-28
**Estimated Setup Time**: 1-2 hours
**Difficulty**: Beginner-friendly
