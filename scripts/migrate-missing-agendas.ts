/**
 * Migrate agendas from cretetownship.com/upcoming-agenda/ that are missing
 * from the CMS (mostly special/budget/committee meetings and everything
 * uploaded to WordPress after the May 2026 migration snapshot).
 *
 * - Skips any entry whose title already exists (safe to re-run)
 * - Downloads from the old WordPress site
 * - Converts .docx files to PDF via src/lib/convertDocxToPdf
 * - Also repairs the mis-parsed "September 1, 1241 - Agenda" entry
 *
 * Usage: unset DATABASE_URI && npx tsx scripts/migrate-missing-agendas.ts [--dry-run]
 */

import { config as loadEnv } from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
loadEnv({ path: path.resolve(__dirname, '../.env.local') })

const DRY_RUN = process.argv.includes('--dry-run')

type MissingAgenda = {
  url: string
  title: string
  date: string // YYYY-MM-DD
  documentType: 'regular' | 'special' | 'annual'
}

const MISSING: MissingAgenda[] = [
  // ── 2026 (after the May migration snapshot) ──
  { url: 'https://cretetownship.com/wp-content/uploads/2026/07/AGENDA-7-8-2026.pdf', title: 'July 8, 2026 - Agenda', date: '2026-07-08', documentType: 'regular' },
  { url: 'https://cretetownship.com/wp-content/uploads/2026/06/USA-FEST-MEETING.pdf', title: 'June 9, 2026 - USA Fest Meeting Agenda', date: '2026-06-09', documentType: 'special' },
  { url: 'https://cretetownship.com/wp-content/uploads/2026/05/USA-FEST-MEETING-5-12-2026.pdf', title: 'May 12, 2026 - USA Fest Meeting Agenda', date: '2026-05-12', documentType: 'special' },
  { url: 'https://cretetownship.com/wp-content/uploads/2026/04/April82026BoardMeetingagenda_.docx', title: 'April 8, 2026 - Agenda', date: '2026-04-08', documentType: 'regular' },
  { url: 'https://cretetownship.com/wp-content/uploads/2026/04/April-72026USAFESTMeetingAgenda_.docx', title: 'April 7, 2026 - USA Fest Meeting Agenda', date: '2026-04-07', documentType: 'special' },
  { url: 'https://cretetownship.com/wp-content/uploads/2026/03/March242026SpecialBoardMeetingAgenda_.docx', title: 'March 24, 2026 - Special Meeting Agenda', date: '2026-03-24', documentType: 'special' },
  { url: 'https://cretetownship.com/wp-content/uploads/2026/01/January142026BoardMeetingAgenda_.docx', title: 'January 14, 2026 - Agenda', date: '2026-01-14', documentType: 'regular' },
  // ── 2025 specials/budget ──
  { url: 'https://cretetownship.com/wp-content/uploads/2025/10/October282025SpecialBoardMeetingAgenda_.pdf', title: 'October 28, 2025 - Special Meeting Agenda', date: '2025-10-28', documentType: 'special' },
  { url: 'https://cretetownship.com/wp-content/uploads/2025/10/Special-Board-Meeting-9-23-2025.pdf', title: 'September 23, 2025 - Special Meeting Agenda', date: '2025-09-23', documentType: 'special' },
  { url: 'https://cretetownship.com/wp-content/uploads/2025/09/September22025SpecialBoardMeetingAgenda_.pdf', title: 'September 2, 2025 - Special Meeting Agenda', date: '2025-09-02', documentType: 'special' },
  { url: 'https://cretetownship.com/wp-content/uploads/2025/08/August122025SpecialBoardMeetingAgenda_.pdf', title: 'August 12, 2025 - Special Meeting Agenda', date: '2025-08-12', documentType: 'special' },
  { url: 'https://cretetownship.com/wp-content/uploads/2025/08/August52025SpecialBoardMeetingAgenda_.pdf', title: 'August 5, 2025 - Special Meeting Agenda', date: '2025-08-05', documentType: 'special' },
  { url: 'https://cretetownship.com/wp-content/uploads/2025/07/July222025SpecialBoardMeetingAgenda_.pdf', title: 'July 22, 2025 - Special Meeting Agenda', date: '2025-07-22', documentType: 'special' },
  { url: 'https://cretetownship.com/wp-content/uploads/2025/07/July82025SpecialBoardMeetingAgenda_.pdf', title: 'July 8, 2025 - Special Meeting Agenda', date: '2025-07-08', documentType: 'special' },
  { url: 'https://cretetownship.com/wp-content/uploads/2025/07/July12025SpecialBoardMeetingAgenda_.pdf', title: 'July 1, 2025 - Special Meeting Agenda', date: '2025-07-01', documentType: 'special' },
  { url: 'https://cretetownship.com/wp-content/uploads/2025/05/MAY52025BudgetpublishingAgenda_.pdf', title: 'May 5, 2025 - Budget Meeting Agenda', date: '2025-05-05', documentType: 'special' },
  { url: 'https://cretetownship.com/wp-content/uploads/2025/04/April282025BudgetworkshopAgenda_.pdf', title: 'April 28, 2025 - Budget Workshop Agenda', date: '2025-04-28', documentType: 'special' },
  // ── 2024 ──
  { url: 'https://cretetownship.com/wp-content/uploads/2024/12/Decemember112024BoardMeetingagenda_.pdf', title: 'December 11, 2024 - Agenda', date: '2024-12-11', documentType: 'regular' },
  { url: 'https://cretetownship.com/wp-content/uploads/2024/10/Plan-Commission-10-3-2024.pdf', title: 'October 3, 2024 - Plan Commission Agenda', date: '2024-10-03', documentType: 'special' },
  { url: 'https://cretetownship.com/wp-content/uploads/2024/06/June122024BudgetMeetingagenda.pdf', title: 'June 12, 2024 - Budget Meeting Agenda', date: '2024-06-12', documentType: 'special' },
  { url: 'https://cretetownship.com/wp-content/uploads/2024/05/May62024SpecialBoard-Meetingagenda.pdf', title: 'May 6, 2024 - Special Meeting Agenda', date: '2024-05-06', documentType: 'special' },
  // ── 2023 ──
  { url: 'https://cretetownship.com/wp-content/uploads/2023/12/New-Star-building-board-meeting-12-21-2023-updated.pdf', title: 'December 21, 2023 - New Star Building Meeting Agenda', date: '2023-12-21', documentType: 'special' },
  { url: 'https://cretetownship.com/wp-content/uploads/2023/11/Levy-Public-Hearing-11-15-23.pdf', title: 'November 15, 2023 - Tax Levy Public Hearing', date: '2023-11-15', documentType: 'special' },
  { url: 'https://cretetownship.com/wp-content/uploads/2023/06/June142023BudgetMeetingagenda.pdf', title: 'June 14, 2023 - Budget Meeting Agenda', date: '2023-06-14', documentType: 'special' },
  { url: 'https://cretetownship.com/wp-content/uploads/2023/05/May52023Budgetmeetingagenda-002.pdf', title: 'May 5, 2023 - Budget Meeting Agenda', date: '2023-05-05', documentType: 'special' },
  { url: 'https://cretetownship.com/wp-content/uploads/2023/04/April242023SpecialBoard-Meetingagenda.pdf', title: 'April 24, 2023 - Special Meeting Agenda', date: '2023-04-24', documentType: 'special' },
  { url: 'https://cretetownship.com/wp-content/uploads/2023/04/AgendaforannualtownhallmeetingApril112023.pdf', title: 'April 11, 2023 - Annual Town Meeting', date: '2023-04-11', documentType: 'annual' },
  { url: 'https://cretetownship.com/wp-content/uploads/2023/01/Crete-Township-Special-Meeting-Agenda-2-1-2023.pdf', title: 'February 1, 2023 - Special Meeting Agenda', date: '2023-02-01', documentType: 'special' },
  // ── 2022 ──
  { url: 'https://cretetownship.com/wp-content/uploads/2022/05/May22022SpecialBoard-Meetingagenda-1.pdf', title: 'May 2, 2022 - Special Meeting Agenda', date: '2022-05-02', documentType: 'special' },
  { url: 'https://cretetownship.com/wp-content/uploads/2022/05/May112022Board-Meetingagenda.pdf', title: 'May 11, 2022 - Special Meeting Agenda', date: '2022-05-11', documentType: 'special' },
  { url: 'https://cretetownship.com/wp-content/uploads/2022/09/September142022sPECIALBoard-Meetingagenda6PM.pdf', title: 'September 14, 2022 - Special Meeting Agenda', date: '2022-09-14', documentType: 'special' },
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
      collection: 'board-agendas',
      where: { title: { equals: item.title } },
      limit: 1,
    })
    if (existing.docs.length > 0) {
      console.log(`SKIP (exists): ${item.title}`)
      skipped++
      continue
    }

    if (DRY_RUN) {
      console.log(`WOULD CREATE: ${item.title} [${item.documentType}] ← ${item.url}`)
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

      const filename = `${item.title}.pdf`
      const uploaded = await payload.create({
        collection: 'documents',
        data: { alt: item.title },
        file: {
          data: buffer,
          mimetype: 'application/pdf',
          name: filename,
          size: buffer.length,
        },
      })

      await payload.create({
        collection: 'board-agendas',
        data: {
          title: item.title,
          date: item.date,
          documentType: item.documentType,
          status: 'published',
          publishedAt: new Date().toISOString(),
          file: uploaded.id,
        } as any,
      })

      console.log(`✓ ${item.title}`)
      created++
      await new Promise((r) => setTimeout(r, 300))
    } catch (err) {
      console.log(`✗ FAILED: ${item.title} — ${err instanceof Error ? err.message : err}`)
      failed++
    }
  }

  // Repair the mis-parsed September 11, 2024 entry ("September 1, 1241")
  const broken = await payload.find({
    collection: 'board-agendas',
    where: { title: { equals: 'September 1, 1241 - Agenda' } },
    limit: 1,
  })
  if (broken.docs.length > 0) {
    if (DRY_RUN) {
      console.log('WOULD FIX: "September 1, 1241 - Agenda" → "September 11, 2024 - Agenda"')
    } else {
      await payload.update({
        collection: 'board-agendas',
        id: broken.docs[0].id,
        data: { title: 'September 11, 2024 - Agenda', date: '2024-09-11' } as any,
      })
      console.log('🔧 Fixed: "September 1, 1241 - Agenda" → "September 11, 2024 - Agenda"')
    }
  }

  console.log(`\n✅ Done — created: ${created}, skipped: ${skipped}, failed: ${failed}`)
  process.exit(0)
}

run().catch((e) => {
  console.error('❌', e)
  process.exit(1)
})
