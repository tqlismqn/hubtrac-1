'use client';

import { motion } from 'framer-motion';
import { Truck, Clock, MessageCircle, Shield } from 'lucide-react';
import { Dictionary } from '@/lib/i18n';

interface ServicesProps {
  dict: Dictionary;
}

export default function Services({ dict }: ServicesProps) {
  const services = [
    {
      icon: Truck,
      key: 'mobile',
      gradient: 'from-red-500 to-orange-500',
    },
    {
      icon: Clock,
      key: 'emergency',
      gradient: 'from-red-600 to-red-700',
    },
    {
      icon: MessageCircle,
      key: 'consultation',
      gradient: 'from-orange-600 to-red-600',
    },
    {
      icon: Shield,
      key: 'warranty',
      gradient: 'from-red-700 to-red-800',
    },
  ];

  return (
    <section id="services" className="py-20 bg-white">
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
            {dict.services.title}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            {dict.services.description}
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            const serviceData = dict.services.items[service.key as keyof typeof dict.services.items];

            return (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <div className="relative h-full p-6 bg-gray-50 rounded-2xl border-2 border-gray-100 hover:border-red-200 transition-all duration-300 hover:shadow-xl overflow-hidden">
                  {/* Gradient background on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                  <div className="relative z-10 group-hover:text-white transition-colors duration-300">
                    {/* Icon */}
                    <div className="mb-4">
                      <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border-2 border-red-200 group-hover:border-white/50">
                        <Icon className="w-7 h-7 text-red-600 group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-white mb-3 transition-colors duration-300">
                      {serviceData.title}
                    </h3>
                    <p className="text-gray-600 group-hover:text-white/90 text-sm leading-relaxed transition-colors duration-300">
                      {serviceData.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
