'use client';

import { useState, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { BLUR_DATA_URLS } from '@/lib/image-utils';

interface TireImage {
  id: string;
  src: string;
  alt: string;
  category?: string;
}

interface TireCarouselProps {
  images: TireImage[];
  autoplay?: boolean;
  autoplayDelay?: number;
}

export default function TireCarousel({ images, autoplay = false, autoplayDelay = 5000 }: TireCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    return () => {
      if (emblaApi) {
        emblaApi.off('select', onSelect);
        emblaApi.off('reInit', onSelect);
      }
    };
  }, [emblaApi, onSelect]);

  // Autoplay functionality
  useEffect(() => {
    if (!autoplay || !emblaApi || isHovered) return;

    const intervalId = setInterval(() => {
      emblaApi.scrollNext();
    }, autoplayDelay);

    return () => clearInterval(intervalId);
  }, [autoplay, autoplayDelay, emblaApi, isHovered]);

  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-[16/9] bg-gray-200 rounded-2xl flex items-center justify-center">
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Carousel */}
      <div className="overflow-hidden rounded-2xl shadow-2xl" ref={emblaRef}>
        <div className="flex">
          {images.map((image) => (
            <div key={image.id} className="flex-[0_0_100%] min-w-0">
              <div className="relative aspect-[16/9] bg-gradient-to-br from-gray-100 to-gray-200">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-contain p-8"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                  priority={selectedIndex === images.findIndex(img => img.id === image.id)}
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URLS.brandRed}
                />

                {/* Category Badge */}
                {image.category && (
                  <div className="absolute top-6 left-6 px-4 py-2 bg-red-600 text-white font-semibold rounded-full shadow-lg">
                    {image.category}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <AnimatePresence>
        {isHovered && images.length > 1 && (
          <>
            <motion.button
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              onClick={scrollPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-colors z-10 backdrop-blur-sm"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 text-gray-900" />
            </motion.button>

            <motion.button
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              onClick={scrollNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-colors z-10 backdrop-blur-sm"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 text-gray-900" />
            </motion.button>
          </>
        )}
      </AnimatePresence>

      {/* Thumbnail Navigation */}
      {images.length > 1 && (
        <div className="mt-6 flex gap-3 justify-center flex-wrap px-4">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => scrollTo(index)}
              className={`relative w-20 h-20 rounded-lg overflow-hidden transition-all duration-300 ${
                index === selectedIndex
                  ? 'ring-4 ring-red-600 scale-110 shadow-lg'
                  : 'ring-2 ring-gray-200 hover:ring-gray-400 opacity-60 hover:opacity-100'
              }`}
              aria-label={`View ${image.alt}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="80px"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URLS.gray}
              />
            </button>
          ))}
        </div>
      )}

      {/* Image Counter */}
      <div className="absolute bottom-6 right-6 px-4 py-2 bg-black/60 backdrop-blur-sm text-white text-sm font-medium rounded-full">
        {selectedIndex + 1} / {images.length}
      </div>
    </div>
  );
}

// Lightbox version for modal view
interface TireCarouselLightboxProps {
  images: TireImage[];
  initialIndex?: number;
  onClose: () => void;
}

export function TireCarouselLightbox({ images, initialIndex = 0, onClose }: TireCarouselLightboxProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    startIndex: initialIndex
  });
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    return () => {
      if (emblaApi) {
        emblaApi.off('select', onSelect);
      }
    };
  }, [emblaApi, onSelect]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') scrollPrev();
      if (e.key === 'ArrowRight') scrollNext();
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [scrollPrev, scrollNext, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div className="relative w-full h-full max-w-7xl mx-auto p-4" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-20 backdrop-blur-sm"
          aria-label="Close lightbox"
        >
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Carousel */}
        <div className="h-full flex items-center">
          <div className="w-full overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {images.map((image) => (
                <div key={image.id} className="flex-[0_0_100%] min-w-0 px-4">
                  <div className="relative h-[80vh]">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-contain"
                      sizes="90vw"
                      priority
                      placeholder="blur"
                      blurDataURL={BLUR_DATA_URLS.dark}
                    />
                  </div>
                  <p className="text-center text-white text-lg mt-4">{image.alt}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <button
          onClick={scrollPrev}
          className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
        >
          <ChevronLeft className="w-8 h-8 text-white" />
        </button>

        <button
          onClick={scrollNext}
          className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
        >
          <ChevronRight className="w-8 h-8 text-white" />
        </button>

        {/* Counter */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white text-lg font-medium rounded-full">
          {selectedIndex + 1} / {images.length}
        </div>
      </div>
    </motion.div>
  );
}
