'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon, DownloadIcon, ExternalLinkIcon } from '@radix-ui/react-icons';

interface Certificate {
  id: string;
  name: string;
  description: string;
  pdfUrl: string;
  imageUrl?: string;
}

interface CertificateModalProps {
  certificate: Certificate;
  isOpen: boolean;
  onClose: () => void;
}

export default function CertificateModal({ certificate, isOpen, onClose }: CertificateModalProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal forceMount>
            {/* Backdrop */}
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              />
            </Dialog.Overlay>

            {/* Modal Content */}
            <Dialog.Content asChild>
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[95vw] max-w-5xl max-h-[90vh] overflow-hidden"
              >
                <div className="bg-white rounded-2xl shadow-2xl flex flex-col">
                  {/* Header */}
                  <div className="flex items-start justify-between p-6 border-b border-gray-200">
                    <div className="flex-1">
                      <Dialog.Title className="text-2xl font-bold text-gray-900 mb-2">
                        {certificate.name}
                      </Dialog.Title>
                      <Dialog.Description className="text-gray-600">
                        {certificate.description}
                      </Dialog.Description>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 ml-4">
                      {/* Download Button */}
                      <a
                        href={certificate.pdfUrl}
                        download
                        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                        title="Download PDF"
                      >
                        <DownloadIcon className="w-4 h-4" />
                        <span className="hidden sm:inline">Download</span>
                      </a>

                      {/* Open in New Tab */}
                      <a
                        href={certificate.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                        title="Open in new tab"
                      >
                        <ExternalLinkIcon className="w-4 h-4" />
                      </a>

                      {/* Close Button */}
                      <Dialog.Close asChild>
                        <button
                          className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-700"
                          aria-label="Close"
                        >
                          <Cross2Icon className="w-5 h-5" />
                        </button>
                      </Dialog.Close>
                    </div>
                  </div>

                  {/* PDF Preview */}
                  <div className="flex-1 p-6 overflow-auto bg-gray-50">
                    <div className="relative w-full h-full min-h-[60vh] bg-white rounded-lg shadow-inner">
                      {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="flex flex-col items-center gap-4">
                            <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
                            <p className="text-gray-600 font-medium">Loading certificate...</p>
                          </div>
                        </div>
                      )}

                      {/* PDF Embed */}
                      <iframe
                        src={`${certificate.pdfUrl}#view=FitH`}
                        className="w-full h-full min-h-[60vh] rounded-lg"
                        title={certificate.name}
                        onLoad={() => setIsLoading(false)}
                      />
                    </div>
                  </div>

                  {/* Footer Info */}
                  <div className="p-4 bg-gray-50 border-t border-gray-200 text-center text-sm text-gray-600">
                    <p>
                      <span className="font-semibold text-red-600">HUBTRAC</span> - ECE, DOT, ISO Certified Products
                    </p>
                  </div>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}

// Certificate Grid Component for displaying multiple certificates
interface CertificateGridProps {
  certificates: Certificate[];
}

export function CertificateGrid({ certificates }: CertificateGridProps) {
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert) => (
          <motion.button
            key={cert.id}
            onClick={() => setSelectedCertificate(cert)}
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 p-6 text-left"
          >
            {/* Certificate Preview Image */}
            {cert.imageUrl && (
              <div className="mb-4 aspect-[4/3] overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={cert.imageUrl}
                  alt={cert.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}

            {/* Certificate Info */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                {cert.name}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-2">
                {cert.description}
              </p>
            </div>

            {/* Hover Icon */}
            <div className="absolute top-4 right-4 w-10 h-10 bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <ExternalLinkIcon className="w-5 h-5 text-white" />
            </div>

            {/* Border Accent */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-red-600 rounded-2xl transition-colors pointer-events-none" />
          </motion.button>
        ))}
      </div>

      {/* Modal */}
      {selectedCertificate && (
        <CertificateModal
          certificate={selectedCertificate}
          isOpen={!!selectedCertificate}
          onClose={() => setSelectedCertificate(null)}
        />
      )}
    </>
  );
}
