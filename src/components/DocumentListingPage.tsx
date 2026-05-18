import React from 'react'
import { DocumentCard } from '@/components/ui/DocumentCard'
import { PageHero } from '@/components/PageHero'

interface Document {
  id: string
  title: string
  date: string
  description?: string
  documentType?: string
  file: {
    url: string
  }
}

interface DocumentListingPageProps {
  title: string
  description: string
  documents: Document[]
  defaultDocumentType: string
  emptyStateMessage?: string
}

export const DocumentListingPage: React.FC<DocumentListingPageProps> = ({
  title,
  description,
  documents,
  defaultDocumentType,
  emptyStateMessage = 'No documents have been published in this category yet.',
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className="bg-cream min-h-screen">
      {/* Hero Section with Breadcrumbs */}
      <PageHero
        title={title}
        description={description}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Documents', href: '/documents' },
          { label: title },
        ]}
      />

      {/* Content */}
      <div className="max-w-[1100px] mx-auto px-8 py-12">
        {documents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {documents.map((doc) => (
              <DocumentCard
                key={doc.id}
                title={doc.title}
                date={formatDate(doc.date)}
                type={doc.documentType || defaultDocumentType}
                fileUrl={typeof doc.file === 'object' ? doc.file.url : ''}
                description={doc.description}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No documents available</h3>
            <p className="text-gray-600">{emptyStateMessage}</p>
          </div>
        )}
      </div>
    </div>
  )
}
