import React from 'react'
import { PageHero } from '@/components/PageHero'
import { Card, CardContent } from '@/components/ui/card'
import { Phone, Mail, MapPin, Users } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Homeowners Associations | Crete Township Assessor',
  description:
    'Contact information for Homeowners Associations in Crete Township, Will County, Illinois.',
}

interface HOAContact {
  name: string
  role?: string
  phone?: string
  email?: string
}

interface HOA {
  name: string
  address?: string
  contacts: HOAContact[]
}

const associations: HOA[] = [
  {
    name: 'Balmoral Heights Improvement Association',
    address: 'Crete, Illinois 60417',
    contacts: [
      { name: 'Valerie Borio', role: 'Treasurer', phone: '815-351-4522' },
    ],
  },
  {
    name: 'Willowbrook Homeowners Association #1 – 2 – 3',
    contacts: [
      { name: 'Ray Peterlin', phone: '708-672-6448' },
    ],
  },
  {
    name: 'Beckwith Community Association',
    address: '739 St. Andrews Drive, Crete, Illinois 60417',
    contacts: [
      { name: 'Mary Brown', phone: '708-672-5974' },
    ],
  },
  {
    name: 'Willowbrook Homeowners Association #4',
    contacts: [
      { name: 'Howard Kaye', phone: '708-921-6768' },
    ],
  },
  {
    name: 'Forest View Homeowners Association',
    address: '23735 Jonathan Lane, Crete, Illinois 60417',
    contacts: [
      { name: 'Ray Mathews', phone: '672-7156' },
    ],
  },
  {
    name: 'Willowbrook Homeowners Association #5 – 6',
    contacts: [
      { name: 'Barbara Scully', phone: '708-935-8138' },
    ],
  },
  {
    name: 'Greater Crete Homeowners Association',
    address: '657 First St., Crete, Illinois 60417',
    contacts: [
      { name: 'Frank Cioffi' },
    ],
  },
  {
    name: 'Williamsburg Homeowners Association',
    contacts: [
      { name: 'George Coleman', phone: '773-885-2196' },
    ],
  },
  {
    name: 'Ridgefield Homeowners Association',
    address: 'PO Box 453, Crete, IL 60417',
    contacts: [
      { name: 'Paul Carlos' },
    ],
  },
  {
    name: 'Plum Grove Estates Homeowners Association',
    contacts: [
      { name: 'Vonsela Burns', role: 'President', phone: '312-208-3261' },
      { name: 'Gilbert Tyson', role: 'Vice President', phone: '312-607-1962', email: 'gjt186@att.net' },
      { name: 'Nedra Berkley-Fosters', role: 'Secretary', phone: '708-280-8573' },
      { name: 'Evie Averhart', role: 'Treasurer', phone: '773-842-7939' },
    ],
  },
]

export default function HOAPage() {
  return (
    <>
      <PageHero
        title="Homeowners Associations"
        description="Contact information for HOAs in Crete Township"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Assessor', href: '/assessor' },
          { label: 'Homeowners Associations', href: '/assessor/hoa' },
        ]}
      />

      <div className="bg-cream">

        {/* ── Intro band ── */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-[1400px] mx-auto px-8 py-8">
            <div className="flex items-start gap-4">
              <Users className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
              <div>
                <h2 className="font-display text-xl font-bold text-navy mb-2">HOA Contacts in Crete Township</h2>
                <p className="text-gray-700 text-sm leading-relaxed max-w-3xl">
                  The following homeowners associations are registered with the Crete Township Assessor's
                  office. Contact information is provided as a community resource. For assessment questions
                  specific to your property, contact the Assessor's office directly at{' '}
                  <a href="mailto:mary@creteassessor.com" className="text-navy font-semibold hover:text-gold transition-colors">
                    mary@creteassessor.com
                  </a>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── HOA grid ── */}
        <section className="py-12">
          <div className="max-w-[1400px] mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {associations.map((hoa) => (
                <Card key={hoa.name} className="flex flex-col">
                  <div className="bg-navy px-5 py-4 rounded-t-lg">
                    <h3 className="font-display text-sm font-bold text-white leading-snug">{hoa.name}</h3>
                    {hoa.address && (
                      <p className="flex items-start gap-1.5 text-xs text-white/60 mt-2 leading-relaxed">
                        <MapPin className="w-3 h-3 flex-shrink-0 mt-0.5" />
                        {hoa.address}
                      </p>
                    )}
                  </div>
                  <CardContent className="p-5 flex-1">
                    <div className="space-y-4">
                      {hoa.contacts.map((contact, i) => (
                        <div key={i} className={i > 0 ? 'pt-4 border-t border-gray-100' : ''}>
                          <p className="font-semibold text-navy text-sm">{contact.name}</p>
                          {contact.role && (
                            <p className="text-xs text-gold font-medium mt-0.5">{contact.role}</p>
                          )}
                          <div className="mt-2 space-y-1.5">
                            {contact.phone && (
                              <a
                                href={`tel:${contact.phone.replace(/[.\-\s]/g, '')}`}
                                className="flex items-center gap-2 text-xs text-gray-600 hover:text-gold transition-colors"
                              >
                                <Phone className="w-3 h-3 text-gold flex-shrink-0" />
                                {contact.phone}
                              </a>
                            )}
                            {contact.email && (
                              <a
                                href={`mailto:${contact.email}`}
                                className="flex items-center gap-2 text-xs text-gray-600 hover:text-gold transition-colors"
                              >
                                <Mail className="w-3 h-3 text-gold flex-shrink-0" />
                                {contact.email}
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
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
