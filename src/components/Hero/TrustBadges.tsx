'use client';

import { motion } from 'framer-motion';
import { Calendar, Shield, Award, CheckCircle2, FileCheck } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface Badge {
  icon: LucideIcon;
  text: string;
  color: string;
  bgColor: string;
}

interface TrustBadgesProps {
  badges?: Badge[];
}

const defaultBadges: Badge[] = [
  {
    icon: Calendar,
    text: '49+ rokov skúseností',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    icon: Shield,
    text: 'ECE Certifikácia',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    icon: Award,
    text: 'LINGLONG Partner',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
  },
  {
    icon: CheckCircle2,
    text: 'ISO 9001',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
  },
  {
    icon: Shield,
    text: '6 rokov Záruka',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    icon: FileCheck,
    text: 'DOT Certifikácia',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
  },
];

export default function TrustBadges({ badges = defaultBadges }: TrustBadgesProps) {
  return (
    <div className="w-full">
      {/* Mobile: 2x3 grid */}
      <div className="grid grid-cols-2 gap-3 md:hidden">
        {badges.map((badge, index) => (
          <BadgeCard key={index} badge={badge} index={index} />
        ))}
      </div>

      {/* Tablet: 3x2 grid */}
      <div className="hidden md:grid lg:hidden grid-cols-3 gap-4">
        {badges.map((badge, index) => (
          <BadgeCard key={index} badge={badge} index={index} />
        ))}
      </div>

      {/* Desktop: 1x6 row */}
      <div className="hidden lg:flex gap-4">
        {badges.map((badge, index) => (
          <BadgeCard key={index} badge={badge} index={index} />
        ))}
      </div>
    </div>
  );
}

interface BadgeCardProps {
  badge: Badge;
  index: number;
}

function BadgeCard({ badge, index }: BadgeCardProps) {
  const Icon = badge.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.1,
        duration: 0.4,
        ease: 'easeOut',
      }}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
      className={`
        ${badge.bgColor}
        rounded-xl p-3 flex flex-col items-center justify-center text-center
        shadow-sm hover:shadow-lg transition-shadow duration-300
        w-full h-20 md:h-[90px] lg:h-[100px] lg:w-[120px]
      `}
      role="status"
      aria-label={badge.text}
    >
      <Icon
        className={`${badge.color} w-6 h-6 md:w-7 md:h-7 mb-1 md:mb-2`}
        strokeWidth={2}
        aria-hidden="true"
      />
      <p className={`${badge.color} text-xs md:text-sm font-semibold leading-tight`}>
        {badge.text}
      </p>
    </motion.div>
  );
}
