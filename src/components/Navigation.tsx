'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Dictionary, Locale } from '@/lib/i18n';
import LanguageSwitcher from './LanguageSwitcher';

interface NavigationProps {
  dict: Dictionary;
  currentLocale: Locale;
  onLocaleChange: (locale: Locale) => void;
}

export default function Navigation({ dict, currentLocale, onLocaleChange }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: dict.nav.home, href: '#home' },
    { label: dict.nav.services, href: '#services' },
    { label: dict.nav.products, href: '#products' },
    { label: dict.nav.about, href: '#about' },
    { label: dict.nav.contact, href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const id = href.replace('#', '');
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(id);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-lg shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <button
              onClick={() => scrollToSection('#home')}
              className="flex items-center gap-2"
            >
              <div className={`text-2xl font-extrabold transition-colors duration-300 ${
                isScrolled ? 'text-red-600' : 'text-white'
              }`}>
                HUBTRAC
              </div>
            </button>

            {/* Desktop navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className={`font-medium transition-colors duration-300 hover:text-red-600 ${
                    isScrolled ? 'text-gray-700' : 'text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Language switcher & mobile menu button */}
            <div className="flex items-center gap-4">
              <div className={`transition-opacity duration-300 ${
                isScrolled ? 'hidden' : 'block'
              }`}>
                <LanguageSwitcher
                  currentLocale={currentLocale}
                  onLocaleChange={onLocaleChange}
                />
              </div>

              {/* Desktop language switcher (visible when scrolled) */}
              <div className={`hidden md:block transition-opacity duration-300 ${
                isScrolled ? 'block' : 'hidden'
              }`}>
                <div className="relative">
                  <select
                    value={currentLocale}
                    onChange={(e) => onLocaleChange(e.target.value as Locale)}
                    className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-full font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600 cursor-pointer uppercase"
                  >
                    <option value="sk">SK</option>
                    <option value="de">DE</option>
                    <option value="en">EN</option>
                  </select>
                </div>
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`md:hidden p-2 rounded-lg transition-colors duration-300 ${
                  isScrolled
                    ? 'text-gray-700 hover:bg-gray-100'
                    : 'text-white hover:bg-white/10'
                }`}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu content */}
            <div className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-2xl overflow-y-auto">
              <div className="p-8 pt-24">
                {/* Navigation items */}
                <div className="space-y-4 mb-8">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => scrollToSection(item.href)}
                      className="block w-full text-left px-4 py-3 text-lg font-semibold text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      {item.label}
                    </motion.button>
                  ))}
                </div>

                {/* Language selector */}
                <div className="pt-6 border-t border-gray-200">
                  <p className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">
                    Language
                  </p>
                  <div className="space-y-2">
                    {(['sk', 'de', 'en'] as Locale[]).map((locale) => (
                      <button
                        key={locale}
                        onClick={() => {
                          onLocaleChange(locale);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                          locale === currentLocale
                            ? 'bg-red-600 text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <span className="uppercase font-semibold">{locale}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
