import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { PageHero } from '@/components/PageHero'
import { Card, CardContent } from '@/components/ui/card'
import { Phone, Mail } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { SidebarWidgets } from '@/components/SidebarWidgets'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Township Board & Officials | Crete Township',
  description:
    'Meet the elected officials and staff of Crete Township, Will County, Illinois. Contact information for the Board of Trustees, Assessor, Highway Commissioner, and other township officials.',
}

interface Official {
  id: string
  name: string
  title: string
  department: string
  responsibilities?: string
  photo?: {
    url: string
    alt?: string
  }
  phone?: string
  email?: string
  bio?: string
  displayOrder: number
}

export default async function OfficialsPage() {
  const payload = await getPayload({ config })

  // Fetch all published officials
  const officialsResult = await payload.find({
    collection: 'officials',
    where: { status: { equals: 'published' } },
    sort: 'displayOrder',
    limit: 100,
  })

  const officials = officialsResult.docs as unknown as Official[]

  // Two sections: the board (trustees + clerk) and everyone else.
  // Single-person offices (assessor, road district, collector, general
  // assistance) share one grid so the page isn't a stack of one-card sections.
  const boardOfficials = [
    ...officials.filter((o) => o.department === 'board'),
    ...officials.filter((o) => o.department === 'clerk'),
  ]
  const otherOfficials = officials.filter(
    (o) => !['board', 'clerk'].includes(o.department),
  )

  const sections: Array<{ title: string; members: Official[] }> = [
    { title: 'Board of Trustees', members: boardOfficials },
    { title: 'Township Officials', members: otherOfficials },
  ]

  return (
    <>
      <PageHero
        title="Township Board & Officials"
        description="Meet the elected officials and staff who serve Crete Township"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Officials', href: '/officials' },
        ]}
      />

      <section className="py-16 bg-white">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-10 items-start">
            {/* Sidebar — sticky, managed from /admin/globals/sidebar-widgets */}
            <div className="lg:sticky lg:top-24 order-2 lg:order-1">
              <SidebarWidgets />
            </div>

            {/* Main content */}
            <div className="order-1 lg:order-2">
              {/* Introduction */}
              <div className="mb-12">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Crete Township is governed by elected officials who are dedicated to serving the
                  residents of our community. Our Board of Trustees, along with other elected officials,
                  work together to provide quality services and maintain the high standards our residents
                  expect.
                </p>
              </div>

          {/* Officials by Section */}
          <div className="space-y-16">
            {sections.map(({ title, members }) => {
              if (members.length === 0) return null

              return (
                <div key={title}>
                  <div className="mb-8">
                    <h2 className="text-3xl font-display font-bold text-navy mb-2">
                      {title}
                    </h2>
                    <div className="w-12 h-[3px] bg-gold" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {members.map((official) => (
                      <Link key={official.id} href={`/officials/${official.id}`}>
                        <Card className="hover:border-gold hover:shadow-lg transition-all cursor-pointer h-full">
                          <CardContent className="p-6">
                          {/* Photo */}
                          {official.photo?.url ? (
                            <div className="mb-4">
                              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden bg-gray-200 border-4 border-gold/20">
                                <Image
                                  src={official.photo.url}
                                  alt={official.photo.alt || official.name}
                                  width={128}
                                  height={128}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </div>
                          ) : (
                            <div className="mb-4">
                              <div className="w-32 h-32 mx-auto rounded-full bg-navy flex items-center justify-center border-4 border-gold/20">
                                <span className="text-4xl font-display font-bold text-white">
                                  {official.name
                                    .split(' ')
                                    .map((n) => n[0])
                                    .join('')}
                                </span>
                              </div>
                            </div>
                          )}

                          {/* Name & Title */}
                          <div className="text-center mb-4">
                            <h3 className="text-xl font-display font-bold text-navy mb-1">
                              {official.name}
                            </h3>
                            <p className="text-sm font-semibold text-gold mb-1">{official.title}</p>
                            {official.responsibilities && (
                              <p className="text-xs text-gray-500 italic">
                                {official.responsibilities}
                              </p>
                            )}
                          </div>

                          {/* Bio Excerpt */}
                          {official.bio && (
                            <div className="mb-4 text-center">
                              <p className="text-sm text-gray-600 line-clamp-3">
                                {official.bio}
                              </p>
                            </div>
                          )}

                          {/* Contact Info */}
                          {(official.phone || official.email) && (
                            <div className="space-y-2 pt-4 border-t border-gray-200">
                              {official.phone && (
                                <div className="flex items-center gap-2 text-sm">
                                  <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                                  <a
                                    href={`tel:${official.phone}`}
                                    className="text-gray-700 hover:text-gold"
                                  >
                                    {official.phone}
                                  </a>
                                </div>
                              )}
                              {official.email && (
                                <div className="flex items-center gap-2 text-sm">
                                  <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                                  <a
                                    href={`mailto:${official.email}`}
                                    className="text-gray-700 hover:text-gold break-words"
                                  >
                                    {official.email}
                                  </a>
                                </div>
                              )}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Contact Section */}
          <div className="mt-16 pt-16 border-t border-gray-200">
            <div className="bg-navy-dark text-white rounded-lg p-8">
              <h2 className="text-2xl font-display font-bold text-white mb-4">General Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gold mb-2">Main Office</h3>
                  <p>1367 Wood Street</p>
                  <p>Crete, IL 60417</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gold mb-2">Contact</h3>
                  <p>
                    Phone:{' '}
                    <a href="tel:708-672-8279" className="hover:text-gold transition-colors">
                      708-672-8279
                    </a>
                  </p>
                  <p>
                    Email:{' '}
                    <a
                      href="mailto:administrator@cretetownship.com"
                      className="hover:text-gold transition-colors"
                    >
                      administrator@cretetownship.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
            </div>{/* end main content */}
          </div>{/* end grid */}
        </div>
      </section>
    </>
  )
}
