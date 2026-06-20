import React from 'react'
import Link from 'next/link'

const socialLinks = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/CreteTownship',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    label: 'X (Twitter)',
    href: 'https://x.com/CreteTownship',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/channel/UC7V0wd9lWygqVESLg5kPT5A',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
]

export const TownshipFooter: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-navy-dark text-white">
      <div className="max-w-[1400px] mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

          {/* Column 1: About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 flex-shrink-0">
                <img
                  src="/api/media/file/cropped-The-Great-Seal-of-Crete-Township-scaled-1.jpg"
                  alt="The Great Seal of Crete Township"
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-xl font-display font-bold text-white">Crete Township</h3>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed mb-4">
              Serving the residents of Will County, Illinois since 1848. Township government
              provides essential local services including road maintenance, property assessment,
              general assistance, and community programs.
            </p>
            <address className="text-sm text-gray-300 not-italic mb-5">
              <strong>1367 Wood Street</strong>
              <br />
              Crete, Illinois 60417
              <br />
              <br />
              Office: 708-672-8279
              <br />
              Fax: 708-672-3327
            </address>
            <div className="flex gap-3">
              {socialLinks.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-gold hover:text-navy-dark text-gray-300 flex items-center justify-center transition-colors"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Township Services */}
          <div>
            <h4 className="text-sm font-semibold text-gold uppercase tracking-wider mb-4">
              Township Services
            </h4>
            <ul className="space-y-2">
              {[
                { label: 'FOIA / Public Records', href: '/services/foia' },
                { label: 'General Assistance', href: '/services/general-assistance' },
                { label: 'Marriage Licenses', href: '/services/marriage-licenses' },
                { label: 'Planning Commission', href: '/services/planning-commission' },
                { label: 'Assessor', href: '/assessor' },
                { label: 'Road District', href: '/road-district' },
                { label: 'Township Clerk', href: '/clerk' },
                { label: 'Community Center', href: '/community-center' },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-gray-300 hover:text-gold transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Documents */}
          <div>
            <h4 className="text-sm font-semibold text-gold uppercase tracking-wider mb-4">
              Documents
            </h4>
            <ul className="space-y-2">
              {[
                { label: 'Meeting Agendas', href: '/documents/agendas' },
                { label: 'Meeting Minutes', href: '/documents/meeting-minutes' },
                { label: 'Assessor Minutes', href: '/documents/assessor-minutes' },
                { label: 'Annual Town Meetings', href: '/documents/annual-town-meetings' },
                { label: 'Audited Financial Statements', href: '/documents/audited-financial-statements' },
                { label: 'Cash Balance Reports', href: '/documents/cash-balance-reports' },
                { label: 'Highway Commissioner Reports', href: '/documents/highway-commissioner-reports' },
                { label: 'Town Fund & Levy Minutes', href: '/documents/town-fund-levy-minutes' },
                { label: 'Newsletters', href: '/documents/newsletters' },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-gray-300 hover:text-gold transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-gold uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { label: 'Upcoming Events', href: '/events' },
                { label: 'Offices & Officials', href: '/officials' },
                { label: 'Polling Places', href: '/clerk/polling-places' },
                { label: 'Homeowners Associations', href: '/assessor/hoa' },
                { label: 'Will County Phone Numbers', href: '/assessor/will-county-phones' },
                { label: 'Environment & Storm Sewer', href: '/road-district/environment' },
                { label: '2026 Branch Pickup', href: '/road-district/branch-pickup' },
                { label: 'Contact Us', href: '/contact' },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-gray-300 hover:text-gold transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>
            © {currentYear} Crete Township, Will County, Illinois. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-gold transition-colors">
              Privacy Policy
            </Link>
            <Link href="/accessibility" className="hover:text-gold transition-colors">
              Accessibility
            </Link>
            <Link href="/sitemap" className="hover:text-gold transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
