'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Phone } from 'lucide-react';
import { useEffect, useState } from 'react';

interface EmergencyContactBarProps {
  phoneNumber: string;
  showMessengers?: boolean;
  messengersComponent?: React.ReactNode;
}

export default function EmergencyContactBar({
  phoneNumber,
  showMessengers = false,
  messengersComponent,
}: EmergencyContactBarProps) {
  const [isPulsing, setIsPulsing] = useState(true);
  const { scrollY } = useScroll();

  // Shrink bar height after 100px scroll
  const barHeight = useTransform(scrollY, [0, 100], [64, 48]);

  // Stop pulse animation after 3 cycles (each cycle is 2s)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPulsing(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  const handleCall = () => {
    window.location.href = `tel:${phoneNumber.replace(/\s/g, '')}`;

    // Track analytics if available
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'call_click', {
        event_category: 'engagement',
        event_label: 'emergency_contact_bar',
      });
    }
  };

  return (
    <motion.div
      style={{ height: barHeight }}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 20,
        duration: 0.6
      }}
      className="fixed top-0 left-0 right-0 z-50 bg-red-600 shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between gap-4">
        {/* Phone number - full width tap target on mobile */}
        <motion.button
          onClick={handleCall}
          animate={isPulsing ? {
            scale: [1, 1.05, 1],
            boxShadow: [
              '0 0 0 0 rgba(255, 255, 255, 0.7)',
              '0 0 0 10px rgba(255, 255, 255, 0)',
              '0 0 0 0 rgba(255, 255, 255, 0)',
            ],
          } : {}}
          transition={{
            duration: 2,
            repeat: isPulsing ? 2 : 0,
            repeatType: 'loop',
          }}
          className="flex items-center gap-2 md:gap-3 flex-1 md:flex-initial justify-center md:justify-start py-2 px-4 rounded-lg hover:bg-red-700 transition-colors touch-manipulation min-h-[48px]"
          aria-label={`Call emergency hotline ${phoneNumber}`}
        >
          <motion.div
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{
              duration: 0.5,
              repeat: isPulsing ? Infinity : 0,
              repeatDelay: 3,
            }}
          >
            <Phone className="w-5 h-5 md:w-6 md:h-6 text-white" strokeWidth={2.5} />
          </motion.div>
          <div className="text-left">
            <p className="text-xs md:text-sm text-white/90 font-medium">
              24/7 Pohotovosť
            </p>
            <p className="text-base md:text-xl font-bold text-white tracking-wide">
              {phoneNumber}
            </p>
          </div>
        </motion.button>

        {/* Messenger buttons - desktop only */}
        {showMessengers && messengersComponent && (
          <div className="hidden md:flex">
            {messengersComponent}
          </div>
        )}
      </div>
    </motion.div>
  );
}
