'use client'

import React, { useState } from 'react'
import { DocumentCard } from '@/components/ui/DocumentCard'

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

interface DocumentTabsProps {
  boardAgendas: any[]
  meetingMinutes: any[]
  financialReports: any[]
  assessorDocuments: any[]
  roadDistrictReports: any[]
  newsletters: any[]
}

type TabKey =
  | 'agendas'
  | 'minutes'
  | 'financial'
  | 'assessor'
  | 'road-district'
  | 'newsletters'
  | 'annual-meetings'
  | 'audited-statements'
  | 'cash-balance'
  | 'town-fund'

export const DocumentTabs: React.FC<DocumentTabsProps> = ({
  boardAgendas,
  meetingMinutes,
  financialReports,
  assessorDocuments,
  roadDistrictReports,
  newsletters,
}) => {
  const [activeTab, setActiveTab] = useState<TabKey>('agendas')
  const [searchQuery, setSearchQuery] = useState('')

  const tabs = [
    { key: 'agendas' as TabKey, label: 'Agendas', count: boardAgendas?.length || 0 },
    { key: 'minutes' as TabKey, label: 'Meeting Minutes', count: meetingMinutes?.length || 0 },
    {
      key: 'financial' as TabKey,
      label: 'Financial Reports',
      count: financialReports?.length || 0,
    },
    {
      key: 'assessor' as TabKey,
      label: 'Assessor Documents',
      count: assessorDocuments?.length || 0,
    },
    {
      key: 'road-district' as TabKey,
      label: 'Highway Commissioner Reports',
      count: roadDistrictReports?.length || 0,
    },
    { key: 'newsletters' as TabKey, label: 'Newsletters', count: newsletters?.length || 0 },
  ]

  const getActiveDocuments = () => {
    switch (activeTab) {
      case 'agendas':
        return boardAgendas
      case 'minutes':
        return meetingMinutes
      case 'financial':
        return financialReports
      case 'assessor':
        return assessorDocuments
      case 'road-district':
        return roadDistrictReports
      case 'newsletters':
        return newsletters
      default:
        return []
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const getDocumentType = (doc: any, tabKey: TabKey) => {
    if (doc.documentType) return doc.documentType
    switch (tabKey) {
      case 'agendas':
        return 'Board Agenda'
      case 'minutes':
        return 'Meeting Minutes'
      case 'financial':
        return 'Financial Report'
      case 'assessor':
        return 'Assessor Document'
      case 'road-district':
        return 'Highway Commissioner Report'
      case 'newsletters':
        return 'Newsletter'
      default:
        return 'Document'
    }
  }

  const filteredDocuments = getActiveDocuments()
    .filter((doc) => doc && doc.title && doc.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter((doc) => doc.file && typeof doc.file === 'object' && doc.file.url)

  return (
    <div>
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-8 overflow-x-auto">
        <nav className="-mb-px flex gap-6 min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`
                py-4 px-1 border-b-3 font-medium text-sm whitespace-nowrap transition-colors
                ${
                  activeTab === tab.key
                    ? 'border-gold text-navy'
                    : 'border-transparent text-gray-600 hover:text-navy hover:border-gray-300'
                }
              `}
            >
              {tab.label}
              <span
                className={`ml-2 py-0.5 px-2 rounded-full text-xs ${
                  activeTab === tab.key ? 'bg-gold-pale text-navy' : 'bg-gray-100 text-gray-600'
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent"
          />
        </div>
      </div>

      {/* Document Grid */}
      {filteredDocuments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredDocuments.map((doc) => (
            <DocumentCard
              key={doc.id}
              title={doc.title}
              date={formatDate(doc.date)}
              type={getDocumentType(doc, activeTab)}
              fileUrl={doc.file.url}
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
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No documents found</h3>
          <p className="text-gray-600">
            {searchQuery
              ? 'Try adjusting your search terms'
              : 'No documents have been published in this category yet'}
          </p>
        </div>
      )}
    </div>
  )
}
