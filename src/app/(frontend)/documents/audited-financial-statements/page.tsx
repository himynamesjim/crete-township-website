import { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { DocumentListingAdvanced } from '@/components/DocumentListingAdvanced'

export const metadata: Metadata = {
  title: 'Audited Financial Statements | Crete Township',
  description: 'View and download Crete Township audited financial statements.',
}

export default async function AuditedFinancialStatementsPage() {
  const payload = await getPayload({ config })

  const { docs: documents } = await payload.find({
    collection: 'financial-reports',
    where: {
      status: { equals: 'published' },
      documentType: { equals: 'audited-statement' },
    },
    sort: '-date',
    limit: 100,
    depth: 1,
  })

  return (
    <DocumentListingAdvanced
      title="Audited Financial Statements"
      description="Official audited financial statements for Crete Township."
      documents={documents as any}
      defaultDocumentType="Audited Statement"
      emptyStateMessage="Check back soon for audited financial statements."
    />
  )
}
