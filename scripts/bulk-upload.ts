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

  // Only process PDFs; skip duplicates like "(1)"
  const allFiles = fs.readdirSync(rootDir)
  const pdfFiles = allFiles
    .filter((f) => f.toLowerCase().endsWith('.pdf'))
    .filter((f) => !/ \(\d+\)\.pdf$/i.test(f)) // skip "(1)" duplicates
    .sort()

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
      const meta = parseDocumentMetadata(filename)
      const title = cfg.formatTitle(meta.date, filename)
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
    const meta = parseDocumentMetadata(filename)
    const title = cfg.formatTitle(meta.date, filename)

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
