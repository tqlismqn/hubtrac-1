'use client';

import { motion } from 'framer-motion';
import { Shield, Award, Cpu, HeadphonesIcon, Clock, Users } from 'lucide-react';
import { Dictionary } from '@/lib/i18n';
import { microinteractions } from '@/styles/design-system';

interface BenefitsGridProps {
  dict: Dictionary;
}

export default function BenefitsGrid({ dict }: BenefitsGridProps) {
  const benefits = [
    {
      icon: Shield,
      key: 'warranty',
      color: 'from-red-500 to-red-600',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
    },
    {
      icon: Award,
      key: 'certificates',
      color: 'from-orange-500 to-red-500',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
    },
    {
      icon: Cpu,
      key: 'technology',
      color: 'from-red-600 to-red-700',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-700',
    },
    {
      icon: HeadphonesIcon,
      key: 'support',
      color: 'from-red-500 to-orange-600',
      iconBg: 'bg-orange-100',
      iconColor: 'text-red-600',
    },
    {
      icon: Clock,
      key: 'response',
      color: 'from-orange-600 to-red-600',
      iconBg: 'bg-red-100',
      iconColor: 'text-orange-600',
    },
    {
      icon: Users,
      key: 'team',
      color: 'from-red-700 to-red-800',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-700',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {dict.benefits.title}
          </h2>
        </motion.div>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            const benefitData = dict.benefits[benefit.key as keyof typeof dict.benefits];

            // Type guard to ensure benefitData has title and description
            if (typeof benefitData === 'string' || !('title' in benefitData)) {
              return null;
            }

            return (
              <motion.div
                key={benefit.key}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                {...microinteractions.cardHover}
                className="group"
              >
                <div className="relative h-full p-8 bg-gray-50 rounded-2xl border-2 border-gray-100 hover:border-red-200 transition-all duration-300 hover:shadow-xl">
                  {/* Gradient background on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />

                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="mb-6">
                      <motion.div
                        {...microinteractions.scaleOnHover}
                        className={`w-16 h-16 ${benefit.iconBg} rounded-xl flex items-center justify-center`}
                      >
                        <Icon className={`w-8 h-8 ${benefit.iconColor}`} strokeWidth={1.5} />
                      </motion.div>
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {benefitData.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {benefitData.description}
                    </p>
                  </div>

                  {/* Decorative corner accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-red-600/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-block p-6 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl shadow-lg">
            <p className="text-white text-lg font-semibold mb-2">
              {dict.benefits.warranty.title}
            </p>
            <p className="text-white/90 text-sm">
              {dict.benefits.certificates.description}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
