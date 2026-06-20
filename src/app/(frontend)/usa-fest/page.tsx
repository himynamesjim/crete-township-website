import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import { Calendar, Clock, MapPin, Award, BookOpen, Trophy, Phone } from 'lucide-react'

export const metadata: Metadata = {
  title: 'USA Fest 2026 | Crete Township',
  description:
    'Join Crete Township for USA Fest on July 18, 2026 — celebrating the 250th Anniversary of the founding of the United States. Free admission, live entertainment, historical re-enactments, and family fun at the Crete Township Community Center.',
}

const activities = [
  { label: 'CMHS Marching Band', stripe: 'red' },
  { label: 'NJROTC Color Guard', stripe: 'blue' },
  { label: 'Music Sing-Alongs', stripe: 'red' },
  { label: 'Authentic Pioneer Camp', stripe: 'blue' },
  { label: '"Ladies of Philadelphia" Colonial Re-Enactment', stripe: 'red' },
  { label: 'Bluegrass Band', stripe: 'blue' },
  { label: 'Barbershop Quartet', stripe: 'red' },
  { label: 'Pony Rides & Petting Zoo', stripe: 'blue' },
  { label: 'Games & Activities for Children', stripe: 'red' },
  { label: 'Colonial America Fashion Show', stripe: 'blue' },
  { label: 'Historical Displays', stripe: 'red' },
  { label: 'Antique Car Displays', stripe: 'blue' },
  { label: 'Food & Refreshments for Sale', stripe: 'red' },
]

const workshops = [
  { day: 'Monday, June 22nd', time: '2:00 – 3:30 PM' },
  { day: 'Tuesday, June 23rd', time: '11:00 AM – 12:30 PM' },
  { day: 'Wednesday, June 24th', time: '2:00 – 3:30 PM' },
  { day: 'Monday, July 6th', time: '2:00 – 3:30 PM' },
]

export default function USAFestPage() {
  return (
    <>
      {/* Patriotic Hero */}
      <div className="relative bg-[#0B1F4F] text-white overflow-hidden">
        {/* Subtle stripes overlay */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          {Array.from({ length: 13 }).map((_, i) => (
            <div
              key={i}
              className={`absolute left-0 right-0 ${i % 2 === 0 ? 'bg-red-600' : 'bg-white'}`}
              style={{ top: `${i * (100 / 13)}%`, height: `${100 / 13}%`, opacity: 0.06 }}
            />
          ))}
        </div>

        <div className="relative max-w-[1100px] mx-auto px-8 py-16 text-center">
          <div className="text-2xl tracking-[0.5em] text-yellow-400 mb-5 select-none">★ ★ ★ ★ ★</div>

          <div className="inline-block bg-red-600 text-white text-xs font-bold tracking-widest uppercase px-5 py-1.5 rounded-full mb-5">
            Celebrating 250 Years of America
          </div>

          <h1 className="font-display text-5xl sm:text-6xl font-bold text-white mb-3 drop-shadow-lg">
            USA Fest 2026
          </h1>
          <p className="text-xl text-blue-200 mb-8 font-medium">Crete Township Community Center</p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2.5 text-sm font-medium">
              <Calendar className="w-4 h-4 text-yellow-400" />
              <span>Saturday, July 18, 2026</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2.5 text-sm font-medium">
              <Clock className="w-4 h-4 text-yellow-400" />
              <span>11:00 AM – 4:00 PM</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2.5 text-sm font-medium">
              <MapPin className="w-4 h-4 text-yellow-400" />
              <span>25930 S. Cottage Grove, Crete, IL</span>
            </div>
          </div>

          <p className="text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Join us for a day of patriotic celebration — live music, historical re-enactments, family
            activities, and community pride.{' '}
            <strong className="text-white">Free admission. Fun for all ages!</strong>
          </p>

          <div className="text-2xl tracking-[0.5em] text-yellow-400 mt-8 select-none">★ ★ ★ ★ ★</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-cream py-12">
        <div className="max-w-[1100px] mx-auto px-8">

          {/* Logo + intro */}
          <div className="flex flex-col md:flex-row items-center gap-10 mb-14">
            <div className="flex-shrink-0">
              <Image
                src="/assets/usa-fest/usa-fest-logo.png"
                alt="Crete Township USA Fest 250th Anniversary Logo"
                width={260}
                height={260}
                className="drop-shadow-xl"
                priority
              />
            </div>
            <div>
              <h2 className="font-display text-3xl font-bold text-navy mb-1">
                America's 250th Birthday
              </h2>
              <div className="w-14 h-[3px] bg-red-600 mb-5" />
              <p className="text-gray-600 text-base leading-relaxed mb-4">
                The Crete Township USA Fest is a free community celebration marking the
                250th anniversary of the founding of the United States. Come celebrate
                with your neighbors at the Crete Township Community Center!
              </p>
              <p className="text-gray-600 text-base leading-relaxed">
                Featuring live entertainment, historical demonstrations, children's
                activities, antique cars, food vendors, and so much more — there's
                something for every member of the family.
              </p>
              <div className="mt-5 inline-flex items-center gap-2 bg-red-600 text-white font-semibold text-sm px-5 py-2.5 rounded-lg">
                <span>🇺🇸</span>
                <span>FREE ADMISSION — All Are Welcome</span>
              </div>
            </div>
          </div>

          {/* Activities Grid */}
          <div className="mb-14">
            <h2 className="font-display text-2xl font-bold text-navy mb-1">Event Highlights</h2>
            <div className="w-14 h-[3px] bg-[#0B1F4F] mb-6" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {activities.map((act) => (
                <div
                  key={act.label}
                  className="bg-white border border-gray-200 rounded-lg px-4 py-3.5 flex items-center gap-3 hover:shadow-md transition-shadow"
                >
                  <span
                    className={`text-lg leading-none flex-shrink-0 ${
                      act.stripe === 'red' ? 'text-red-600' : 'text-[#0B1F4F]'
                    }`}
                  >
                    ★
                  </span>
                  <span className="text-sm font-medium text-gray-700">{act.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Essay contest + Writing workshops */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14">

            {/* Essay Contest */}
            <div className="bg-[#0B1F4F] text-white rounded-xl p-7 relative overflow-hidden">
              <div className="absolute -top-4 -right-4 text-[120px] opacity-5 leading-none select-none">✍</div>
              <div className="relative">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="w-5 h-5 text-yellow-400" />
                  <span className="text-xs font-bold tracking-widest uppercase text-yellow-400">
                    Student Essay Contest
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold text-white mb-3">
                  Write Your Way to the Stage
                </h3>
                <p className="text-blue-200 text-sm leading-relaxed mb-2">
                  Sponsored by{' '}
                  <strong className="text-white">The Crete Pantry</strong> — open to all
                  elementary, middle school, and high school students.
                </p>
                <p className="text-blue-200 text-sm leading-relaxed mb-5">
                  Write an inspiring essay about a{' '}
                  <strong className="text-yellow-300">
                    pivotal moment or significant achievement in American History.
                  </strong>{' '}
                  Winners read their essays on stage at USA Fest!
                </p>

                <div className="space-y-2.5 mb-5">
                  <div className="flex items-start gap-3 bg-white/10 rounded-lg px-4 py-3">
                    <Trophy className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-white">$50.00 Cash Prize</p>
                      <p className="text-xs text-blue-300">One winner selected per age group</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-white/10 rounded-lg px-4 py-3">
                    <Calendar className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-white">
                        Deadline: Wednesday, July 8, 2026
                      </p>
                      <p className="text-xs text-blue-300">
                        Drop off at Township Hall, 1367 Wood Street, Crete
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-blue-400">
                  Include your name, grade, and school with your entry. No fees involved.
                </p>
              </div>
            </div>

            {/* Free Writing Workshops */}
            <div className="bg-white border border-gray-200 rounded-xl p-7">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-5 h-5 text-red-600" />
                <span className="text-xs font-bold tracking-widest uppercase text-red-600">
                  Free Writing Workshops
                </span>
              </div>
              <h3 className="font-display text-xl font-bold text-navy mb-2">
                Need Help Getting Started?
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-5">
                <strong>Deb Taylor</strong> from Writer&apos;s Playground will be at the
                Community Center to help any student craft their essay — a wonderful way to
                strengthen your writing skills!
              </p>

              <div className="space-y-2 mb-6">
                {workshops.map((ws) => (
                  <div
                    key={ws.day}
                    className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3 border border-gray-100"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-2 h-2 rounded-full bg-red-600 flex-shrink-0" />
                      <span className="text-sm font-medium text-gray-800">{ws.day}</span>
                    </div>
                    <span className="text-sm text-gray-500 font-mono tabular-nums">{ws.time}</span>
                  </div>
                ))}
              </div>

              <div className="bg-gold-pale border border-gold/30 rounded-lg px-4 py-3.5 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gold flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">
                    Register: leave your name, number & preferred date
                  </p>
                  <a
                    href="tel:708-722-1857"
                    className="text-base font-bold text-navy hover:text-navy-light transition-colors"
                  >
                    708-722-1857
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Essay contest flyer */}
          <div className="mb-14">
            <h2 className="font-display text-2xl font-bold text-navy mb-1">Essay Contest Details</h2>
            <div className="w-14 h-[3px] bg-red-600 mb-6" />
            <div className="rounded-xl overflow-hidden shadow-lg max-w-[600px] mx-auto">
              <Image
                src="/assets/usa-fest/essay-contest-flyer.png"
                alt="USA Fest 2026 Essay Contest — Sponsored by The Crete Pantry"
                width={600}
                height={900}
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Full activities flyer */}
          <div className="mb-14">
            <h2 className="font-display text-2xl font-bold text-navy mb-1">Full Event Lineup</h2>
            <div className="w-14 h-[3px] bg-[#0B1F4F] mb-6" />
            <div className="rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/assets/usa-fest/activities-flyer.png"
                alt="Crete Township USA Fest 2026 — Full Event Lineup and Activities"
                width={1100}
                height={1100}
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Location CTA */}
          <div className="bg-[#0B1F4F] text-white rounded-xl px-8 py-10 text-center">
            <div className="text-4xl mb-4">🇺🇸</div>
            <h2 className="font-display text-2xl font-bold mb-2">Join the Celebration!</h2>
            <p className="text-blue-200 mb-6 text-sm">Free admission — fun for the entire family</p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-blue-100">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                <span>Saturday, July 18, 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                <span>11:00 AM – 4:00 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                <span>25930 S. Cottage Grove, Crete, IL 60417</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
