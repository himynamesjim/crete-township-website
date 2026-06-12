'use client'

import React, { useEffect } from 'react'
import { X } from 'lucide-react'
import { Button } from './button'

interface PDFModalProps {
  isOpen: boolean
  onClose: () => void
  pdfUrl: string
  title: string
}

export const PDFModal: React.FC<PDFModalProps> = ({ isOpen, onClose, pdfUrl, title }) => {
  // Close modal on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-6xl h-[90vh] mx-4 bg-white rounded-lg shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-display font-bold text-navy">{title}</h2>
          <div className="flex items-center gap-2">
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gold hover:text-gold-light font-semibold"
            >
              Open in New Tab →
            </a>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="ml-4"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 overflow-hidden">
          <iframe
            src={pdfUrl}
            className="w-full h-full"
            title={title}
            style={{ border: 'none' }}
          />
        </div>
      </div>
    </div>
  )
}
