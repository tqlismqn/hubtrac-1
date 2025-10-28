'use client';

import { motion } from 'framer-motion';

interface SkeletonLoaderProps {
  variant?: 'text' | 'card' | 'form' | 'image' | 'circular';
  width?: string;
  height?: string;
  className?: string;
  count?: number;
}

export function SkeletonLoader({
  variant = 'text',
  width = '100%',
  height,
  className = '',
  count = 1,
}: SkeletonLoaderProps) {
  const getDefaultHeight = () => {
    switch (variant) {
      case 'text':
        return '1rem';
      case 'card':
        return '200px';
      case 'form':
        return '56px';
      case 'image':
        return '300px';
      case 'circular':
        return '48px';
      default:
        return '1rem';
    }
  };

  const skeletonHeight = height || getDefaultHeight();
  const borderRadius = variant === 'circular' ? '9999px' : variant === 'card' ? '1rem' : '0.5rem';

  const shimmer = {
    backgroundImage: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
    backgroundSize: '200% 100%',
    backgroundPosition: '-200% 0',
  };

  const items = Array.from({ length: count }, (_, i) => i);

  return (
    <>
      {items.map((i) => (
        <motion.div
          key={i}
          className={`bg-gray-200 ${className}`}
          style={{
            width,
            height: skeletonHeight,
            borderRadius,
            ...shimmer,
          }}
          animate={{
            backgroundPosition: ['200% 0', '-200% 0'],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </>
  );
}

// Specialized skeleton components for common use cases

export function FormSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <SkeletonLoader variant="text" width="30%" height="1.25rem" />
        <SkeletonLoader variant="form" />
      </div>
      <div className="space-y-2">
        <SkeletonLoader variant="text" width="30%" height="1.25rem" />
        <SkeletonLoader variant="form" />
      </div>
      <div className="space-y-2">
        <SkeletonLoader variant="text" width="30%" height="1.25rem" />
        <SkeletonLoader variant="form" />
      </div>
      <div className="space-y-2">
        <SkeletonLoader variant="text" width="30%" height="1.25rem" />
        <SkeletonLoader variant="form" height="120px" />
      </div>
      <SkeletonLoader variant="form" height="48px" />
    </div>
  );
}

export function CardSkeleton({ count = 1 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="space-y-4 p-6 bg-gray-50 rounded-2xl">
          <div className="flex items-center gap-4">
            <SkeletonLoader variant="circular" width="64px" height="64px" />
            <div className="flex-1 space-y-2">
              <SkeletonLoader variant="text" width="60%" height="1.5rem" />
              <SkeletonLoader variant="text" width="40%" height="1rem" />
            </div>
          </div>
          <SkeletonLoader variant="text" count={3} height="0.875rem" className="mb-2" />
        </div>
      ))}
    </>
  );
}

export function ImageSkeleton({
  width = '100%',
  height = '300px',
  rounded = true,
}: {
  width?: string;
  height?: string;
  rounded?: boolean;
}) {
  return (
    <SkeletonLoader
      variant="image"
      width={width}
      height={height}
      className={rounded ? 'rounded-xl' : ''}
    />
  );
}

export function ContactFormSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6 p-8 bg-white rounded-2xl shadow-xl"
    >
      {/* Name and Phone fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <SkeletonLoader variant="text" width="25%" height="1rem" />
          <SkeletonLoader variant="form" />
        </div>
        <div className="space-y-2">
          <SkeletonLoader variant="text" width="25%" height="1rem" />
          <SkeletonLoader variant="form" />
        </div>
      </div>

      {/* Email field */}
      <div className="space-y-2">
        <SkeletonLoader variant="text" width="20%" height="1rem" />
        <SkeletonLoader variant="form" />
      </div>

      {/* Service Type */}
      <div className="space-y-2">
        <SkeletonLoader variant="text" width="30%" height="1rem" />
        <SkeletonLoader variant="form" />
      </div>

      {/* Message field */}
      <div className="space-y-2">
        <SkeletonLoader variant="text" width="25%" height="1rem" />
        <SkeletonLoader variant="form" height="120px" />
      </div>

      {/* Submit button */}
      <SkeletonLoader variant="form" height="56px" className="rounded-full" />

      {/* Loading message */}
      <div className="flex items-center justify-center gap-2 pt-4">
        <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce" />
        <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
        <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
      </div>
    </motion.div>
  );
}
