import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { PageHero } from '@/components/PageHero'
import { DocumentCard } from '@/components/ui/DocumentCard'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'All Documents | Crete Township',
  description: 'Browse all township documents including board agendas, meeting minutes, financial reports, and more.',
}

export default async function AllDocumentsPage() {
  const payload = await getPayload({ config })

  // Fetch ALL published documents from all collections
  const [boardAgendas, meetingMinutes, financialReports, assessorDocs, roadDistrictReports, newsletters] = await Promise.all([
    payload.find({
      collection: 'board-agendas',
      where: { status: { equals: 'published' } },
      sort: '-date',
      limit: 1000, // Get all documents
      depth: 1,
    }),
    payload.find({
      collection: 'meeting-minutes',
      where: { status: { equals: 'published' } },
      sort: '-date',
      limit: 1000,
      depth: 1,
    }),
    payload.find({
      collection: 'financial-reports',
      where: { status: { equals: 'published' } },
      sort: '-date',
      limit: 1000,
      depth: 1,
    }),
    payload.find({
      collection: 'assessor-documents',
      where: { status: { equals: 'published' } },
      sort: '-date',
      limit: 1000,
      depth: 1,
    }),
    payload.find({
      collection: 'road-district-reports',
      where: { status: { equals: 'published' } },
      sort: '-date',
      limit: 1000,
      depth: 1,
    }),
    payload.find({
      collection: 'newsletters',
      where: { status: { equals: 'published' } },
      sort: '-date',
      limit: 1000,
      depth: 1,
    }),
  ])

  // Combine all documents and sort by date (most recent first)
  const allDocuments = [
    ...boardAgendas.docs.map((doc: any) => ({
      ...doc,
      type: 'Board Agenda',
      collection: 'board-agendas',
      uniqueKey: `board-agendas-${doc.id}`,
    })),
    ...meetingMinutes.docs.map((doc: any) => ({
      ...doc,
      type: 'Meeting Minutes',
      collection: 'meeting-minutes',
      uniqueKey: `meeting-minutes-${doc.id}`,
    })),
    ...financialReports.docs.map((doc: any) => ({
      ...doc,
      type: 'Financial Report',
      collection: 'financial-reports',
      uniqueKey: `financial-reports-${doc.id}`,
    })),
    ...assessorDocs.docs.map((doc: any) => ({
      ...doc,
      type: 'Assessor Document',
      collection: 'assessor-documents',
      uniqueKey: `assessor-documents-${doc.id}`,
    })),
    ...roadDistrictReports.docs.map((doc: any) => ({
      ...doc,
      type: 'Road District Report',
      collection: 'road-district-reports',
      uniqueKey: `road-district-reports-${doc.id}`,
    })),
    ...newsletters.docs.map((doc: any) => ({
      ...doc,
      type: 'Newsletter',
      collection: 'newsletters',
      uniqueKey: `newsletters-${doc.id}`,
    })),
  ].sort((a: any, b: any) => {
    // Sort by date, most recent first
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  return (
    <>
      <PageHero
        title="All Documents"
        description="Browse all township documents, reports, and records sorted by date"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Documents', href: '/documents' },
          { label: 'All Documents', href: '/documents/all' },
        ]}
      />

      <section className="py-16 bg-cream">
        <div className="max-w-[1100px] mx-auto px-8">
          <div className="mb-8">
            <p className="text-gray-600">
              Showing <strong>{allDocuments.length}</strong> documents, sorted by date (most recent first)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allDocuments.map((doc: any) => (
              <DocumentCard
                key={doc.uniqueKey}
                title={doc.title || 'Untitled Document'}
                date={doc.date}
                type={doc.type}
                fileUrl={typeof doc.file === 'object' ? doc.file?.url : doc.file}
                description={doc.description}
              />
            ))}
          </div>

          {allDocuments.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-600">No documents found.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
