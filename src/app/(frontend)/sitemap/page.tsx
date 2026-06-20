import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Sitemap | Crete Township',
  description: 'Complete sitemap of the Crete Township official website.',
}

interface SiteSection {
  title: string
  links: { label: string; href: string }[]
}

const SECTIONS: SiteSection[] = [
  {
    title: 'Main Pages',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Upcoming Events', href: '/events' },
      { label: 'Community Center', href: '/community-center' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
  {
    title: 'About',
    links: [
      { label: 'About Crete Township', href: '/about' },
      { label: 'Offices & Officials', href: '/officials' },
      { label: 'Township History', href: '/about/history' },
    ],
  },
  {
    title: 'Township Services',
    links: [
      { label: 'All Services', href: '/services' },
      { label: 'FOIA / Public Records Request', href: '/services/foia' },
      { label: 'General Assistance', href: '/services/general-assistance' },
      { label: 'Marriage Licenses', href: '/services/marriage-licenses' },
      { label: 'Planning Commission', href: '/services/planning-commission' },
    ],
  },
  {
    title: 'Township Clerk',
    links: [
      { label: 'Clerk Home', href: '/clerk' },
      { label: 'Polling Places', href: '/clerk/polling-places' },
    ],
  },
  {
    title: 'Assessor',
    links: [
      { label: 'Assessor Home', href: '/assessor' },
      { label: 'Homeowners Associations', href: '/assessor/hoa' },
      { label: 'Will County Phone Numbers', href: '/assessor/will-county-phones' },
    ],
  },
  {
    title: 'Road District',
    links: [
      { label: 'Road District Home', href: '/road-district' },
      { label: 'Environment & Storm Sewer', href: '/road-district/environment' },
      { label: '2026 Branch Pickup Guidelines', href: '/road-district/branch-pickup' },
    ],
  },
  {
    title: 'Documents',
    links: [
      { label: 'Document Library', href: '/documents' },
      { label: 'Meeting Agendas', href: '/documents/agendas' },
      { label: 'Meeting Minutes', href: '/documents/meeting-minutes' },
      { label: 'Annual Town Meetings', href: '/documents/annual-town-meetings' },
      { label: 'Assessor Minutes', href: '/documents/assessor-minutes' },
      { label: 'Audited Financial Statements', href: '/documents/audited-financial-statements' },
      { label: 'Cash Balance Reports', href: '/documents/cash-balance-reports' },
      { label: 'Highway Commissioner Reports', href: '/documents/highway-commissioner-reports' },
      { label: 'Town Fund & Tax Levy Minutes', href: '/documents/town-fund-levy-minutes' },
      { label: 'Newsletters', href: '/documents/newsletters' },
    ],
  },
  {
    title: 'Legal & Accessibility',
    links: [
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Accessibility Statement', href: '/accessibility' },
      { label: 'Sitemap', href: '/sitemap' },
    ],
  },
]

export default function SitemapPage() {
  return (
    <div className="bg-cream min-h-screen">
      {/* Page Hero */}
      <div className="bg-navy-dark py-10 px-8">
        <div className="max-w-[1100px] mx-auto">
          <p className="text-gold text-sm font-semibold uppercase tracking-wider mb-2">Navigation</p>
          <h1 className="text-white font-display text-3xl font-bold">Sitemap</h1>
          <p className="text-white/60 mt-2 text-sm">A complete listing of all pages on the Crete Township website.</p>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SECTIONS.map((section) => (
            <div
              key={section.title}
              className="bg-white rounded-xl border border-gray-200 p-6"
            >
              <h2 className="font-display text-base font-bold text-navy mb-1 pb-2 border-b-[3px] border-gold inline-block pr-4">
                {section.title}
              </h2>
              <ul className="mt-4 space-y-2">
                {section.links.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm text-gray-600 hover:text-gold transition-colors flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-gold/40 group-hover:bg-gold flex-shrink-0 transition-colors" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/" className="text-navy hover:text-gold text-sm font-semibold transition-colors">
            ← Return to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
