import { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { DocumentListingAdvanced } from '@/components/DocumentListingAdvanced'

export const metadata: Metadata = {
  title: 'Meeting Minutes | Crete Township',
  description: 'View and download Crete Township board meeting minutes.',
}

export default async function MeetingMinutesPage() {
  const payload = await getPayload({ config })

  const { docs: minutes } = await payload.find({
    collection: 'meeting-minutes',
    where: { status: { equals: 'published' } },
    sort: '-date',
    limit: 100,
    depth: 1,
  })

  return (
    <DocumentListingAdvanced
      title="Meeting Minutes"
      description="Official minutes from Crete Township board meetings."
      documents={minutes as any}
      defaultDocumentType="Meeting Minutes"
      emptyStateMessage="Check back soon for meeting minutes."
    />
  )
}
