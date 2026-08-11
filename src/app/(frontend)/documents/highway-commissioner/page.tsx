import { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { DocumentListingAdvanced } from '@/components/DocumentListingAdvanced'
import { transformDocuments } from '@/lib/transformDocument'

// Revalidate every 5 minutes so CMS changes appear without a redeploy,
// while one render serves all traffic in between (ISR)
export const revalidate = 300


export const metadata: Metadata = {
  title: 'Highway Commissioner Reports | Crete Township',
  description: 'View and download Crete Township road district and highway commissioner reports.',
}

export default async function HighwayCommissionerPage() {
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'road-district-reports',
    where: { status: { equals: 'published' } },
    sort: '-date',
    limit: 100,
    depth: 1,
  })

  const reports = transformDocuments(docs)

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
