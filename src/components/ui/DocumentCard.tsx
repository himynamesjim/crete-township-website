'use client'

import React, { useState } from 'react'
import { DocumentModal } from '@/components/DocumentModal'

interface DocumentCardProps {
  title: string
  date: string
  type: string
  fileUrl: string
  description?: string | null
  viewMode?: 'grid' | 'list'
}

export const DocumentCard: React.FC<DocumentCardProps> = ({
  title,
  date,
  type,
  fileUrl,
  description,
  viewMode = 'grid',
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  // List view - compact horizontal layout
  if (viewMode === 'list') {
    return (
      <div className="group bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow duration-200">
        <div className="flex items-center gap-4">
          {/* PDF Icon */}
          <div className="flex-shrink-0 w-10 h-10 bg-navy/10 rounded-lg flex items-center justify-center group-hover:bg-navy/20 transition-colors">
            <svg
              className="w-5 h-5 text-navy"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gold-pale text-navy">
                    {type}
                  </span>
                  <span className="text-xs text-gray-400">{date}</span>
                </div>
                <h3 className="text-base font-semibold text-navy group-hover:text-navy-light transition-colors truncate">
                  {title}
                </h3>
              </div>

              {/* Actions */}
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-navy text-white text-xs font-medium rounded hover:bg-navy-light transition-colors cursor-pointer"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  View
                </button>
                <a
                  href={fileUrl}
                  download
                  className="inline-flex items-center gap-1 px-3 py-1.5 border border-navy text-navy text-xs font-medium rounded hover:bg-navy-light hover:text-white hover:border-navy-light transition-colors"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  Download
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Document Modal */}
        <DocumentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={title}
          date={date}
          type={type}
          fileUrl={fileUrl}
          description={description}
        />
      </div>
    )
  }

  // Grid view - original card layout
  return (
    <div className="group bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start gap-4">
        {/* PDF Icon */}
        <div className="flex-shrink-0 w-12 h-12 bg-navy/10 rounded-lg flex items-center justify-center group-hover:bg-navy/20 transition-colors">
          <svg
            className="w-6 h-6 text-navy"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Document Type Badge */}
          <div className="mb-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gold-pale text-navy">
              {type}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-navy mb-1 group-hover:text-navy-light transition-colors">
            {title}
          </h3>

          {/* Date */}
          <p className="text-sm text-gray-400 mb-2">{date}</p>

          {/* Description */}
          {description && (
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{description}</p>
          )}

          {/* Actions */}
          <div className="flex gap-3 mt-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-navy text-white text-sm font-medium rounded hover:bg-navy-light transition-colors cursor-pointer"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              View
            </button>
            <a
              href={fileUrl}
              download
              className="inline-flex items-center gap-2 px-4 py-2 border border-navy text-navy text-sm font-medium rounded hover:bg-navy-light hover:text-white hover:border-navy-light transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download
            </a>
          </div>
        </div>
      </div>

      {/* Document Modal */}
      <DocumentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={title}
        date={date}
        type={type}
        fileUrl={fileUrl}
        description={description}
      />
    </div>
  )
}
