import { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { DocumentListingAdvanced } from '@/components/DocumentListingAdvanced'
import { transformDocuments } from '@/lib/transformDocument'

// Revalidate every 5 minutes so CMS changes appear without a redeploy,
// while one render serves all traffic in between (ISR)
export const revalidate = 300


export const metadata: Metadata = {
  title: 'Annual Town Meetings | Crete Township',
  description: 'View and download Crete Township annual town meeting documents.',
}

export default async function AnnualTownMeetingsPage() {
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'board-agendas',
    where: {
      status: { equals: 'published' },
      documentType: { equals: 'annual' },
    },
    sort: '-date',
    limit: 100,
    depth: 1,
  })

  // Transform BoardAgenda data to match DocumentListingAdvanced props
  const documents = transformDocuments(docs)

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
