'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Facebook, Linkedin, Instagram } from 'lucide-react';
import { Dictionary } from '@/lib/i18n';

interface FooterProps {
  dict: Dictionary;
}

export default function Footer({ dict }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const router = useRouter();

  const quickLinks = [
    { label: dict.footer.quickLinks.home, href: '#home' },
    { label: dict.footer.quickLinks.services, href: '#services' },
    { label: dict.footer.quickLinks.products, href: '#products' },
    { label: dict.footer.quickLinks.about, href: '/about' },
    { label: dict.footer.quickLinks.contact, href: '#contact' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ];

  const scrollToSection = (href: string) => {
    // Handle routing for /about page
    if (href === '/about') {
      router.push('/about');
      return;
    }

    // Handle smooth scrolling for sections
    const id = href.replace('#', '');
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(id);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-extrabold mb-4 text-red-500">
              {dict.footer.company.title}
            </h3>
            <p className="text-gray-400 leading-relaxed mb-6">
              {dict.footer.company.description}
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                <span className="font-bold text-white">H</span>
              </div>
              <span>Professional Tire Service</span>
            </div>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <h4 className="text-lg font-bold mb-6">{dict.footer.quickLinks.title}</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-400 hover:text-red-500 transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-red-500 transition-all duration-300" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h4 className="text-lg font-bold mb-6">{dict.footer.services.title}</h4>
            <ul className="space-y-3">
              <li className="text-gray-400">{dict.services.items.mobile.title}</li>
              <li className="text-gray-400">{dict.services.items.emergency.title}</li>
              <li className="text-gray-400">{dict.services.items.consultation.title}</li>
              <li className="text-gray-400">{dict.services.items.warranty.title}</li>
            </ul>
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h4 className="text-lg font-bold mb-6">{dict.footer.contact.title}</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={`tel:${dict.contact.info.phone}`}
                  className="text-gray-400 hover:text-red-500 transition-colors duration-300 flex items-center gap-3 group"
                >
                  <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-red-600 transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  {dict.contact.info.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${dict.contact.info.email}`}
                  className="text-gray-400 hover:text-red-500 transition-colors duration-300 flex items-center gap-3 group"
                >
                  <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-red-600 transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  {dict.contact.info.email}
                </a>
              </li>
              <li className="text-gray-400 flex items-start gap-3">
                <div className="p-2 bg-gray-800 rounded-lg">
                  <MapPin className="w-4 h-4" />
                </div>
                <span>{dict.contact.info.address}</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Social links & certificates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="pt-8 border-t border-gray-800"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Social links */}
            <div className="flex items-center gap-4">
              <span className="text-gray-400 text-sm">{dict.footer.social.title}:</span>
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-800 hover:bg-red-600 rounded-lg transition-colors duration-300"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>

            {/* Certificates */}
            <div className="flex items-center gap-4">
              {['ECE', 'DOT', 'ISO'].map((cert) => (
                <div
                  key={cert}
                  className="px-4 py-2 bg-gray-800 rounded-lg border border-gray-700"
                >
                  <span className="text-gray-400 font-semibold text-sm">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-8 pt-8 border-t border-gray-800 text-center"
        >
          <p className="text-gray-400 text-sm mb-2">
            {dict.footer.copyright.replace('2025', currentYear.toString())}
          </p>
          <div className="flex justify-center gap-6 text-sm">
            <button className="text-gray-400 hover:text-red-500 transition-colors">
              {dict.footer.privacy}
            </button>
            <span className="text-gray-600">•</span>
            <button className="text-gray-400 hover:text-red-500 transition-colors">
              {dict.footer.terms}
            </button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
