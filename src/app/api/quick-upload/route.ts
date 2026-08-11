import { NextRequest, NextResponse } from 'next/server'
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

    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const category = formData.get('category') as string | null
    const dateOverride = (formData.get('date') as string | null) || null

    if (!file || !category || !CATEGORIES[category]) {
      return NextResponse.json({ error: 'Missing file or invalid category' }, { status: 400 })
    }
    const cfg = CATEGORIES[category]

    // Date: explicit override wins, else parse from the filename
    const parsed = parseDocumentMetadata(file.name)
    const date = dateOverride || parsed.date
    if (!date && cfg.collection !== 'newsletters') {
      return NextResponse.json(
        { error: `Could not detect a date in "${file.name}" — pick a meeting date and retry.` },
        { status: 422 },
      )
    }

    const title =
      cfg.collection === 'newsletters'
        ? file.name.replace(/\.(pdf|docx?)$/i, '').replace(/[-_]/g, ' ').trim() || 'Newsletter'
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

    // Convert .docx to PDF
    let buffer = Buffer.from(await file.arrayBuffer())
    if (/\.docx$/i.test(file.name)) {
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
