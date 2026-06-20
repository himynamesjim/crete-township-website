import React from 'react'
import Link from 'next/link'
import { PageHero } from '@/components/PageHero'
import { Card, CardContent } from '@/components/ui/card'
import { MapPin, Calendar, Users, FileText, ChevronRight, Phone } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Planning Commission | Crete Township',
  description:
    'The Crete Township Plan Commission is a nonpartisan advisory group that reviews subdivision plans, zoning map amendments, variances, special use permits, and other land-use matters.',
}

const articles = [
  {
    number: 1,
    title: 'Name',
    content:
      'This organization shall be called the "Crete Township Plan Commission," hereinafter referred to as the "Plan Commission."',
  },
  {
    number: 2,
    title: 'Purpose',
    content:
      'This Commission shall be a nonpartisan advisory group organized exclusively for land-use purposes. The duties of the Plan Commission shall be to review proposed subdivision plans, requests for map amendments, variances, special use permits, and any other changes of land usage within the Township. The Planning Commission shall forward their recommendations to the Crete Township Board for final approval. The Plan Commission will also review the Township Plan (currently the "Will County Land Resources Management Plan Summaries by Township.").',
  },
]

const membershipSections = [
  {
    number: 1,
    text: 'Any registered voter having maintained a place of residence within the Township of Crete for a period of not less than six months shall be considered an eligible resident and therefore be eligible for membership in the Plan Commission.',
  },
  {
    number: 2,
    text: 'An Eligible Resident may become an official member of the Plan Commission provided he/she has submitted a letter of intent to serve on the Plan Commission. The resident must then be appointed by the Crete Township Board of Trustees at any regular or special meeting of that board.',
  },
  {
    number: 3,
    text: 'The Planning Commission shall consist of five members including the chairperson. The Commission, by affirmative vote of all the members, may suspend or expel any member for cause, after an appropriate hearing.',
  },
  {
    number: 4,
    text: 'If a member of the Planning Commission is absent from three consecutive meetings he/she must state to the commission his/her intentions of continuing to serve. At the meeting following three consecutive absences of any one member, the Commission may determine whether or not to terminate the individual\'s membership.',
  },
  {
    number: 5,
    text: 'Any member may resign by filing a written resignation with the Secretary of the Plan Commission who will then notify the Township Board of Trustees of a vacancy. A notice of the vacancy shall be printed in the local newspaper at which time letters of intent to serve on the Plan Commission will be requested.',
  },
  {
    number: 6,
    text: 'Membership is not transferable or assignable.',
  },
  {
    number: 7,
    text: 'Appointment to the Plan Commission shall be for a term of four (4) years. The term of two members shall expire each even-numbered year in the month of May. Those members whose term is about to expire should submit, prior to April 30, a "letter of intent to continue to serve" to the township board. Reappointment will be determined by the township board at their May meeting.',
  },
]

const meetingSections = [
  {
    number: 1,
    title: 'Annual Meeting',
    text: 'The annual meeting of the Plan Commission shall be the first regular meeting in the month of March of each year. This meeting shall be devoted to the preparation of the Annual Report to be presented to the Board of Trustees detailing the activities of the year past. The Annual Report shall be presented to the Board of Trustees at the Trustees\' April meeting each year.',
  },
  {
    number: 2,
    title: 'Regular Monthly Meetings',
    text: 'Regular monthly meetings of the Commission shall be held on the first Thursday of each month at a predesignated, appropriate site. At such meetings, the Plan Commission shall consider all matters properly brought before it, with sufficient notice having been given to all members.',
  },
  {
    number: 3,
    title: 'Meeting Notice',
    text: 'A notice of the monthly meeting of the Plan Commission shall be posted at the Town Hall at least 48 hours prior to the meeting date. Notice of the meeting shall also be given to the local newspaper.',
  },
  {
    number: 4,
    title: 'Rescheduling',
    text: 'A regular meeting may be rescheduled or canceled by the Commission at a prior meeting or by the Chairperson prior to the meeting.',
  },
  {
    number: 5,
    title: 'Special Meetings',
    text: 'Special meetings of the Commission may be held at a time and place designated by the officer calling the meeting. Written or verbal notice of same must be given to all members not less than 24 hours in advance thereof.',
  },
  {
    number: 6,
    title: 'Quorum',
    text: 'At any meeting of the Plan Commission, a quorum shall consist of 3 members. No action, except adjournment to a subsequent date, shall be taken in the absence of a quorum.',
  },
  {
    number: 7,
    title: 'Voting',
    text: 'All members attending a meeting, including the officers, shall be entitled to cast one vote. Voting shall be by voice. Members having a personal interest in any matter before the Plan Commission shall disclose such interest and shall be disqualified from voting on the matter. The affirmative vote of at least a majority of the members in attendance shall be necessary for the adoption of any resolution or other voting matter.',
  },
]

export default function PlanningCommissionPage() {
  return (
    <>
      <PageHero
        title="Planning Commission"
        description="A nonpartisan advisory body overseeing land use and development in Crete Township"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Planning Commission', href: '/services/planning-commission' },
        ]}
      />

      <div className="bg-cream">

        {/* ── Quick facts bar ── */}
        <div className="bg-navy-dark text-white">
          <div className="max-w-[1400px] mx-auto px-8 py-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-gold flex-shrink-0" />
                <div>
                  <p className="text-xs text-white/60 uppercase tracking-wide">Members</p>
                  <p className="text-sm font-semibold">5 (including Chairperson)</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gold flex-shrink-0" />
                <div>
                  <p className="text-xs text-white/60 uppercase tracking-wide">Meetings</p>
                  <p className="text-sm font-semibold">First Thursday of each month</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-gold flex-shrink-0" />
                <div>
                  <p className="text-xs text-white/60 uppercase tracking-wide">Location</p>
                  <p className="text-sm font-semibold">Crete Township Hall</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-gold flex-shrink-0" />
                <div>
                  <p className="text-xs text-white/60 uppercase tracking-wide">Term Length</p>
                  <p className="text-sm font-semibold">4 years per appointment</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Overview ── */}
        <section className="py-14 bg-white">
          <div className="max-w-[1400px] mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2">
                <h2 className="font-display text-2xl font-bold text-navy mb-2">About the Plan Commission</h2>
                <div className="w-16 h-[3px] bg-gold mb-6" />
                <p className="text-gray-700 leading-relaxed mb-4">
                  The Crete Township Plan Commission is a nonpartisan advisory group organized exclusively
                  for land-use purposes. The Commission reviews proposed subdivision plans, requests for
                  map amendments, variances, special use permits, and any other changes of land usage
                  within the Township.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  After review, the Plan Commission forwards its recommendations to the Crete Township
                  Board of Trustees for final approval. The Commission also reviews the Township Plan —
                  currently the <em>Will County Land Resources Management Plan Summaries by Township</em>.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  The Commission is composed of five members, including the Chairperson, all of whom are
                  registered Crete Township voters appointed by the Board of Trustees. Meetings are held on
                  the first Thursday of each month and are open to the public.
                </p>
              </div>

              {/* Sidebar — how to join */}
              <div>
                <Card className="border-gold/30">
                  <CardContent className="p-6">
                    <h3 className="font-display text-lg font-bold text-navy mb-3">Interested in Serving?</h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                      Crete Township residents who have lived in the township for at least 6 months and are
                      registered voters are eligible to apply for membership.
                    </p>
                    <ol className="space-y-3 mb-5">
                      {['Submit a letter of intent to serve to the Plan Commission.', 'The Board of Trustees will consider your appointment at a regular or special meeting.', 'Members serve a 4-year term.'].map((step, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-navy text-white text-xs flex items-center justify-center font-bold mt-0.5">
                            {i + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                    <div className="pt-4 border-t border-gray-100 space-y-2">
                      <p className="text-xs font-semibold text-navy uppercase tracking-wide mb-2">Contact the Township</p>
                      <a href="tel:708-672-8279" className="flex items-center gap-2 text-sm text-gray-700 hover:text-gold transition-colors">
                        <Phone className="w-4 h-4 text-gold" />
                        (708) 672-8279
                      </a>
                      <p className="text-xs text-gray-500">1367 Wood Street, Crete, IL 60417</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* ── Membership ── */}
        <section className="py-14 bg-cream">
          <div className="max-w-[1400px] mx-auto px-8">
            <h2 className="font-display text-2xl font-bold text-navy mb-2">Article 3: Membership</h2>
            <div className="w-16 h-[3px] bg-gold mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {membershipSections.map((s) => (
                <div key={s.number} className="bg-white rounded-lg border border-gray-200 p-5 flex gap-4">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-navy-dark text-white text-xs font-bold flex items-center justify-center mt-0.5">
                    {s.number}
                  </span>
                  <p className="text-sm text-gray-700 leading-relaxed">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Meetings & Voting ── */}
        <section className="py-14 bg-white">
          <div className="max-w-[1400px] mx-auto px-8">
            <h2 className="font-display text-2xl font-bold text-navy mb-2">Article 4: Meetings &amp; Voting</h2>
            <div className="w-16 h-[3px] bg-gold mb-8" />

            {/* Meeting schedule callout */}
            <div className="bg-gold-pale border border-gold/30 rounded-lg p-6 mb-8 flex items-start gap-4">
              <Calendar className="w-6 h-6 text-gold flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-navy mb-1">Regular Monthly Meetings</p>
                <p className="text-gray-700 text-sm">
                  First Thursday of each month &nbsp;·&nbsp; Posted at Town Hall at least 48 hours in advance
                  &nbsp;·&nbsp; Quorum: 3 members required
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {meetingSections.map((s) => (
                <div key={s.number} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="flex items-center gap-3 px-5 py-3 bg-gray-50 border-b border-gray-200">
                    <ChevronRight className="w-4 h-4 text-gold" />
                    <span className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Section {s.number}</span>
                    <span className="font-semibold text-navy text-sm">{s.title}</span>
                  </div>
                  <p className="px-5 py-4 text-sm text-gray-700 leading-relaxed">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Officers ── */}
        <section className="py-14 bg-cream">
          <div className="max-w-[1400px] mx-auto px-8">
            <h2 className="font-display text-2xl font-bold text-navy mb-2">Article 5: Officers</h2>
            <div className="w-16 h-[3px] bg-gold mb-8" />

            <p className="text-gray-700 leading-relaxed mb-8">
              The officers of the Plan Commission shall be a <strong>Chairperson</strong> — appointed by the
              Township Board of Trustees for a term of two years — and a <strong>Secretary</strong>, appointed
              by the Chairperson. In the Chairperson's absence, the Secretary shall act as Chairperson
              Pro-Tem with full authority. In the Secretary's absence from a meeting, the Chairperson
              shall designate a temporary Secretary.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Chairperson */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-navy flex items-center justify-center">
                      <Users className="w-4 h-4 text-gold" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-navy">Chairperson</h3>
                  </div>
                  <ul className="space-y-2">
                    {[
                      'Preside at all meetings of the Plan Commission',
                      'Call special meetings and perform such acts as necessary under these by-laws',
                      'Sign all documents of the Plan Commission',
                      'Prepare the meeting agenda',
                    ].map((duty, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <ChevronRight className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                        {duty}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Secretary */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-navy flex items-center justify-center">
                      <FileText className="w-4 h-4 text-gold" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-navy">Secretary</h3>
                  </div>
                  <ul className="space-y-2">
                    {[
                      'Keep the minutes of all meetings and activities, filed at Town Hall for public review',
                      'Handle matters in conjunction with, and upon the directions of, the Chairperson',
                      'Inform the Township Clerk which members were present at each meeting',
                      'Inform the Township Clerk of the next meeting date',
                    ].map((duty, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <ChevronRight className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                        {duty}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* ── Amendments ── */}
        <section className="py-14 bg-white">
          <div className="max-w-[1400px] mx-auto px-8">
            <h2 className="font-display text-2xl font-bold text-navy mb-2">Article 6: Amendments</h2>
            <div className="w-16 h-[3px] bg-gold mb-6" />
            <div className="space-y-4 max-w-3xl">
              <p className="text-gray-700 leading-relaxed">
                All members shall be provided with a copy of the by-laws prior to the first meeting after
                their appointment.
              </p>
              <p className="text-gray-700 leading-relaxed">
                These by-laws may only be amended at the annual meeting of the Plan Commission, provided
                that notice of the proposed amendment is given to each member in writing at least five days
                prior to said meeting, and upon approval by affirmative vote of a majority of all members
                in attendance.
              </p>
            </div>
          </div>
        </section>

        {/* ── Footer CTA ── */}
        <div className="bg-navy-dark py-10">
          <div className="max-w-[1400px] mx-auto px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-white font-semibold mb-1">Questions about the Planning Commission?</p>
              <p className="text-white/60 text-sm">Contact the Crete Township office during regular business hours.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="tel:708-672-8279"
                className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-navy font-semibold text-sm px-5 py-2.5 rounded transition-colors"
              >
                <Phone className="w-4 h-4" />
                (708) 672-8279
              </a>
              <Link
                href="/events"
                className="inline-flex items-center gap-2 border border-white/30 hover:border-gold text-white text-sm font-semibold px-5 py-2.5 rounded transition-colors"
              >
                <Calendar className="w-4 h-4" />
                View Meeting Calendar
              </Link>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}
