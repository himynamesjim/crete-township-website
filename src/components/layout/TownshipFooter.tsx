import React from 'react'
import Link from 'next/link'
import { Smartphone } from 'lucide-react'

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
            <address className="text-sm text-gray-300 not-italic">
              <strong>1367 Wood Street</strong>
              <br />
              Crete, Illinois 60417
              <br />
              <br />
              Office: 708-672-8279
              <br />
              Fax: 708-672-3327
            </address>
          </div>

          {/* Column 2: Township Services */}
          <div>
            <h4 className="text-sm font-semibold text-gold uppercase tracking-wider mb-4">
              Township Services
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/services/general-assistance"
                  className="text-sm text-gray-300 hover:text-gold transition-colors"
                >
                  General Assistance
                </Link>
              </li>
              <li>
                <Link
                  href="/services/marriage-licenses"
                  className="text-sm text-gray-300 hover:text-gold transition-colors"
                >
                  Marriage Licenses
                </Link>
              </li>
              <li>
                <Link
                  href="/services/planning-commission"
                  className="text-sm text-gray-300 hover:text-gold transition-colors"
                >
                  Planning Commission
                </Link>
              </li>
              <li>
                <Link
                  href="/assessor"
                  className="text-sm text-gray-300 hover:text-gold transition-colors"
                >
                  Assessor
                </Link>
              </li>
              <li>
                <Link
                  href="/road-district"
                  className="text-sm text-gray-300 hover:text-gold transition-colors"
                >
                  Road District
                </Link>
              </li>
              <li>
                <Link
                  href="/community-center"
                  className="text-sm text-gray-300 hover:text-gold transition-colors"
                >
                  Community Center
                </Link>
              </li>
              <li>
                <Link
                  href="/services/township-clerk"
                  className="text-sm text-gray-300 hover:text-gold transition-colors"
                >
                  Township Clerk
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Documents */}
          <div>
            <h4 className="text-sm font-semibold text-gold uppercase tracking-wider mb-4">
              Documents
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/documents/board-agendas"
                  className="text-sm text-gray-300 hover:text-gold transition-colors"
                >
                  Board Agendas
                </Link>
              </li>
              <li>
                <Link
                  href="/documents/meeting-minutes"
                  className="text-sm text-gray-300 hover:text-gold transition-colors"
                >
                  Meeting Minutes
                </Link>
              </li>
              <li>
                <Link
                  href="/documents/financial-reports"
                  className="text-sm text-gray-300 hover:text-gold transition-colors"
                >
                  Financial Reports
                </Link>
              </li>
              <li>
                <Link
                  href="/documents/assessor-minutes"
                  className="text-sm text-gray-300 hover:text-gold transition-colors"
                >
                  Assessor Minutes
                </Link>
              </li>
              <li>
                <Link
                  href="/documents/road-district"
                  className="text-sm text-gray-300 hover:text-gold transition-colors"
                >
                  Road District Reports
                </Link>
              </li>
              <li>
                <Link
                  href="/documents/town-meetings"
                  className="text-sm text-gray-300 hover:text-gold transition-colors"
                >
                  Annual Town Meetings
                </Link>
              </li>
              <li>
                <Link
                  href="/documents/newsletters"
                  className="text-sm text-gray-300 hover:text-gold transition-colors"
                >
                  Newsletters
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-gold uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 mb-6">
              <li>
                <Link
                  href="/events"
                  className="text-sm text-gray-300 hover:text-gold transition-colors"
                >
                  Upcoming Events
                </Link>
              </li>
              <li>
                <Link
                  href="/officials"
                  className="text-sm text-gray-300 hover:text-gold transition-colors"
                >
                  Offices & Officials
                </Link>
              </li>
              <li>
                <Link
                  href="/property-exemptions"
                  className="text-sm text-gray-300 hover:text-gold transition-colors"
                >
                  Property Exemptions
                </Link>
              </li>
              <li>
                <Link
                  href="/polling-places"
                  className="text-sm text-gray-300 hover:text-gold transition-colors"
                >
                  Polling Places
                </Link>
              </li>
              <li>
                <Link
                  href="/will-county-numbers"
                  className="text-sm text-gray-300 hover:text-gold transition-colors"
                >
                  Will County Numbers
                </Link>
              </li>
              <li>
                <Link
                  href="/documents/newsletters"
                  className="text-sm text-gray-300 hover:text-gold transition-colors"
                >
                  Newsletters
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-gray-300 hover:text-gold transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>

            {/* Mobile App Promo */}
            <div className="bg-navy/50 rounded-lg p-4 border border-white/10">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gold rounded flex items-center justify-center flex-shrink-0">
                  <Smartphone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white mb-1">Crete Township App</p>
                  <p className="text-[10px] text-gray-400 mb-2">
                    Agendas, alerts & events on your phone
                  </p>
                  <div className="flex gap-2">
                    <a
                      href="#"
                      className="text-[10px] bg-white/10 hover:bg-white/20 px-2 py-1 rounded transition-colors"
                    >
                      📱 App Store
                    </a>
                    <a
                      href="#"
                      className="text-[10px] bg-white/10 hover:bg-white/20 px-2 py-1 rounded transition-colors"
                    >
                      🤖 Google Play
                    </a>
                  </div>
                </div>
              </div>
            </div>
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
