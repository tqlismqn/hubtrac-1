import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StructuredData from "@/components/StructuredData";
import ClientProviders from "@/components/ClientProviders";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // Optimize font loading for better FCP
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap", // Optimize font loading for better FCP
});

export const metadata: Metadata = {
  metadataBase: new URL('https://hubtrac-mobile-service.vercel.app'), // Update with actual domain
  title: {
    default: 'HUBTRAC Mobile Tire Service | Professional Truck Tire Solutions',
    template: '%s | HUBTRAC Mobile Service'
  },
  description: 'Professional mobile tire service for commercial trucks in Europe. 24/7 emergency tire replacement with 49+ years experience, 800+ partners across 9 factories. HUBTRAC certified tires with 6-year warranty. Service in Slovakia, Germany, and Austria.',
  keywords: [
    'mobile tire service',
    'truck tires',
    'commercial vehicle tires',
    'HUBTRAC',
    'tire replacement',
    'emergency tire service',
    'LKW Reifen',
    'pneumatiky',
    'tire service Slovakia',
    'tire service Germany',
    'tire service Austria',
    'commercial tire replacement',
    'truck tire emergency',
    '24/7 tire service',
    'heavy duty tires',
    'fleet tire service'
  ],
  authors: [{ name: 'HUBTRAC Europe' }],
  creator: 'HUBTRAC Europe',
  publisher: 'HUBTRAC Europe',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['sk_SK', 'de_DE'],
    url: 'https://hubtrac-mobile-service.vercel.app', // Update with actual domain
    title: 'HUBTRAC Mobile Tire Service | Professional Truck Tire Solutions',
    description: 'Professional mobile tire service for commercial trucks in Europe. 24/7 emergency tire replacement with 49+ years experience, 800+ partners. HUBTRAC certified tires with 6-year warranty.',
    siteName: 'HUBTRAC Mobile Service',
    images: [
      {
        url: '/og-image.jpg', // TO ADD: Create 1200x630px Open Graph image
        width: 1200,
        height: 630,
        alt: 'HUBTRAC Mobile Tire Service - Professional Truck Tire Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HUBTRAC Mobile Tire Service | Professional Truck Tire Solutions',
    description: 'Professional mobile tire service for commercial trucks. 24/7 emergency tire replacement, 49+ years experience, 800+ partners.',
    images: ['/twitter-image.jpg'], // TO ADD: Create 1200x600px Twitter image
    creator: '@HUBTRAC', // Update if Twitter handle exists
  },
  alternates: {
    canonical: 'https://hubtrac-mobile-service.vercel.app', // Update with actual domain
    languages: {
      'en': 'https://hubtrac-mobile-service.vercel.app/en',
      'sk': 'https://hubtrac-mobile-service.vercel.app/sk',
      'de': 'https://hubtrac-mobile-service.vercel.app/de',
    },
  },
  verification: {
    google: 'google-site-verification-code', // TO ADD: Get from Google Search Console
    // yandex: 'yandex-verification-code', // Optional for European markets
    // bing: 'bing-verification-code', // Optional
  },
  category: 'Automotive Services',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#DC2626" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StructuredData />
        <ClientProviders />
        {children}
      </body>
    </html>
  );
}
