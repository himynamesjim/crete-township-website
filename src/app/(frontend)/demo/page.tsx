import React from 'react'
import { TownshipHeader } from '@/components/layout/TownshipHeader'
import { HeroSection } from '@/components/layout/HeroSection'
import { TownshipFooter } from '@/components/layout/TownshipFooter'
import { EventCard } from '@/components/ui/EventCard'
import { DocCard } from '@/components/ui/DocCard'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Users, FileText, Landmark, Truck, Home } from 'lucide-react'
import Link from 'next/link'

export default function DemoPage() {
  // Sample event data
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

  // Sample document data
  const recentDocuments = [
    {
      title: 'May 2026 Board Meeting Agenda',
      date: new Date('2026-05-08'),
      fileSize: '142 KB',
      fileType: 'PDF',
      downloadUrl: '#',
    },
    {
      title: 'Special Board Meeting Agenda — April 2026',
      date: new Date('2026-04-22'),
      fileSize: '98 KB',
      fileType: 'PDF',
      downloadUrl: '#',
    },
    {
      title: 'April 2026 Board Meeting Agenda',
      date: new Date('2026-04-06'),
      fileSize: '115 KB',
      fileType: 'PDF',
      downloadUrl: '#',
    },
  ]

  // Sample announcements
  const announcements = [
    {
      category: 'BOARD',
      title: 'May 2026 Board Meeting — Zoom Link Available',
      description:
        'Join the Crete Township Board Meeting virtually via Zoom. The meeting will cover the FY2027 budget review, road district report, and community center expansion update.',
      date: 'May 8, 2026',
    },
    {
      category: 'ROAD DISTRICT',
      title: '2026 Branch Pickup Schedule Now Available',
      description:
        'Spring branch pickup begins the week of May 19th. Branches must be placed at the curb by 7 AM on your pickup day. Maximum pile size is 8 feet wide.',
      date: 'May 5, 2026',
    },
    {
      category: 'COMMUNITY',
      title: 'FREE Robotics Program for Ages 9–12 — May 23rd',
      description:
        'Join us for a hands-on robotics workshop at the Community Center. Learn basic programming and build your own robot! Space is limited, registration required.',
      date: 'May 1, 2026',
    },
  ]

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      {/* Header */}
      <TownshipHeader />

      {/* Hero Section */}
      <HeroSection />

      {/* Main Content */}
      <main className="flex-1">
        {/* Services Section */}
        <section className="py-16 bg-white">
          <div className="max-w-[1100px] mx-auto px-8">
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
        <section className="py-16 bg-cream">
          <div className="max-w-[1100px] mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left: Document Library */}
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-3xl font-display font-bold text-navy mb-2">
                      Document Library
                    </h2>
                    <div className="w-12 h-[3px] bg-gold" />
                  </div>
                  <Link href="/documents">
                    <Button variant="link" className="text-gold">
                      Browse all documents →
                    </Button>
                  </Link>
                </div>

                {/* Tab-style navigation */}
                <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
                  <button className="px-4 py-2 text-sm font-semibold text-navy border-b-2 border-gold whitespace-nowrap">
                    Board Agendas
                  </button>
                  <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-navy whitespace-nowrap">
                    Meeting Minutes
                  </button>
                  <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-navy whitespace-nowrap">
                    Financial Reports
                  </button>
                  <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-navy whitespace-nowrap">
                    Assessor Documents
                  </button>
                  <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-navy whitespace-nowrap">
                    Road District
                  </button>
                  <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-navy whitespace-nowrap">
                    Newsletters
                  </button>
                </div>

                {/* Document Cards */}
                <div className="space-y-4">
                  {recentDocuments.map((doc, index) => (
                    <DocCard key={index} {...doc} />
                  ))}
                </div>
              </div>

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
              </div>
            </div>
          </div>
        </section>

        {/* Announcements */}
        <section className="py-16 bg-white">
          <div className="max-w-[1100px] mx-auto px-8">
            <div className="mb-8">
              <h2 className="text-3xl font-display font-bold text-navy mb-2">Announcements</h2>
              <div className="w-12 h-[3px] bg-gold" />
            </div>

            <div className="space-y-6">
              {announcements.map((announcement, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Badge
                        variant={
                          announcement.category === 'BOARD'
                            ? 'board'
                            : announcement.category === 'ROAD DISTRICT'
                              ? 'roadDistrict'
                              : 'community'
                        }
                        size="sm"
                        className="flex-shrink-0"
                      >
                        {announcement.category}
                      </Badge>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-navy mb-2">
                          {announcement.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">{announcement.description}</p>
                        <p className="text-xs text-gray-400">{announcement.date}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <TownshipFooter />
    </div>
  )
}
