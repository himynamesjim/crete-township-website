import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import ICAL from 'ical.js'

export interface SearchResult {
  id: string
  collection: string
  collectionLabel: string
  title: string
  subtitle?: string
  url: string
  fileUrl?: string
  date?: string
  icon: 'file' | 'calendar' | 'person' | 'megaphone' | 'newsletter'
}

export interface SearchGroup {
  label: string
  icon: 'file' | 'calendar' | 'person' | 'megaphone' | 'newsletter'
  results: SearchResult[]
}

export interface SearchResponse {
  groups: SearchGroup[]
  total: number
  query: string
}

function getFileUrl(doc: Record<string, unknown>): string | undefined {
  const file = doc.file
  if (file && typeof file === 'object') {
    const fileObj = file as Record<string, unknown>
    return typeof fileObj.url === 'string' ? fileObj.url : undefined
  }
  return undefined
}

function formatDate(dateStr: string | null | undefined): string | undefined {
  if (!dateStr) return undefined
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return undefined
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get('q') ?? ''

  if (q.length < 2) {
    return NextResponse.json({ groups: [], total: 0, query: q } satisfies SearchResponse)
  }

  const payload = await getPayload({ config })

  const [
    agendasResult,
    minutesResult,
    financialResult,
    assessorResult,
    roadResult,
    newslettersResult,
    eventsResult,
    announcementsResult,
    officialsResult,
  ] = await Promise.allSettled([
    // Board Agendas
    payload.find({
      collection: 'board-agendas',
      depth: 1,
      limit: 5,
      sort: '-date',
      where: {
        and: [
          { status: { equals: 'published' } },
          { or: [{ title: { like: q } }, { description: { like: q } }] },
        ],
      },
    }),
    // Meeting Minutes
    payload.find({
      collection: 'meeting-minutes',
      depth: 1,
      limit: 5,
      sort: '-date',
      where: {
        and: [
          { status: { equals: 'published' } },
          { or: [{ title: { like: q } }, { description: { like: q } }] },
        ],
      },
    }),
    // Financial Reports
    payload.find({
      collection: 'financial-reports',
      depth: 1,
      limit: 5,
      sort: '-date',
      where: {
        and: [
          { status: { equals: 'published' } },
          { or: [{ title: { like: q } }, { description: { like: q } }] },
        ],
      },
    }),
    // Assessor Documents
    payload.find({
      collection: 'assessor-documents',
      depth: 1,
      limit: 5,
      sort: '-date',
      where: {
        and: [
          { status: { equals: 'published' } },
          { or: [{ title: { like: q } }, { description: { like: q } }] },
        ],
      },
    }),
    // Road District Reports
    payload.find({
      collection: 'road-district-reports',
      depth: 1,
      limit: 5,
      sort: '-date',
      where: {
        and: [
          { status: { equals: 'published' } },
          { or: [{ title: { like: q } }, { description: { like: q } }] },
        ],
      },
    }),
    // Newsletters
    payload.find({
      collection: 'newsletters',
      depth: 1,
      limit: 5,
      sort: '-date',
      where: {
        and: [
          { status: { equals: 'published' } },
          { or: [{ title: { like: q } }, { description: { like: q } }] },
        ],
      },
    }),
    // Events — Payload collection (category + title + location)
    payload.find({
      collection: 'events',
      depth: 0,
      limit: 5,
      sort: 'startDate',
      where: {
        or: [
          { title: { like: q } },
          { location: { like: q } },
          { category: { like: q } },
        ],
      },
    }),
    // Announcements
    payload.find({
      collection: 'announcements',
      depth: 0,
      limit: 5,
      sort: '-createdAt',
      where: {
        and: [
          { active: { equals: true } },
          { or: [{ title: { like: q } }, { body: { like: q } }] },
        ],
      },
    }),
    // Officials
    payload.find({
      collection: 'officials',
      depth: 0,
      limit: 5,
      sort: 'displayOrder',
      where: {
        and: [
          { status: { equals: 'published' } },
          { or: [{ name: { like: q } }, { bio: { like: q } }] },
        ],
      },
    }),
  ])

  const allGroups: SearchGroup[] = []

  // Officials — first
  if (officialsResult.status === 'fulfilled') {
    const results: SearchResult[] = officialsResult.value.docs.map((doc) => {
      const d = doc as unknown as Record<string, unknown>
      return {
        id: String(doc.id),
        collection: 'officials',
        collectionLabel: 'Offices & Officials',
        title: String(d.name ?? ''),
        subtitle: d.title ? String(d.title) : undefined,
        url: `/officials/${doc.id}`,
        icon: 'person' as const,
        date: undefined,
      }
    })
    if (results.length > 0) {
      allGroups.push({ label: 'Offices & Officials', icon: 'person', results })
    }
  }

  // Board Agendas
  if (agendasResult.status === 'fulfilled') {
    const results: SearchResult[] = agendasResult.value.docs.map((doc) => {
      const d = doc as unknown as Record<string, unknown>
      return {
        id: String(doc.id),
        collection: 'board-agendas',
        collectionLabel: 'Meeting Agendas',
        title: String(d.title ?? ''),
        subtitle: formatDate(d.date as string | undefined),
        url: '/documents/agendas',
        fileUrl: getFileUrl(d),
        date: d.date ? String(d.date) : undefined,
        icon: 'file' as const,
      }
    })
    if (results.length > 0) {
      allGroups.push({ label: 'Meeting Agendas', icon: 'file', results })
    }
  }

  // Meeting Minutes
  if (minutesResult.status === 'fulfilled') {
    const results: SearchResult[] = minutesResult.value.docs.map((doc) => {
      const d = doc as unknown as Record<string, unknown>
      return {
        id: String(doc.id),
        collection: 'meeting-minutes',
        collectionLabel: 'Meeting Minutes',
        title: String(d.title ?? ''),
        subtitle: formatDate(d.date as string | undefined),
        url: '/documents/meeting-minutes',
        fileUrl: getFileUrl(d),
        date: d.date ? String(d.date) : undefined,
        icon: 'file' as const,
      }
    })
    if (results.length > 0) {
      allGroups.push({ label: 'Meeting Minutes', icon: 'file', results })
    }
  }

  // Financial Reports
  if (financialResult.status === 'fulfilled') {
    const results: SearchResult[] = financialResult.value.docs.map((doc) => {
      const d = doc as unknown as Record<string, unknown>
      const docType = d.documentType as string | undefined
      let url = '/documents/audited-financial-statements'
      if (docType === 'cash-balance') {
        url = '/documents/cash-balance-reports'
      } else if (docType === 'audited-statement') {
        url = '/documents/audited-financial-statements'
      }
      return {
        id: String(doc.id),
        collection: 'financial-reports',
        collectionLabel: 'Financial Reports',
        title: String(d.title ?? ''),
        subtitle: formatDate(d.date as string | undefined),
        url,
        fileUrl: getFileUrl(d),
        date: d.date ? String(d.date) : undefined,
        icon: 'file' as const,
      }
    })
    if (results.length > 0) {
      allGroups.push({ label: 'Financial Reports', icon: 'file', results })
    }
  }

  // Assessor Documents
  if (assessorResult.status === 'fulfilled') {
    const results: SearchResult[] = assessorResult.value.docs.map((doc) => {
      const d = doc as unknown as Record<string, unknown>
      return {
        id: String(doc.id),
        collection: 'assessor-documents',
        collectionLabel: 'Assessor Documents',
        title: String(d.title ?? ''),
        subtitle: formatDate(d.date as string | undefined),
        url: '/documents/assessor-minutes',
        fileUrl: getFileUrl(d),
        date: d.date ? String(d.date) : undefined,
        icon: 'file' as const,
      }
    })
    if (results.length > 0) {
      allGroups.push({ label: 'Assessor Documents', icon: 'file', results })
    }
  }

  // Road District Reports
  if (roadResult.status === 'fulfilled') {
    const results: SearchResult[] = roadResult.value.docs.map((doc) => {
      const d = doc as unknown as Record<string, unknown>
      return {
        id: String(doc.id),
        collection: 'road-district-reports',
        collectionLabel: 'Road District Reports',
        title: String(d.title ?? ''),
        subtitle: formatDate(d.date as string | undefined),
        url: '/documents/highway-commissioner-reports',
        fileUrl: getFileUrl(d),
        date: d.date ? String(d.date) : undefined,
        icon: 'file' as const,
      }
    })
    if (results.length > 0) {
      allGroups.push({ label: 'Road District Reports', icon: 'file', results })
    }
  }

  // Newsletters
  if (newslettersResult.status === 'fulfilled') {
    const results: SearchResult[] = newslettersResult.value.docs.map((doc) => {
      const d = doc as unknown as Record<string, unknown>
      return {
        id: String(doc.id),
        collection: 'newsletters',
        collectionLabel: 'Newsletters',
        title: String(d.title ?? ''),
        subtitle: formatDate(d.date as string | undefined),
        url: '/documents/newsletters',
        fileUrl: getFileUrl(d),
        date: d.date ? String(d.date) : undefined,
        icon: 'newsletter' as const,
      }
    })
    if (results.length > 0) {
      allGroups.push({ label: 'Newsletters', icon: 'newsletter', results })
    }
  }

  // Events — combine Payload CMS records + Google Calendar ICS feed
  const eventResults: SearchResult[] = []

  if (eventsResult.status === 'fulfilled') {
    eventsResult.value.docs.forEach((doc) => {
      const d = doc as unknown as Record<string, unknown>
      eventResults.push({
        id: String(doc.id),
        collection: 'events',
        collectionLabel: 'Events',
        title: String(d.title ?? ''),
        subtitle: d.location ? String(d.location) : formatDate(d.startDate as string | undefined),
        url: '/events',
        date: d.startDate ? String(d.startDate) : undefined,
        icon: 'calendar' as const,
      })
    })
  }

  // Also search the Google Calendar ICS feed (where real township events live)
  const icsUrl = process.env.GOOGLE_CALENDAR_ICS_URL
  if (icsUrl) {
    try {
      const icsRes = await fetch(icsUrl, { next: { revalidate: 300 } })
      const icsText = await icsRes.text()
      if (icsText.trim().startsWith('BEGIN:VCALENDAR')) {
        const qLower = q.toLowerCase()
        const jcal = ICAL.parse(icsText)
        const comp = new ICAL.Component(jcal)
        const vevents = comp.getAllSubcomponents('vevent')
        let calCount = 0
        for (const vevent of vevents) {
          if (calCount >= 8) break
          const event = new ICAL.Event(vevent)
          const summary = (event.summary ?? '').toLowerCase()
          const description = (event.description ?? '').toLowerCase()
          const location = (event.location ?? '').toLowerCase()
          if (
            summary.includes(qLower) ||
            description.includes(qLower) ||
            location.includes(qLower)
          ) {
            const startJs = event.startDate.toJSDate()
            eventResults.push({
              id: `cal-${event.uid ?? calCount}`,
              collection: 'events',
              collectionLabel: 'Events',
              title: event.summary ?? 'Township Event',
              subtitle: event.location
                ? event.location
                : startJs.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
              url: '/events',
              date: startJs.toISOString(),
              icon: 'calendar' as const,
            })
            calCount++
          }
        }
      }
    } catch {
      // ICS fetch failure is non-fatal — Payload events still returned
    }
  }

  // Deduplicate by title+date and sort upcoming first
  const seen = new Set<string>()
  const uniqueEvents = eventResults
    .filter((e) => {
      const key = `${e.title}|${e.date?.slice(0, 10) ?? ''}`
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
    .sort((a, b) => {
      if (a.date && b.date) return new Date(a.date).getTime() - new Date(b.date).getTime()
      return 0
    })
    .slice(0, 8)

  if (uniqueEvents.length > 0) {
    allGroups.push({ label: 'Events', icon: 'calendar', results: uniqueEvents })
  }

  // Announcements
  if (announcementsResult.status === 'fulfilled') {
    const results: SearchResult[] = announcementsResult.value.docs.map((doc) => {
      const d = doc as unknown as Record<string, unknown>
      return {
        id: String(doc.id),
        collection: 'announcements',
        collectionLabel: 'Announcements',
        title: String(d.title ?? ''),
        subtitle: undefined,
        url: '/',
        icon: 'megaphone' as const,
      }
    })
    if (results.length > 0) {
      allGroups.push({ label: 'Announcements', icon: 'megaphone', results })
    }
  }

  const total = allGroups.reduce((sum, g) => sum + g.results.length, 0)

  return NextResponse.json({ groups: allGroups, total, query: q } satisfies SearchResponse)
}
