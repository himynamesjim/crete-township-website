/**
 * Migrate documents from cretetownship.com/meeting-minutes/ that are missing
 * from the CMS. Routes each to the right collection: meeting-minutes,
 * road-district-reports (Highway Commissioner reports), or
 * assessor-documents (assessor minutes). Converts .docx sources to PDF.
 *
 * Idempotent — skips titles that already exist in their target collection.
 *
 * Usage: unset DATABASE_URI && npx tsx scripts/migrate-missing-minutes.ts [--dry-run]
 */

import { config as loadEnv } from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
loadEnv({ path: path.resolve(__dirname, '../.env.local') })

const DRY_RUN = process.argv.includes('--dry-run')

type MissingDoc = {
  url: string
  title: string
  date: string // YYYY-MM-DD
  collection: 'meeting-minutes' | 'road-district-reports' | 'assessor-documents'
  documentType: string
}

const MISSING: MissingDoc[] = [
  // ── Regular board minutes ──
  { url: 'https://cretetownship.com/wp-content/uploads/2026/03/02-11-2026-Minutes.docx', title: 'February 11, 2026 - Meeting Minutes', date: '2026-02-11', collection: 'meeting-minutes', documentType: 'regular-board' },
  { url: 'https://cretetownship.com/wp-content/uploads/2026/03/01-11-2026-Minutes.docx', title: 'January 11, 2026 - Meeting Minutes', date: '2026-01-11', collection: 'meeting-minutes', documentType: 'regular-board' },
  { url: 'https://cretetownship.com/wp-content/uploads/2025/11/Board-Meeting-Minutes-10-8-25.pdf', title: 'October 8, 2025 - Meeting Minutes', date: '2025-10-08', collection: 'meeting-minutes', documentType: 'regular-board' },
  { url: 'https://cretetownship.com/wp-content/uploads/2022/08/Board-Meeting-minutes-12-12-18.pdf', title: 'December 12, 2018 - Meeting Minutes', date: '2018-12-12', collection: 'meeting-minutes', documentType: 'regular-board' },
  // ── Special / committee / annual minutes ──
  { url: 'https://cretetownship.com/wp-content/uploads/2026/06/USA-FEST-BOARD-MEETING-5-12-2026.pdf', title: 'May 12, 2026 - USA Fest Meeting Minutes', date: '2026-05-12', collection: 'meeting-minutes', documentType: 'special-board' },
  { url: 'https://cretetownship.com/wp-content/uploads/2026/05/BOARD-OF-TRUSTEES-BUDGET-WORKSHOP-4-27-2026.pdf', title: 'April 27, 2026 - Budget Workshop Minutes', date: '2026-04-27', collection: 'meeting-minutes', documentType: 'special-board' },
  { url: 'https://cretetownship.com/wp-content/uploads/2026/04/SPECIAL-BOARD-MEETING-3-24-2026.pdf', title: 'March 24, 2026 - Special Meeting Minutes', date: '2026-03-24', collection: 'meeting-minutes', documentType: 'special-board' },
  { url: 'https://cretetownship.com/wp-content/uploads/2026/03/02-10-2026-USA-Fest-Minutes.docx', title: 'February 10, 2026 - USA Fest Meeting Minutes', date: '2026-02-10', collection: 'meeting-minutes', documentType: 'special-board' },
  { url: 'https://cretetownship.com/wp-content/uploads/2025/11/Special-Board-Meeting-Minutes-11-4-25.pdf', title: 'November 4, 2025 - Special Meeting Minutes', date: '2025-11-04', collection: 'meeting-minutes', documentType: 'special-board' },
  { url: 'https://cretetownship.com/wp-content/uploads/2025/11/Special-Board-Meeting-Minutes-10-28-25.pdf', title: 'October 28, 2025 - Special Meeting Minutes', date: '2025-10-28', collection: 'meeting-minutes', documentType: 'special-board' },
  { url: 'https://cretetownship.com/wp-content/uploads/2025/08/SPECIAL-BOARD-MEETING-8-5-2025.pdf', title: 'August 5, 2025 - Special Meeting Minutes', date: '2025-08-05', collection: 'meeting-minutes', documentType: 'special-board' },
  { url: 'https://cretetownship.com/wp-content/uploads/2025/08/Special-Board-Meeting-7-29-2025.pdf', title: 'July 29, 2025 - Special Meeting Minutes', date: '2025-07-29', collection: 'meeting-minutes', documentType: 'special-board' },
  { url: 'https://cretetownship.com/wp-content/uploads/2026/04/APRIL-8-2025.pdf', title: 'April 8, 2025 - Annual Town Meeting Minutes', date: '2025-04-08', collection: 'meeting-minutes', documentType: 'special-board' },
  { url: 'https://cretetownship.com/wp-content/uploads/2026/05/SPECIAL-BOARD-MEETING-MINUTES-1-13-2025.pdf', title: 'January 13, 2025 - Special Meeting Minutes', date: '2025-01-13', collection: 'meeting-minutes', documentType: 'special-board' },
  { url: 'https://cretetownship.com/wp-content/uploads/2024/10/Crete-Plan-Commission-oct-3-24.pdf', title: 'October 3, 2024 - Plan Commission Minutes', date: '2024-10-03', collection: 'meeting-minutes', documentType: 'special-board' },
  { url: 'https://cretetownship.com/wp-content/uploads/2024/06/Special-Board-Meeting-5-6-2024.pdf', title: 'May 6, 2024 - Special Meeting Minutes', date: '2024-05-06', collection: 'meeting-minutes', documentType: 'special-board' },
  { url: 'https://cretetownship.com/wp-content/uploads/2024/01/December212023Specialbodcrtetownshiminutesclean.pdf', title: 'December 21, 2023 - Special Meeting Minutes', date: '2023-12-21', collection: 'meeting-minutes', documentType: 'special-board' },
  { url: 'https://cretetownship.com/wp-content/uploads/2023/12/CRETE-TOWNSHIP-SPECIAL-BOARD-MEETING-11-15-2023.pdf', title: 'November 15, 2023 - Special Meeting Minutes', date: '2023-11-15', collection: 'meeting-minutes', documentType: 'special-board' },
  { url: 'https://cretetownship.com/wp-content/uploads/2023/07/Special-Budget-Meeting-6-14-2023.pdf', title: 'June 14, 2023 - Budget Meeting Minutes', date: '2023-06-14', collection: 'meeting-minutes', documentType: 'special-board' },
  { url: 'https://cretetownship.com/wp-content/uploads/2023/05/Special-Board-Meeting-Minutes-4-24-2023.pdf', title: 'April 24, 2023 - Special Meeting Minutes', date: '2023-04-24', collection: 'meeting-minutes', documentType: 'special-board' },
  { url: 'https://cretetownship.com/wp-content/uploads/2023/03/Special-Board-Meeting-1-1-2023.pdf', title: 'February 1, 2023 - Special Meeting Minutes', date: '2023-02-01', collection: 'meeting-minutes', documentType: 'special-board' },
  { url: 'https://cretetownship.com/wp-content/uploads/2022/05/Mayy2SpecialBODmeetingminutes.pdf', title: 'May 2, 2022 - Special Meeting Minutes', date: '2022-05-02', collection: 'meeting-minutes', documentType: 'special-board' },
  // ── Highway Commissioner reports (road district collection) ──
  { url: 'https://cretetownship.com/wp-content/uploads/2025/09/Highway-Commissioners-Report-8-13-2025.pdf', title: 'August 13, 2025 - Highway Commissioner Report', date: '2025-08-13', collection: 'road-district-reports', documentType: 'highway-commissioner' },
  { url: 'https://cretetownship.com/wp-content/uploads/2025/03/HIGHWAY-COMMISSIONERS-REPORT-2-12-2025.pdf', title: 'February 12, 2025 - Highway Commissioner Report', date: '2025-02-12', collection: 'road-district-reports', documentType: 'highway-commissioner' },
  { url: 'https://cretetownship.com/wp-content/uploads/2023/10/Highway-Commissioners-Report-9-13-2023.pdf', title: 'September 13, 2023 - Highway Commissioner Report', date: '2023-09-13', collection: 'road-district-reports', documentType: 'highway-commissioner' },
  // ── Assessor minutes ──
  { url: 'https://cretetownship.com/wp-content/uploads/2024/10/Office-of-the-Assessor-9-11-2024.pdf', title: 'September 11, 2024 - Assessor Minutes', date: '2024-09-11', collection: 'assessor-documents', documentType: 'assessor-minutes' },
]

async function run() {
  const { getPayload } = await import('payload')
  const { default: config } = await import('../src/payload.config')
  const { convertDocxToPdf } = await import('../src/lib/convertDocxToPdf')

  const payload = await getPayload({ config })

  let created = 0
  let skipped = 0
  let failed = 0

  for (const item of MISSING) {
    const existing = await payload.find({
      collection: item.collection as any,
      where: { title: { equals: item.title } },
      limit: 1,
    })
    if (existing.docs.length > 0) {
      console.log(`SKIP (exists): ${item.title}`)
      skipped++
      continue
    }

    if (DRY_RUN) {
      console.log(`WOULD CREATE [${item.collection}/${item.documentType}]: ${item.title}`)
      created++
      continue
    }

    try {
      const res = await fetch(item.url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; CreteTownshipMigration/1.0)' },
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      let buffer = Buffer.from(await res.arrayBuffer())

      if (item.url.toLowerCase().endsWith('.docx')) {
        buffer = await convertDocxToPdf(buffer)
      }

      const uploaded = await payload.create({
        collection: 'documents',
        data: { alt: item.title },
        file: {
          data: buffer,
          mimetype: 'application/pdf',
          name: `${item.title}.pdf`,
          size: buffer.length,
        },
      })

      await payload.create({
        collection: item.collection as any,
        data: {
          title: item.title,
          date: item.date,
          documentType: item.documentType,
          status: 'published',
          publishedAt: new Date().toISOString(),
          file: uploaded.id,
        } as any,
      })

      console.log(`✓ [${item.collection}] ${item.title}`)
      created++
      await new Promise((r) => setTimeout(r, 300))
    } catch (err) {
      console.log(`✗ FAILED: ${item.title} — ${err instanceof Error ? err.message : err}`)
      failed++
    }
  }

  console.log(`\n✅ Done — created: ${created}, skipped: ${skipped}, failed: ${failed}`)
  process.exit(0)
}

run().catch((e) => {
  console.error('❌', e)
  process.exit(1)
})
