import { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { DocumentListingAdvanced } from '@/components/DocumentListingAdvanced'

export const metadata: Metadata = {
  title: 'Town Fund and Road & Bridge Tax Levy Minutes | Crete Township',
  description:
    'View and download Crete Township town fund and road & bridge tax levy minutes.',
}

export default async function TownFundLevyMinutesPage() {
  const payload = await getPayload({ config })

  const { docs: documents } = await payload.find({
    collection: 'financial-reports',
    where: {
      status: { equals: 'published' },
      documentType: { equals: 'tax-levy' },
    },
    sort: '-date',
    limit: 100,
    depth: 1,
  })

  return (
    <DocumentListingAdvanced
      title="Town Fund and Road & Bridge Tax Levy Minutes"
      description="Official town fund and road & bridge tax levy meeting minutes."
      documents={documents as any}
      defaultDocumentType="Tax Levy Minutes"
      emptyStateMessage="Check back soon for town fund and tax levy minutes."
    />
  )
}
