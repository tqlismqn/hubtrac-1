'use client';

import { useEffect, useState } from 'react';
import CookieConsent from './CookieConsent';
import { getDictionary, type Locale } from '@/lib/i18n';
import type { Dictionary } from '@/lib/i18n';
import { ToastProvider } from './Toast';

export default function ClientProviders() {
  const [dict, setDict] = useState<Dictionary | null>(null);
  const [locale, setLocale] = useState<Locale>('sk');

  useEffect(() => {
    // Get locale from localStorage or default to 'sk'
    const savedLocale = (localStorage.getItem('hubtrac-locale') as Locale) || 'sk';
    setLocale(savedLocale);

    // Load dictionary
    const dictionary = getDictionary(savedLocale);
    setDict(dictionary);

    // Listen for locale changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'hubtrac-locale' && e.newValue) {
        const newLocale = e.newValue as Locale;
        setLocale(newLocale);
        setDict(getDictionary(newLocale));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Don't render until dictionary is loaded
  if (!dict) return null;

  return (
    <ToastProvider>
      <CookieConsent dict={dict} />
    </ToastProvider>
  );
}
