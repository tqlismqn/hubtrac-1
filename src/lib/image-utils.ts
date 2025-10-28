/**
 * Image utility functions for blur placeholders and optimization
 */

/**
 * Generates a simple base64 blur placeholder for images
 * This is a fallback blur that works without build-time image processing
 *
 * @param width - Width of the placeholder
 * @param height - Height of the placeholder
 * @param color - Hex color for the placeholder (default: gray)
 * @returns base64 data URL for use in Next.js Image blurDataURL
 */
export function generateBlurDataURL(
  width: number = 8,
  height: number = 8,
  color: string = '#e5e7eb'
): string {
  // Create a simple SVG blur placeholder
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <rect width="${width}" height="${height}" fill="${color}"/>
      <rect width="${width}" height="${height}" fill="url(#grain)" opacity="0.3"/>
      <defs>
        <filter id="blur">
          <feGaussianBlur stdDeviation="2"/>
        </filter>
        <pattern id="grain" width="4" height="4" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#000" opacity="0.05"/>
        </pattern>
      </defs>
    </svg>
  `.trim();

  // Convert to base64
  const base64 = Buffer.from(svg).toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
}

/**
 * Pre-generated blur placeholders for common use cases
 */
export const BLUR_DATA_URLS = {
  // Gray placeholder for general use
  gray: generateBlurDataURL(8, 8, '#e5e7eb'),

  // Red-tinted placeholder for HUBTRAC brand images
  brandRed: generateBlurDataURL(8, 8, '#fecaca'),

  // Dark placeholder for hero/background images
  dark: generateBlurDataURL(8, 8, '#374151'),

  // Light placeholder for product images
  light: generateBlurDataURL(8, 8, '#f3f4f6'),
} as const;

/**
 * Shimmer effect blur data URL
 * Creates an animated shimmer placeholder
 */
export const SHIMMER_DATA_URL = `data:image/svg+xml;base64,${Buffer.from(`
  <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
    <defs>
      <linearGradient id="shimmer" x1="0" x2="1" y1="0" y2="0">
        <stop offset="0%" stop-color="#f3f4f6"/>
        <stop offset="50%" stop-color="#e5e7eb">
          <animate attributeName="stop-color" values="#e5e7eb; #d1d5db; #e5e7eb" dur="2s" repeatCount="indefinite"/>
        </stop>
        <stop offset="100%" stop-color="#f3f4f6"/>
      </linearGradient>
    </defs>
    <rect width="100" height="100" fill="url(#shimmer)"/>
  </svg>
`).toString('base64')}`;

/**
 * Generate blur placeholder with custom gradient
 * Useful for tire images with specific brand colors
 */
export function generateGradientBlur(
  colors: string[] = ['#dc2626', '#991b1b']
): string {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          ${colors.map((color, i) => `<stop offset="${(i / (colors.length - 1)) * 100}%" stop-color="${color}"/>`).join('')}
        </linearGradient>
        <filter id="blur">
          <feGaussianBlur stdDeviation="2"/>
        </filter>
      </defs>
      <rect width="8" height="8" fill="url(#grad)" filter="url(#blur)"/>
    </svg>
  `.trim();

  const base64 = Buffer.from(svg).toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
}

/**
 * Example usage in components:
 *
 * import Image from 'next/image';
 * import { BLUR_DATA_URLS } from '@/lib/image-utils';
 *
 * <Image
 *   src="/images/tire.webp"
 *   alt="HUBTRAC Tire"
 *   width={600}
 *   height={600}
 *   placeholder="blur"
 *   blurDataURL={BLUR_DATA_URLS.brandRed}
 * />
 *
 * Or with custom colors:
 *
 * import { generateGradientBlur } from '@/lib/image-utils';
 *
 * <Image
 *   src="/images/tire-pattern.webp"
 *   alt="Tire Pattern"
 *   width={800}
 *   height={600}
 *   placeholder="blur"
 *   blurDataURL={generateGradientBlur(['#dc2626', '#7f1d1d'])}
 * />
 */
