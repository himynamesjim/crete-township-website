import { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { DocumentListingAdvanced } from '@/components/DocumentListingAdvanced'

export const metadata: Metadata = {
  title: 'Annual Town Meetings | Crete Township',
  description: 'View and download Crete Township annual town meeting documents.',
}

export default async function AnnualTownMeetingsPage() {
  const payload = await getPayload({ config })

  const { docs: documents } = await payload.find({
    collection: 'board-agendas',
    where: {
      status: { equals: 'published' },
      documentType: { equals: 'annual' },
    },
    sort: '-date',
    limit: 100,
    depth: 1,
  })

  return (
    <DocumentListingAdvanced
      title="Annual Town Meetings"
      description="Official annual town meeting documents and records."
      documents={documents}
      defaultDocumentType="Annual Town Meeting"
      emptyStateMessage="Check back soon for annual town meeting documents."
    />
  )
}
