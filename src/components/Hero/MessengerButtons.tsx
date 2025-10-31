'use client';

import { motion } from 'framer-motion';

interface MessengerButtonsProps {
  phoneNumber: string;
  label?: string;
}

interface MessengerConfig {
  name: string;
  color: string;
  icon: string;
  generateLink: (phone: string) => string;
}

const messengers: MessengerConfig[] = [
  {
    name: 'WhatsApp',
    color: '#25D366',
    icon: '💬',
    generateLink: (phone) => `https://wa.me/${phone.replace(/[^0-9+]/g, '')}`,
  },
  {
    name: 'Viber',
    color: '#7360F2',
    icon: '📱',
    generateLink: (phone) => `viber://chat?number=${phone.replace(/[^0-9+]/g, '')}`,
  },
  {
    name: 'Telegram',
    color: '#0088CC',
    icon: '✈️',
    generateLink: (phone) => `https://t.me/${phone.replace(/[^0-9+]/g, '')}`,
  },
];

export default function MessengerButtons({ phoneNumber, label }: MessengerButtonsProps) {
  const handleMessengerClick = (messengerName: string, link: string) => {
    // Track analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'messenger_click', {
        event_category: 'engagement',
        event_label: messengerName.toLowerCase(),
        value: phoneNumber,
      });
    }

    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex items-center gap-3">
      {label && (
        <span className="hidden lg:inline-block text-sm text-white/90 font-medium">
          {label}
        </span>
      )}
      <div className="flex gap-2">
        {messengers.map((messenger, index) => {
          const link = messenger.generateLink(phoneNumber);

          return (
            <motion.button
              key={messenger.name}
              onClick={() => handleMessengerClick(messenger.name, link)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{
                scale: 1.1,
                y: -4,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
              className="group relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all duration-300 touch-manipulation"
              style={{
                border: `2px solid ${messenger.color}`,
                backgroundColor: 'transparent',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = messenger.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
              aria-label={`Contact via ${messenger.name}`}
              role="link"
            >
              <span className="text-xl sm:text-2xl group-hover:scale-110 transition-transform duration-200">
                {messenger.icon}
              </span>

              {/* Tooltip */}
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {messenger.name}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
