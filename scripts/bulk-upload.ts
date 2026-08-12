/**
 * Bulk PDF Upload Script
 *
 * Reads PDFs from a migration folder, uploads them to Vercel Blob via Payload,
 * and creates the corresponding CMS collection entries with auto-parsed dates.
 *
 * Usage:
 *   unset DATABASE_URI && npx tsx scripts/bulk-upload.ts --collection board-agendas
 *   unset DATABASE_URI && npx tsx scripts/bulk-upload.ts --collection meeting-minutes
 *   unset DATABASE_URI && npx tsx scripts/bulk-upload.ts --collection financial-reports
 *   unset DATABASE_URI && npx tsx scripts/bulk-upload.ts --collection board-agendas --dry-run
 *   unset DATABASE_URI && npx tsx scripts/bulk-upload.ts --collection board-agendas --status draft
 *
 * Supported collections:
 *   board-agendas       → migration/sorted/board-agendas/
 *   meeting-minutes     → migration/sorted/meeting-minutes/
 *   financial-reports   → migration/sorted/financial-reports/
 *   assessor-documents  → migration/sorted/assessor-documents/
 *   road-district-reports → migration/sorted/road-district-reports/
 *   newsletters         → migration/sorted/newsletters/
 *   annual-town-meetings → migration/sorted/annual-town-meeting/
 */

// dotenv and path/fs are safe to import statically (no env-var side effects)
import { config as loadEnv } from 'dotenv'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

// Resolve the project root from this script's location (scripts/ → ../)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// MUST run before payload.config is imported — it reads DATABASE_URI, PAYLOAD_SECRET, etc.
loadEnv({ path: path.resolve(__dirname, '../.env.local') })

// Safe to import statically — pure utility with no env-var reads
import { parseDocumentMetadata } from '../src/utilities/parseDocumentMetadata'

// getPayload and payload.config are imported dynamically inside run() so they
// execute after loadEnv() has populated process.env.

// ── Collection config ────────────────────────────────────────────────────────

type CollectionSlug =
  | 'board-agendas'
  | 'meeting-minutes'
  | 'financial-reports'
  | 'assessor-documents'
  | 'road-district-reports'
  | 'newsletters'
  | 'annual-town-meetings'

interface CollectionConfig {
  slug: CollectionSlug
  sourceDir: string
  formatTitle: (date: string | null, filename: string) => string
  extraFields?: (date: string | null, filename: string) => Record<string, unknown>
  // Explicit filename → title/date mapping. When present, only manifest files are
  // processed (including "(1)"-suffixed ones the auto-filter would drop) and the
  // manifest title/date win over filename parsing.
  manifest?: Record<string, { title: string; date: string }>
}

const MONTH_NAMES = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
]

function isoToLongDate(iso: string | null): string {
  if (!iso) return ''
  const [year, month, day] = iso.split('-').map(Number)
  return `${MONTH_NAMES[month - 1]} ${day}, ${year}`
}

const COLLECTIONS: Record<CollectionSlug, CollectionConfig> = {
  'board-agendas': {
    slug: 'board-agendas',
    sourceDir: 'migration/sorted/board-agendas',
    formatTitle: (date) =>
      date ? `${isoToLongDate(date)} - Agenda` : 'Board Agenda',
    extraFields: () => ({ documentType: 'regular' }),
  },
  'meeting-minutes': {
    slug: 'meeting-minutes',
    sourceDir: 'migration/sorted/meeting-minutes',
    formatTitle: (date) =>
      date ? `${isoToLongDate(date)} - Meeting Minutes` : 'Meeting Minutes',
    extraFields: () => ({ documentType: 'regular-board' }),
  },
  'financial-reports': {
    slug: 'financial-reports',
    sourceDir: 'migration/sorted/financial-reports',
    formatTitle: (date, filename) => {
      const meta = parseDocumentMetadata(filename)
      return meta.fiscalYear
        ? `FY${meta.fiscalYear} - Financial Report`
        : date
        ? `${isoToLongDate(date)} - Financial Report`
        : 'Financial Report'
    },
    extraFields: (date, filename) => {
      const meta = parseDocumentMetadata(filename)
      return {
        documentType: 'audited-statement',
        fiscalYear: meta.fiscalYear ?? (date ? Number(date.slice(0, 4)) : undefined),
      }
    },
  },
  'assessor-documents': {
    slug: 'assessor-documents',
    sourceDir: 'migration/sorted/assessor-documents',
    formatTitle: (date) =>
      date ? `${isoToLongDate(date)} - Assessor Minutes` : 'Assessor Document',
    extraFields: () => ({ documentType: 'assessor-minutes' }),
  },
  'road-district-reports': {
    slug: 'road-district-reports',
    sourceDir: 'migration/sorted/road-district-reports',
    formatTitle: (date) =>
      date
        ? `${isoToLongDate(date)} - Highway Commissioner Report`
        : 'Road District Report',
    extraFields: () => ({ documentType: 'highway-commissioner' }),
  },
  newsletters: {
    slug: 'newsletters',
    sourceDir: 'migration/sorted/newsletters',
    formatTitle: (_date, filename) => {
      const base = filename.replace(/\.pdf$/i, '').replace(/[-_]/g, ' ').trim()
      return base || 'Newsletter'
    },
    // Seasons identified from each PDF's cover letter ("From the Supervisor").
    // Filenames are year-only, so dates are approximate publication dates.
    manifest: {
      '2018 - Newsletter.pdf': { title: '2018 - Fall Newsletter', date: '2018-10-01' },
      '2019 - Newsletter (1).pdf': { title: '2019 - Spring Newsletter', date: '2019-04-01' },
      '2019 - Newsletter (2).pdf': { title: '2019 - Summer Newsletter', date: '2019-07-01' },
      '2019 - Newsletter.pdf': { title: '2019 - Fall Newsletter', date: '2019-10-01' },
      '2020 - Newsletter.pdf': { title: '2020 - Spring Newsletter', date: '2020-04-01' },
      '2020 - Newsletter (1).pdf': { title: '2020 - Summer Newsletter', date: '2020-07-01' },
      '2020 - Newsletter (2).pdf': { title: '2020 - Winter Newsletter', date: '2020-12-01' },
      '2021 - Newsletter.pdf': { title: '2021 - Spring Newsletter', date: '2021-04-01' },
      '2021 - Newsletter (1).pdf': { title: '2021 - Summer Newsletter', date: '2021-07-01' },
      '2021 - Newsletter (2).pdf': { title: '2021 - Fall Newsletter', date: '2021-10-01' },
      '2022 - Newsletter.pdf': { title: '2022 - Spring Newsletter', date: '2022-04-01' },
      '2022 - Newsletter (1).pdf': { title: '2022 - Summer Newsletter', date: '2022-07-01' },
      '2022 - Newsletter (2).pdf': { title: '2022 - Winter Newsletter', date: '2022-12-01' },
      '2023 - Newsletter (1).pdf': { title: '2023 - Winter Newsletter', date: '2023-01-15' },
      '2023 - Newsletter (2).pdf': { title: '2023 - Summer Newsletter', date: '2023-07-01' },
      '2023 - Newsletter.pdf': { title: '2023 - Fall Newsletter', date: '2023-10-01' },
      '2024 - Newsletter.pdf': { title: '2024 - Winter Newsletter', date: '2024-01-15' },
      '2025 - Newsletter.pdf': { title: '2025 - Fall Newsletter', date: '2025-10-01' },
      '2026 - Spring Newsletter.pdf': { title: '2026 - Spring Newsletter', date: '2026-02-28' },
    },
  },
  'annual-town-meetings': {
    slug: 'board-agendas',
    sourceDir: 'migration/sorted/annual-town-meeting',
    formatTitle: (date) =>
      date ? `${isoToLongDate(date)} - Annual Town Meeting` : 'Annual Town Meeting',
    extraFields: () => ({ documentType: 'annual' }),
  },
}

// ── Argument parsing ─────────────────────────────────────────────────────────

const args = process.argv.slice(2)
const getArg = (flag: string) => {
  const i = args.indexOf(flag)
  return i !== -1 ? args[i + 1] : undefined
}
const hasFlag = (flag: string) => args.includes(flag)

const collectionKey = getArg('--collection') as CollectionSlug | undefined
const dryRun = hasFlag('--dry-run')
const status = (getArg('--status') as 'draft' | 'published') ?? 'published'
const startFrom = getArg('--start') ? Number(getArg('--start')) : 0

if (!collectionKey || !COLLECTIONS[collectionKey]) {
  console.error(`\nUsage: npx tsx scripts/bulk-upload.ts --collection <name> [--dry-run] [--status draft|published] [--start N]\n`)
  console.error(`Available collections:\n  ${Object.keys(COLLECTIONS).join('\n  ')}`)
  process.exit(1)
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function run() {
  const cfg = COLLECTIONS[collectionKey!]
  const rootDir = path.resolve(process.cwd(), cfg.sourceDir)

  if (!fs.existsSync(rootDir)) {
    console.error(`\n❌  Directory not found: ${rootDir}`)
    process.exit(1)
  }

  // Only process PDFs. Without a manifest, skip "(1)"-style duplicates; with a
  // manifest, process exactly the listed files (numbered ones are real editions).
  const allFiles = fs.readdirSync(rootDir)
  const pdfFiles = allFiles
    .filter((f) => f.toLowerCase().endsWith('.pdf'))
    .filter((f) => (cfg.manifest ? f in cfg.manifest : !/ \(\d+\)\.pdf$/i.test(f)))
    .sort()

  if (cfg.manifest) {
    const missing = Object.keys(cfg.manifest).filter((f) => !allFiles.includes(f))
    const unlisted = allFiles.filter((f) => f.toLowerCase().endsWith('.pdf') && !(f in cfg.manifest!))
    if (missing.length) console.warn(`⚠️   Manifest files not found on disk: ${missing.join(', ')}`)
    if (unlisted.length) console.warn(`⚠️   PDFs on disk not in manifest (skipped): ${unlisted.join(', ')}`)
  }

  const resolveMeta = (filename: string) => {
    const parsed = parseDocumentMetadata(filename)
    const manifestEntry = cfg.manifest?.[filename]
    return {
      date: manifestEntry?.date ?? parsed.date,
      title: manifestEntry?.title ?? cfg.formatTitle(parsed.date, filename),
    }
  }

  console.log(`\n📂  Source: ${rootDir}`)
  console.log(`📄  PDFs found: ${pdfFiles.length} (skipping ${allFiles.filter(f => / \(\d+\)/.test(f)).length} duplicates)`)
  console.log(`📋  Collection: ${cfg.slug}`)
  console.log(`🚦  Status: ${status}`)
  if (dryRun) console.log(`🧪  DRY RUN — nothing will be uploaded\n`)
  else console.log()

  if (dryRun) {
    // Preview what would be created
    const slice = pdfFiles.slice(startFrom, startFrom + 10)
    console.log(`Preview (first ${slice.length} of ${pdfFiles.length}):\n`)
    for (const filename of slice) {
      const meta = resolveMeta(filename)
      const title = meta.title
      const extra = cfg.extraFields?.(meta.date, filename) ?? {}
      console.log(`  File:  ${filename}`)
      console.log(`  Title: ${title}`)
      console.log(`  Date:  ${meta.date ?? '(not found)'}`)
      if (Object.keys(extra).length) console.log(`  Extra: ${JSON.stringify(extra)}`)
      console.log()
    }
    if (pdfFiles.length > 10) console.log(`  ... and ${pdfFiles.length - 10} more`)
    return
  }

  // Dynamic imports — run after loadEnv() so process.env is fully populated
  const { getPayload } = await import('payload')
  const { default: payloadConfig } = await import('../src/payload.config')

  const payload = await getPayload({ config: payloadConfig })

  let created = 0
  let skipped = 0
  let failed = 0

  for (let i = startFrom; i < pdfFiles.length; i++) {
    const filename = pdfFiles[i]
    const filePath = path.join(rootDir, filename)
    const meta = resolveMeta(filename)
    const title = meta.title

    process.stdout.write(`[${i + 1}/${pdfFiles.length}] ${filename} → "${title}" ... `)

    try {
      // Check if a document with this filename already exists
      const existing = await payload.find({
        collection: 'documents',
        where: { filename: { equals: filename } },
        limit: 1,
      })

      let documentId: string | number

      if (existing.docs.length > 0) {
        documentId = existing.docs[0].id
        process.stdout.write(`(file exists, reusing) `)
      } else {
        // Read file and upload
        const fileBuffer = fs.readFileSync(filePath)
        const fileSize = fs.statSync(filePath).size

        const uploadedDoc = await payload.create({
          collection: 'documents',
          data: { alt: title },
          file: {
            data: fileBuffer,
            mimetype: 'application/pdf',
            name: filename,
            size: fileSize,
          },
        })
        documentId = uploadedDoc.id
      }

      // Check if this collection entry already exists (by title)
      const existingEntry = await payload.find({
        collection: cfg.slug,
        where: { title: { equals: title } },
        limit: 1,
      })

      if (existingEntry.docs.length > 0) {
        console.log(`SKIP (already in CMS)`)
        skipped++
        continue
      }

      // Create the collection entry
      const extraFields = cfg.extraFields?.(meta.date, filename) ?? {}
      await payload.create({
        collection: cfg.slug,
        data: {
          title,
          date: meta.date ?? undefined,
          status,
          publishedAt: status === 'published' ? new Date().toISOString() : undefined,
          file: documentId,
          ...extraFields,
        },
      })

      console.log(`✓`)
      created++
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err)
      console.log(`✗ FAILED: ${msg}`)
      failed++
    }

    // Small delay to avoid overwhelming Vercel Blob
    await new Promise((r) => setTimeout(r, 200))
  }

  console.log(`\n✅  Done`)
  console.log(`   Created: ${created}`)
  console.log(`   Skipped: ${skipped} (already existed)`)
  console.log(`   Failed:  ${failed}`)

  await payload.db?.destroy?.()
  process.exit(0)
}

run().catch((err) => {
  console.error('\n❌  Fatal error:', err)
  process.exit(1)
})
