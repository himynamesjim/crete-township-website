import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { HeroSection } from '@/components/layout/HeroSection'
import { EventCard } from '@/components/ui/EventCard'
import { DocumentLibrary } from '@/components/DocumentLibrary'
import { FacebookFeed } from '@/components/FacebookFeed'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Users, FileText, Landmark, Truck, Home } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Crete Township | Will County, Illinois',
  description:
    'Official website of Crete Township, Will County, Illinois. Your local government resource for meeting documents, township services, community events, and resident assistance.',
}

export default async function HomePage() {
  const payload = await getPayload({ config })

  // Fetch recent documents and announcements from all collections
  const [boardAgendas, meetingMinutes, financialReports, announcements] = await Promise.all([
    payload.find({
      collection: 'board-agendas',
      where: { status: { equals: 'published' } },
      sort: '-date',
      limit: 3,
      depth: 1,
    }),
    payload.find({
      collection: 'meeting-minutes',
      where: { status: { equals: 'published' } },
      sort: '-date',
      limit: 3,
      depth: 1,
    }),
    payload.find({
      collection: 'financial-reports',
      where: { status: { equals: 'published' } },
      sort: '-date',
      limit: 3,
      depth: 1,
    }),
    payload.find({
      collection: 'announcements',
      where: {
        active: { equals: true }
      },
      sort: '-createdAt',
      limit: 5,
      depth: 0,
    }),
  ])

  // Combine and sort all documents by date
  const allRecentDocs = [
    ...boardAgendas.docs.map((doc: any) => ({
      ...doc,
      type: 'Board Agenda',
    })),
    ...meetingMinutes.docs.map((doc: any) => ({
      ...doc,
      type: 'Meeting Minutes',
    })),
    ...financialReports.docs.map((doc: any) => ({
      ...doc,
      type: doc.documentType || 'Financial Report',
    })),
  ]
    .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 6) // Get the 6 most recent documents

  // Debug: Log document count and file structure
  console.log('=== HOMEPAGE DEBUG ===')
  console.log('Total documents found:', allRecentDocs.length)
  if (allRecentDocs.length > 0) {
    console.log('First document structure:', JSON.stringify(allRecentDocs[0], null, 2))
    console.log('First document file URL:', typeof allRecentDocs[0].file === 'object' ? allRecentDocs[0].file?.url : allRecentDocs[0].file)
  }
  // Sample event data (TODO: fetch from CMS Events collection)
  const upcomingEvents = [
    {
      title: 'Senior Coffee Get Together',
      startDate: new Date('2026-05-11'),
      time: '9:00 AM – 11:00 AM',
      location: 'Community Center',
    },
    {
      title: 'Crete Food Pantry Distribution',
      startDate: new Date('2026-05-13'),
      time: '9:00 AM – 11:00 AM',
      location: 'Town Hall',
    },
    {
      title: 'Township Board Meeting',
      startDate: new Date('2026-05-13'),
      time: '7:00 PM – 8:30 PM',
      location: 'Crete Town Hall',
    },
    {
      title: 'FREE Robotics Program Ages 9–12',
      startDate: new Date('2026-05-23'),
      time: '10:00 AM – Noon',
      location: 'Community Center',
    },
  ]

  // Format date for announcements
  const formatAnnouncementDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  // Get announcements from CMS query above
  const cmsAnnouncements = announcements.docs

  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Main Content Sections */}
      {/* Announcements */}
      <section className="py-16 bg-white">
          <div className="max-w-[1400px] mx-auto px-8">
            <div className="mb-8">
              <h2 className="text-3xl font-display font-bold text-navy mb-2">Announcements</h2>
              <div className="w-12 h-[3px] bg-gold" />
            </div>

            {cmsAnnouncements.length > 0 ? (
              <div className="space-y-6">
                {cmsAnnouncements.map((announcement: any) => (
                  <Card key={announcement.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Badge
                          variant={
                            announcement.category === 'board'
                              ? 'board'
                              : announcement.category === 'road-district'
                                ? 'roadDistrict'
                                : 'community'
                          }
                          size="sm"
                          className="flex-shrink-0"
                        >
                          {announcement.category === 'road-district'
                            ? 'ROAD DISTRICT'
                            : announcement.category.toUpperCase()}
                        </Badge>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-navy mb-2">
                            {announcement.title}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">{announcement.body}</p>
                          <p className="text-xs text-gray-400">
                            {formatAnnouncementDate(announcement.createdAt)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No announcements at this time.</p>
            )}
          </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-cream">
          <div className="max-w-[1400px] mx-auto px-8">
            <div className="mb-8">
              <h2 className="text-3xl font-display font-bold text-navy mb-2">Township Services</h2>
              <div className="w-12 h-[3px] bg-gold" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* General Assistance */}
              <Card className="hover:border-gold transition-colors">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-navy/5 rounded-lg flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-navy" />
                  </div>
                  <CardTitle className="text-lg mb-2">General Assistance</CardTitle>
                  <CardDescription className="mb-4 text-sm">
                    Resident aid programs and social services available through the township.
                  </CardDescription>
                  <div className="space-y-1">
                    <Link
                      href="/services/marriage-licenses"
                      className="block text-sm text-gold hover:text-gold-light font-medium"
                    >
                      Marriage Licenses →
                    </Link>
                    <Link
                      href="/services/planning-commission"
                      className="block text-sm text-gold hover:text-gold-light font-medium"
                    >
                      Planning Commission →
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Assessor */}
              <Card className="hover:border-gold transition-colors">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gold-pale rounded-lg flex items-center justify-center mb-4">
                    <Home className="w-6 h-6 text-gold" />
                  </div>
                  <CardTitle className="text-lg mb-2">Assessor</CardTitle>
                  <CardDescription className="mb-4 text-sm">
                    Property assessment, exemptions, and homeowner association information.
                  </CardDescription>
                  <div className="space-y-1">
                    <Link
                      href="/property-exemptions"
                      className="block text-sm text-gold hover:text-gold-light font-medium"
                    >
                      Property Exemptions →
                    </Link>
                    <Link
                      href="/hoa-information"
                      className="block text-sm text-gold hover:text-gold-light font-medium"
                    >
                      HOA Information →
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Road District */}
              <Card className="hover:border-gold transition-colors">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-navy/5 rounded-lg flex items-center justify-center mb-4">
                    <Truck className="w-6 h-6 text-navy" />
                  </div>
                  <CardTitle className="text-lg mb-2">Road District</CardTitle>
                  <CardDescription className="mb-4 text-sm">
                    Road maintenance, storm sewers, environmental compliance, and branch pickup.
                  </CardDescription>
                  <div className="space-y-1">
                    <Link
                      href="/branch-pickup"
                      className="block text-sm text-gold hover:text-gold-light font-medium"
                    >
                      Branch Pickup Guidelines →
                    </Link>
                    <Link
                      href="/storm-sewer"
                      className="block text-sm text-gold hover:text-gold-light font-medium"
                    >
                      Storm Sewer System →
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Township Clerk */}
              <Card className="hover:border-gold transition-colors">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gold-pale rounded-lg flex items-center justify-center mb-4">
                    <Landmark className="w-6 h-6 text-gold" />
                  </div>
                  <CardTitle className="text-lg mb-2">Township Clerk</CardTitle>
                  <CardDescription className="mb-4 text-sm">
                    Official records, polling places, election information, and public notices.
                  </CardDescription>
                  <div className="space-y-1">
                    <Link
                      href="/polling-places"
                      className="block text-sm text-gold hover:text-gold-light font-medium"
                    >
                      Polling Places →
                    </Link>
                    <Link
                      href="/public-notices"
                      className="block text-sm text-gold hover:text-gold-light font-medium"
                    >
                      Public Notices →
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
      </section>

      {/* Two Column: Document Library + Sidebar */}
      <section className="py-16 bg-white">
          <div className="max-w-[1400px] mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left: Document Library with Filter Buttons */}
              <DocumentLibrary documents={allRecentDocs} />

              {/* Right: Sidebar */}
              <div className="space-y-8">
                {/* Upcoming Events */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-display font-bold text-gold uppercase tracking-wide">
                      Upcoming Events
                    </h3>
                    <Link href="/events" className="text-sm text-gold hover:text-gold-light">
                      View All →
                    </Link>
                  </div>
                  <div className="space-y-3">
                    {upcomingEvents.map((event, index) => (
                      <EventCard key={index} {...event} />
                    ))}
                  </div>
                </div>

                {/* Next Board Meeting Card */}
                <Card className="bg-navy-dark text-white border-none">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-display font-bold text-gold uppercase tracking-wide mb-4">
                      Next Board Meeting
                    </h3>
                    <div className="mb-4">
                      <div className="text-2xl font-display font-bold mb-1">
                        Township Board Meeting
                      </div>
                      <div className="text-sm text-gray-300">
                        7:00 PM – 8:30 PM
                        <br />
                        Crete Town Hall
                      </div>
                    </div>
                    <Button variant="navy" className="w-full bg-gold hover:bg-gold-light">
                      📹 Join via Zoom
                    </Button>
                    <p className="text-xs text-gray-400 mt-2">Meeting ID: 850 1300 5638</p>
                  </CardContent>
                </Card>

                {/* Quick Contact */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-display font-bold text-gold uppercase tracking-wide mb-4">
                      Quick Contact
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div>
                        <div className="font-semibold text-navy">Main Office</div>
                        <a href="tel:708-672-8279" className="text-gold hover:text-gold-light">
                          708-672-8279
                        </a>
                      </div>
                      <div>
                        <div className="font-semibold text-navy">Fax</div>
                        <span className="text-gray-600">708-672-3327</span>
                      </div>
                      <div>
                        <div className="font-semibold text-navy">Email</div>
                        <a
                          href="mailto:administrator@cretetownship.com"
                          className="text-gold hover:text-gold-light break-words"
                        >
                          administrator@cretetownship.com
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent News from Facebook */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-display font-bold text-gold uppercase tracking-wide">
                      Recent News
                    </h3>
                    <Link
                      href="https://www.facebook.com/profile.php?id=102522678698264"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gold hover:text-gold-light"
                    >
                      View All →
                    </Link>
                  </div>
                  <FacebookFeed />
                </div>
              </div>
            </div>
          </div>
      </section>
    </>
  )
}
