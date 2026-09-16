import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/PageHero'
import { MapPin, Phone, Clock, Mail, ChevronRight, HeartHandshake } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Brick Fundraiser | Crete Township',
  description:
    'Support the Crete Township Community Center with a personalized engraved brick. A fundraiser hosted by the Friends of the Crete Township Community Center.',
}

export default function BrickFundraiserPage() {
  return (
    <>
      <PageHero
        title="Brick Fundraiser"
        description="Leave a lasting mark at the Crete Township Community Center"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Community Center', href: '/community-center' },
          { label: 'Friends of the Crete Township Community Center', href: '/community-center/friends' },
          { label: 'Brick Fundraiser' },
        ]}
      />

      <div className="bg-cream">
        <section className="py-14 bg-white">
          <div className="max-w-[1400px] mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

              {/* Sidebar */}
              <div className="space-y-5 lg:sticky lg:top-24 lg:self-start">
                <Card className="overflow-hidden">
                  <div className="bg-navy-dark px-5 py-4 rounded-t-lg">
                    <p className="text-xs font-semibold text-gold uppercase tracking-wide">Questions?</p>
                    <p className="font-display text-base font-bold text-white mt-1">Contact the Friends</p>
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
                      href="mailto:friends@cretetownship.com"
                      className="flex items-start gap-3 text-sm text-gray-700 hover:text-gold transition-colors"
                    >
                      <Mail className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                      <span>friends@cretetownship.com</span>
                    </a>
                  </CardContent>
                </Card>

                <Link
                  href="/community-center/friends"
                  className="flex items-center gap-2 text-sm text-navy font-semibold hover:text-gold transition-colors"
                >
                  <ChevronRight className="w-4 h-4 text-gold rotate-180" />
                  Back to Friends of the Crete Township Community Center
                </Link>
              </div>

              {/* Main content */}
              <div className="lg:col-span-2 space-y-10">
                <div>
                  <h2 className="font-display text-2xl font-bold text-navy mb-2">Buy a Brick, Build a Legacy</h2>
                  <div className="w-16 h-[3px] bg-gold mb-6" />
                  <p className="text-gray-700 leading-relaxed mb-4">
                    The Friends of the Crete Township Community Center invite you to become a
                    permanent part of the Community Center with a personalized engraved brick.
                    Honor your family, remember a loved one, celebrate a milestone, or show your
                    organization&apos;s support — every brick tells a story, and every purchase
                    directly supports the Community Center and its programs.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Proceeds from the Brick Fundraiser help fund improvements, programs, and
                    equipment that keep the Community Center a welcoming gathering place for
                    residents of all ages.
                  </p>
                </div>

                <div className="bg-gold-pale border border-gold/40 rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <HeartHandshake className="w-5 h-5 text-gold flex-shrink-0" />
                    <p className="text-sm font-semibold text-navy">Full details coming soon</p>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Pricing, engraving options, and order forms are being finalized. In the
                    meantime, email the Friends at{' '}
                    <a href="mailto:friends@cretetownship.com" className="font-semibold text-navy hover:text-gold transition-colors">friends@cretetownship.com</a>{' '}
                    or call the Community Center at{' '}
                    <a href="tel:7087221857" className="font-semibold text-navy hover:text-gold transition-colors">708-722-1857</a>{' '}
                    to learn more or reserve your brick.
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
