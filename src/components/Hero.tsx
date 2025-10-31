'use client';

import { motion, useAnimation } from 'framer-motion';
import { Phone, ArrowRight, CheckCircle } from 'lucide-react';
import { Dictionary } from '@/lib/i18n';
import { useEffect } from 'react';
import Image from 'next/image';
import EmergencyContactBar from './Hero/EmergencyContactBar';
import MessengerButtons from './Hero/MessengerButtons';
import TrustBadges from './Hero/TrustBadges';

interface HeroProps {
  dict: Dictionary;
  onLanguageChange?: (locale: string) => void;
  currentLocale?: string;
}

// Phone number - will be replaced with actual client number
const PHONE_NUMBER = '+421 XXX XXX XXX';

export default function Hero({ dict }: HeroProps) {
  const phoneIconControls = useAnimation();

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToProducts = () => {
    const productsSection = document.getElementById('products');
    productsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  // Phone icon shake animation every 5 seconds
  useEffect(() => {
    const animatePhone = async () => {
      while (true) {
        await new Promise(resolve => setTimeout(resolve, 5000));
        await phoneIconControls.start({
          rotate: [0, -15, 15, -15, 15, 0],
          transition: { duration: 0.5 }
        });
      }
    };

    animatePhone();
  }, [phoneIconControls]);

  const handleCallNow = () => {
    window.location.href = `tel:${PHONE_NUMBER.replace(/\s/g, '')}`;

    // Track analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'cta_call_click', {
        event_category: 'engagement',
        event_label: 'hero_primary_cta',
      });
    }
  };

  return (
    <>
      {/* Emergency Contact Bar - Sticky at top */}
      <EmergencyContactBar
        phoneNumber={PHONE_NUMBER}
        showMessengers={true}
        messengersComponent={
          <MessengerButtons phoneNumber={PHONE_NUMBER} label={dict.hero.contactVia} />
        }
      />

      {/* Main Hero Section */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-gray-50 to-gray-100 pt-16 md:pt-20"
      >
        {/* Background pattern */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="grid lg:grid-cols-[55fr_45fr] gap-8 lg:gap-12 items-center">
            {/* Left Column - Content */}
            <div className="text-center lg:text-left">
              {/* Trust Signature Badge */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-green-50 border border-green-200 rounded-full"
              >
                <CheckCircle className="w-5 h-5 text-green-600" strokeWidth={2.5} />
                <span className="text-sm md:text-base font-semibold text-green-700">
                  {dict.hero.trustSignature} - 49+ rokov
                </span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-4 md:mb-6 leading-tight"
              >
                {dict.hero.title}
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-8 md:mb-10 leading-relaxed"
              >
                {dict.hero.subtitle}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
              >
                {/* Primary CTA - Call Now */}
                <motion.button
                  onClick={handleCallNow}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold text-lg sm:text-xl uppercase rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-red-600/30 flex items-center justify-center gap-3 min-h-[60px]"
                  aria-label={`${dict.hero.ctaPrimary} ${PHONE_NUMBER}`}
                >
                  <motion.div animate={phoneIconControls}>
                    <Phone className="w-6 h-6" strokeWidth={2.5} />
                  </motion.div>
                  <span>{dict.hero.ctaPrimary}</span>
                </motion.button>

                {/* Secondary CTA - Browse Catalog */}
                <motion.button
                  onClick={scrollToProducts}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white border-2 border-gray-300 hover:border-gray-900 text-gray-900 font-semibold text-base sm:text-lg rounded-full transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 min-h-[60px]"
                >
                  <span>{dict.hero.ctaSecondary}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </motion.div>

              {/* Messenger Buttons - Mobile Only */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="flex md:hidden justify-center lg:justify-start mb-10"
              >
                <MessengerButtons phoneNumber={PHONE_NUMBER} label={dict.hero.contactVia} />
              </motion.div>

              {/* Trust Badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <TrustBadges />
              </motion.div>
            </div>

            {/* Right Column - Truck Image (Desktop only) */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="hidden lg:block relative"
            >
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-2xl">
                {/* Placeholder for truck image */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-red-500 to-red-700 flex items-center justify-center">
                  <div className="text-white text-center p-8">
                    <svg
                      className="w-64 h-64 mx-auto mb-4 opacity-20"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M18 18.5a1.5 1.5 0 01-1.5-1.5 1.5 1.5 0 011.5-1.5 1.5 1.5 0 011.5 1.5 1.5 1.5 0 01-1.5 1.5m1.5-9l1.96 2.5H17V9.5M6 18.5A1.5 1.5 0 014.5 17 1.5 1.5 0 016 15.5 1.5 1.5 0 017.5 17 1.5 1.5 0 016 18.5M20 8h-3V4H3c-1.11 0-2 .89-2 2v11h2a3 3 0 003 3 3 3 0 003-3h6a3 3 0 003 3 3 3 0 003-3h2v-5z" />
                    </svg>
                    <p className="text-xl font-semibold opacity-50">
                      Truck Service Image
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -z-10 -top-4 -right-4 w-72 h-72 bg-red-200 rounded-full blur-3xl opacity-20" />
              <div className="absolute -z-10 -bottom-4 -left-4 w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-20" />
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, repeat: Infinity, duration: 1.5, repeatType: 'reverse' }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block"
        >
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center p-2">
            <div className="w-1 h-2 bg-gray-400 rounded-full" />
          </div>
        </motion.div>
      </section>
    </>
  );
}
