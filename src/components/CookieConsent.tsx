'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, ChevronDown, ChevronUp, Shield, BarChart3, Target } from 'lucide-react';
import { Dictionary } from '@/lib/i18n';

interface CookieConsentProps {
  dict: Dictionary;
}

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

const COOKIE_CONSENT_KEY = 'hubtrac-cookie-consent';
const COOKIE_PREFERENCES_KEY = 'hubtrac-cookie-preferences';

export default function CookieConsent({ dict }: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always true, can't be disabled
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Show banner after a short delay for better UX
      setTimeout(() => setIsVisible(true), 1000);
    } else {
      // Load saved preferences
      const savedPreferences = localStorage.getItem(COOKIE_PREFERENCES_KEY);
      if (savedPreferences) {
        setPreferences(JSON.parse(savedPreferences));
      }
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    savePreferences(allAccepted);
  };

  const handleAcceptNecessary = () => {
    const necessaryOnly: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    savePreferences(necessaryOnly);
  };

  const handleSavePreferences = () => {
    savePreferences(preferences);
  };

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(prefs));
    setPreferences(prefs);
    setIsVisible(false);

    // Initialize analytics if accepted
    if (prefs.analytics && typeof window !== 'undefined') {
      // Here you would initialize Google Analytics or other analytics
      console.log('Analytics enabled');
    }

    // Initialize marketing if accepted
    if (prefs.marketing && typeof window !== 'undefined') {
      // Here you would initialize marketing pixels
      console.log('Marketing enabled');
    }
  };

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return; // Can't disable necessary cookies
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[9998]"
            onClick={() => setIsVisible(false)}
          />

          {/* Cookie Banner */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-[9999] p-4 sm:p-6"
          >
            <div className="max-w-6xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
              {/* Header */}
              <div className="p-6 sm:p-8">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                      <Cookie className="w-6 h-6 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {dict.cookies?.title || 'Cookie Settings'}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {dict.cookies?.subtitle || 'We respect your privacy'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsVisible(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                {/* Description */}
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  {dict.cookies?.description ||
                    'We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.'}
                </p>

                {/* Cookie Categories - Expandable */}
                <div className="mb-6">
                  <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="flex items-center justify-between w-full p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors"
                  >
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {dict.cookies?.customizeSettings || 'Customize Settings'}
                    </span>
                    {showDetails ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </button>

                  <AnimatePresence>
                    {showDetails && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-4 mt-4">
                          {/* Necessary Cookies */}
                          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-3">
                                <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
                                <div>
                                  <h4 className="font-semibold text-gray-900 dark:text-white">
                                    {dict.cookies?.necessary || 'Necessary Cookies'}
                                  </h4>
                                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                    {dict.cookies?.necessaryDesc ||
                                      'Essential for the website to function properly. Cannot be disabled.'}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center">
                                <input
                                  type="checkbox"
                                  checked={true}
                                  disabled
                                  className="w-5 h-5 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-2 focus:ring-green-500 cursor-not-allowed"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Analytics Cookies */}
                          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-3">
                                <BarChart3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                <div>
                                  <h4 className="font-semibold text-gray-900 dark:text-white">
                                    {dict.cookies?.analytics || 'Analytics Cookies'}
                                  </h4>
                                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                    {dict.cookies?.analyticsDesc ||
                                      'Help us understand how visitors interact with our website.'}
                                  </p>
                                </div>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={preferences.analytics}
                                  onChange={() => togglePreference('analytics')}
                                  className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-600"></div>
                              </label>
                            </div>
                          </div>

                          {/* Marketing Cookies */}
                          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-3">
                                <Target className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                <div>
                                  <h4 className="font-semibold text-gray-900 dark:text-white">
                                    {dict.cookies?.marketing || 'Marketing Cookies'}
                                  </h4>
                                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                    {dict.cookies?.marketingDesc ||
                                      'Used to deliver personalized advertisements.'}
                                  </p>
                                </div>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={preferences.marketing}
                                  onChange={() => togglePreference('marketing')}
                                  className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-600"></div>
                              </label>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  {showDetails ? (
                    <>
                      <button
                        onClick={handleSavePreferences}
                        className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-red-600/50"
                      >
                        {dict.cookies?.savePreferences || 'Save Preferences'}
                      </button>
                      <button
                        onClick={handleAcceptNecessary}
                        className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold rounded-lg transition-colors"
                      >
                        {dict.cookies?.necessaryOnly || 'Necessary Only'}
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={handleAcceptAll}
                        className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-red-600/50"
                      >
                        {dict.cookies?.acceptAll || 'Accept All'}
                      </button>
                      <button
                        onClick={handleAcceptNecessary}
                        className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold rounded-lg transition-colors"
                      >
                        {dict.cookies?.necessaryOnly || 'Necessary Only'}
                      </button>
                    </>
                  )}
                </div>

                {/* Privacy Policy Link */}
                <div className="mt-4 text-center">
                  <a
                    href="/privacy"
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 underline transition-colors"
                  >
                    {dict.cookies?.privacyPolicy || 'Read our Privacy Policy'}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
