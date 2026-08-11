/**
 * Seed the sidebar-widgets global with resident-friendly quick links
 * and a Township Hall contact card. Editable afterward in
 * /admin/globals/sidebar-widgets.
 *
 * Usage: unset DATABASE_URI && npx tsx scripts/seed-sidebar-widgets.ts
 */

import { config as loadEnv } from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

loadEnv({ path: path.resolve(__dirname, '../.env.local') })

const WIDGETS = [
  {
    blockType: 'quick-links',
    title: 'Quick Links',
    links: [
      { label: 'Documents & Reports', url: '/documents', newTab: false },
      { label: 'Board Meeting Agendas', url: '/documents/agendas', newTab: false },
      { label: 'Meeting Minutes', url: '/documents/meeting-minutes', newTab: false },
      { label: 'Events Calendar', url: '/events', newTab: false },
      { label: 'FOIA Records Request', url: '/services/foia', newTab: false },
      { label: 'Newsletters', url: '/documents/newsletters', newTab: false },
      { label: "Assessor's Office", url: '/assessor', newTab: false },
      { label: 'Road District', url: '/road-district', newTab: false },
      { label: 'Community Center', url: '/community-center', newTab: false },
      { label: 'Contact Us', url: '/contact', newTab: false },
    ],
  },
  {
    blockType: 'contact-card',
    title: 'Township Hall',
    office: 'Crete Township',
    address: '1367 Wood Street',
    cityStateZip: 'Crete, IL 60417',
    phone: '708-672-8279',
    email: 'administrator@cretetownship.com',
    hours: 'Monday – Friday: 8:00 AM – 4:30 PM\nSaturday – Sunday: Closed',
  },
]

async function run() {
  const { getPayload } = await import('payload')
  const { default: config } = await import('../src/payload.config')

  const payload = await getPayload({ config })

  const updated = await payload.updateGlobal({
    slug: 'sidebar-widgets',
    data: { widgets: WIDGETS as any },
  })

  console.log(`✅ Seeded sidebar-widgets with ${(updated.widgets as any[]).length} widgets`)
  process.exit(0)
}

run().catch((err) => {
  console.error('❌ Seed failed:', err)
  process.exit(1)
})
