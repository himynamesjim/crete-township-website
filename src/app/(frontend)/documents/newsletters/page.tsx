import { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { DocumentListingAdvanced } from '@/components/DocumentListingAdvanced'
import { transformDocuments } from '@/lib/transformDocument'

export const metadata: Metadata = {
  title: 'Newsletters | Crete Township',
  description: 'View and download Crete Township newsletters.',
}

export default async function NewslettersPage() {
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'newsletters',
    where: { status: { equals: 'published' } },
    sort: '-date',
    limit: 100,
    depth: 1,
  })

  const newsletters = transformDocuments(docs)

  return (
    <DocumentListingAdvanced
      title="Newsletters"
      description="Stay informed with Crete Township newsletters and community updates."
      documents={newsletters as any}
      defaultDocumentType="Newsletter"
      emptyStateMessage="Check back soon for newsletters and community updates."
    />
  )
}
