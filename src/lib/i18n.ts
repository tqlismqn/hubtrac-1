// i18n utility for multi-language support
// Supports Slovak (sk), German (de), and English (en)

import skDict from '@/dictionaries/sk.json';
import deDict from '@/dictionaries/de.json';
import enDict from '@/dictionaries/en.json';

export type Locale = 'sk' | 'de' | 'en';

export const locales: Locale[] = ['sk', 'de', 'en'];

export const defaultLocale: Locale = 'sk';

export const localeNames: Record<Locale, string> = {
  sk: 'Slovenčina',
  de: 'Deutsch',
  en: 'English',
};

export const localeFlags: Record<Locale, string> = {
  sk: '🇸🇰',
  de: '🇩🇪',
  en: '🇬🇧',
};

const dictionaries = {
  sk: skDict,
  de: deDict,
  en: enDict,
};

export type Dictionary = typeof skDict;

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] || dictionaries[defaultLocale];
}

// Type-safe translation helper
export function t(dict: Dictionary, key: string): string {
  const keys = key.split('.');
  let value: any = dict;

  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return key; // Return key if translation not found
    }
  }

  return typeof value === 'string' ? value : key;
}
