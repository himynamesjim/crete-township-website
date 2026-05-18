import { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { DocumentListingAdvanced } from '@/components/DocumentListingAdvanced'

export const metadata: Metadata = {
  title: 'Highway Commissioner Reports | Crete Township',
  description: 'View and download Crete Township road district and highway commissioner reports.',
}

export default async function HighwayCommissionerPage() {
  const payload = await getPayload({ config })

  const { docs: reports } = await payload.find({
    collection: 'road-district-reports',
    where: { status: { equals: 'published' } },
    sort: '-date',
    limit: 100,
    depth: 1,
  })

  return (
    <DocumentListingAdvanced
      title="Highway Commissioner Reports"
      description="Official road district reports, environmental documents, and storm sewer records."
      documents={reports as any}
      defaultDocumentType="Highway Commissioner Report"
      emptyStateMessage="Check back soon for highway commissioner reports."
    />
  )
}
