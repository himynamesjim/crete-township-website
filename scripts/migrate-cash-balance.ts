/**
 * Migrate cash balance reports from cretetownship.com/cash-balance-reports/
 * into the financial-reports collection (documentType: cash-balance).
 * None existed in the CMS — the original migration only carried audited
 * statements.
 *
 * Skipped intentionally:
 * - "September 11, 2024" page link — serves the same file as August 14, 2024
 * - "July 13, 2022" page link — points at an assessor report, not a cash balance
 * Relabeled from the source file when the page label was wrong:
 * - Second "October 11, 2023" entry is the September 13, 2023 report
 * - "July 7, 2023" entry is the July 12, 2023 report
 *
 * Idempotent — skips titles already in the CMS.
 *
 * Usage: unset DATABASE_URI && npx tsx scripts/migrate-cash-balance.ts [--dry-run]
 */

import { config as loadEnv } from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
loadEnv({ path: path.resolve(__dirname, '../.env.local') })

const DRY_RUN = process.argv.includes('--dry-run')

// [date, url] — title is generated as "{long date} - Cash Balance Report"
const REPORTS: Array<[string, string]> = [
  ['2025-11-12', 'https://cretetownship.com/wp-content/uploads/2025/12/CASH-BALANCE-REPORT-11-12-2025.pdf'],
  ['2025-10-08', 'https://cretetownship.com/wp-content/uploads/2025/11/Cash-Balance-Report-10-8-2025.pdf'],
  ['2025-08-13', 'https://cretetownship.com/wp-content/uploads/2025/09/CASH-BALANCE-REPORT-8-13-2025.pdf'],
  ['2025-03-12', 'https://cretetownship.com/wp-content/uploads/2025/04/Cash-Balance-3-12-2025.pdf'],
  ['2025-02-12', 'https://cretetownship.com/wp-content/uploads/2025/03/Cash-Balance-Report-2-12-2025.pdf'],
  ['2024-12-11', 'https://cretetownship.com/wp-content/uploads/2025/01/Cash-Balance-12-11-2024.pdf'],
  ['2024-08-14', 'https://cretetownship.com/wp-content/uploads/2024/09/CASH-BALANCE-REPORT-8-14-2024.pdf'],
  ['2024-07-10', 'https://cretetownship.com/wp-content/uploads/2024/08/Cash-Balance-7-10-2024.pdf'],
  ['2024-06-12', 'https://cretetownship.com/wp-content/uploads/2024/07/Cash-Blance-Report-6-12-2024.pdf'],
  ['2024-02-14', 'https://cretetownship.com/wp-content/uploads/2024/03/Cash-Balance-Report-2-14-2024.pdf'],
  ['2023-10-11', 'https://cretetownship.com/wp-content/uploads/2023/11/CAsh-Balance-Report-10-11-2023.pdf'],
  ['2023-09-13', 'https://cretetownship.com/wp-content/uploads/2023/10/Cash-Balance-Report-9-13-2023.pdf'],
  ['2023-07-12', 'https://cretetownship.com/wp-content/uploads/2023/08/Cash-Balance-Report-7-12-2023.pdf'],
  ['2023-06-14', 'https://cretetownship.com/wp-content/uploads/2023/07/Cash-Balance-Report-6-14-2023.pdf'],
  ['2023-04-12', 'https://cretetownship.com/wp-content/uploads/2023/05/Cash-Balance-4-12-2023.pdf'],
  ['2023-03-08', 'https://cretetownship.com/wp-content/uploads/2023/04/Cash-Balance-3-8-2023.pdf'],
  ['2023-02-08', 'https://cretetownship.com/wp-content/uploads/2023/03/Cash-BAlance-Report-2-8-2023.pdf'],
  ['2023-01-11', 'https://cretetownship.com/wp-content/uploads/2023/03/Cash-Balance-1-11-2023.pdf'],
  ['2022-12-14', 'https://cretetownship.com/wp-content/uploads/2023/01/Cash-Balance-Report-12-14-2022.pdf'],
  ['2022-11-09', 'https://cretetownship.com/wp-content/uploads/2022/12/Cash-Balance-Report-11-9-2022.pdf'],
  ['2022-09-14', 'https://cretetownship.com/wp-content/uploads/2022/10/Cash-Balance-9-14-2022.pdf'],
  ['2022-08-10', 'https://cretetownship.com/wp-content/uploads/2022/09/Cash-Balance-8-10-2022.pdf'],
  ['2022-05-11', 'https://cretetownship.com/wp-content/uploads/2022/06/CASH-BALANCE-5-11-2022.pdf'],
  ['2022-04-13', 'https://cretetownship.com/wp-content/uploads/2022/05/Cash-Balance-4-13-2022-.pdf'],
  ['2022-02-09', 'https://cretetownship.com/wp-content/uploads/2022/03/Cash-Balance-2-9-2022.pdf'],
  ['2022-01-12', 'https://cretetownship.com/wp-content/uploads/2022/08/Cash-Balance-1-12-2022.pdf'],
  ['2020-10-14', 'https://cretetownship.com/wp-content/uploads/2022/08/Cash-Balance-10-14-2020.pdf'],
  ['2020-09-09', 'https://cretetownship.com/wp-content/uploads/2022/08/Cash-Balance-9-9-2020.pdf'],
  ['2020-08-12', 'https://cretetownship.com/wp-content/uploads/2022/08/Cash-balance-8-12-2020-1.pdf'],
  ['2020-07-08', 'https://cretetownship.com/wp-content/uploads/2022/08/Cash-Balance-7-8-2020.pdf'],
  ['2020-05-13', 'https://cretetownship.com/wp-content/uploads/2022/08/cash-balance-5-13-2020.pdf'],
  ['2020-03-11', 'https://cretetownship.com/wp-content/uploads/2022/08/CASH-BALANCE-3-11-2020.pdf'],
  ['2020-02-12', 'https://cretetownship.com/wp-content/uploads/2022/08/Cash-Balance-2-12-2020.pdf'],
  ['2020-01-08', 'https://cretetownship.com/wp-content/uploads/2022/08/Cash-Balance-1-8-2020.pdf'],
  ['2019-11-13', 'https://cretetownship.com/wp-content/uploads/2022/08/Cash-Balance-11-13-2019.pdf'],
  ['2019-10-09', 'https://cretetownship.com/wp-content/uploads/2022/08/Cash-Balance-10-9-2019.pdf'],
  ['2019-09-11', 'https://cretetownship.com/wp-content/uploads/2022/08/cash-balance-9-11-19.pdf'],
  ['2019-08-14', 'https://cretetownship.com/wp-content/uploads/2022/08/cash-balance-report-8-14-2019.pdf'],
  ['2019-07-10', 'https://cretetownship.com/wp-content/uploads/2022/08/Cash-Balance-7-10-2019.pdf'],
  ['2019-06-12', 'https://cretetownship.com/wp-content/uploads/2022/08/Cash-balance-6-12-2019.pdf'],
  ['2019-05-08', 'https://cretetownship.com/wp-content/uploads/2022/08/Cash-Balance-5-8-2019-1.pdf'],
  ['2019-04-10', 'https://cretetownship.com/wp-content/uploads/2022/08/Cash-Balance-4-10-2019.pdf'],
  ['2019-02-13', 'https://cretetownship.com/wp-content/uploads/2022/08/Cash-balance-2-13-2019.pdf'],
  ['2018-11-14', 'https://cretetownship.com/wp-content/uploads/2022/08/Cash-Balance-board-meeting-11-14-2018-1.pdf'],
  ['2018-07-11', 'https://cretetownship.com/wp-content/uploads/2022/08/Cash-balances-for-meeting-7-11-2018.pdf'],
]

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']
const longDate = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number)
  return `${MONTHS[m - 1]} ${d}, ${y}`
}

async function run() {
  const { getPayload } = await import('payload')
  const { default: config } = await import('../src/payload.config')
  const payload = await getPayload({ config })

  let created = 0
  let skipped = 0
  let failed = 0

  for (const [date, url] of REPORTS) {
    const title = `${longDate(date)} - Cash Balance Report`

    const existing = await payload.find({
      collection: 'financial-reports',
      where: { title: { equals: title } },
      limit: 1,
    })
    if (existing.docs.length > 0) {
      console.log(`SKIP (exists): ${title}`)
      skipped++
      continue
    }

    if (DRY_RUN) {
      console.log(`WOULD CREATE: ${title}`)
      created++
      continue
    }

    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; CreteTownshipMigration/1.0)' },
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const buffer = Buffer.from(await res.arrayBuffer())

      const uploaded = await payload.create({
        collection: 'documents',
        data: { alt: title },
        file: { data: buffer, mimetype: 'application/pdf', name: `${title}.pdf`, size: buffer.length },
      })

      await payload.create({
        collection: 'financial-reports',
        data: {
          title,
          date,
          documentType: 'cash-balance',
          fiscalYear: Number(date.slice(0, 4)),
          status: 'published',
          publishedAt: new Date().toISOString(),
          file: uploaded.id,
        } as any,
      })

      console.log(`✓ ${title}`)
      created++
      await new Promise((r) => setTimeout(r, 300))
    } catch (err) {
      console.log(`✗ FAILED: ${title} — ${err instanceof Error ? err.message : err}`)
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
