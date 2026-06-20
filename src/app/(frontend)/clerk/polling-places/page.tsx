import React from 'react'
import { PageHero } from '@/components/PageHero'
import { Card, CardContent } from '@/components/ui/card'
import { MapPin } from 'lucide-react'
import { PrecinctLookup } from '@/components/PrecinctLookup'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Polling Places | Crete Township Clerk',
  description:
    'Official polling place locations for all 12 precincts in Crete Township, Will County, Illinois.',
}

const precincts = [
  {
    number: 1,
    name: 'Unitarian Univ. Comm. Church',
    detail: '1st Floor Sanctuary',
    address: '70 Sycamore Dr',
    city: 'Park Forest, IL 60466',
  },
  {
    number: 2,
    name: 'Parkview School',
    address: '100 W Richton Rd',
    city: 'Steger, IL 60475',
  },
  {
    number: 3,
    name: 'Louis Sherman Community Center',
    detail: 'Room 203',
    address: '3501 Hopkins Ave',
    city: 'Steger, IL 60475',
  },
  {
    number: 4,
    name: 'Louis Sherman Community Center',
    detail: 'Room 204',
    address: '3501 Hopkins Ave',
    city: 'Steger, IL 60475',
  },
  {
    number: 5,
    name: 'Bible League International',
    detail: 'Room 205',
    address: '3801 Eagle Nest Dr',
    city: 'Crete, IL 60417',
  },
  {
    number: 6,
    name: 'Crete Township Fire Station 2',
    detail: 'Room 206',
    address: '25048 S Klemme Rd',
    city: 'Crete, IL 60417',
  },
  {
    number: 7,
    name: 'Bible League International',
    detail: 'Room 207',
    address: '3801 Eagle Nest Dr',
    city: 'Crete, IL 60417',
  },
  {
    number: 8,
    name: 'Crete Municipal Building',
    address: '524 W Exchange St',
    city: 'Crete, IL 60417',
  },
  {
    number: 9,
    name: 'Crete Town Hall',
    address: '1367 Wood St',
    city: 'Crete, IL 60417',
  },
  {
    number: 10,
    name: 'Crete Township Fire Station 3',
    address: '26064 S Dixie Hwy',
    city: 'Crete, IL 60417',
  },
  {
    number: 11,
    name: 'Crete Township Fire Station 1',
    address: '26730 S Stoney Island Ave',
    city: 'Crete, IL 60417',
  },
  {
    number: 12,
    name: 'Crete Township Fire Station 2',
    detail: 'Room 212',
    address: '25048 S Klemme Rd',
    city: 'Crete, IL 60417',
  },
]

export default function PollingPlacesPage() {
  return (
    <>
      <PageHero
        title="Polling Places"
        description="Official precinct polling locations for Crete Township"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Clerk', href: '/clerk' },
          { label: 'Polling Places', href: '/clerk/polling-places' },
        ]}
      />

      <div className="bg-cream">
        <section className="py-12">
          <div className="max-w-[1400px] mx-auto px-8">

            {/* Precinct lookup widget */}
            <div className="mb-10">
              <PrecinctLookup precincts={precincts} />
            </div>

            <div className="flex items-start gap-4 bg-white border border-gray-200 rounded-lg p-5 mb-10">
              <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-700 leading-relaxed">
                The following are the official polling place locations for all 12 precincts in Crete
                Township. Polling locations are administered by the Township Clerk as local election
                authority. Contact the Township Office at{' '}
                <a href="tel:7086728279" className="font-semibold text-navy hover:text-gold transition-colors">
                  708-672-8279
                </a>{' '}
                with any questions.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {precincts.map((p) => (
                <Card key={p.number} className="flex flex-col">
                  <div className="bg-navy px-5 py-4 rounded-t-lg flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center flex-shrink-0">
                      <span className="text-navy text-xs font-bold">{p.number}</span>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold text-white/60 uppercase tracking-wide">Precinct</p>
                      <p className="text-sm font-bold text-white leading-tight">{p.number}</p>
                    </div>
                  </div>
                  <CardContent className="p-5 flex-1">
                    <p className="font-semibold text-navy text-sm leading-snug">{p.name}</p>
                    {p.detail && (
                      <p className="text-xs text-gold font-medium mt-0.5">{p.detail}</p>
                    )}
                    <div className="flex items-start gap-2 mt-3">
                      <MapPin className="w-3.5 h-3.5 text-gold flex-shrink-0 mt-0.5" />
                      <div className="text-xs text-gray-600 leading-relaxed">
                        <p>{p.address}</p>
                        <p>{p.city}</p>
                      </div>
                    </div>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${p.address}, ${p.city}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-3 text-xs text-navy font-semibold hover:text-gold transition-colors underline underline-offset-2"
                    >
                      View on Google Maps
                    </a>
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
