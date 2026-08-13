'use client'

import { useState } from 'react'
import { DocumentCard } from '@/components/ui/DocumentCard'
import { Button } from '@/components/ui/button'
import { FileText } from 'lucide-react'
import Link from 'next/link'

interface Document {
  id: string | number
  title: string
  date: string
  type: string
  collection?: string
  file: any
  description?: string
}

interface DocumentLibraryProps {
  documents: Document[]
}

type FilterType = 'all' | 'minutes' | 'agendas' | 'financial' | 'assessor' | 'road-district' | 'newsletters'

export function DocumentLibrary({ documents }: DocumentLibraryProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      timeZone: 'UTC', // day-only dates are stored anchored to UTC midnight
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  // Each filter maps to the Payload collection the document came from
  const filterCollections: Record<Exclude<FilterType, 'all'>, string> = {
    minutes: 'meeting-minutes',
    agendas: 'board-agendas',
    financial: 'financial-reports',
    assessor: 'assessor-documents',
    'road-district': 'road-district-reports',
    newsletters: 'newsletters',
  }

  // Filter documents based on active filter
  const filteredDocuments = documents.filter((doc) => {
    if (activeFilter === 'all') return true
    return doc.collection === filterCollections[activeFilter]
  }).slice(0, 8)

  const filterButtons = [
    { label: 'Recent Documents', value: 'all' as FilterType },
    { label: 'Meeting Minutes', value: 'minutes' as FilterType },
    { label: 'Board Agendas', value: 'agendas' as FilterType },
    { label: 'Financial Reports', value: 'financial' as FilterType },
    { label: 'Assessor Docs', value: 'assessor' as FilterType },
    { label: 'Road District', value: 'road-district' as FilterType },
    { label: 'Newsletters', value: 'newsletters' as FilterType },
  ]

  return (
    <div className="lg:col-span-2">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-display font-bold text-navy mb-2">
            Document Library
          </h2>
          <div className="w-12 h-[3px] bg-gold" />
        </div>
        <Link href="/documents">
          <Button variant="link" className="text-gold-dark">
            Browse all documents →
          </Button>
        </Link>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {filterButtons.map((button) => (
          <button
            key={button.value}
            onClick={() => setActiveFilter(button.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeFilter === button.value
                ? 'bg-gold text-navy-dark shadow-md'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-gold hover:text-gold-dark'
            }`}
          >
            {button.label}
          </button>
        ))}
      </div>

      {/* Document List */}
      {filteredDocuments.length > 0 ? (
        <div className="space-y-4">
          {filteredDocuments.map((doc: any) => (
            <DocumentCard
              key={`${doc.collection || doc.type}-${doc.id}`}
              title={doc.title}
              date={formatDate(doc.date)}
              type={doc.type}
              fileUrl={typeof doc.file === 'object' ? doc.file.url : ''}
              description={doc.description}
              viewMode="list"
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600">
            {activeFilter === 'all'
              ? 'No documents available yet'
              : `No ${filterButtons.find(b => b.value === activeFilter)?.label.toLowerCase()} available`}
          </p>
        </div>
      )}
    </div>
  )
}
