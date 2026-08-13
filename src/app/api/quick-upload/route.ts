import { NextRequest, NextResponse } from 'next/server'
import { del } from '@vercel/blob'
import { getPayload } from 'payload'
import config from '@payload-config'
import { parseDocumentMetadata } from '@/utilities/parseDocumentMetadata'
import { convertDocxToPdf } from '@/lib/convertDocxToPdf'

/**
 * One-shot document upload for the admin dashboard's Quick Upload panel.
 * Accepts a file + category, then does everything the manual flow requires:
 * parses the date from the filename (or takes an override), converts .docx
 * to PDF, uploads the file, and creates a published entry in the right
 * collection with the right documentType and title convention.
 */

const CATEGORIES: Record<
  string,
  {
    collection: string
    documentType?: string
    titleSuffix: string
    extraFields?: (date: string | null) => Record<string, unknown>
  }
> = {
  'board-agenda': { collection: 'board-agendas', documentType: 'regular', titleSuffix: 'Agenda' },
  'special-agenda': { collection: 'board-agendas', documentType: 'special', titleSuffix: 'Special Meeting Agenda' },
  'annual-town-meeting': { collection: 'board-agendas', documentType: 'annual', titleSuffix: 'Annual Town Meeting' },
  'meeting-minutes': { collection: 'meeting-minutes', documentType: 'regular-board', titleSuffix: 'Meeting Minutes' },
  'special-minutes': { collection: 'meeting-minutes', documentType: 'special-board', titleSuffix: 'Special Meeting Minutes' },
  'assessor-minutes': { collection: 'assessor-documents', documentType: 'assessor-minutes', titleSuffix: 'Assessor Minutes' },
  'highway-commissioner': { collection: 'road-district-reports', documentType: 'highway-commissioner', titleSuffix: 'Highway Commissioner Report' },
  'cash-balance': {
    collection: 'financial-reports',
    documentType: 'cash-balance',
    titleSuffix: 'Cash Balance Report',
    extraFields: (date) => ({ fiscalYear: date ? Number(date.slice(0, 4)) : undefined }),
  },
  'audited-statement': {
    collection: 'financial-reports',
    documentType: 'audited-statement',
    titleSuffix: 'Audited Financial Statement',
    extraFields: (date) => ({ fiscalYear: date ? Number(date.slice(0, 4)) : undefined }),
  },
  newsletter: { collection: 'newsletters', titleSuffix: 'Newsletter' },
}

/** Guess the category from words in the filename. */
function detectCategory(filename: string): string | null {
  const f = filename.toLowerCase()
  if (f.includes('minutes')) {
    if (f.includes('assessor')) return 'assessor-minutes'
    if (f.includes('special') || f.includes('budget')) return 'special-minutes'
    return 'meeting-minutes'
  }
  if (f.includes('agenda')) {
    if (f.includes('annual')) return 'annual-town-meeting'
    if (f.includes('special') || f.includes('budget')) return 'special-agenda'
    return 'board-agenda'
  }
  if (f.includes('cash') && f.includes('balance')) return 'cash-balance'
  if (f.includes('highway') || f.includes('commissioner')) return 'highway-commissioner'
  if (f.includes('assessor')) return 'assessor-minutes'
  if (f.includes('newsletter')) return 'newsletter'
  if (f.includes('audit')) return 'audited-statement'
  return null
}

/** Broad family of a category — used to catch agenda/minutes mix-ups. */
function familyOf(category: string): string {
  if (['board-agenda', 'special-agenda', 'annual-town-meeting'].includes(category)) return 'agenda'
  if (['meeting-minutes', 'special-minutes', 'assessor-minutes'].includes(category)) return 'minutes'
  return category
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const longDate = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number)
  return `${MONTHS[m - 1]} ${d}, ${y}`
}

export async function POST(request: NextRequest) {
  try {
    const payload = await getPayload({ config })

    // Only authenticated admin users may upload
    const { user } = await payload.auth({ headers: request.headers })
    if (!user || !['super-admin', 'township-admin', 'admin', 'editor'].includes((user as any).role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Two intake modes: JSON {blobUrl, filename, ...} for large files staged
    // in Vercel Blob by the browser (bypasses the request body size limit),
    // or legacy multipart form-data with the file inline.
    let filename: string
    let category: string | null
    let dateOverride: string | null
    let blobUrl: string | null = null
    let inlineFile: File | null = null

    if ((request.headers.get('content-type') || '').includes('application/json')) {
      const body = await request.json()
      blobUrl = (body.blobUrl as string) || null
      filename = (body.filename as string) || ''
      category = (body.category as string) || null
      dateOverride = (body.date as string) || null

      if (!blobUrl || !filename || !category) {
        return NextResponse.json({ error: 'Missing blobUrl, filename, or category' }, { status: 400 })
      }
      // Only ingest from Vercel Blob storage — never arbitrary URLs
      const host = new URL(blobUrl).hostname
      if (!host.endsWith('.blob.vercel-storage.com')) {
        return NextResponse.json({ error: 'Invalid file URL' }, { status: 400 })
      }
    } else {
      const formData = await request.formData()
      inlineFile = formData.get('file') as File | null
      category = formData.get('category') as string | null
      dateOverride = (formData.get('date') as string | null) || null

      if (!inlineFile || !category) {
        return NextResponse.json({ error: 'Missing file or category' }, { status: 400 })
      }
      filename = inlineFile.name
    }

    const detected = detectCategory(filename)

    if (category === 'auto') {
      if (!detected) {
        return NextResponse.json(
          { error: `Could not tell what "${filename}" is from its name — pick a category and retry.` },
          { status: 422 },
        )
      }
      category = detected
    } else if (
      detected &&
      CATEGORIES[category] &&
      familyOf(detected) !== familyOf(category) &&
      ['agenda', 'minutes'].includes(familyOf(detected))
    ) {
      // The filename says one thing, the dropdown another (e.g. a file named
      // "...MINUTES..." with the Agenda category selected) — refuse rather
      // than silently filing it in the wrong collection.
      const detectedLabel = familyOf(detected) === 'minutes' ? 'Meeting Minutes' : 'an Agenda'
      return NextResponse.json(
        { error: `"${filename}" looks like ${detectedLabel}, but a different category was selected. Double-check the category and retry.` },
        { status: 422 },
      )
    }

    if (!CATEGORIES[category]) {
      return NextResponse.json({ error: 'Invalid category' }, { status: 400 })
    }
    const cfg = CATEGORIES[category]

    // Date: explicit override wins, else parse from the filename
    const parsed = parseDocumentMetadata(filename)
    const date = dateOverride || parsed.date
    if (!date && cfg.collection !== 'newsletters') {
      return NextResponse.json(
        { error: `Could not detect a date in "${filename}" — pick a meeting date and retry.` },
        { status: 422 },
      )
    }

    const title =
      cfg.collection === 'newsletters'
        ? filename.replace(/\.(pdf|docx?)$/i, '').replace(/[-_]/g, ' ').trim() || 'Newsletter'
        : `${longDate(date!)} - ${cfg.titleSuffix}`

    // Duplicate guard
    const existing = await payload.find({
      collection: cfg.collection as any,
      where: { title: { equals: title } },
      limit: 1,
    })
    if (existing.docs.length > 0) {
      return NextResponse.json({ error: `"${title}" already exists — skipped.` }, { status: 409 })
    }

    // Get the file bytes — from the staged blob (large files) or the inline upload
    let buffer: Buffer
    if (blobUrl) {
      const blobRes = await fetch(blobUrl)
      if (!blobRes.ok) {
        return NextResponse.json({ error: 'Could not read the uploaded file — try again.' }, { status: 502 })
      }
      buffer = Buffer.from(await blobRes.arrayBuffer())
    } else {
      buffer = Buffer.from(await inlineFile!.arrayBuffer())
    }

    // Convert .docx to PDF
    if (/\.docx$/i.test(filename)) {
      buffer = await convertDocxToPdf(buffer)
    }

    const uploaded = await payload.create({
      collection: 'documents',
      data: { alt: title },
      file: { data: buffer, mimetype: 'application/pdf', name: `${title}.pdf`, size: buffer.length },
    })

    const entry = await payload.create({
      collection: cfg.collection as any,
      data: {
        title,
        date: date ?? undefined,
        ...(cfg.documentType ? { documentType: cfg.documentType } : {}),
        status: 'published',
        publishedAt: new Date().toISOString(),
        file: uploaded.id,
        ...(cfg.extraFields?.(date) ?? {}),
      } as any,
    })

    // The staged blob was re-uploaded into Payload's own storage — clean it up
    if (blobUrl) {
      await del(blobUrl).catch((err) => console.warn('Quick upload: temp blob cleanup failed', err))
    }

    return NextResponse.json({
      success: true,
      title,
      collection: cfg.collection,
      id: entry.id,
      adminUrl: `/admin/collections/${cfg.collection}/${entry.id}`,
    })
  } catch (error) {
    console.error('Quick upload error:', error)
    return NextResponse.json({ error: 'Upload failed — check the file and try again.' }, { status: 500 })
  }
}
