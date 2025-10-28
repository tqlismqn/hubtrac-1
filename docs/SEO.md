# SEO Documentation for HUBTRAC Mobile Tire Service

This document provides comprehensive guidance on SEO implementation, maintenance, and best practices for the HUBTRAC mobile tire service landing pages.

## Table of Contents

1. [SEO Infrastructure Overview](#seo-infrastructure-overview)
2. [Meta Tags Management](#meta-tags-management)
3. [Multi-Language SEO](#multi-language-seo)
4. [Structured Data](#structured-data)
5. [Google Search Console Setup](#google-search-console-setup)
6. [Analytics Integration](#analytics-integration)
7. [Performance Optimization](#performance-optimization)
8. [Content Guidelines](#content-guidelines)
9. [SEO Checklist](#seo-checklist)
10. [Future Improvements](#future-improvements)

---

## SEO Infrastructure Overview

The site is built with Next.js 14+ and includes comprehensive SEO features:

- **Dynamic sitemap.xml** - Auto-generated at `/sitemap.xml`
- **Robots.txt** - Search engine directives at `/robots.txt`
- **Structured data** - Schema.org JSON-LD markup
- **Multi-language support** - English, Slovak, German
- **Open Graph tags** - Social media optimization
- **Google Analytics 4** - Tracking and conversion monitoring

### Key Files

- `/src/app/layout.tsx` - Main metadata configuration
- `/src/app/sitemap.ts` - Dynamic sitemap generator
- `/src/app/robots.ts` - Robots.txt configuration
- `/src/components/StructuredData.tsx` - Schema.org markup
- `/src/lib/seo-config.ts` - Centralized SEO settings
- `/src/lib/analytics.ts` - Google Analytics integration

---

## Meta Tags Management

### Updating Site Metadata

Edit `/src/app/layout.tsx` to update global metadata:

```typescript
export const metadata: Metadata = {
  metadataBase: new URL('https://your-domain.com'), // UPDATE THIS
  title: {
    default: 'Your Title',
    template: '%s | HUBTRAC Mobile Service'
  },
  description: 'Your description (150-160 characters)',
  // ... other metadata
}
```

### Important Meta Tags to Update

1. **Domain/URL**: Replace `https://hubtrac-mobile-service.vercel.app` with your actual domain
2. **Title**: Keep under 60 characters for optimal display
3. **Description**: 150-160 characters, include primary keywords
4. **Keywords**: Add relevant keywords for your target markets
5. **Contact Information**: Update phone numbers, addresses in structured data

### Page-Specific Metadata

For individual pages, override metadata in the page component:

```typescript
// src/app/about/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about our mobile tire service...',
};
```

---

## Multi-Language SEO

### Supported Languages

- **English (en)** - Primary language
- **Slovak (sk)** - Slovakia market
- **German (de)** - Germany and Austria markets

### Language Configuration

SEO settings for each language are in `/src/lib/seo-config.ts`:

```typescript
export const languageMetadata = {
  en: { ... },
  sk: { ... },
  de: { ... },
}
```

### Implementing Hreflang Tags

Hreflang tags help Google understand language variations:

```html
<link rel="alternate" hreflang="en" href="https://domain.com/en" />
<link rel="alternate" hreflang="sk" href="https://domain.com/sk" />
<link rel="alternate" hreflang="de" href="https://domain.com/de" />
```

These are automatically generated via the `generateHreflangLinks()` function.

### Adding a New Language

1. Add language code to `seoConfig.locales` in `/src/lib/seo-config.ts`
2. Add language metadata to `languageMetadata` object
3. Update sitemap.ts to include new language routes
4. Create translated content files
5. Update `alternates.languages` in layout.tsx

---

## Structured Data

### Available Schema Types

The site includes these Schema.org types:

1. **Organization** - Company information
2. **LocalBusiness** - Location and contact details
3. **Service** - Mobile tire service offerings
4. **Product** - HUBTRAC tire products
5. **BreadcrumbList** - Navigation breadcrumbs

### Updating Structured Data

Edit `/src/components/StructuredData.tsx`:

```typescript
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'HUBTRAC Mobile Tire Service',
  telephone: '+421-XXX-XXX-XXX', // UPDATE
  address: {
    streetAddress: 'Your Address', // UPDATE
    addressLocality: 'City',
    postalCode: 'ZIP',
    addressCountry: 'SK',
  },
  // ... more fields
}
```

### Testing Structured Data

Use Google's Rich Results Test:
- URL: https://search.google.com/test/rich-results
- Paste your page URL or HTML code
- Fix any errors or warnings

### Adding Reviews/Ratings Schema

If you collect customer reviews:

```typescript
const reviewSchema = {
  '@context': 'https://schema.org',
  '@type': 'Review',
  itemReviewed: {
    '@type': 'Service',
    name: 'HUBTRAC Mobile Tire Service',
  },
  reviewRating: {
    '@type': 'Rating',
    ratingValue: '5',
    bestRating: '5',
  },
  author: {
    '@type': 'Person',
    name: 'Customer Name',
  },
  reviewBody: 'Review text...',
}
```

---

## Google Search Console Setup

### Step 1: Verify Ownership

1. Go to https://search.google.com/search-console
2. Add your property (domain or URL prefix)
3. Choose verification method:
   - **HTML tag** (recommended): Add to `layout.tsx` metadata:
     ```typescript
     verification: {
       google: 'your-verification-code',
     }
     ```
   - **HTML file**: Upload to `/public/google[code].html`
   - **DNS record**: Add TXT record to domain DNS

### Step 2: Submit Sitemap

1. In Search Console, go to "Sitemaps"
2. Submit your sitemap URL: `https://your-domain.com/sitemap.xml`
3. Google will crawl and index your pages

### Step 3: Monitor Performance

Track these metrics in Search Console:

- **Impressions** - How often your site appears in search
- **Clicks** - How many users click through
- **CTR** - Click-through rate (clicks/impressions)
- **Average Position** - Your average ranking position
- **Coverage** - Which pages are indexed
- **Core Web Vitals** - Performance metrics

### Step 4: Request Indexing

For new or updated pages:
1. Go to URL Inspection tool
2. Enter the page URL
3. Click "Request Indexing"

---

## Analytics Integration

### Google Analytics 4 Setup

1. Create GA4 property at https://analytics.google.com
2. Get your Measurement ID (format: `G-XXXXXXXXXX`)
3. Add to environment variables:
   ```bash
   # .env.local
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```
4. Update `/src/lib/analytics.ts` with your ID

### Adding Analytics Script

In `/src/app/layout.tsx`, add to `<head>`:

```typescript
import { AnalyticsScript } from '@/lib/analytics';

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <AnalyticsScript />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### Tracking Events

Use predefined tracking functions:

```typescript
import {
  trackContactFormSubmit,
  trackPhoneClick,
  trackEmergencyServiceClick
} from '@/lib/analytics';

// Track contact form submission
<button onClick={() => trackContactFormSubmit()}>
  Submit
</button>

// Track phone click
<a href="tel:+421xxxxxx" onClick={() => trackPhoneClick('+421xxxxxx')}>
  Call Us
</a>
```

### Custom Events

Add new tracking events in `/src/lib/analytics.ts`:

```typescript
export const trackCustomEvent = (eventName: string) => {
  event({
    action: 'custom_action',
    category: 'Custom Category',
    label: eventName,
  });
};
```

### Conversion Tracking

Set up goals in GA4:
1. Go to Admin → Events → Create Event
2. Define conversion events (quote requests, form submissions)
3. Mark as conversion in GA4 interface

---

## Performance Optimization

### Core Web Vitals Targets

- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1
- **FCP (First Contentful Paint)**: < 1.8s

### Image Optimization

All images must be:
- Converted to **WebP format**
- Properly sized (not larger than display size)
- Lazy loaded (below-the-fold images)
- Using Next.js Image component

```typescript
import Image from 'next/image';

<Image
  src="/path/to/image.webp"
  alt="Descriptive alt text"
  width={800}
  height={600}
  loading="lazy" // or "eager" for above-fold
  quality={85}
/>
```

### Code Optimization

- Use dynamic imports for heavy components
- Minimize JavaScript bundle size
- Enable Next.js automatic code splitting
- Use font-display: swap for custom fonts

### Measuring Performance

Tools to use:
- **PageSpeed Insights**: https://pagespeed.web.dev/
- **Lighthouse** (Chrome DevTools)
- **Web Vitals Extension**: Chrome extension
- **Search Console Core Web Vitals Report**

Target: PageSpeed score **95+** on both mobile and desktop

---

## Content Guidelines

### Heading Hierarchy

Every page must have proper heading structure:

```html
<h1>Main Page Title</h1> <!-- ONE per page -->
  <h2>Section Title</h2>
    <h3>Subsection</h3>
    <h3>Subsection</h3>
  <h2>Another Section</h2>
    <h3>Subsection</h3>
```

### Alt Text for Images

Every image needs descriptive alt text:

```typescript
// Good
alt="HUBTRAC mobile tire service truck replacing tire on highway"

// Bad
alt="image1" or alt=""
```

### Internal Linking

Link related pages together:
- Use descriptive anchor text
- Link to relevant services/pages
- Maintain logical site structure
- Ensure all pages are reachable within 3 clicks from homepage

### Content Length

- **Homepage**: 300-500 words
- **Service pages**: 500-800 words
- **About page**: 400-600 words

Include keywords naturally, avoid keyword stuffing.

### Mobile Optimization

- Use responsive design (Tailwind CSS)
- Test on real mobile devices
- Ensure tap targets are at least 48x48px
- Avoid horizontal scrolling
- Use readable font sizes (16px minimum)

---

## SEO Checklist

### Before Launch

#### Technical SEO
- [ ] Sitemap.xml accessible at /sitemap.xml
- [ ] Robots.txt configured at /robots.txt
- [ ] Canonical URLs set for all pages
- [ ] Hreflang tags for multi-language pages
- [ ] Meta robots tags configured
- [ ] SSL certificate installed (HTTPS)
- [ ] 404 page created
- [ ] Redirects configured (if needed)

#### Content SEO
- [ ] Unique title tags for all pages (< 60 characters)
- [ ] Meta descriptions for all pages (150-160 characters)
- [ ] H1 tag on every page (one per page)
- [ ] Proper heading hierarchy (H1 > H2 > H3)
- [ ] Alt text for all images
- [ ] Descriptive URLs (no generic IDs)
- [ ] Internal linking structure
- [ ] Content length 300+ words per page

#### Performance
- [ ] All images converted to WebP
- [ ] Next.js Image component used
- [ ] Lazy loading implemented
- [ ] Core Web Vitals passing
- [ ] PageSpeed score 95+ (mobile & desktop)
- [ ] Mobile-responsive design tested
- [ ] Page load time < 3 seconds

#### Structured Data
- [ ] Organization schema added
- [ ] LocalBusiness schema added
- [ ] Service schema added
- [ ] Product schema added
- [ ] Structured data validated (Google Rich Results Test)

#### Social Media
- [ ] Open Graph tags configured
- [ ] Twitter Card tags configured
- [ ] Social images created (1200x630px)
- [ ] Favicon added
- [ ] Apple touch icon added

### After Launch

- [ ] Google Search Console verified
- [ ] Sitemap submitted to Search Console
- [ ] Bing Webmaster Tools verified (optional)
- [ ] Google Analytics 4 installed
- [ ] Conversion tracking configured
- [ ] Monitor Search Console for errors
- [ ] Track Core Web Vitals
- [ ] Monitor search rankings
- [ ] Analyze user behavior in Analytics

### Monthly Maintenance

- [ ] Review Search Console performance
- [ ] Check for crawl errors
- [ ] Monitor Core Web Vitals
- [ ] Update content as needed
- [ ] Add new keywords if relevant
- [ ] Check competitor rankings
- [ ] Review Analytics data
- [ ] Test page load speed

---

## Future Improvements

### Short-term (1-3 months)

1. **Local SEO Enhancement**
   - Add Google My Business listing
   - Get listed in local directories
   - Build local citations (NAP consistency)
   - Encourage customer reviews

2. **Content Expansion**
   - Add blog section for tire maintenance tips
   - Create FAQ page with schema markup
   - Add case studies/testimonials
   - Create service area pages (cities/regions)

3. **Link Building**
   - Partner websites backlinks
   - Industry directories
   - Local business associations
   - Press releases

### Medium-term (3-6 months)

1. **Advanced Analytics**
   - Set up conversion funnels
   - Implement enhanced e-commerce tracking
   - A/B testing for CTAs
   - Heatmap analysis (Hotjar/Microsoft Clarity)

2. **International SEO**
   - Add more language versions
   - Country-specific targeting
   - International link building
   - Localized content

3. **Technical Enhancements**
   - Implement AMP (Accelerated Mobile Pages)
   - Add Progressive Web App features
   - Improve time to interactive (TTI)
   - Optimize JavaScript bundle

### Long-term (6-12 months)

1. **Content Authority**
   - Comprehensive tire guide
   - Video content (service demonstrations)
   - Industry partnerships
   - Guest posting on authority sites

2. **Advanced Features**
   - Online booking system
   - Live chat integration
   - Customer portal
   - Mobile app

3. **Reputation Management**
   - Review generation system
   - Social proof widgets
   - Trust badges and certifications
   - Case study library

---

## Target Keywords by Language

### English Keywords
- Primary: mobile tire service, truck tires, commercial vehicle tires
- Secondary: emergency tire service, 24/7 tire service, fleet tire service
- Long-tail: mobile truck tire replacement near me, commercial tire service Slovakia

### Slovak Keywords
- Primary: mobilný servis pneumatík, pneumatiky pre kamióny
- Secondary: núdzový servis pneumatík, výmena pneumatík
- Long-tail: mobilný servis pneumatík Slovensko, výmena pneumatík kamión

### German Keywords
- Primary: mobiler Reifenservice, LKW-Reifen
- Secondary: Notfall-Reifenservice, Reifenwechsel
- Long-tail: mobiler LKW Reifenservice Deutschland, Nutzfahrzeug Reifenwechsel

---

## SEO Performance Metrics

### Current Targets

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| PageSpeed Score (Mobile) | 95+ | - | Pending |
| PageSpeed Score (Desktop) | 95+ | - | Pending |
| LCP | < 2.5s | - | Pending |
| FID | < 100ms | - | Pending |
| CLS | < 0.1 | - | Pending |
| Indexed Pages | 10+ | - | Pending |
| Organic Traffic | 500+/mo | - | Pending |

### Tracking Progress

Update this table monthly with actual metrics from:
- Google Search Console (organic traffic, impressions, CTR)
- PageSpeed Insights (performance scores)
- Google Analytics (user behavior, conversions)

---

## Resources and Tools

### Essential SEO Tools

1. **Google Search Console** - https://search.google.com/search-console
2. **Google Analytics 4** - https://analytics.google.com
3. **PageSpeed Insights** - https://pagespeed.web.dev/
4. **Google Rich Results Test** - https://search.google.com/test/rich-results
5. **Mobile-Friendly Test** - https://search.google.com/test/mobile-friendly

### Additional Tools

- **Ahrefs** - Keyword research and backlink analysis
- **SEMrush** - Competitor analysis and keyword tracking
- **Screaming Frog** - Technical SEO audit
- **GTmetrix** - Performance analysis
- **Ubersuggest** - Free keyword research

### Learning Resources

- Google Search Central: https://developers.google.com/search
- Next.js SEO Guide: https://nextjs.org/learn/seo/introduction-to-seo
- Web.dev Performance: https://web.dev/learn-core-web-vitals/

---

## Support and Questions

For SEO-related questions or issues:

1. Check this documentation first
2. Review Google Search Console for specific errors
3. Test with Google's validation tools
4. Consult Next.js SEO documentation
5. Contact technical support if needed

**Last Updated**: 2025-10-28
**Version**: 1.0
**Maintained by**: HUBTRAC Technical Team
