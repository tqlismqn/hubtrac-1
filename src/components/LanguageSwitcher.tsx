'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe } from 'lucide-react';
import { Locale, locales, localeNames } from '@/lib/i18n';

interface LanguageSwitcherProps {
  currentLocale: Locale;
  onLocaleChange: (locale: Locale) => void;
  isScrolled?: boolean;
}

const localeFlags: Record<Locale, string> = {
  sk: '🇸🇰',
  de: '🇩🇪',
  en: '🇬🇧',
};

export default function LanguageSwitcher({ currentLocale, onLocaleChange, isScrolled = false }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLocaleChange = (locale: Locale) => {
    onLocaleChange(locale);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative">
      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
          isScrolled
            ? 'bg-gray-100 hover:bg-gray-200 border border-gray-300'
            : 'bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20'
        }`}
        aria-label="Change language"
      >
        <span className="text-xl">{localeFlags[currentLocale]}</span>
        <span className={`font-medium uppercase text-sm ${
          isScrolled ? 'text-gray-700' : 'text-white'
        }`}>
          {currentLocale}
        </span>
      </button>

      {/* Dropdown menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50"
          >
            {locales.map((locale) => (
              <button
                key={locale}
                onClick={() => handleLocaleChange(locale)}
                className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 ${
                  locale === currentLocale ? 'bg-red-50 text-red-600' : 'text-gray-700'
                }`}
              >
                <span className="text-2xl">{localeFlags[locale]}</span>
                <div className="flex flex-col">
                  <span className="font-medium">{localeNames[locale]}</span>
                  <span className="uppercase text-xs text-gray-500">{locale}</span>
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
