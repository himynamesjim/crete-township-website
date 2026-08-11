import { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { BookOpen } from 'lucide-react'
import NewsletterFlipViewer, { YearGroup } from './NewsletterFlipViewer'

// Revalidate every 5 minutes so CMS changes appear without a redeploy,
// while one render serves all traffic in between (ISR)
export const revalidate = 300


export const metadata: Metadata = {
  title: 'Newsletters | Crete Township',
  description: 'Browse and read Crete Township newsletters — flip through editions like a magazine.',
}

export default async function NewslettersPage() {
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'newsletters',
    where: { status: { equals: 'published' } },
    sort: '-date',
    limit: 200,
    depth: 1,
  })

  // Group by year (docs arrive newest-first from the sort)
  const yearMap = new Map<number, { id: string; year: number; title: string; fileUrl: string; description: string | null }[]>()

  for (const doc of docs) {
    const file = doc.file as any
    const fileUrl: string | null = file && typeof file === 'object' ? file.url ?? null : null
    if (!fileUrl) continue // skip newsletters without an uploaded PDF

    const year = new Date(doc.date as string).getFullYear()

    if (!yearMap.has(year)) yearMap.set(year, [])
    yearMap.get(year)!.push({
      id: String(doc.id),
      year,
      title: doc.title as string,
      fileUrl,
      description: (doc.description as string) ?? null,
    })
  }

  // Build YearGroup[] sorted newest year first; within each year assign issue numbers oldest→newest
  const yearGroups: YearGroup[] = Array.from(yearMap.entries())
    .sort(([a], [b]) => b - a) // newest year first
    .map(([year, items]) => {
      // docs came in newest-first, so reverse to get oldest-first for issue numbering
      const oldestFirst = [...items].reverse()
      const multiIssue = oldestFirst.length > 1

      return {
        year,
        newsletters: oldestFirst.map((item, i) => ({
          id: item.id,
          year,
          issue: multiIssue ? i + 1 : null,
          label: item.title,
          shortLabel: item.title,
          path: item.fileUrl,
          description: item.description,
        })),
      }
    })

  if (yearGroups.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-navy-dark text-center px-6 py-16">
        <BookOpen className="text-gold mb-4" size={48} />
        <h2 className="text-white font-display text-2xl font-bold mb-2">No Newsletters Yet</h2>
        <p className="text-white/50 max-w-sm">
          Newsletters will appear here once published in the CMS. Check back soon for community updates.
        </p>
      </div>
    )
  }

  return <NewsletterFlipViewer yearGroups={yearGroups} />
}
