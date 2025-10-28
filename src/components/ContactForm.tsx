'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Send, Phone, Mail, MapPin, CheckCircle, AlertCircle, Check, X } from 'lucide-react';
import { Dictionary } from '@/lib/i18n';

interface ContactFormProps {
  dict: Dictionary;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  serviceType?: string;
  message?: string;
}

interface TouchedFields {
  name: boolean;
  phone: boolean;
  email: boolean;
  serviceType: boolean;
  message: boolean;
}

export default function ContactForm({ dict }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    serviceType: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<TouchedFields>({
    name: false,
    phone: false,
    email: false,
    serviceType: false,
    message: false,
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  // Character limits
  const MESSAGE_MAX_LENGTH = 500;
  const NAME_MAX_LENGTH = 100;

  // Real-time validation
  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.length < 2) return 'Name must be at least 2 characters';
        if (value.length > NAME_MAX_LENGTH) return `Name must be less than ${NAME_MAX_LENGTH} characters`;
        if (!/^[a-zA-Z\s\u00C0-\u017F]+$/.test(value)) return 'Name can only contain letters';
        return undefined;

      case 'phone':
        if (!value.trim()) return 'Phone number is required';
        // Remove spaces and special characters for validation
        const cleanPhone = value.replace(/[\s\-()]/g, '');
        if (!/^\+?[\d]{8,15}$/.test(cleanPhone)) return 'Please enter a valid phone number';
        return undefined;

      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address';
        return undefined;

      case 'serviceType':
        if (!value) return 'Please select a service type';
        return undefined;

      case 'message':
        if (!value.trim()) return 'Message is required';
        if (value.length < 10) return 'Message must be at least 10 characters';
        if (value.length > MESSAGE_MAX_LENGTH) return `Message must be less than ${MESSAGE_MAX_LENGTH} characters`;
        return undefined;

      default:
        return undefined;
    }
  };

  // Validate all fields
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) {
        newErrors[key as keyof FormErrors] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  // Update validation on field change
  useEffect(() => {
    Object.keys(formData).forEach((key) => {
      if (touched[key as keyof TouchedFields]) {
        const error = validateField(key, formData[key as keyof typeof formData]);
        setErrors((prev) => ({ ...prev, [key]: error }));
      }
    });
  }, [formData, touched]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({
      name: true,
      phone: true,
      email: true,
      serviceType: true,
      message: true,
    });

    if (!validateForm()) {
      return;
    }

    setStatus('submitting');

    // Placeholder for form submission
    // In production, integrate with Formspree, EmailJS, or Web3Forms
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', phone: '', email: '', serviceType: '', message: '' });
      setTouched({
        name: false,
        phone: false,
        email: false,
        serviceType: false,
        message: false,
      });
      setErrors({});

      // Reset status after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name } = e.target;
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  // Check if field is valid
  const isFieldValid = (fieldName: keyof typeof formData): boolean => {
    return touched[fieldName] && !errors[fieldName] && formData[fieldName].trim() !== '';
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
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={dict.contact.form.namePlaceholder}
                    maxLength={NAME_MAX_LENGTH}
                    className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:border-transparent transition-all outline-none ${
                      errors.name && touched.name
                        ? 'border-red-300 focus:ring-red-600/50'
                        : isFieldValid('name')
                        ? 'border-green-300 focus:ring-green-600/50'
                        : 'border-gray-300 focus:ring-red-600'
                    }`}
                  />
                  {/* Validation indicator */}
                  <AnimatePresence>
                    {touched.name && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                      >
                        {errors.name ? (
                          <X className="w-5 h-5 text-red-600" />
                        ) : formData.name ? (
                          <Check className="w-5 h-5 text-green-600" />
                        ) : null}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                {/* Error message */}
                <AnimatePresence>
                  {errors.name && touched.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-1 text-sm text-red-600"
                    >
                      {errors.name}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-2">
                  {dict.contact.form.phone}
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={dict.contact.form.phonePlaceholder}
                    className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:border-transparent transition-all outline-none ${
                      errors.phone && touched.phone
                        ? 'border-red-300 focus:ring-red-600/50'
                        : isFieldValid('phone')
                        ? 'border-green-300 focus:ring-green-600/50'
                        : 'border-gray-300 focus:ring-red-600'
                    }`}
                  />
                  <AnimatePresence>
                    {touched.phone && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                      >
                        {errors.phone ? (
                          <X className="w-5 h-5 text-red-600" />
                        ) : formData.phone ? (
                          <Check className="w-5 h-5 text-green-600" />
                        ) : null}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <AnimatePresence>
                  {errors.phone && touched.phone && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-1 text-sm text-red-600"
                    >
                      {errors.phone}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                  {dict.contact.form.email}
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={dict.contact.form.emailPlaceholder}
                    className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:border-transparent transition-all outline-none ${
                      errors.email && touched.email
                        ? 'border-red-300 focus:ring-red-600/50'
                        : isFieldValid('email')
                        ? 'border-green-300 focus:ring-green-600/50'
                        : 'border-gray-300 focus:ring-red-600'
                    }`}
                  />
                  <AnimatePresence>
                    {touched.email && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                      >
                        {errors.email ? (
                          <X className="w-5 h-5 text-red-600" />
                        ) : formData.email ? (
                          <Check className="w-5 h-5 text-green-600" />
                        ) : null}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <AnimatePresence>
                  {errors.email && touched.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-1 text-sm text-red-600"
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Service Type */}
              <div>
                <label htmlFor="serviceType" className="block text-sm font-semibold text-gray-900 mb-2">
                  {dict.contact.form.serviceType}
                </label>
                <div className="relative">
                  <select
                    id="serviceType"
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:border-transparent transition-all outline-none bg-white ${
                      errors.serviceType && touched.serviceType
                        ? 'border-red-300 focus:ring-red-600/50'
                        : isFieldValid('serviceType')
                        ? 'border-green-300 focus:ring-green-600/50'
                        : 'border-gray-300 focus:ring-red-600'
                    }`}
                  >
                    <option value="">{dict.contact.form.serviceTypePlaceholder}</option>
                    {serviceTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                  <AnimatePresence>
                    {touched.serviceType && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="absolute right-10 top-1/2 -translate-y-1/2 pointer-events-none"
                      >
                        {errors.serviceType ? (
                          <X className="w-5 h-5 text-red-600" />
                        ) : formData.serviceType ? (
                          <Check className="w-5 h-5 text-green-600" />
                        ) : null}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <AnimatePresence>
                  {errors.serviceType && touched.serviceType && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-1 text-sm text-red-600"
                    >
                      {errors.serviceType}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Message */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-900">
                    {dict.contact.form.message}
                  </label>
                  <span className={`text-xs ${
                    formData.message.length > MESSAGE_MAX_LENGTH * 0.9
                      ? 'text-red-600 font-semibold'
                      : 'text-gray-500'
                  }`}>
                    {formData.message.length}/{MESSAGE_MAX_LENGTH}
                  </span>
                </div>
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows={5}
                    maxLength={MESSAGE_MAX_LENGTH}
                    placeholder={dict.contact.form.messagePlaceholder}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all outline-none resize-none ${
                      errors.message && touched.message
                        ? 'border-red-300 focus:ring-red-600/50'
                        : isFieldValid('message')
                        ? 'border-green-300 focus:ring-green-600/50'
                        : 'border-gray-300 focus:ring-red-600'
                    }`}
                  />
                </div>
                <AnimatePresence>
                  {errors.message && touched.message && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-1 text-sm text-red-600"
                    >
                      {errors.message}
                    </motion.p>
                  )}
                </AnimatePresence>
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
