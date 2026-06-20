import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { HeroSection } from '@/components/layout/HeroSection'
import { EventCard } from '@/components/ui/EventCard'
import { DocumentLibrary } from '@/components/DocumentLibrary'
import { FacebookFeed } from '@/components/FacebookFeed'
import { NextBoardMeeting } from '@/components/NextBoardMeeting'
import { CalendarEvents } from '@/components/CalendarEvents'
import { NewsletterSignup } from '@/components/NewsletterSignup'
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

  // Get current date at midnight for comparison
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Fetch recent documents, announcements, and upcoming agenda
  const [boardAgendas, meetingMinutes, financialReports, announcements, upcomingAgenda] = await Promise.all([
    payload.find({
      collection: 'board-agendas',
      where: { status: { equals: 'published' } },
      sort: '-date',
      limit: 8,
      depth: 1,
    }),
    payload.find({
      collection: 'meeting-minutes',
      where: { status: { equals: 'published' } },
      sort: '-date',
      limit: 8,
      depth: 1,
    }),
    payload.find({
      collection: 'financial-reports',
      where: { status: { equals: 'published' } },
      sort: '-date',
      limit: 8,
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
    // Fetch upcoming agenda for Next Board Meeting box
    payload.find({
      collection: 'board-agendas',
      where: {
        and: [
          {
            status: {
              equals: 'published',
            },
          },
          {
            date: {
              greater_than_equal: today.toISOString(),
            },
          },
        ],
      },
      sort: 'date',
      limit: 1,
    }),
  ])

  // Combine documents - Board Agendas first, then Meeting Minutes, then Financial Reports
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
    .sort((a: any, b: any) => {
      // First sort by type priority (Board Agendas first)
      const typeOrder = { 'Board Agenda': 0, 'Meeting Minutes': 1 }
      const typeA = typeOrder[a.type as keyof typeof typeOrder] ?? 2
      const typeB = typeOrder[b.type as keyof typeof typeOrder] ?? 2

      if (typeA !== typeB) return typeA - typeB

      // Then sort by date within the same type (newest first)
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
    // No slice here — DocumentLibrary caps each filter at 8 client-side

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

  // Prepare upcoming agenda data for Next Board Meeting component
  const nextBoardMeetingAgenda = upcomingAgenda.docs.length > 0
    ? {
        title: upcomingAgenda.docs[0].title || 'Township Board Meeting',
        date: upcomingAgenda.docs[0].date || '',
        meetingTime: upcomingAgenda.docs[0].meetingTime,
        location: upcomingAgenda.docs[0].location,
      }
    : null

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
                      href="/services/foia"
                      className="block text-sm text-gold hover:text-gold-light font-medium"
                    >
                      FOIA / Public Records →
                    </Link>
                    <Link
                      href="/services/general-assistance"
                      className="block text-sm text-gold hover:text-gold-light font-medium"
                    >
                      General Assistance →
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
                      href="/assessor"
                      className="block text-sm text-gold hover:text-gold-light font-medium"
                    >
                      Property Exemptions →
                    </Link>
                    <Link
                      href="/assessor/hoa"
                      className="block text-sm text-gold hover:text-gold-light font-medium"
                    >
                      HOA Information →
                    </Link>
                    <Link
                      href="/assessor/will-county-phones"
                      className="block text-sm text-gold hover:text-gold-light font-medium"
                    >
                      Will County Contacts →
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
                      href="/road-district/branch-pickup"
                      className="block text-sm text-gold hover:text-gold-light font-medium"
                    >
                      Branch Pickup Guidelines →
                    </Link>
                    <Link
                      href="/road-district/environment"
                      className="block text-sm text-gold hover:text-gold-light font-medium"
                    >
                      Storm Sewer System →
                    </Link>
                    <Link
                      href="/documents/highway-commissioner-reports"
                      className="block text-sm text-gold hover:text-gold-light font-medium"
                    >
                      Commissioner Reports →
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
                      href="/clerk/polling-places"
                      className="block text-sm text-gold hover:text-gold-light font-medium"
                    >
                      Polling Places →
                    </Link>
                    <Link
                      href="/clerk"
                      className="block text-sm text-gold hover:text-gold-light font-medium"
                    >
                      Board Meeting Info →
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
      </section>

      {/* Document Library (left) + Recent News (right) */}
      <section className="py-16 bg-white">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Document Library (2/3 width) */}
            <div className="lg:col-span-2">
              <DocumentLibrary documents={allRecentDocs} />
            </div>

            {/* Right: Recent News from Facebook (1/3 width) */}
            <div>
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-display font-bold text-navy mb-2">Recent News</h2>
                    <div className="w-12 h-[3px] bg-gold" />
                  </div>
                </div>
              </div>
              <div className="w-full">
                <FacebookFeed width={400} height={800} />
              </div>
              <div className="mt-4 text-center">
                <Link
                  href="https://www.facebook.com/profile.php?id=102522678698264"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gold hover:text-gold-light font-medium"
                >
                  View All on Facebook →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Will County & Community Resources */}
      <section className="py-16 bg-cream">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Contact Grid */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-display font-bold text-navy mb-2">Will County & Community Resources</h2>
                <div className="w-12 h-[3px] bg-gold" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Animal Control */}
            <Card className="hover:border-gold transition-colors">
              <CardContent className="p-5">
                <h3 className="font-semibold text-navy mb-2">Animal Control</h3>
                <a href="tel:815-462-5633" className="text-gold hover:text-gold-light font-medium">
                  815-462-5633
                </a>
              </CardContent>
            </Card>

            {/* Record of Deeds */}
            <Card className="hover:border-gold transition-colors">
              <CardContent className="p-5">
                <h3 className="font-semibold text-navy mb-2">Record of Deeds</h3>
                <a href="tel:815-740-4637" className="text-gold hover:text-gold-light font-medium">
                  815-740-4637
                </a>
              </CardContent>
            </Card>

            {/* DHFS - Public Aid */}
            <Card className="hover:border-gold transition-colors">
              <CardContent className="p-5">
                <h3 className="font-semibold text-navy mb-2">DHFS - Public Aid</h3>
                <a href="tel:815-740-5350" className="text-gold hover:text-gold-light font-medium">
                  815-740-5350
                </a>
              </CardContent>
            </Card>

            {/* Veteran Affairs */}
            <Card className="hover:border-gold transition-colors">
              <CardContent className="p-5">
                <h3 className="font-semibold text-navy mb-2">Veteran Affairs</h3>
                <a href="tel:815-740-8389" className="text-gold hover:text-gold-light font-medium">
                  815-740-8389
                </a>
              </CardContent>
            </Card>

            {/* Center of Community Concerns */}
            <Card className="hover:border-gold transition-colors">
              <CardContent className="p-5">
                <h3 className="font-semibold text-navy mb-2">Center of Community Concerns</h3>
                <a href="tel:815-722-0722" className="text-gold hover:text-gold-light font-medium">
                  815-722-0722
                </a>
              </CardContent>
            </Card>

            {/* Building/Permits/Zoning */}
            <Card className="hover:border-gold transition-colors">
              <CardContent className="p-5">
                <h3 className="font-semibold text-navy mb-2">Building/Permits/Zoning</h3>
                <a href="tel:815-727-8634" className="text-gold hover:text-gold-light font-medium">
                  815-727-8634
                </a>
              </CardContent>
            </Card>

            {/* Social Security */}
            <Card className="hover:border-gold transition-colors">
              <CardContent className="p-5">
                <h3 className="font-semibold text-navy mb-2">Social Security</h3>
                <a href="tel:866-783-7302" className="text-gold hover:text-gold-light font-medium">
                  866-783-7302
                </a>
              </CardContent>
            </Card>

            {/* Senior Services */}
            <Card className="hover:border-gold transition-colors">
              <CardContent className="p-5">
                <h3 className="font-semibold text-navy mb-2">Senior Services</h3>
                <a href="tel:815-723-9713" className="text-gold hover:text-gold-light font-medium">
                  815-723-9713
                </a>
              </CardContent>
            </Card>

            {/* Daybreak/Catholic Charities */}
            <Card className="hover:border-gold transition-colors">
              <CardContent className="p-5">
                <h3 className="font-semibold text-navy mb-2">Daybreak / Catholic Charities</h3>
                <a href="tel:815-723-4663" className="text-gold hover:text-gold-light font-medium">
                  815-723-4663
                </a>
              </CardContent>
            </Card>

            {/* Will County Sheriff */}
            <Card className="hover:border-gold transition-colors">
              <CardContent className="p-5">
                <h3 className="font-semibold text-navy mb-2">Will County Sheriff</h3>
                <p className="text-xs text-gray-500 mb-1">Non-Emergency</p>
                <a href="tel:815-727-8575" className="text-gold hover:text-gold-light font-medium">
                  815-727-8575
                </a>
              </CardContent>
            </Card>

            {/* Will County Board Admin */}
            <Card className="hover:border-gold transition-colors">
              <CardContent className="p-5">
                <h3 className="font-semibold text-navy mb-2">Will County Board</h3>
                <p className="text-xs text-gray-500 mb-1">Admin Office</p>
                <a href="tel:815-740-4602" className="text-gold hover:text-gold-light font-medium">
                  815-740-4602
                </a>
              </CardContent>
            </Card>

            {/* Will County DOT */}
            <Card className="hover:border-gold transition-colors">
              <CardContent className="p-5">
                <h3 className="font-semibold text-navy mb-2">Will County Transportation</h3>
                <p className="text-xs text-gray-500 mb-2">
                  For Exchange St, Crete-Monee Rd (west of IL RTE 1), Goodenow Rd (west of IL RTE 394)
                </p>
                <a href="tel:815-727-8476" className="text-gold hover:text-gold-light font-medium">
                  815-727-8476
                </a>
              </CardContent>
            </Card>
            </div>
            </div>

            {/* Right: Newsletter Signup */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-display font-bold text-navy mb-2">Stay Informed</h2>
                <div className="w-12 h-[3px] bg-gold" />
              </div>
              <NewsletterSignup variant="default" showCategories={true} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
