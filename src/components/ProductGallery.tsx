'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Dictionary } from '@/lib/i18n';

interface ProductGalleryProps {
  dict: Dictionary;
}

export default function ProductGallery({ dict }: ProductGalleryProps) {
  const products = [
    {
      key: 'highway_s23',
      image: '/images/products/highway-s23.webp',
      gradient: 'from-red-600 to-red-700',
      bgPattern: 'radial-gradient(circle at 30% 50%, rgba(220, 38, 38, 0.3) 0%, transparent 50%)',
    },
    {
      key: 'highway_t22',
      image: '/images/products/highway-t22.webp',
      gradient: 'from-red-700 to-red-800',
      bgPattern: 'radial-gradient(circle at 70% 50%, rgba(185, 28, 28, 0.3) 0%, transparent 50%)',
    },
    {
      key: 'mixed_s21',
      image: '/images/products/mixed-s21.webp',
      gradient: 'from-red-600 to-orange-600',
      bgPattern: 'radial-gradient(circle at 50% 30%, rgba(220, 38, 38, 0.3) 0%, transparent 50%)',
    },
    {
      key: 'urban_g21',
      image: '/images/products/urban-g21.webp',
      gradient: 'from-orange-600 to-red-600',
      bgPattern: 'radial-gradient(circle at 50% 70%, rgba(234, 88, 12, 0.3) 0%, transparent 50%)',
    },
    {
      key: 'coach_g21',
      image: '/images/products/coach-g21.webp',
      gradient: 'from-red-800 to-red-900',
      bgPattern: 'radial-gradient(circle at 50% 50%, rgba(153, 27, 27, 0.3) 0%, transparent 50%)',
    },
  ];

  return (
    <section id="products" className="py-20 bg-gray-50">
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
            {dict.products.title}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            {dict.products.subtitle}
          </p>
        </motion.div>

        {/* Products grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => {
            const productData = dict.products.categories[product.key as keyof typeof dict.products.categories];

            return (
              <motion.div
                key={product.key}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -8 }}
                className={`group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 ${
                  index === products.length - 1 && products.length % 3 === 1
                    ? 'md:col-span-2 lg:col-span-1'
                    : ''
                }`}
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient}`} />

                {/* Pattern overlay */}
                <div
                  className="absolute inset-0 opacity-50"
                  style={{ background: product.bgPattern }}
                />

                {/* Content */}
                <div className="relative z-10 p-8 h-full flex flex-col justify-between min-h-[380px]">
                  {/* Product image */}
                  <motion.div
                    className="mb-6 flex-1 flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className="relative w-48 h-48">
                      <Image
                        src={product.image}
                        alt={productData.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-contain drop-shadow-2xl"
                        loading="lazy"
                      />
                    </div>
                  </motion.div>

                  {/* Product info */}
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {productData.name}
                    </h3>
                    <p className="text-white/90 text-sm leading-relaxed">
                      {productData.description}
                    </p>
                  </div>

                  {/* Hover indicator */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-8 h-8 border-2 border-white rounded-full flex items-center justify-center">
                      <span className="text-white text-xl font-bold">→</span>
                    </div>
                  </div>
                </div>

                {/* Shine effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 text-sm">
            {dict.benefits.warranty.title} • {dict.benefits.certificates.title}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
