'use client'

import React from 'react'
import { X, Download, ExternalLink, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface DocumentModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  date: string
  type: string
  fileUrl: string
  description?: string | null
}

export const DocumentModal: React.FC<DocumentModalProps> = ({
  isOpen,
  onClose,
  title,
  date,
  type,
  fileUrl,
  description,
}) => {
  if (!isOpen) return null

  const handleDownload = () => {
    window.open(fileUrl, '_blank')
  }

  const handleViewFull = () => {
    window.open(fileUrl, '_blank')
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-start justify-between p-6 border-b border-gray-200 bg-navy">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-gold-pale rounded-lg">
                  <FileText className="w-5 h-5 text-navy" />
                </div>
                <div>
                  <h2 className="text-xl font-display font-bold text-white">{title}</h2>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-sm text-gray-300">{date}</span>
                    <span className="text-sm px-2 py-1 bg-gold/20 text-gold-light rounded">
                      {type}
                    </span>
                  </div>
                </div>
              </div>
              {description && (
                <p className="text-sm text-gray-300 mt-2 leading-relaxed">{description}</p>
              )}
            </div>
            <button
              onClick={onClose}
              className="ml-4 p-2 hover:bg-navy-light rounded-lg transition-colors text-white"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* PDF Preview */}
          <div className="bg-gray-100 h-[500px] overflow-hidden">
            <iframe
              src={`${fileUrl}#view=FitH`}
              className="w-full h-full border-0"
              title={`Preview of ${title}`}
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
            <p className="text-sm text-gray-600">
              Use the buttons below to view the full document or download a copy.
            </p>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={handleDownload}
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </Button>
              <Button onClick={handleViewFull} className="flex items-center gap-2">
                <ExternalLink className="w-4 h-4" />
                View Full Document
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
