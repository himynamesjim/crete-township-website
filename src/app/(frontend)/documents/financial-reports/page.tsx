import { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { DocumentListingPage } from '@/components/DocumentListingPage'
import { transformDocuments } from '@/lib/transformDocument'

export const metadata: Metadata = {
  title: 'Financial Reports | Crete Township',
  description: 'View and download Crete Township financial reports, audited statements, and budget documents.',
}

export default async function FinancialReportsPage() {
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'financial-reports',
    where: { status: { equals: 'published' } },
    sort: '-date',
    limit: 100,
  })

  const reports = transformDocuments(docs)

  return (
    <DocumentListingPage
      title="Financial Reports"
      description="Official financial reports, audited statements, cash balance reports, and budget documents."
      documents={reports}
      defaultDocumentType="Financial Report"
      emptyStateMessage="Check back soon for financial reports."
    />
  )
}
