import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/PageHero'
import { MapPin, Phone, Clock, Mail, ChevronRight, HeartHandshake, Users, Sparkles, Landmark } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Friends of the Community Center | Crete Township',
  description:
    'Friends of the Crete Township Community Center — a community group dedicated to supporting and enhancing the Community Center through fundraising, volunteering, and special events.',
}

const whatWeDo = [
  {
    icon: HeartHandshake,
    title: 'Fundraising',
    description:
      'Organizing fundraisers — like the Brick Fundraiser — that directly support improvements, programs, and equipment at the Community Center.',
  },
  {
    icon: Users,
    title: 'Volunteering',
    description:
      'Lending a hand at Community Center programs and Township-hosted events, from senior luncheons to community expos and celebrations.',
  },
  {
    icon: Sparkles,
    title: 'Enhancing the Center',
    description:
      'Championing projects that make the Community Center a more welcoming place for residents of all ages, now and for generations to come.',
  },
  {
    icon: Landmark,
    title: 'Community Advocacy',
    description:
      'Raising awareness of everything the Community Center offers and helping connect residents with its programs, events, and services.',
  },
]

const supportLinks = [
  {
    title: 'Brick Fundraiser',
    href: '/community-center/friends/brick-fundraiser',
    description:
      'Leave a lasting mark at the Community Center with a personalized engraved brick. Learn how to purchase yours.',
  },
]

export default function FriendsOfTheCommunityCenterPage() {
  return (
    <>
      <PageHero
        title="Friends of the Community Center"
        description="A community group dedicated to supporting and enhancing the Crete Township Community Center"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Community Center', href: '/community-center' },
          { label: 'Friends of the Community Center' },
        ]}
      />

      <div className="bg-cream">
        <section className="py-14 bg-white">
          <div className="max-w-[1400px] mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

              {/* Sidebar */}
              <div className="space-y-5 lg:sticky lg:top-24 lg:self-start">

                {/* Contact card */}
                <Card className="overflow-hidden">
                  <div className="bg-navy-dark px-5 py-4 rounded-t-lg">
                    <p className="text-xs font-semibold text-gold uppercase tracking-wide">Get In Touch</p>
                    <p className="font-display text-base font-bold text-white mt-1">Friends of the Community Center</p>
                  </div>
                  <CardContent className="p-5 space-y-3">
                    <a
                      href="tel:7087221857"
                      className="flex items-center gap-3 text-sm text-gray-700 hover:text-gold transition-colors"
                    >
                      <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                      708-722-1857
                    </a>
                    <div className="flex items-start gap-3 text-sm text-gray-700">
                      <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                      <span>25930 S Cottage Grove Ave<br />Crete, Illinois 60417</span>
                    </div>
                    <div className="flex items-start gap-3 text-sm text-gray-700">
                      <Clock className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                      <span>Mon – Fri: 8:00 AM – 4:00 PM</span>
                    </div>
                    <a
                      href="mailto:communitycenter@cretetownship.com"
                      className="flex items-start gap-3 text-sm text-gray-700 hover:text-gold transition-colors"
                    >
                      <Mail className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                      <span>communitycenter@cretetownship.com</span>
                    </a>
                  </CardContent>
                </Card>

                {/* Quick links */}
                <Card>
                  <CardContent className="p-5">
                    <p className="text-xs font-semibold text-navy uppercase tracking-wide mb-3">Community Center Links</p>
                    <div className="space-y-2">
                      {[
                        { label: 'Community Center Home', href: '/community-center' },
                        { label: 'Building Usage Application', href: '/community-center/application' },
                        { label: 'Resident Survey', href: '/community-center/survey' },
                        { label: 'Events Calendar', href: '/events' },
                      ].map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="flex items-center gap-2 text-sm text-gray-700 hover:text-gold transition-colors"
                        >
                          <ChevronRight className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>

              </div>

              {/* Main content */}
              <div className="lg:col-span-2 space-y-10">

                <div>
                  <h2 className="font-display text-2xl font-bold text-navy mb-2">Who We Are</h2>
                  <div className="w-16 h-[3px] bg-gold mb-6" />
                  <p className="text-gray-700 leading-relaxed mb-4">
                    The Friends of the Crete Township Community Center is a group of neighbors,
                    volunteers, and supporters who share one goal: helping the Community Center
                    thrive as the heart of our Township. From senior programs and youth music
                    lessons to fitness classes, expos, and community celebrations, the Center
                    touches the lives of residents every day — and the Friends work to make sure
                    it can keep doing so for years to come.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Through fundraising, volunteering, and community outreach, the Friends support
                    improvements and programs that go above and beyond what Township funds alone
                    can provide. Whether you can give your time, make a contribution, or simply
                    help spread the word, there is a place for you among the Friends.
                  </p>
                </div>

                {/* What we do */}
                <div>
                  <h2 className="font-display text-2xl font-bold text-navy mb-2">What We Do</h2>
                  <div className="w-16 h-[3px] bg-gold mb-6" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {whatWeDo.map((item) => (
                      <Card key={item.title}>
                        <CardContent className="p-5">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-9 h-9 rounded-lg bg-gold-pale flex items-center justify-center flex-shrink-0">
                              <item.icon className="w-5 h-5 text-gold" />
                            </div>
                            <h3 className="text-base font-semibold text-navy">{item.title}</h3>
                          </div>
                          <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Ways to support */}
                <div>
                  <h2 className="font-display text-2xl font-bold text-navy mb-2">Ways to Support</h2>
                  <div className="w-16 h-[3px] bg-gold mb-6" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {supportLinks.map((link) => (
                      <Link key={link.href} href={link.href} className="group">
                        <Card className="h-full transition-shadow group-hover:shadow-md">
                          <CardContent className="p-5">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="text-base font-semibold text-navy group-hover:text-gold transition-colors">
                                {link.title}
                              </h3>
                              <ChevronRight className="w-4 h-4 text-gold flex-shrink-0" />
                            </div>
                            <p className="text-sm text-gray-600 leading-relaxed">{link.description}</p>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-4 italic">
                    More programs and ways to get involved are on the way — check back soon.
                  </p>
                </div>

              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
