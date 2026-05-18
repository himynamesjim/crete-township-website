import { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { DocumentListingAdvanced } from '@/components/DocumentListingAdvanced'

export const metadata: Metadata = {
  title: 'Assessor Documents | Crete Township',
  description: 'View and download Crete Township assessor minutes and related documents.',
}

export default async function AssessorMinutesPage() {
  const payload = await getPayload({ config })

  const { docs: documents } = await payload.find({
    collection: 'assessor-documents',
    where: { status: { equals: 'published' } },
    sort: '-date',
    limit: 100,
    depth: 1,
  })

  return (
    <DocumentListingAdvanced
      title="Assessor Documents"
      description="Official assessor minutes, HOA documents, exemption forms, and related materials."
      documents={documents as any}
      defaultDocumentType="Assessor Document"
      emptyStateMessage="Check back soon for assessor documents."
    />
  )
}
