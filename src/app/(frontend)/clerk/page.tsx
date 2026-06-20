import React from 'react'
import Image from 'next/image'
import { PageHero } from '@/components/PageHero'
import { Card, CardContent } from '@/components/ui/card'
import { Phone, Mail, MapPin, Video, Clock, FileText, ChevronRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Township Clerk | Crete Township',
  description:
    'Information about the Crete Township Clerk — board meeting schedule, election authority, and record-keeping responsibilities.',
}

const responsibilities = [
  {
    heading: 'Record Keeper',
    body: 'The township clerk is keeper of all township records except for active general assistance cases. The clerk is required to keep accurate records of all township board meetings and maintain records of the board\'s executive sessions. (Statute requires these minutes be reviewed every six months.)',
  },
  {
    heading: 'Board Meeting Minutes',
    body: 'During town board meetings the clerk records roll call votes. Certain questions require roll call votes — appointments to fill vacancies, establishing salaries, etc. Other votes can be taken by voice. Secret ballots are never permitted on any issue facing the township board.',
  },
  {
    heading: 'Local Election Authority',
    body: 'The clerk serves as the local election authority and is responsible for accepting petitions concerning township elections and/or referendums. In this capacity, the clerk is responsible for publishing or posting certain specific notices, including notices for the highway commissioner.',
  },
  {
    heading: 'Road District Ex-Officio Clerk',
    body: 'As ex-officio clerk of the road district, the township clerk maintains all records for the highway commissioner. The clerk must also witness bid openings for both the township and the road district, and must countersign all road district orders for payment prior to audit or approval by the township board. The clerk also delivers all approved claims for payment to the supervisor.',
  },
  {
    heading: 'Legal Announcements',
    body: 'The clerk is also responsible for posting legal announcements for the township. The position of clerk is especially important as it pertains to the maintenance of records — the integrity and accuracy of the clerk is important in any court.',
  },
  {
    heading: 'Critical to Township Operations',
    body: 'Clerical may evolve from the word clerk, but the clerk is not necessarily the township board\'s secretary. However, much as a competent secretary is a vital cog in the machinery of a well-oiled office, the township clerk is critical to the operation of township government.',
  },
]

export default function ClerkPage() {
  return (
    <>
      <PageHero
        title="Township Clerk"
        description="Record keeper, election authority, and legal notice officer for Crete Township"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Clerk', href: '/clerk' },
        ]}
      />

      <div className="bg-cream">

        {/* ── Board meetings ── */}
        <section className="pt-8 pb-12 bg-white">
          <div className="max-w-[1400px] mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

              {/* Sidebar */}
              <div className="space-y-5">

                {/* Jim Buiter profile card */}
                <Card className="overflow-hidden">
                  <div className="bg-navy-dark px-6 pt-8 pb-0 flex flex-col items-center">
                    <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-gold shadow-lg mb-4">
                      <Image
                        src="/assets/officials/buiter.jpeg"
                        alt="Jim Buiter, Township Clerk"
                        width={144}
                        height={144}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h2 className="font-display text-xl font-bold text-white text-center leading-tight">
                      Jim Buiter
                    </h2>
                    <p className="text-gold text-sm font-semibold mt-1 mb-6">Township Clerk</p>
                  </div>
                  <CardContent className="p-5 space-y-3">
                    <a
                      href="tel:7086728279"
                      className="flex items-center gap-3 text-sm text-gray-700 hover:text-gold transition-colors"
                    >
                      <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                      708-672-8279
                    </a>
                    <a
                      href="mailto:jim.buiter@cretetownship.com"
                      className="flex items-center gap-3 text-sm text-gray-700 hover:text-gold transition-colors break-all"
                    >
                      <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                      jim.buiter@cretetownship.com
                    </a>
                    <div className="flex items-start gap-3 text-sm text-gray-700 pt-1">
                      <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                      <span>1367 Wood Street<br />Crete, Illinois 60417</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-5">
                    <p className="text-xs font-semibold text-navy uppercase tracking-wide mb-3">Clerk's Duties</p>
                    <div className="space-y-2">
                      {[
                        'Township record keeper',
                        'Board meeting minutes',
                        'Local election authority',
                        'Road district ex-officio clerk',
                        'Legal announcements',
                        'Bid opening witness',
                        'Countersign road district payments',
                      ].map((duty) => (
                        <div key={duty} className="flex items-center gap-2">
                          <ChevronRight className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                          <span className="text-sm text-gray-700">{duty}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Meeting info */}
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h2 className="font-display text-2xl font-bold text-navy mb-2">Board Meeting Schedule</h2>
                  <div className="w-16 h-[3px] bg-gold mb-6" />

                  {/* Meeting details */}
                  <div className="bg-gold-pale border border-gold/30 rounded-lg p-6 space-y-4 mb-6">
                    <div className="flex items-start gap-4">
                      <Clock className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-navy mb-1">Regular Monthly Meeting</p>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          The second Wednesday of each month at <strong>7:00 PM</strong>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-navy mb-1">Location</p>
                        <p className="text-sm text-gray-700">
                          Crete Township Town Hall<br />
                          1367 Wood Street, Crete, Illinois
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Zoom info */}
                  <div className="bg-navy/5 border border-navy/10 rounded-lg p-6">
                    <div className="flex items-start gap-4">
                      <Video className="w-5 h-5 text-navy flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-navy mb-2">Virtual Meeting Access</p>
                        <p className="text-sm text-gray-700 leading-relaxed mb-4">
                          During the COVID pandemic, regular monthly meetings and other public Township
                          meetings may be accessed via Zoom video conferencing. If you are interested in
                          obtaining login information for any public Township meetings on Zoom, please
                          contact the Township Office for login credentials.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 mb-4">
                          <a
                            href="tel:7086728279"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-navy hover:text-gold transition-colors"
                          >
                            <Phone className="w-4 h-4" />
                            708-672-8279
                          </a>
                          <a
                            href="mailto:administrator@cretetownship.com"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-navy hover:text-gold transition-colors"
                          >
                            <Mail className="w-4 h-4" />
                            administrator@cretetownship.com
                          </a>
                        </div>
                        <a
                          href="https://us06web.zoom.us/j/88684426493?pwd=4MajrSPKJ1nMKpzpDeF0jeBGxppatf.1"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-[#2D8CFF] hover:bg-[#1a7ae0] text-white text-sm font-semibold px-4 py-2 rounded transition-colors"
                        >
                          <Video className="w-4 h-4" />
                          Join Zoom Meeting
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Role summary */}
                <div>
                  <h2 className="font-display text-2xl font-bold text-navy mb-2">The Township Clerk</h2>
                  <div className="w-16 h-[3px] bg-gold mb-6" />
                  <p className="text-gray-700 leading-relaxed mb-4">
                    The clerk is ex-officio clerk of the highway district and the local election authority,
                    and keeps all town records except for active general assistance case records. The clerk
                    is also responsible for posting legal announcements for the township.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    The person for this job is meticulous, accurate, and punctual. An understanding of the
                    law as it applies to local government is helpful.
                  </p>
                </div>
              </div>


            </div>
          </div>
        </section>

        {/* ── Responsibilities detail ── */}
        <section className="py-14 bg-cream">
          <div className="max-w-[1400px] mx-auto px-8">
            <h2 className="font-display text-2xl font-bold text-navy mb-2">Clerk's Responsibilities</h2>
            <div className="w-16 h-[3px] bg-gold mb-10" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {responsibilities.map((r, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <div className="flex items-start gap-3 px-5 py-4 bg-navy/5 border-b border-gray-200">
                    <FileText className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                    <h3 className="font-semibold text-navy text-sm">{r.heading}</h3>
                  </div>
                  <p className="px-5 py-4 text-sm text-gray-700 leading-relaxed">{r.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  )
}
