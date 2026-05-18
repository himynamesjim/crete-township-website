import React from 'react'
import { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { DocumentListingAdvanced } from '@/components/DocumentListingAdvanced'
import { transformDocuments } from '@/lib/transformDocument'

export const metadata: Metadata = {
  title: 'Board Agendas | Crete Township',
  description: 'View and download Crete Township board meeting agendas.',
}

export default async function AgendasPage() {
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'board-agendas',
    where: { status: { equals: 'published' } },
    sort: '-date',
    limit: 100,
    depth: 1,
  })

  const agendas = transformDocuments(docs)

  return (
    <DocumentListingAdvanced
      title="Board Agendas"
      description="Official agendas for Crete Township board meetings."
      documents={agendas as any}
      defaultDocumentType="Board Agenda"
      emptyStateMessage="Check back soon for upcoming board meeting agendas."
    />
  )
}
