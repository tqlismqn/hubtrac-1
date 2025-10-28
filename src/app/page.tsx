'use client';

import { useState } from 'react';
import { getDictionary, Locale, defaultLocale } from '@/lib/i18n';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import TrustIndicators from '@/components/TrustIndicators';
import Services from '@/components/Services';
import ProductGallery from '@/components/ProductGallery';
import BenefitsGrid from '@/components/BenefitsGrid';
import Footer from '@/components/Footer';
import dynamic from 'next/dynamic';

// Lazy load ContactForm for better performance (code splitting)
const ContactForm = dynamic(() => import('@/components/ContactForm'), {
  loading: () => (
    <div className="flex justify-center items-center py-20">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
    </div>
  ),
  ssr: false,
});

export default function Home() {
  const [locale, setLocale] = useState<Locale>(defaultLocale);
  const dict = getDictionary(locale);

  const handleLocaleChange = (newLocale: Locale) => {
    setLocale(newLocale);
  };

  return (
    <main className="min-h-screen">
      <Navigation
        dict={dict}
        currentLocale={locale}
        onLocaleChange={handleLocaleChange}
      />

      <div id="home">
        <Hero dict={dict} />
      </div>

      <TrustIndicators dict={dict} />

      <Services dict={dict} />

      <ProductGallery dict={dict} />

      <BenefitsGrid dict={dict} />

      <ContactForm dict={dict} />

      <Footer dict={dict} />
    </main>
  );
}
