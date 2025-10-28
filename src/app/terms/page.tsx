'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Truck, DollarSign, Shield, AlertTriangle, Users, Scale, Headphones } from 'lucide-react';
import { getDictionary, Locale, defaultLocale } from '@/lib/i18n';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function TermsPage() {
  const [locale, setLocale] = useState<Locale>(defaultLocale);
  const dict = getDictionary(locale);

  const sections = [
    {
      icon: FileText,
      key: 'overview',
      color: 'from-red-500 to-red-600',
    },
    {
      icon: Truck,
      key: 'services',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: DollarSign,
      key: 'pricing',
      color: 'from-red-600 to-red-700',
    },
    {
      icon: Shield,
      key: 'warranty',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: AlertTriangle,
      key: 'liability',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: Users,
      key: 'userObligations',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: Scale,
      key: 'disputes',
      color: 'from-gray-600 to-gray-700',
    },
    {
      icon: Headphones,
      key: 'changes',
      color: 'from-green-500 to-green-600',
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
            <div className="inline-block p-4 bg-red-600 rounded-2xl mb-6">
              <Scale className="w-16 h-16 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              {dict.terms.title}
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {dict.terms.subtitle}
            </p>
            <p className="text-sm text-gray-400 mt-4">
              {dict.terms.lastUpdated}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content sections */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {sections.map((section, index) => {
            const Icon = section.icon;
            const sectionData = dict.terms.sections[section.key as keyof typeof dict.terms.sections];

            return (
              <motion.div
                key={section.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="mb-12"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`p-3 bg-gradient-to-br ${section.color} rounded-xl flex-shrink-0`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                      {sectionData.title}
                    </h2>
                    <div className="prose prose-lg max-w-none text-gray-600 space-y-4">
                      {Array.isArray(sectionData.content) ? (
                        sectionData.content.map((paragraph: string, idx: number) => (
                          <p key={idx}>{paragraph}</p>
                        ))
                      ) : (
                        <p>{sectionData.content}</p>
                      )}

                      {sectionData.items && (
                        <ul className="list-disc list-inside space-y-2 ml-4">
                          {sectionData.items.map((item: string, idx: number) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA section */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-red-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Headphones className="w-12 h-12 text-white mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-4">
              {dict.terms.questions.title}
            </h2>
            <p className="text-lg text-white/90 mb-8">
              {dict.terms.questions.content}
            </p>
            <a
              href="/#contact"
              className="inline-block px-8 py-4 bg-white text-red-600 font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {dict.contact.title}
            </a>
          </motion.div>
        </div>
      </section>

      <Footer dict={dict} />
    </main>
  );
}
