import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/PageHero'
import { MapPin, Phone, Clock, Mail, ChevronRight, HeartHandshake, Users, Landmark, Target } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Friends of the Crete Township Community Center | Crete Township',
  description:
    'Friends of the Crete Township Community Center — a 501(c)(3) not-for-profit organization dedicated to supporting, enhancing, and expanding programs, events, and facilities that bring people together and strengthen our community.',
}

const whatWeDo = [
  {
    icon: HeartHandshake,
    title: 'Support Programs',
    description: 'Help fund innovative programs and community events.',
  },
  {
    icon: Users,
    title: 'Build Connections',
    description: 'Bring residents, businesses, and organizations together.',
  },
  {
    icon: Landmark,
    title: 'Invest in Our Community',
    description: 'Contribute to the growth and sustainability of the Community Center.',
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
        title="Friends of the Crete Township Community Center"
        description="Support. Enhance. Build Community."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Community Center', href: '/community-center' },
          { label: 'Friends of the Crete Township Community Center' },
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
                    <p className="font-display text-base font-bold text-white mt-1">Friends of the Crete Township Community Center</p>
                  </div>
                  <CardContent className="p-5 space-y-3">
                    <a
                      href="mailto:friends@cretetownship.com"
                      className="flex items-start gap-3 text-sm text-gray-700 hover:text-gold transition-colors"
                    >
                      <Mail className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                      <span>friends@cretetownship.com</span>
                    </a>
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
                    The Friends of the Crete Township Community Center is a 501(c)(3) not-for-profit
                    organization — a community-focused group dedicated to supporting, enhancing, and
                    expanding programs, events, and facilities that bring people together and
                    strengthen our community.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Whether you can give your time, make a contribution, or simply help spread the
                    word, there is a place for you among the Friends. Together, we can make a
                    lasting impact!
                  </p>
                </div>

                {/* What we do */}
                <div>
                  <h2 className="font-display text-2xl font-bold text-navy mb-2">What We Do</h2>
                  <div className="w-16 h-[3px] bg-gold mb-6" />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {whatWeDo.map((item) => (
                      <Card key={item.title}>
                        <CardContent className="p-5">
                          <div className="w-9 h-9 rounded-lg bg-gold-pale flex items-center justify-center flex-shrink-0 mb-3">
                            <item.icon className="w-5 h-5 text-gold" />
                          </div>
                          <h3 className="text-base font-semibold text-navy mb-2">{item.title}</h3>
                          <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Our goal */}
                <div className="bg-gold-pale border border-gold/40 rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="w-5 h-5 text-gold flex-shrink-0" />
                    <h2 className="font-display text-lg font-bold text-navy">Our Goal</h2>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    To work directly with the Crete Township and community members to bring
                    innovative programming and events to the Crete Township Community Center and to
                    support the future of our community.
                  </p>
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
                    More programs and ways to get involved are on the way — for additional
                    information, email{' '}
                    <a href="mailto:friends@cretetownship.com" className="text-navy font-semibold not-italic hover:text-gold transition-colors">
                      friends@cretetownship.com
                    </a>.
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
