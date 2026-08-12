import type { Metadata } from 'next'
import { PageHero } from '@/components/PageHero'
import { JotFormEmbed } from '@/components/JotFormEmbed'
import { MapPin, Phone, Clock, Users, Building2, ChevronRight, FileText, ShieldAlert, Mail, Music, Dumbbell, CalendarDays, Briefcase, HeartHandshake } from 'lucide-react'
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

const offerings = [
  {
    icon: HeartHandshake,
    title: 'Senior Programs',
    description:
      'Weekly coffee get-togethers, bingo, pinochle club, seasonal luncheons, and wellness programs offered in partnership with Catholic Charities, including fitness and relaxation classes.',
  },
  {
    icon: Music,
    title: 'Youth & Family Programs',
    description:
      'Rock Revolution, a youth music program for ages 11–18 with lessons in guitar, drums, keyboard, bass, and vocals from professional musicians, plus activity days for young learners ages 2–5 and their parents.',
  },
  {
    icon: CalendarDays,
    title: 'Expos & Community Events',
    description:
      'Township-hosted expo events including collectibles shows, art & antiques, craft shows, and home & garden shows, along with community celebrations held at the Center and its grounds.',
  },
  {
    icon: Dumbbell,
    title: "On the Move Women's Fitness",
    description:
      'A complete women’s fitness program featuring hydraulic resistance machines, wellness mats, metabolic recovery boards, a stretching station, and a walking club. Open weekday mornings and select afternoons.',
  },
  {
    icon: Users,
    title: 'Meeting & Event Space',
    description:
      'Rooms of every size — from conference rooms to the large multi-purpose room and the exterior park area — available to civic organizations, non-profits, government bodies, and community groups.',
  },
  {
    icon: Briefcase,
    title: 'Office Space',
    description:
      'Select rooms are available for weekly or monthly office usage, giving local organizations an affordable home base inside the Center.',
  },
]

const policies = [
  'Forms that are NOT complete — including signatures, dates, and times — will be returned.',
  'Two copies should be submitted to the Township Office; one copy will be returned when approved.',
  'Governmental bodies (Township, Schools, Fire Districts, etc.) have priority in scheduling.',
  'Tools, drop-cords, projectors, and coffee pots will NOT be provided at any time.',
  'All fees are payable in advance.',
  'NO REFUNDS — all usage fees, staffing fees, and deposits are non-refundable once approved by the Board and payment is received.',
  'Usage fees are subject to change or waiver at the sole discretion of the Crete Township Board.',
]

const generalRules = [
  'Trash taken to the outside dumpster and outside area picked up.',
  'Tables & chairs replaced to their original location.',
  'Floors swept clean of debris.',
  'Turn off all lights.',
  'No alcohol allowed anywhere on Crete Township property.',
  'No smoking allowed in the Community Center.',
  'No animals allowed in the Community Center.',
  'No nails, tape, and/or pins in the walls or fixtures.',
  'Do not leave children unattended.',
  'No firearms and/or weapons of any kind are allowed on Township property.',
]

const bookingTerms = [
  'Usage is first-come, first-serve and is not valid until the Usage Agreement is approved by the Crete Township Board.',
  'Full payment and deposit are due in their entirety with the completed Usage Agreement form.',
  'The usage fee and security deposit are paid by two separate checks payable to "Crete Township." The security deposit is returned upon final inspection provided the Community Center is clean, in good order, and sustained no damage.',
  'Availability is by appointment only, on a reserved-time basis approved by the Township Board.',
  'Tables and chairs are set up by the User and must be returned to their original storage area — violations are subject to a $250 return-to-storage fee.',
  'The space must be left clean with all trash taken to the outside dumpsters — violations are subject to a $250 cleaning fee.',
  'The Community Center may not be used as a business venue; charging admission or profit-making use is restricted. Charitable events or benefits require prior approval and documentation of proceeds.',
  'Caucuses organized by recognized political parties may meet without charge, but an application and prior Board approval are still required.',
  'All health department regulations must be followed for any food and beverage service; the Township is not responsible for required permits or licenses.',
  'Use of amplified sound systems is prohibited unless expressly approved by the Township Board, and Users must comply with all Will County noise ordinances.',
  'Crete Township reserves the right to terminate the agreement at its sole discretion at any time without notice.',
]

const liabilityRequirements = [
  'A current Certificate of Insurance (COI) with coverage of at least $300,000 must be provided before occupying or using the property.',
  'The COI must name Crete Township as Additional Insured and remain current for the entire term of the Usage Agreement.',
  'Failure to provide or maintain a valid COI is a default under the Agreement and may result in immediate suspension or termination of use privileges.',
  'The User agrees to indemnify and hold Crete Township (including the Road District) harmless from all claims arising out of use of the Community Center, and releases the Township from liability for personal injuries related to that use.',
  'The User is responsible for all costs of repair, clean-up, and replacement for any damage caused by their use; invoices are payable within 10 days.',
  'For events of 100 people or more, the User must provide security and traffic control at their sole expense, approved by the Township Board.',
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
                      href="tel:7087221857"
                      className="flex items-center gap-3 text-sm text-gray-700 hover:text-gold transition-colors"
                    >
                      <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                      708-722-1857
                    </a>
                    <div className="flex items-start gap-3 text-sm text-gray-700">
                      <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                      <span>25930 S Cottage Grove Ave<br />Crete, Illinois 60417</span>
                    </div>
                    <div className="flex items-start gap-3 text-sm text-gray-700">
                      <Clock className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                      <span>Mon – Fri: 8:00 AM – 4:00 PM</span>
                    </div>
                    <a
                      href="mailto:carol.millsap@cretetownship.com"
                      className="flex items-start gap-3 text-sm text-gray-700 hover:text-gold transition-colors"
                    >
                      <Mail className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                      <span>Carol Millsap<br />carol.millsap@cretetownship.com</span>
                    </a>
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
                    Located at 25930 S Cottage Grove Ave in Crete, the Crete Township Community Center is
                    the home of the Township&apos;s growing lineup of programs, events, and services. The
                    Center hosts senior gatherings, youth and family programs, fitness classes, and
                    Township-hosted expos and community celebrations throughout the year.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    The Center also offers a variety of rooms and outdoor spaces available for reservation
                    by civic organizations, non-profits, government bodies, and community groups. From
                    intimate conference rooms to the large multi-purpose room and the exterior park area,
                    there is a space to fit your needs — for a single event, a recurring meeting, or
                    ongoing office usage.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    To reserve a space, complete the Building Usage Application below. Completed applications
                    must be submitted to the Township Office. Requests are subject to approval by the
                    Crete Township Board of Trustees. The Center is open Monday through Friday from
                    8:00 AM to 4:00 PM.
                  </p>
                </div>

                {/* What the Center offers */}
                <div>
                  <h2 className="font-display text-2xl font-bold text-navy mb-2">What the Center Offers</h2>
                  <div className="w-16 h-[3px] bg-gold mb-6" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {offerings.map((offering) => (
                      <Card key={offering.title}>
                        <CardContent className="p-5">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-9 h-9 rounded-lg bg-gold-pale flex items-center justify-center flex-shrink-0">
                              <offering.icon className="w-5 h-5 text-gold" />
                            </div>
                            <h3 className="text-base font-semibold text-navy">{offering.title}</h3>
                          </div>
                          <p className="text-sm text-gray-600 leading-relaxed">{offering.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-4 italic">
                    Program schedules change seasonally — check the{' '}
                    <a href="/events" className="text-navy font-semibold hover:text-gold transition-colors">Events calendar</a>{' '}
                    or call 708-722-1857 for current dates and times.
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

                {/* Booking & payment terms */}
                <div>
                  <h2 className="font-display text-2xl font-bold text-navy mb-2">Booking &amp; Payment Terms</h2>
                  <div className="w-16 h-[3px] bg-gold mb-6" />
                  <ul className="space-y-2.5">
                    {bookingTerms.map((term, i) => (
                      <li key={i} className="text-sm text-gray-700 leading-relaxed flex items-start gap-2">
                        <ChevronRight className="w-3.5 h-3.5 text-gold flex-shrink-0 mt-1" />
                        {term}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* General rules of use */}
                <div>
                  <h2 className="font-display text-2xl font-bold text-navy mb-2">General Rules of Use</h2>
                  <div className="w-16 h-[3px] bg-gold mb-6" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2.5">
                    {generalRules.map((rule, i) => (
                      <div key={i} className="text-sm text-gray-700 leading-relaxed flex items-start gap-2">
                        <span className="text-gold font-bold mt-0.5 flex-shrink-0">·</span>
                        {rule}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Insurance & liability requirements */}
                <div>
                  <h2 className="font-display text-2xl font-bold text-navy mb-2">Insurance &amp; Liability Requirements</h2>
                  <div className="w-16 h-[3px] bg-gold mb-6" />
                  <div className="bg-gold-pale border border-gold/40 rounded-lg p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <ShieldAlert className="w-5 h-5 text-gold flex-shrink-0" />
                      <p className="text-sm font-semibold text-navy">
                        Required for all bookings (revised July 2026)
                      </p>
                    </div>
                    <ul className="space-y-2.5">
                      {liabilityRequirements.map((req, i) => (
                        <li key={i} className="text-sm text-gray-700 leading-relaxed flex items-start gap-2">
                          <span className="text-gold font-bold mt-0.5 flex-shrink-0">·</span>
                          {req}
                        </li>
                      ))}
                    </ul>
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
            <p className="text-gray-600 text-sm mb-4">
              Complete and submit the form below. You will receive a confirmation once your request
              has been reviewed by the Township Office.
            </p>
            <a
              href="/forms/community-center-usage-agreement.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-navy text-white text-sm font-semibold px-5 py-3 rounded hover:bg-navy-light transition-colors mb-8"
            >
              <FileText className="w-4 h-4 text-gold" />
              Download the Building Usage Agreement (Revised July 2026)
            </a>
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
