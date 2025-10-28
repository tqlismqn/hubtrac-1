'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Target, Heart, TrendingUp, Shield, Users, Cpu, Clock } from 'lucide-react';
import { getDictionary, Locale, defaultLocale } from '@/lib/i18n';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function AboutPage() {
  const [locale, setLocale] = useState<Locale>(defaultLocale);
  const dict = getDictionary(locale);

  const values = [
    {
      icon: Award,
      key: 'quality',
      color: 'from-red-500 to-red-600',
    },
    {
      icon: Shield,
      key: 'reliability',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: Cpu,
      key: 'innovation',
      color: 'from-red-600 to-red-700',
    },
    {
      icon: Heart,
      key: 'service',
      color: 'from-red-700 to-red-800',
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <Navigation
        dict={dict}
        currentLocale={locale}
        onLocaleChange={setLocale}
      />

      {/* Hero section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              {dict.about.title}
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {dict.about.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* History section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                {dict.about.history.title}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                {dict.about.history.content}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-8">
                <div className="text-center p-4 bg-red-50 rounded-xl">
                  <div className="text-3xl font-bold text-red-600 mb-1">49+</div>
                  <div className="text-sm text-gray-600">Years</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-xl">
                  <div className="text-3xl font-bold text-red-600 mb-1">800+</div>
                  <div className="text-sm text-gray-600">Partners</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-xl">
                  <div className="text-3xl font-bold text-red-600 mb-1">9</div>
                  <div className="text-sm text-gray-600">Factories</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              {/* Video placeholder */}
              <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <p className="text-lg font-semibold">Factory Introduction Video</p>
                  <p className="text-sm text-gray-400 mt-2">Coming Soon</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-block p-3 bg-red-100 rounded-2xl mb-4">
              <Target className="w-12 h-12 text-red-600" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {dict.about.mission.title}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto">
              {dict.about.mission.content}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {dict.about.values.title}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              const valueLabel = dict.about.values[value.key as keyof typeof dict.about.values];

              return (
                <motion.div
                  key={value.key}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="text-center group"
                >
                  <div className="relative inline-block mb-6">
                    <div className={`w-24 h-24 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <Icon className="w-12 h-12 text-white" strokeWidth={1.5} />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {valueLabel}
                  </h3>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Certificates section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold text-white mb-12">
              {dict.about.certificates.title}
            </h2>

            <div className="flex justify-center gap-8 flex-wrap">
              {['ECE', 'DOT', 'ISO 9001', 'ISO 14001'].map((cert, index) => (
                <motion.div
                  key={cert}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="w-32 h-32 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl flex items-center justify-center hover:bg-white/20 transition-all duration-300"
                >
                  <span className="text-white font-bold text-xl">{cert}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-red-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              {dict.contact.title}
            </h2>
            <p className="text-xl text-white/90 mb-8">
              {dict.contact.subtitle}
            </p>
            <a
              href="/#contact"
              className="inline-block px-8 py-4 bg-white text-red-600 font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {dict.hero.cta}
            </a>
          </motion.div>
        </div>
      </section>

      <Footer dict={dict} />
    </main>
  );
}
