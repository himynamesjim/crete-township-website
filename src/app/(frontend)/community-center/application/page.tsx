import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/PageHero'
import { JotFormEmbed } from '@/components/JotFormEmbed'
import { FileText, ChevronRight, Phone, Mail } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Building Usage Application | Crete Township',
  description:
    'Apply to reserve space at the Crete Township Community Center. Submit the Building Usage Application online or download the printable agreement.',
}

export default function BuildingUsageApplicationPage() {
  return (
    <>
      <PageHero
        title="Building Usage Application"
        description="Reserve a room, the multi-purpose space, or the exterior park area at the Crete Township Community Center"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Community Center', href: '/community-center' },
          { label: 'Building Usage Application', href: '/community-center/application' },
        ]}
      />

      <div className="bg-cream">
        <section className="py-14">
          <div className="max-w-[1400px] mx-auto px-8">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
              <div>
                <p className="text-gray-600 text-sm max-w-2xl">
                  Complete and submit the form below. Full payment and deposit are due with the
                  completed application, and requests are subject to approval by the Crete Township
                  Board of Trustees. You will receive a confirmation once your request has been
                  reviewed by the Township Office. Questions? Contact Carol Millsap at{' '}
                  <a href="tel:7087221857" className="text-navy font-semibold hover:text-gold transition-colors inline-flex items-baseline gap-1">
                    <Phone className="w-3.5 h-3.5 self-center" aria-hidden="true" />708-722-1857
                  </a>{' '}
                  or{' '}
                  <a href="mailto:carol.millsap@cretetownship.com" className="text-navy font-semibold hover:text-gold transition-colors inline-flex items-baseline gap-1">
                    <Mail className="w-3.5 h-3.5 self-center" aria-hidden="true" />carol.millsap@cretetownship.com
                  </a>.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                <a
                  href="/forms/community-center-usage-agreement.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-navy text-white text-sm font-semibold px-5 py-3 rounded hover:bg-navy-light transition-colors"
                >
                  <FileText className="w-4 h-4 text-gold" />
                  Download the Usage Agreement (PDF)
                </a>
                <Link
                  href="/community-center"
                  className="inline-flex items-center gap-2 border border-navy text-navy text-sm font-semibold px-5 py-3 rounded hover:bg-navy hover:text-white transition-colors"
                >
                  View fees, rules &amp; policies
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <JotFormEmbed
                formId="253628126405051"
                title="Crete Township Community Center Building Usage Application"
              />
            </div>

          </div>
        </section>
      </div>
    </>
  )
}
