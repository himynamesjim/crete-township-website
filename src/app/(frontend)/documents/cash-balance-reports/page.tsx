import { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { DocumentListingAdvanced } from '@/components/DocumentListingAdvanced'
import { transformDocuments } from '@/lib/transformDocument'

// Revalidate every 5 minutes so CMS changes appear without a redeploy,
// while one render serves all traffic in between (ISR)
export const revalidate = 300


export const metadata: Metadata = {
  title: 'Cash Balance Reports | Crete Township',
  description: 'View and download Crete Township cash balance reports.',
}

export default async function CashBalanceReportsPage() {
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'financial-reports',
    where: {
      status: { equals: 'published' },
      documentType: { equals: 'cash-balance' },
    },
    sort: '-date',
    limit: 100,
    depth: 1,
  })

  const documents = transformDocuments(docs)

  return (
    <DocumentListingAdvanced
      title="Cash Balance Reports"
      description="Monthly and quarterly cash balance reports for Crete Township."
      documents={documents as any}
      defaultDocumentType="Cash Balance Report"
      emptyStateMessage="Check back soon for cash balance reports."
    />
  )
}
