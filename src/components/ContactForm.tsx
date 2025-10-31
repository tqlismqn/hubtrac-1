'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Send, Phone, Mail, MapPin, CheckCircle, AlertCircle } from 'lucide-react';
import { Dictionary } from '@/lib/i18n';

interface ContactFormProps {
  dict: Dictionary;
}

export default function ContactForm({ dict }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    serviceType: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    // Placeholder for form submission
    // In production, integrate with Formspree, EmailJS, or Web3Forms
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', phone: '', email: '', serviceType: '', message: '' });

      // Reset status after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const serviceTypes = [
    { value: 'mobile', label: dict.contact.serviceTypes.mobile },
    { value: 'emergency', label: dict.contact.serviceTypes.emergency },
    { value: 'consultation', label: dict.contact.serviceTypes.consultation },
    { value: 'purchase', label: dict.contact.serviceTypes.purchase },
    { value: 'other', label: dict.contact.serviceTypes.other },
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-gray-50 to-white">
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
            {dict.contact.title}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            {dict.contact.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact information */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  {dict.footer.contact.title}
                </h3>
              </div>

              {/* Contact details */}
              <div className="space-y-6">
                <motion.div
                  whileHover={{ x: 8 }}
                  className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-red-300 transition-colors"
                >
                  <div className="p-3 bg-red-100 rounded-lg">
                    <Phone className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">
                      {dict.contact.form.phone}
                    </p>
                    <p className="text-gray-600">{dict.contact.info.phone}</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 8 }}
                  className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-red-300 transition-colors"
                >
                  <div className="p-3 bg-red-100 rounded-lg">
                    <Mail className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">
                      {dict.contact.form.email}
                    </p>
                    <p className="text-gray-600">{dict.contact.info.email}</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 8 }}
                  className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-red-300 transition-colors"
                >
                  <div className="p-3 bg-red-100 rounded-lg">
                    <MapPin className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">
                      {dict.footer.contact.title}
                    </p>
                    <p className="text-gray-600">{dict.contact.info.address}</p>
                  </div>
                </motion.div>
              </div>

              {/* Benefits reminder */}
              <div className="mt-8 p-6 bg-gradient-to-br from-red-600 to-red-700 rounded-2xl text-white">
                <h4 className="font-bold text-lg mb-3">{dict.benefits.support.title}</h4>
                <p className="text-white/90 text-sm">{dict.benefits.response.description}</p>
              </div>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                  {dict.contact.form.name}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder={dict.contact.form.namePlaceholder}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all outline-none"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-2">
                  {dict.contact.form.phone}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder={dict.contact.form.phonePlaceholder}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all outline-none"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                  {dict.contact.form.email}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder={dict.contact.form.emailPlaceholder}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all outline-none"
                />
              </div>

              {/* Service Type */}
              <div>
                <label htmlFor="serviceType" className="block text-sm font-semibold text-gray-900 mb-2">
                  {dict.contact.form.serviceType}
                </label>
                <select
                  id="serviceType"
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all outline-none bg-white"
                >
                  <option value="">{dict.contact.form.serviceTypePlaceholder}</option>
                  {serviceTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
                  {dict.contact.form.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder={dict.contact.form.messagePlaceholder}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all outline-none resize-none"
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full px-8 py-4 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-red-600/50 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {dict.contact.form.submitting}
                  </>
                ) : (
                  <>
                    {dict.contact.form.submit}
                    <Send className="w-5 h-5" />
                  </>
                )}
              </button>

              {/* Success message */}
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <p className="text-green-800 text-sm font-medium">
                    {dict.contact.form.success}
                  </p>
                </motion.div>
              )}

              {/* Error message */}
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3"
                >
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <p className="text-red-800 text-sm font-medium">
                    {dict.contact.form.error}
                  </p>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
