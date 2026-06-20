import React from 'react'
import Link from 'next/link'
import { PageHero } from '@/components/PageHero'
import { Card, CardContent } from '@/components/ui/card'
import { Clock, DollarSign, IdCard, AlertCircle, Phone, ExternalLink, CheckCircle2 } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Marriage Licenses | Crete Township',
  description:
    'Obtain a marriage license for ceremonies held in Will County at the Crete Township Office. By appointment only, Monday–Friday 9:00 AM–3:00 PM. Fee: $35 cash only.',
}

export default function MarriageLicensesPage() {
  return (
    <>
      <PageHero
        title="Marriage Licenses"
        description="For ceremonies held in Will County — available at the Crete Township Office by appointment"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Marriage Licenses', href: '/services/marriage-licenses' },
        ]}
      />

      <div className="bg-cream">

        {/* ── Key info bar ── */}
        <div className="bg-navy-dark text-white">
          <div className="max-w-[1400px] mx-auto px-8 py-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gold flex-shrink-0" />
                <div>
                  <p className="text-xs text-white/60 uppercase tracking-wide">Office Hours</p>
                  <p className="text-sm font-semibold">Mon – Fri &nbsp;·&nbsp; 9:00 AM – 3:00 PM</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <DollarSign className="w-5 h-5 text-gold flex-shrink-0" />
                <div>
                  <p className="text-xs text-white/60 uppercase tracking-wide">License Fee</p>
                  <p className="text-sm font-semibold">$35.00 — Cash Only</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gold flex-shrink-0" />
                <div>
                  <p className="text-xs text-white/60 uppercase tracking-wide">Appointments</p>
                  <a href="tel:708-672-8279" className="text-sm font-semibold hover:text-gold transition-colors">
                    (708) 672-8279
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Main content ── */}
        <section className="py-14 bg-white">
          <div className="max-w-[1400px] mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

              {/* Left — main info */}
              <div className="lg:col-span-2 space-y-8">

                {/* Intro */}
                <div>
                  <h2 className="font-display text-2xl font-bold text-navy mb-2">Getting a Marriage License</h2>
                  <div className="w-16 h-[3px] bg-gold mb-6" />
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Marriage licenses for ceremonies held in Will County may be obtained at the Crete
                    Township Office, Monday through Friday from 9:00 AM to 3:00 PM.
                  </p>

                  {/* Important notices */}
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 bg-gold-pale border border-gold/30 rounded-lg px-4 py-3">
                      <AlertCircle className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-700">
                        <strong className="text-navy">By appointment only.</strong> Please call{' '}
                        <a href="tel:708-672-8279" className="text-navy font-semibold hover:text-gold transition-colors">
                          (708) 672-8279
                        </a>{' '}
                        to schedule.
                      </p>
                    </div>
                    <div className="flex items-start gap-3 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
                      <AlertCircle className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-700">
                        Ceremonies are <strong>not</strong> held at Crete Township. The office issues licenses only.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Required ID */}
                <div>
                  <h3 className="font-display text-xl font-bold text-navy mb-4 flex items-center gap-2">
                    <IdCard className="w-5 h-5 text-gold" />
                    Required Identification
                  </h3>
                  <div className="space-y-2">
                    {[
                      'Current government-issued photo ID (Driver\'s License or State ID)',
                      'Divorce papers — if previously married and divorced',
                      'Death certificate of former spouse — if previously married and widowed',
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3 bg-white border border-gray-200 rounded-lg px-4 py-3">
                        <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-gray-700">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment */}
                <div>
                  <h3 className="font-display text-xl font-bold text-navy mb-4 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-gold" />
                    Payment
                  </h3>
                  <div className="bg-white border border-gray-200 rounded-lg p-5">
                    <p className="text-gray-700 text-sm leading-relaxed mb-3">
                      The license fee is <strong className="text-navy">$35.00</strong>, payable by{' '}
                      <strong className="text-navy">cash only</strong>. No personal checks, credit cards,
                      or debit cards are accepted at the Crete Township Office.
                    </p>
                    <div className="flex items-center gap-2 text-xs font-semibold text-red-700 bg-red-50 border border-red-200 rounded px-3 py-2 w-fit">
                      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                      Cash only — no cards or checks accepted
                    </div>
                  </div>
                </div>

              </div>

              {/* Right sidebar */}
              <div className="space-y-5">

                {/* Certified copies */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-display text-lg font-bold text-navy mb-1">Certified Copies</h3>
                    <p className="text-xs text-gray-500 mb-4">Of marriage certificates</p>
                    <div className="space-y-3 mb-5">
                      <div className="flex justify-between items-center text-sm border-b border-gray-100 pb-2">
                        <span className="text-gray-700">First copy</span>
                        <span className="font-semibold text-navy">$12.00</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-700">Each additional copy <span className="text-xs text-gray-400">(same request)</span></span>
                        <span className="font-semibold text-navy">$4.00</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mb-4">
                      Request forms are available online at the Will County Clerk's website, or in person
                      at the Crete Township Office. Cash only — no cards accepted.
                    </p>
                    <a
                      href="https://www.thewillcountyclerk.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-navy hover:text-gold transition-colors"
                    >
                      Will County Clerk
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </CardContent>
                </Card>

                {/* Office info */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-display text-lg font-bold text-navy mb-4">Township Office</h3>
                    <div className="space-y-3 text-sm text-gray-700">
                      <p>1367 Wood Street<br />Crete, IL 60417</p>
                      <div>
                        <p className="font-semibold text-navy mb-1">Hours (Marriage Licenses)</p>
                        <p>Monday – Friday<br />9:00 AM – 3:00 PM</p>
                      </div>
                      <div className="pt-3 border-t border-gray-100">
                        <a
                          href="tel:708-672-8279"
                          className="flex items-center gap-2 font-semibold text-navy hover:text-gold transition-colors"
                        >
                          <Phone className="w-4 h-4 text-gold" />
                          (708) 672-8279
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  )
}
