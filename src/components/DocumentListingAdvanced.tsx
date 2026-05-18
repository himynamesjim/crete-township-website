'use client'

import React, { useState, useMemo } from 'react'
import { DocumentCard } from '@/components/ui/DocumentCard'
import { PageHero } from '@/components/PageHero'
import { LayoutGrid, List, Search, Filter, Calendar, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

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

interface DocumentListingAdvancedProps {
  title: string
  description: string
  documents: Document[]
  defaultDocumentType: string
  emptyStateMessage?: string
}

export const DocumentListingAdvanced: React.FC<DocumentListingAdvancedProps> = ({
  title,
  description,
  documents,
  defaultDocumentType,
  emptyStateMessage = 'No documents have been published in this category yet.',
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedYear, setSelectedYear] = useState<string>('all')
  const [selectedType, setSelectedType] = useState<string>('all')

  // Extract unique years and types
  const years = useMemo(() => {
    const yearSet = new Set(
      documents.map((doc) => new Date(doc.date).getFullYear().toString())
    )
    return Array.from(yearSet).sort((a, b) => parseInt(b) - parseInt(a))
  }, [documents])

  const types = useMemo(() => {
    const typeSet = new Set(
      documents.map((doc) => doc.documentType || defaultDocumentType).filter(Boolean)
    )
    return Array.from(typeSet)
  }, [documents, defaultDocumentType])

  // Filter documents
  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      const matchesSearch = searchQuery
        ? doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doc.description?.toLowerCase().includes(searchQuery.toLowerCase())
        : true

      const matchesYear =
        selectedYear === 'all'
          ? true
          : new Date(doc.date).getFullYear().toString() === selectedYear

      const matchesType =
        selectedType === 'all'
          ? true
          : (doc.documentType || defaultDocumentType) === selectedType

      return matchesSearch && matchesYear && matchesType
    })
  }, [documents, searchQuery, selectedYear, selectedType, defaultDocumentType])

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

      {/* Content with Sidebar */}
      <div className="max-w-[1400px] mx-auto px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:items-start">
          {/* Left Sidebar - Filters */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="sticky top-24">
              <Card>
                <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Filter className="w-4 h-4 text-navy" />
                  <h3 className="font-semibold text-navy">Filter Documents</h3>
                </div>

                {/* Search */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Search
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search documents..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent text-sm"
                    />
                  </div>
                </div>

                {/* Year Filter */}
                {years.length > 0 && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      Year
                    </label>
                    <select
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent text-sm"
                    >
                      <option value="all">All Years</option>
                      {years.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Type Filter */}
                {types.length > 1 && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FileText className="w-4 h-4 inline mr-1" />
                      Type
                    </label>
                    <select
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent text-sm"
                    >
                      <option value="all">All Types</option>
                      {types.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Clear Filters */}
                {(searchQuery || selectedYear !== 'all' || selectedType !== 'all') && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSearchQuery('')
                      setSelectedYear('all')
                      setSelectedType('all')
                    }}
                    className="w-full"
                  >
                    Clear Filters
                  </Button>
                )}
                </CardContent>
              </Card>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm text-gray-600">
                Showing {filteredDocuments.length} of {documents.length} documents
              </div>

              {/* View Toggle */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 mr-2">View:</span>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${
                    viewMode === 'grid'
                      ? 'bg-navy text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  } transition-colors`}
                  aria-label="Grid view"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${
                    viewMode === 'list'
                      ? 'bg-navy text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  } transition-colors`}
                  aria-label="List view"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Documents */}
            {filteredDocuments.length > 0 ? (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 gap-6'
                    : 'space-y-4'
                }
              >
                {filteredDocuments.map((doc) => (
                  <DocumentCard
                    key={doc.id}
                    title={doc.title}
                    date={formatDate(doc.date)}
                    type={doc.documentType || defaultDocumentType}
                    fileUrl={typeof doc.file === 'object' ? doc.file.url : ''}
                    description={doc.description}
                    viewMode={viewMode}
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
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  No documents found
                </h3>
                <p className="text-gray-600">
                  {searchQuery || selectedYear !== 'all' || selectedType !== 'all'
                    ? 'Try adjusting your filters to see more results.'
                    : emptyStateMessage}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
