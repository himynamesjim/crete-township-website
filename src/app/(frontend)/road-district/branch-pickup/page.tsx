import React from 'react'
import { PageHero } from '@/components/PageHero'
import { Card, CardContent } from '@/components/ui/card'
import { Phone, CheckCircle2, XCircle, Flame, AlertTriangle } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Branch Pickup Guidelines | Crete Township Road District',
  description:
    'Branch pickup guidelines for residents in the unincorporated areas of Crete Township.',
}

const allowed = [
  'Place cut ends facing the street in several small piles rather than one large one.',
  'Branches no larger than 6″ diameter, free of root balls, stumps, dirt, stone, metal, and construction material.',
  'Call 672-7732 and leave your address — we will pick up on the first Monday of the month.',
  'Call the weekend before your scheduled Monday pick-up day.',
]

const notAllowed = [
  'Complete trees will not be picked up.',
  'Not for contractors or residents clearing lots for new construction, landscape renewal, or tree removal.',
  'If a landscaper or tree company does the cutting, disposal is their responsibility.',
  'No logs, leaves, stumps, or yard waste — branches only.',
  'Maximum of 10 minutes allowed at each location.',
]

export default function BranchPickupPage() {
  return (
    <>
      <PageHero
        title="Branch Pickup Guidelines"
        description="For residents in the unincorporated areas of Crete Township"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Road District', href: '/road-district' },
          { label: 'Branch Pickup', href: '/road-district/branch-pickup' },
        ]}
      />

      <div className="bg-cream">
        <section className="pt-8 pb-12 bg-white">
          <div className="max-w-[1400px] mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

              {/* Main content */}
              <div className="lg:col-span-2 space-y-10">

                {/* Intro */}
                <div>
                  <h2 className="font-display text-2xl font-bold text-navy mb-2">Branch Pick Up Guidelines</h2>
                  <div className="w-16 h-[3px] bg-gold mb-6" />
                  <div className="bg-navy/5 border border-navy/10 rounded-lg p-4 mb-6">
                    <p className="text-sm font-semibold text-navy">
                      Branch pick up is performed <span className="text-gold">once per month</span> for
                      residents in the unincorporated areas of the Township — for minor pruning and
                      maintenance only.
                    </p>
                  </div>
                </div>

                {/* Guidelines */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Allowed */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      <h3 className="font-display text-base font-bold text-navy">Guidelines</h3>
                    </div>
                    <div className="space-y-3">
                      {allowed.map((item, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-gray-700 leading-relaxed">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Not allowed */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <XCircle className="w-5 h-5 text-red-500" />
                      <h3 className="font-display text-base font-bold text-navy">Not Accepted</h3>
                    </div>
                    <div className="space-y-3">
                      {notAllowed.map((item, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-gray-700 leading-relaxed">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Burning notice */}
                <div className="bg-gold-pale border border-gold/30 rounded-lg p-5 flex items-start gap-4">
                  <Flame className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-navy mb-1">Burning of Branches</p>
                    <p className="text-sm text-gray-700 leading-relaxed mb-2">
                      Burning of branches generated on your property is permitted in the unincorporated
                      areas of the Township. To eliminate the possibility of false alarms, please notify
                      your Fire District of your burn date.
                    </p>
                    <p className="text-sm font-semibold text-navy">
                      Crete Township Fire Protection District:{' '}
                      <a href="tel:7086727111" className="hover:text-gold transition-colors">
                        708-672-7111
                      </a>
                    </p>
                  </div>
                </div>

              </div>

              {/* Sidebar */}
              <div className="space-y-5">

                {/* Call to schedule */}
                <Card>
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3 mb-3">
                      <AlertTriangle className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-gray-600 leading-relaxed">
                        Call the weekend before your scheduled pick-up day and leave your address on the voicemail.
                      </p>
                    </div>
                    <a
                      href="tel:7086727732"
                      className="flex items-center gap-3 text-sm font-semibold text-navy hover:text-gold transition-colors"
                    >
                      <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                      708-672-7732
                    </a>
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
