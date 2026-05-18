import React from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, FileText } from 'lucide-react'
import Link from 'next/link'

export const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-navy-dark via-navy to-navy-light text-white overflow-hidden">
      {/* Background Pattern/Texture (optional) */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-repeat" />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Main Hero Content */}
          <div className="lg:col-span-2">
            {/* Badge */}
            <div className="mb-6">
              <Badge
                variant="dateBox"
                className="bg-gold-pale border border-gold text-gold px-4 py-2 text-xs font-semibold tracking-wider"
              >
                ⭐ SERVING WILL COUNTY SINCE 1848
              </Badge>
            </div>

            {/* Heading */}
            <h1 className="text-4xl lg:text-5xl font-display font-bold leading-tight mb-6">
              Welcome to <br />
              <span className="text-gold">Crete Township</span>
            </h1>

            {/* Description */}
            <p className="text-lg lg:text-xl text-gray-200 font-body leading-relaxed mb-8 max-w-2xl">
              Your local government resource for meeting documents, township services, community
              events, and resident assistance in Will County, Illinois.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-16">
              <Link href="/documents/board-agendas">
                <Button size="lg" className="gap-2">
                  <FileText className="w-5 h-5" />
                  View Board Documents
                </Button>
              </Link>
              <Link href="/events">
                <Button variant="outline" size="lg" className="gap-2 border-white text-white hover:bg-white hover:text-navy">
                  <Calendar className="w-5 h-5" />
                  Upcoming Events
                </Button>
              </Link>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-8 border-t border-white/20">
              <div>
                <div className="text-4xl lg:text-5xl font-display font-bold text-gold mb-1">
                  23,530
                </div>
                <div className="text-sm text-gray-300 font-body">Residents Served</div>
              </div>
              <div>
                <div className="text-4xl lg:text-5xl font-display font-bold text-gold mb-1">1848</div>
                <div className="text-sm text-gray-300 font-body">Year Established</div>
              </div>
              <div>
                <div className="text-4xl lg:text-5xl font-display font-bold text-gold mb-1">4</div>
                <div className="text-sm text-gray-300 font-body">Township Departments</div>
              </div>
              <div>
                <div className="text-4xl lg:text-5xl font-display font-bold text-gold mb-1">
                  175<sup className="text-2xl">+</sup>
                </div>
                <div className="text-sm text-gray-300 font-body">Years of Service</div>
              </div>
            </div>
          </div>

          {/* Right: Upcoming Events Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-navy-light/30 backdrop-blur-sm border border-white/20 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-display font-bold text-white">UPCOMING EVENTS</h3>
                <Link href="/events" className="text-sm text-gold hover:text-gold-light font-semibold">
                  View All →
                </Link>
              </div>

              <div className="space-y-4">
                {/* Event 1 */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center justify-center w-14 h-14 bg-gold text-white rounded flex-shrink-0">
                    <span className="text-[10px] font-medium uppercase">MAY</span>
                    <span className="text-2xl font-bold leading-none">11</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold text-sm mb-1">Senior Coffee Get Together</h4>
                    <p className="text-gray-300 text-xs">9:00 AM – 11:00 AM · Community Center</p>
                  </div>
                </div>

                {/* Event 2 */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center justify-center w-14 h-14 bg-gold text-white rounded flex-shrink-0">
                    <span className="text-[10px] font-medium uppercase">MAY</span>
                    <span className="text-2xl font-bold leading-none">13</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold text-sm mb-1">Crete Food Pantry Distribution</h4>
                    <p className="text-gray-300 text-xs">9:00 AM – 11:00 AM · Town Hall</p>
                  </div>
                </div>

                {/* Event 3 */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center justify-center w-14 h-14 bg-gold text-white rounded flex-shrink-0">
                    <span className="text-[10px] font-medium uppercase">MAY</span>
                    <span className="text-2xl font-bold leading-none">13</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold text-sm mb-1">Township Board Meeting</h4>
                    <p className="text-gray-300 text-xs">7:00 PM – 8:30 PM · Crete Town Hall</p>
                  </div>
                </div>

                {/* Event 4 */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center justify-center w-14 h-14 bg-gold text-white rounded flex-shrink-0">
                    <span className="text-[10px] font-medium uppercase">MAY</span>
                    <span className="text-2xl font-bold leading-none">23</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold text-sm mb-1">FREE Robotics Program Ages 9–12</h4>
                    <p className="text-gray-300 text-xs">10:00 AM – Noon · Community Center</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
