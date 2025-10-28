/**
 * Google Analytics 4 Integration
 * Track page views, events, and conversions
 */

// Google Analytics Measurement ID
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX'; // TO ADD: Replace with actual GA4 ID

// Page view tracking
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

// Event tracking
type GtagEvent = {
  action: string;
  category: string;
  label?: string;
  value?: number;
};

export const event = ({ action, category, label, value }: GtagEvent) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Predefined events for HUBTRAC mobile service

// Contact form submission
export const trackContactFormSubmit = () => {
  event({
    action: 'submit',
    category: 'Contact Form',
    label: 'Contact form submitted',
  });
};

// Phone number click (call tracking)
export const trackPhoneClick = (phoneNumber: string) => {
  event({
    action: 'click',
    category: 'Contact',
    label: `Phone clicked: ${phoneNumber}`,
  });
};

// Service request
export const trackServiceRequest = (serviceType: string) => {
  event({
    action: 'request',
    category: 'Service',
    label: `Service requested: ${serviceType}`,
  });
};

// Language switcher
export const trackLanguageChange = (fromLang: string, toLang: string) => {
  event({
    action: 'change',
    category: 'Language',
    label: `Language changed from ${fromLang} to ${toLang}`,
  });
};

// Emergency service button click
export const trackEmergencyServiceClick = () => {
  event({
    action: 'click',
    category: 'Emergency Service',
    label: 'Emergency service button clicked',
  });
};

// Tire category view
export const trackTireCategoryView = (category: string) => {
  event({
    action: 'view',
    category: 'Tire Category',
    label: `Category viewed: ${category}`,
  });
};

// Scroll depth tracking
export const trackScrollDepth = (depth: number) => {
  event({
    action: 'scroll',
    category: 'Engagement',
    label: `Scrolled to ${depth}%`,
    value: depth,
  });
};

// Time on page tracking
export const trackTimeOnPage = (seconds: number) => {
  event({
    action: 'time_on_page',
    category: 'Engagement',
    label: 'Time spent on page',
    value: seconds,
  });
};

// Conversion tracking

// Track quote request conversion
export const trackQuoteRequest = () => {
  event({
    action: 'conversion',
    category: 'Lead Generation',
    label: 'Quote requested',
  });
};

// Track emergency service booking conversion
export const trackEmergencyBooking = () => {
  event({
    action: 'conversion',
    category: 'Lead Generation',
    label: 'Emergency service booked',
  });
};

// Enhanced e-commerce tracking (if applicable)
export const trackProductView = (productId: string, productName: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'view_item', {
      items: [
        {
          item_id: productId,
          item_name: productName,
        },
      ],
    });
  }
};

// Type declaration for gtag
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event',
      targetId: string,
      config?: Record<string, any>
    ) => void;
  }
}

// Hook for tracking route changes in App Router
export const usePageTracking = () => {
  if (typeof window !== 'undefined') {
    // Track initial page view
    pageview(window.location.pathname);

    // For App Router, you'll need to implement route change detection
    // This is typically done in a layout component with usePathname()
  }
};

/**
 * Analytics Script Component
 * Add this to layout.tsx to enable Google Analytics
 *
 * Usage:
 * import { AnalyticsScript } from '@/lib/analytics';
 *
 * In <head>:
 * <AnalyticsScript />
 */
export const AnalyticsScript = () => {
  if (process.env.NODE_ENV !== 'production' || !GA_MEASUREMENT_ID) {
    return null;
  }

  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              anonymize_ip: true,
              cookie_flags: 'SameSite=None;Secure'
            });
          `,
        }}
      />
    </>
  );
};
