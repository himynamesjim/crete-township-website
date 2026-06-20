import type { Metadata } from 'next'
import { PageHero } from '@/components/PageHero'
import { JotFormEmbed } from '@/components/JotFormEmbed'
import { MapPin, Phone, Clock, Users, Building2, ChevronRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Community Center | Crete Township',
  description:
    'Reserve the Crete Township Community Center for your event. Multi-purpose rooms, conference rooms, and outdoor park space available. Submit a Building Usage Application online.',
}

const residentFees = [
  { space: 'Large Multi-Purpose Room', rate: '$1,000/day + $150 staffing fee' },
  { space: 'Room 2', rate: '$125.00 daily' },
  { space: 'Room 4', rate: '$75.00 per hour' },
  { space: 'Room 5', rate: '$400/week or $1,000/month' },
  { space: 'Room 7', rate: '$100.00 per hour' },
  { space: 'Room 8', rate: '$75.00 per hour' },
  { space: 'Rooms 9 & 10', rate: '$25.00 daily' },
  { space: 'Room 12', rate: '$55.00 daily' },
  { space: 'Room 15 or 16', rate: '$1,500/month' },
  { space: 'Exterior Park Area', rate: '$200/day' },
]

const nonResidentFees = [
  { space: 'Large Multi-Purpose Room', rate: '$1,250/day + $150 staffing fee' },
  { space: 'Room 2', rate: '$135.00 daily' },
  { space: 'Room 4', rate: '$100.00 per hour' },
  { space: 'Room 5', rate: '$425/week or $1,200/month' },
  { space: 'Room 7', rate: '$125.00 per hour' },
  { space: 'Room 8', rate: '$100.00 per hour' },
  { space: 'Rooms 9 & 10', rate: '$35.00 daily' },
  { space: 'Room 12', rate: '$75.00 per hour' },
  { space: 'Room 15 or 16', rate: '$1,750/month' },
  { space: 'Exterior Park Area', rate: '$350/day' },
]

const policies = [
  'Forms that are NOT complete — including signatures, dates, and times — will be returned.',
  'Two copies should be submitted to the Township Office; one copy will be returned when approved.',
  'Governmental bodies (Township, Schools, Fire Districts, etc.) have priority in scheduling.',
  'Tools, drop-cords, projectors, and coffee pots will NOT be provided at any time.',
  'All fees are payable in advance.',
  'Usage fees are subject to change or waiver at the sole discretion of the Crete Township Board.',
]

export default function CommunityCenterPage() {
  return (
    <>
      <PageHero
        title="Community Center"
        description="Reserve space at the Crete Township Community Center for your organization or event"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Community Center', href: '/community-center' },
        ]}
      />

      <div className="bg-cream">

        {/* ── Info + sidebar ── */}
        <section className="py-14 bg-white">
          <div className="max-w-[1400px] mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

              {/* Sidebar */}
              <div className="space-y-5">

                {/* Contact card */}
                <Card className="overflow-hidden">
                  <div className="bg-navy-dark px-5 py-4 rounded-t-lg">
                    <p className="text-xs font-semibold text-gold uppercase tracking-wide">Community Center</p>
                    <p className="font-display text-base font-bold text-white mt-1">Reserve a Space</p>
                  </div>
                  <CardContent className="p-5 space-y-3">
                    <a
                      href="tel:7086728279"
                      className="flex items-center gap-3 text-sm text-gray-700 hover:text-gold transition-colors"
                    >
                      <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                      708-672-8279
                    </a>
                    <div className="flex items-start gap-3 text-sm text-gray-700">
                      <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                      <span>1367 Wood Street<br />Crete, Illinois 60417</span>
                    </div>
                    <div className="flex items-start gap-3 text-sm text-gray-700">
                      <Clock className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                      <span>Mon – Fri: 8:00 AM – 4:30 PM</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Available spaces */}
                <Card>
                  <CardContent className="p-5">
                    <p className="text-xs font-semibold text-navy uppercase tracking-wide mb-3">Available Spaces</p>
                    <div className="space-y-2">
                      {[
                        'Large Multi-Purpose Room',
                        'Conference Room',
                        'Room 2, 4, 5, 7, 8',
                        'Rooms 9 & 10',
                        'Rooms 12, 15, 16',
                        'Exterior Park Area',
                      ].map((space) => (
                        <div key={space} className="flex items-center gap-2">
                          <ChevronRight className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                          <span className="text-sm text-gray-700">{space}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Policy highlights */}
                <Card>
                  <CardContent className="p-5">
                    <p className="text-xs font-semibold text-navy uppercase tracking-wide mb-3">Important Policies</p>
                    <ul className="space-y-2">
                      {policies.map((p, i) => (
                        <li key={i} className="text-xs text-gray-600 leading-relaxed flex items-start gap-2">
                          <span className="text-gold font-bold mt-0.5 flex-shrink-0">·</span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

              </div>

              {/* Main content */}
              <div className="lg:col-span-2 space-y-10">

                <div>
                  <h2 className="font-display text-2xl font-bold text-navy mb-2">About the Community Center</h2>
                  <div className="w-16 h-[3px] bg-gold mb-6" />
                  <p className="text-gray-700 leading-relaxed mb-4">
                    The Crete Township Community Center offers a variety of rooms and outdoor spaces available
                    for reservation by civic organizations, non-profits, government bodies, and community
                    groups. From intimate conference rooms to the large multi-purpose room, we have a space
                    to fit your needs.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    To reserve a space, complete the Building Usage Application below. Completed applications
                    must be submitted to the Township Office. Requests are subject to approval by the
                    Crete Township Board of Trustees.
                  </p>
                </div>

                {/* Fee tables */}
                <div>
                  <h2 className="font-display text-2xl font-bold text-navy mb-2">Usage Fees</h2>
                  <div className="w-16 h-[3px] bg-gold mb-6" />
                  <p className="text-xs text-gray-500 mb-4 italic">All fees payable in advance. Fees subject to change or waiver at the Board's discretion.</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Residents */}
                    <div>
                      <div className="bg-navy text-white px-4 py-2 rounded-t-lg">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-gold" />
                          <span className="text-sm font-semibold">Residents</span>
                        </div>
                      </div>
                      <div className="border border-gray-200 rounded-b-lg overflow-hidden">
                        {residentFees.map((fee, i) => (
                          <div
                            key={fee.space}
                            className={`flex justify-between items-center px-4 py-2.5 text-sm ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                          >
                            <span className="text-gray-700">{fee.space}</span>
                            <span className="font-semibold text-navy text-right ml-2">{fee.rate}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Non-residents */}
                    <div>
                      <div className="bg-navy-light text-white px-4 py-2 rounded-t-lg">
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-gold" />
                          <span className="text-sm font-semibold">Non-Residents</span>
                        </div>
                      </div>
                      <div className="border border-gray-200 rounded-b-lg overflow-hidden">
                        {nonResidentFees.map((fee, i) => (
                          <div
                            key={fee.space}
                            className={`flex justify-between items-center px-4 py-2.5 text-sm ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                          >
                            <span className="text-gray-700">{fee.space}</span>
                            <span className="font-semibold text-navy text-right ml-2">{fee.rate}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* ── Building Usage Application ── */}
        <section className="py-14 bg-cream">
          <div className="max-w-[1400px] mx-auto px-8">
            <h2 className="font-display text-2xl font-bold text-navy mb-2">Building Usage Application</h2>
            <div className="w-16 h-[3px] bg-gold mb-4" />
            <p className="text-gray-600 text-sm mb-8">
              Complete and submit the form below. You will receive a confirmation once your request
              has been reviewed by the Township Office.
            </p>
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
