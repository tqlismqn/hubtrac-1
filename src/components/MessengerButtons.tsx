'use client';

import { motion } from 'framer-motion';
import { Dictionary } from '@/lib/i18n';
import { ViberIcon, WhatsAppIcon, TelegramIcon } from '@/components/icons/MessengerIcons';

interface MessengerButtonsProps {
  dict: Dictionary;
}

interface Messenger {
  name: string;
  color: string;
  hoverColor: string;
  shadowColor: string;
  url: string;
  ariaLabel: string;
  icon: React.ComponentType<{ className?: string }>;
}

export default function MessengerButtons({ dict }: MessengerButtonsProps) {
  const messengers: Messenger[] = [
    {
      name: dict.contact.messengers.viber,
      color: '#7360F2',
      hoverColor: '#5A4AC4',
      shadowColor: 'rgba(115, 96, 242, 0.3)',
      url: 'viber://chat?number=%2B421XXXXXXXXX',
      ariaLabel: dict.contact.messengers.aria.viber,
      icon: ViberIcon,
    },
    {
      name: dict.contact.messengers.whatsapp,
      color: '#25D366',
      hoverColor: '#1DA851',
      shadowColor: 'rgba(37, 211, 102, 0.3)',
      url: 'https://wa.me/421XXXXXXXXX',
      ariaLabel: dict.contact.messengers.aria.whatsapp,
      icon: WhatsAppIcon,
    },
    {
      name: dict.contact.messengers.telegram,
      color: '#0088CC',
      hoverColor: '#006699',
      shadowColor: 'rgba(0, 136, 204, 0.3)',
      url: 'https://t.me/hubtrac_tires',
      ariaLabel: dict.contact.messengers.aria.telegram,
      icon: TelegramIcon,
    },
  ];

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const buttonVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <div className="mt-8 mb-8">
      {/* Section header */}
      <h4 className="text-lg font-bold text-gray-900 mb-2">
        {dict.contact.messengers.title}
      </h4>
      <p className="text-sm text-gray-600 mb-6">
        {dict.contact.messengers.subtitle}
      </p>

      {/* Buttons grid */}
      <motion.div
        variants={containerVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4"
      >
        {messengers.map((messenger) => {
          const Icon = messenger.icon;
          return (
            <motion.a
              key={messenger.name}
              href={messenger.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={buttonVariants}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2, ease: 'easeOut' }
              }}
              whileTap={{
                scale: 0.98,
                transition: { duration: 0.1 }
              }}
              aria-label={messenger.ariaLabel}
              className="
                flex flex-col items-center justify-center
                h-20 p-3 gap-2
                sm:h-24 sm:p-4 sm:gap-3
                lg:h-28 lg:p-4 lg:gap-3
                rounded-xl
                transition-all duration-300
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
              "
              style={{
                backgroundColor: messenger.color,
                borderColor: messenger.color,
                outlineColor: messenger.color,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = messenger.hoverColor;
                e.currentTarget.style.borderColor = messenger.hoverColor;
                e.currentTarget.style.boxShadow = `0 10px 15px -3px ${messenger.shadowColor}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = messenger.color;
                e.currentTarget.style.borderColor = messenger.color;
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Icon */}
              <div aria-hidden="true">
                <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>

              {/* Label */}
              <span className="text-xs sm:text-sm font-semibold text-white text-center leading-tight">
                {messenger.name}
              </span>
            </motion.a>
          );
        })}
      </motion.div>
    </div>
  );
}
