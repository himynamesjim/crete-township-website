import React from 'react'
import { PageHero } from '@/components/PageHero'
import { Card, CardContent } from '@/components/ui/card'
import { Phone, AlertCircle } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Will County Phone Numbers | Crete Township Assessor',
  description:
    'Important Will County department phone numbers for Crete Township residents.',
}

interface Contact {
  department: string
  phone: string
  note?: string
}

const contacts: Contact[] = [
  { department: 'Animal Control', phone: '815-462-5633' },
  { department: 'Record of Deeds', phone: '815-740-4637' },
  { department: 'DHFS – Public Aid', phone: '815-740-5350' },
  { department: 'Veteran Affairs', phone: '815-740-8389' },
  { department: 'Center of Community Concerns', phone: '815-722-0722' },
  { department: 'Building / Permits / Zoning', phone: '815-727-8634' },
  { department: 'Social Security', phone: '866-783-7302' },
  { department: 'Senior Services', phone: '815-723-9713' },
  { department: 'Daybreak / Catholic Charities', phone: '815-723-4663' },
  { department: 'Will County Sheriff – Non-Emergency', phone: '815-727-8575' },
  { department: "Will County Board's Admin Office", phone: '815-740-4602' },
  {
    department: 'Will County Division of Transportation (WCDOT)',
    phone: '815-727-8476',
    note:
      'For questions regarding Exchange Street, Crete-Monee Road west of IL Rte 1 / Dixie Highway, and Goodenow Road west of IL Rte 394.',
  },
]

export default function WillCountyPhonesPage() {
  return (
    <>
      <PageHero
        title="Will County Phone Numbers"
        description="Important department contacts for Crete Township residents"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Assessor', href: '/assessor' },
          { label: 'Will County Phone Numbers', href: '/assessor/will-county-phones' },
        ]}
      />

      <div className="bg-cream">

        {/* ── Intro band ── */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-[1400px] mx-auto px-8 py-8">
            <div className="flex items-start gap-4">
              <Phone className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
              <div>
                <h2 className="font-display text-xl font-bold text-navy mb-2">Will County Department Contacts</h2>
                <p className="text-gray-700 text-sm leading-relaxed max-w-3xl">
                  The following phone numbers are provided as a convenience for Crete Township residents
                  needing to reach Will County departments and community services.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Contact grid ── */}
        <section className="py-12">
          <div className="max-w-[1400px] mx-auto px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {contacts.map((c) => (
                <Card key={c.department} className="flex flex-col">
                  <div className="bg-navy px-5 py-4 rounded-t-lg">
                    <h3 className="font-display text-sm font-bold text-white leading-snug">{c.department}</h3>
                  </div>
                  <CardContent className="p-5 flex-1 flex flex-col gap-3">
                    <a
                      href={`tel:${c.phone.replace(/[.()\-\s]/g, '')}`}
                      className="flex items-center gap-2 text-sm font-semibold text-navy hover:text-gold transition-colors"
                    >
                      <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                      {c.phone}
                    </a>
                    {c.note && (
                      <div className="flex items-start gap-2 text-xs text-gray-600 leading-relaxed">
                        <AlertCircle className="w-3.5 h-3.5 text-gold flex-shrink-0 mt-0.5" />
                        {c.note}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  )
}
