/**
 * SEO Configuration for HUBTRAC Mobile Tire Service
 * Centralized SEO settings for multi-language support
 */

export const seoConfig = {
  defaultLocale: 'en',
  locales: ['en', 'sk', 'de'],
  baseUrl: 'https://hubtrac-mobile-service.vercel.app', // Update with actual domain
};

// Language-specific metadata
export const languageMetadata = {
  en: {
    title: 'HUBTRAC Mobile Tire Service | Professional Truck Tire Solutions',
    description: 'Professional mobile tire service for commercial trucks in Europe. 24/7 emergency tire replacement with 49+ years experience, 800+ partners across 9 factories. HUBTRAC certified tires with 6-year warranty. Service in Slovakia, Germany, and Austria.',
    keywords: [
      'mobile tire service',
      'truck tires',
      'commercial vehicle tires',
      'HUBTRAC',
      'tire replacement',
      'emergency tire service',
      '24/7 tire service',
      'heavy duty tires',
      'fleet tire service',
      'commercial tire replacement',
      'truck tire emergency',
    ],
    lang: 'en',
    locale: 'en_US',
  },
  sk: {
    title: 'HUBTRAC Mobilný Servis Pneumatík | Profesionálne Riešenia pre Nákladné Vozidlá',
    description: 'Profesionálny mobilný servis pneumatík pre nákladné vozidlá v Európe. 24/7 núdzová výmena pneumatík s viac ako 49-ročnými zkúsenosťami, 800+ partnerov v 9 továrňach. HUBTRAC certifikované pneumatiky so 6-ročnou zárukou. Služby na Slovensku, v Nemecku a Rakúsku.',
    keywords: [
      'mobilný servis pneumatík',
      'pneumatiky pre kamióny',
      'pneumatiky pre nákladné vozidlá',
      'HUBTRAC',
      'výmena pneumatík',
      'núdzový servis pneumatík',
      '24/7 servis pneumatík',
      'pneumatiky na ťažké vozidlá',
      'servis pneumatík pre flotily',
      'výmena pneumatík na nákladné vozidlá',
    ],
    lang: 'sk',
    locale: 'sk_SK',
  },
  de: {
    title: 'HUBTRAC Mobiler Reifenservice | Professionelle LKW-Reifenlösungen',
    description: 'Professioneller mobiler Reifenservice für Nutzfahrzeuge in Europa. 24/7 Notreifen-Austausch mit über 49 Jahren Erfahrung, 800+ Partner in 9 Fabriken. HUBTRAC zertifizierte Reifen mit 6 Jahren Garantie. Service in der Slowakei, Deutschland und Österreich.',
    keywords: [
      'mobiler Reifenservice',
      'LKW-Reifen',
      'Nutzfahrzeugreifen',
      'HUBTRAC',
      'Reifenwechsel',
      'Notfall-Reifenservice',
      '24/7 Reifenservice',
      'Schwerlastreifen',
      'Flottenreifenservice',
      'Nutzfahrzeug-Reifenwechsel',
      'LKW-Reifen Notdienst',
    ],
    lang: 'de',
    locale: 'de_DE',
  },
};

// Generate hreflang links for multi-language support
export function generateHreflangLinks(currentPath: string = '/') {
  return seoConfig.locales.map((locale) => ({
    rel: 'alternate',
    hreflang: locale,
    href: `${seoConfig.baseUrl}/${locale}${currentPath}`,
  }));
}

// Generate canonical URL
export function getCanonicalUrl(path: string = '/', locale?: string) {
  const localePath = locale ? `/${locale}` : '';
  return `${seoConfig.baseUrl}${localePath}${path}`;
}

// Page-specific metadata generator
export function generatePageMetadata(
  pageKey: string,
  locale: string = 'en',
  customData?: Partial<typeof languageMetadata.en>
) {
  const langData = languageMetadata[locale as keyof typeof languageMetadata] || languageMetadata.en;

  return {
    title: customData?.title || langData.title,
    description: customData?.description || langData.description,
    keywords: customData?.keywords || langData.keywords,
    lang: langData.lang,
    locale: langData.locale,
  };
}

// Open Graph image dimensions
export const ogImageConfig = {
  width: 1200,
  height: 630,
  alt: 'HUBTRAC Mobile Tire Service - Professional Truck Tire Solutions',
};

// Twitter image dimensions
export const twitterImageConfig = {
  width: 1200,
  height: 600,
  alt: 'HUBTRAC Mobile Tire Service - Professional Truck Tire Solutions',
};

// Core Web Vitals targets
export const performanceTargets = {
  LCP: 2500, // Largest Contentful Paint (ms)
  FID: 100,  // First Input Delay (ms)
  CLS: 0.1,  // Cumulative Layout Shift
  FCP: 1800, // First Contentful Paint (ms)
  TTI: 3800, // Time to Interactive (ms)
  TBT: 300,  // Total Blocking Time (ms)
};

// SEO best practices checklist
export const seoChecklist = {
  technical: [
    'Sitemap.xml generated and submitted',
    'Robots.txt configured',
    'Canonical URLs set',
    'Hreflang tags for multi-language',
    'Meta robots tags',
    'XML sitemap updated',
    'Google Search Console verified',
    'Bing Webmaster Tools verified',
  ],
  content: [
    'H1 tag on every page (one per page)',
    'Proper heading hierarchy (H1 > H2 > H3)',
    'Meta descriptions (150-160 characters)',
    'Alt text for all images',
    'Descriptive URLs',
    'Internal linking structure',
    'External links open in new tab',
    'Content length 300+ words per page',
  ],
  performance: [
    'Images optimized (WebP format)',
    'Next.js Image component used',
    'Lazy loading implemented',
    'Code splitting enabled',
    'CSS and JS minified',
    'Core Web Vitals pass',
    'Mobile-first responsive design',
    'PageSpeed score 95+',
  ],
  structured_data: [
    'Organization schema',
    'LocalBusiness schema',
    'Service schema',
    'Product schema',
    'BreadcrumbList schema',
    'FAQ schema (if applicable)',
    'Review schema (if applicable)',
  ],
  social: [
    'Open Graph tags',
    'Twitter Card tags',
    'Social media images (1200x630px)',
    'Favicon and app icons',
    'Web manifest',
  ],
};
