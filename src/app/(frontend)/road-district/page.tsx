import React from 'react'
import Image from 'next/image'
import { PageHero } from '@/components/PageHero'
import { Card, CardContent } from '@/components/ui/card'
import { Phone, Mail, ExternalLink, AlertCircle, CheckCircle2 } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Road District | Crete Township',
  description:
    'Crete Township Road District services, duties, permits, and contact information for Highway Commissioner Tony Recupito.',
}

const duties = [
  'Roadside Mowing',
  'Asphalt Patching',
  'Snow Removal and Salting',
  'Culvert Replacement',
  'Ditch Cleaning',
  'Bridge Maintenance',
  'Building and Grounds Maintenance',
  'Roadside Cleanup',
  'Maintain Traffic Control Devices',
  'Tree Trimming and Removal',
  'Maintain Fleet of Equipment and Vehicles',
  'Shoulder Stone Maintenance',
  'Branch Pick Up',
]

export default function RoadDistrictPage() {
  return (
    <>
      <PageHero
        title="Road District"
        description="Crete Township Road District services, permits, and contact information"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Road District', href: '/road-district' },
        ]}
      />

      <div className="bg-cream">

        {/* ── Profile + main content ── */}
        <section className="py-14 bg-white">
          <div className="max-w-[1400px] mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

              {/* Left column */}
              <div className="space-y-5">

                {/* Tony Recupito card */}
                <Card className="overflow-hidden">
                  <div className="bg-navy-dark px-6 pt-8 pb-0 flex flex-col items-center">
                    <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-gold shadow-lg mb-4">
                      <Image
                        src="/assets/officials/recupito.jpeg"
                        alt="Tony Recupito, Highway Commissioner"
                        width={144}
                        height={144}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h2 className="font-display text-xl font-bold text-white text-center leading-tight">
                      Tony Recupito
                    </h2>
                    <p className="text-gold text-sm font-semibold mt-1 mb-6">Highway Commissioner</p>
                  </div>
                  <CardContent className="p-6 space-y-3">
                    <a
                      href="tel:7086727732"
                      className="flex items-center gap-3 text-sm text-gray-700 hover:text-gold transition-colors"
                    >
                      <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                      708-672-7732
                    </a>
                    <a
                      href="mailto:arecupito@cretetownship.com"
                      className="flex items-center gap-3 text-sm text-gray-700 hover:text-gold transition-colors"
                    >
                      <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                      arecupito@cretetownship.com
                    </a>
                  </CardContent>
                </Card>

                {/* Tim Miller card */}
                <Card>
                  <CardContent className="p-6">
                    <p className="text-xs font-semibold text-navy uppercase tracking-wide mb-3">Staff</p>
                    <p className="font-semibold text-navy text-sm">Tim Miller</p>
                    <p className="text-xs text-gray-500 mb-3">Administrative Assistant / Project Mgr.</p>
                    <a
                      href="mailto:tmiller@cretetownship.com"
                      className="flex items-center gap-3 text-sm text-gray-700 hover:text-gold transition-colors"
                    >
                      <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                      tmiller@cretetownship.com
                    </a>
                  </CardContent>
                </Card>

                {/* Overweight permit card */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-display text-base font-bold text-navy mb-1">Overweight / Over-Dimension Permits</h3>
                    <p className="text-xs text-gray-600 leading-relaxed mb-4">
                      Apply for your permit online through OxCart Permits.
                    </p>
                    <a
                      href="https://www.oxcartpermits.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-semibold text-navy hover:text-gold transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-gold" />
                      www.oxcartpermits.com
                    </a>
                  </CardContent>
                </Card>
              </div>

              {/* Right column */}
              <div className="lg:col-span-2 space-y-10">

                {/* Services & Duties header */}
                <div>
                  <h2 className="font-display text-2xl font-bold text-navy mb-2">Road District Services &amp; Duties</h2>
                  <div className="w-16 h-[3px] bg-gold mb-6" />
                  <p className="text-gray-700 leading-relaxed">
                    The Crete Township Road District is responsible for maintaining all township roads and
                    right-of-ways within the unincorporated areas of Crete Township. The Highway Commissioner
                    oversees all road maintenance, construction, and infrastructure projects to keep our
                    community safe and accessible year-round.
                  </p>
                </div>

                {/* Highway & Entrance Permits */}
                <div>
                  <h2 className="font-display text-2xl font-bold text-navy mb-2">Highway &amp; Entrance Permits</h2>
                  <div className="w-16 h-[3px] bg-gold mb-6" />
                  <div className="bg-gold-pale border border-gold/30 rounded-lg p-5 flex items-start gap-4">
                    <AlertCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-navy mb-1">Entrance / Culvert Permit Required</p>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        If you are planning to build a new home in the unincorporated area of the Township,
                        an entrance/culvert permit is required. Please contact the Township Office to receive
                        an application.
                      </p>
                      <a
                        href="tel:7086728279"
                        className="inline-flex items-center gap-2 mt-3 text-sm font-semibold text-navy hover:text-gold transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        708-672-8279
                      </a>
                    </div>
                  </div>
                </div>

                {/* Snowfall Ordinance */}
                <div>
                  <h2 className="font-display text-2xl font-bold text-navy mb-2">2&Prime; Snowfall Ordinance</h2>
                  <div className="w-16 h-[3px] bg-gold mb-6" />
                  <div className="bg-navy/5 border border-navy/10 rounded-lg p-5 flex items-start gap-4">
                    <AlertCircle className="w-5 h-5 text-navy flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700 leading-relaxed">
                      <strong className="text-navy">No parking </strong> on Township streets after a 2&Prime;
                      snowfall until the streets have been plowed.
                    </p>
                  </div>
                </div>

                {/* Township Duties */}
                <div>
                  <h2 className="font-display text-2xl font-bold text-navy mb-2">Township Duties</h2>
                  <div className="w-16 h-[3px] bg-gold mb-6" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                    {duties.map((duty) => (
                      <div key={duty} className="flex items-center gap-3">
                        <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0" />
                        <span className="text-sm text-gray-700">{duty}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* ── Footer CTA ── */}
        <div className="bg-navy-dark py-10">
          <div className="max-w-[1400px] mx-auto px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-white font-semibold mb-1">Questions about roads or permits?</p>
              <p className="text-white/60 text-sm">Contact Highway Commissioner Tony Recupito directly.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="tel:7086727732"
                className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-navy font-semibold text-sm px-6 py-2.5 rounded transition-colors"
              >
                <Phone className="w-4 h-4" />
                708-672-7732
              </a>
              <a
                href="mailto:arecupito@cretetownship.com"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm px-6 py-2.5 rounded transition-colors"
              >
                <Mail className="w-4 h-4" />
                arecupito@cretetownship.com
              </a>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}
