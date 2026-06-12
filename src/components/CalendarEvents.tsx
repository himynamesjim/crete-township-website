'use client'

import { useEffect, useState } from 'react'
import { EventCard } from '@/components/ui/EventCard'
import Link from 'next/link'

interface CalendarEvent {
  title: string
  description: string
  startDate: string
  endDate: string
  location: string
  category: string
  isHoliday: boolean
}

interface CalendarEventsProps {
  limit?: number
  showViewAll?: boolean
  variant?: 'default' | 'hero'
}

export function CalendarEvents({ limit = 10, showViewAll = true, variant = 'default' }: CalendarEventsProps) {
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch('/api/calendar-events')
        const data = await response.json()
        setEvents(data.events || [])
      } catch (error) {
        console.error('Error fetching events:', error)
        setEvents([])
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  const displayEvents = events.slice(0, limit)

  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse bg-gray-100 rounded-lg h-20" />
        ))}
      </div>
    )
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No upcoming events scheduled.</p>
      </div>
    )
  }

  const isHeroVariant = variant === 'hero'

  return (
    <div>
      {showViewAll && (
        <div className="flex items-center justify-between mb-6">
          <h3 className={`text-xl font-display font-bold uppercase tracking-wide ${isHeroVariant ? 'text-white' : 'text-gold'}`}>
            UPCOMING EVENTS
          </h3>
          <Link href="/events" className={`text-sm font-semibold ${isHeroVariant ? 'text-gold hover:text-gold-light' : 'text-gold hover:text-gold-light'}`}>
            View All →
          </Link>
        </div>
      )}
      <div className="space-y-4">
        {displayEvents.map((event, index) => {
          const startDate = new Date(event.startDate)
          const endDate = new Date(event.endDate)

          // Format time
          const formatTime = (date: Date) => {
            return date.toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: '2-digit',
              hour12: true,
            })
          }

          // Check if event is all-day (holidays typically are)
          const isAllDay = event.isHoliday ||
            (startDate.getHours() === 0 && startDate.getMinutes() === 0 &&
             endDate.getHours() === 0 && endDate.getMinutes() === 0)

          const time = isAllDay
            ? 'All Day'
            : `${formatTime(startDate)} – ${formatTime(endDate)}`

          // Hero variant uses custom styling
          if (isHeroVariant) {
            const month = startDate.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()
            const day = startDate.getDate()

            return (
              <div key={index} className="flex gap-4">
                <div className="flex flex-col items-center justify-center w-14 h-14 bg-gold text-white rounded flex-shrink-0">
                  <span className="text-[10px] font-medium uppercase">{month}</span>
                  <span className="text-2xl font-bold leading-none">{day}</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-semibold text-sm mb-1">{event.title}</h4>
                  <p className="text-gray-300 text-xs">{time}{event.location && ` · ${event.location}`}</p>
                </div>
              </div>
            )
          }

          // Default variant uses EventCard
          return (
            <EventCard
              key={index}
              title={event.title}
              startDate={startDate}
              time={time}
              location={event.location || 'Township'}
            />
          )
        })}
      </div>
    </div>
  )
}
