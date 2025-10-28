'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Award, Users, Factory } from 'lucide-react';
import { Dictionary } from '@/lib/i18n';

interface TrustIndicatorsProps {
  dict: Dictionary;
}

// Animated counter component
function AnimatedCounter({ end, duration = 2000, suffix = '' }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, end, duration]);

  return (
    <div ref={ref} className="text-5xl md:text-6xl font-extrabold text-white">
      {count}{suffix}
    </div>
  );
}

export default function TrustIndicators({ dict }: TrustIndicatorsProps) {
  const stats = [
    {
      icon: Award,
      value: 49,
      suffix: '+',
      label: dict.stats.experience,
      color: 'from-red-500 to-orange-500',
    },
    {
      icon: Users,
      value: 800,
      suffix: '+',
      label: dict.stats.partners,
      color: 'from-red-600 to-red-700',
    },
    {
      icon: Factory,
      value: 9,
      suffix: '',
      label: dict.stats.factories,
      color: 'from-red-700 to-red-800',
    },
  ];

  return (
    <section id="stats" className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="relative"
              >
                <div className="text-center">
                  {/* Icon with gradient background */}
                  <div className="flex justify-center mb-6">
                    <div className={`p-4 bg-gradient-to-br ${stat.color} rounded-2xl shadow-lg`}>
                      <Icon className="w-10 h-10 text-white" strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Animated counter */}
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />

                  {/* Label */}
                  <p className="mt-4 text-lg md:text-xl text-gray-300 font-medium">
                    {stat.label}
                  </p>
                </div>

                {/* Decorative gradient line */}
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent" />
              </motion.div>
            );
          })}
        </div>

        {/* Certificates section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-20 text-center"
        >
          <p className="text-gray-400 mb-6 uppercase tracking-wider text-sm font-semibold">
            {dict.benefits.certificates.description}
          </p>
          <div className="flex justify-center gap-8 flex-wrap">
            {['ECE', 'DOT', 'ISO'].map((cert, index) => (
              <motion.div
                key={cert}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1 + index * 0.1, duration: 0.4 }}
                className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg"
              >
                <span className="text-white font-bold text-lg">{cert}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
