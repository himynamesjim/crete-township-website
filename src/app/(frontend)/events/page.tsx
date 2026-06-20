'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { Calendar, dateFnsLocalizer, Components, View } from 'react-big-calendar'
import { format } from 'date-fns/format'
import { parse } from 'date-fns/parse'
import { startOfWeek } from 'date-fns/startOfWeek'
import { getDay } from 'date-fns/getDay'
import { enUS } from 'date-fns/locale/en-US'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { PageHero } from '@/components/PageHero'
import { EventCard } from '@/components/ui/EventCard'

const locales = {
  'en-US': enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

interface CalendarEvent {
  title: string
  description: string
  startDate: string
  endDate: string
  location: string
  category: string
  isHoliday: boolean
  agendaId?: number
  agendaUrl?: string
}

// Custom Toolbar component
const CustomToolbar = (toolbar: any) => {
  const goToBack = () => {
    toolbar.onNavigate('PREV')
  }

  const goToNext = () => {
    toolbar.onNavigate('NEXT')
  }

  const goToToday = () => {
    toolbar.onNavigate('TODAY')
  }

  const label = () => {
    const date = toolbar.date
    return toolbar.localizer.format(date, 'MMMM yyyy')
  }

  return (
    <div className="mb-6 pb-4 border-b border-gray-200">
      <div className="flex items-center justify-between">
        {/* Left: Navigation buttons */}
        <div className="flex gap-2">
          <button
            onClick={goToBack}
            className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </button>
          <button
            onClick={goToToday}
            className="px-4 py-2 bg-gold text-white rounded-lg hover:bg-gold-light transition-colors font-medium"
          >
            Today
          </button>
          <button
            onClick={goToNext}
            className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Next
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Center: Month/Year label */}
        <h3 className="text-2xl font-display font-bold text-navy absolute left-1/2 transform -translate-x-1/2">
          {label()}
        </h3>

        {/* Right: View buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => toolbar.onView('month')}
            className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
              toolbar.view === 'month'
                ? 'bg-navy text-white'
                : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Month
          </button>
          <button
            onClick={() => toolbar.onView('week')}
            className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
              toolbar.view === 'week'
                ? 'bg-navy text-white'
                : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Week
          </button>
          <button
            onClick={() => toolbar.onView('day')}
            className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
              toolbar.view === 'day'
                ? 'bg-navy text-white'
                : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Day
          </button>
          <button
            onClick={() => toolbar.onView('agenda')}
            className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
              toolbar.view === 'agenda'
                ? 'bg-navy text-white'
                : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Agenda
          </button>
        </div>
      </div>
    </div>
  )
}

// Custom Event component with hover popup
const CustomEvent = ({
  event,
  onSelectEvent,
}: {
  event: any
  onSelectEvent?: (event: any) => void
}) => {
  const [showPopup, setShowPopup] = useState(false)
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 })
  const eventRef = React.useRef<HTMLDivElement>(null)
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null)
  const evt = event.resource as CalendarEvent
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    if (eventRef.current) {
      const rect = eventRef.current.getBoundingClientRect()
      setPopupPosition({
        top: rect.bottom,
        left: rect.left,
      })
    }
    setShowPopup(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowPopup(false)
    }, 100)
  }

  const handlePopupEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setShowPopup(true)
  }

  const handlePopupLeave = () => {
    setShowPopup(false)
  }

  const popupContent = showPopup ? (
    <div
      className="fixed bg-white border-2 border-gold shadow-2xl rounded-lg p-4 w-72"
      style={{
        top: `${popupPosition.top + 4}px`,
        left: `${popupPosition.left}px`,
        zIndex: 999999,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.3)',
      }}
      onMouseEnter={handlePopupEnter}
      onMouseLeave={handlePopupLeave}
    >
      <div className="space-y-2">
        <div className="flex items-start gap-2">
          <div className="bg-gold-pale text-gold rounded px-2 py-1 text-xs font-semibold min-w-[60px] text-center">
            {new Date(evt.startDate).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            })}
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-sm text-navy line-clamp-2">{evt.title}</h4>
            <p className="text-xs text-gray-600 mt-1">
              {new Date(evt.startDate).toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
              })}
            </p>
          </div>
        </div>

        {evt.location && (
          <p className="text-xs text-gray-600 line-clamp-1">
            <span className="text-gold">{'📍'}</span> {evt.location}
          </p>
        )}

        <div className="flex gap-2">
          {evt.agendaUrl && (
            <a
              href={evt.agendaUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.stopPropagation()
                setShowPopup(false)
              }}
              className="flex-1 bg-navy text-white text-xs py-2 rounded hover:bg-navy-light transition-colors font-semibold text-center"
            >
              View Agenda PDF
            </a>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation()
              setShowPopup(false)
              if (onSelectEvent) {
                onSelectEvent(event)
              }
            }}
            className={`${evt.agendaUrl ? 'flex-1' : 'w-full'} bg-gold text-white text-xs py-2 rounded hover:bg-gold-light transition-colors font-semibold`}
          >
            View More →
          </button>
        </div>
      </div>
    </div>
  ) : null

  return (
    <>
      <div
        ref={eventRef}
        className="h-full cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="truncate text-xs px-1">{event.title}</div>
      </div>

      {mounted &&
        typeof window !== 'undefined' &&
        popupContent &&
        createPortal(popupContent, document.body)}
    </>
  )
}

export default function EventsPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState<'calendar' | 'list'>('calendar')
  const [calendarView, setCalendarView] = useState<View>('month')
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)

  // Filter states
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const handleSelectEvent = useCallback((event: any) => {
    setSelectedEvent(event.resource as CalendarEvent)
  }, [])

  useEffect(() => {
    async function fetchEvents() {
      try {
        // Include past events for calendar view (past 6 months + future)
        const response = await fetch('/api/calendar-events?includePast=true')
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

  // Get unique categories
  const categories = Array.from(new Set(events.map((e) => e.category)))

  // Filter events based on search and category
  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      searchQuery === '' ||
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location?.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory =
      selectedCategories.length === 0 || selectedCategories.includes(event.category)

    return matchesSearch && matchesCategory
  })

  // Transform filtered events for react-big-calendar
  const calendarEvents = filteredEvents.map((event, index) => ({
    id: index,
    title: event.title,
    start: new Date(event.startDate),
    end: new Date(event.endDate),
    resource: event,
  }))

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
  }

  return (
    <>
      <PageHero
        title="Events Calendar"
        description="View upcoming township events, meetings, and holidays"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Events', href: '/events' },
        ]}
      />

      <section className="py-16 bg-cream">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="flex gap-8">
            {/* Filter Sidebar */}
            <aside className="w-64 flex-shrink-0">
              <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-24">
                <h3 className="text-lg font-display font-bold text-navy mb-4 pb-3 border-b-[3px] border-gold">
                  Filters
                </h3>

                {/* Search */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Search Events
                  </label>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by title, description..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                  />
                </div>

                {/* Category Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Event Type
                  </label>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label key={category} className="flex items-center cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category)}
                          onChange={() => toggleCategory(category)}
                          className="w-4 h-4 text-gold border-gray-300 rounded focus:ring-gold focus:ring-2"
                        />
                        <span className="ml-2 text-sm text-gray-700 group-hover:text-navy">
                          {category}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                {(searchQuery || selectedCategories.length > 0) && (
                  <button
                    onClick={() => {
                      setSearchQuery('')
                      setSelectedCategories([])
                    }}
                    className="w-full text-sm text-gold hover:text-gold-light font-semibold"
                  >
                    Clear All Filters
                  </button>
                )}

                {/* Event Count */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    Showing <span className="font-bold text-navy">{filteredEvents.length}</span> of{' '}
                    <span className="font-bold text-navy">{events.length}</span> events
                  </p>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* View Toggle */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-display font-bold text-navy">
                  {view === 'calendar' ? 'Calendar View' : 'List View'}
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => setView('calendar')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      view === 'calendar'
                        ? 'bg-gold text-white shadow-md'
                        : 'bg-white text-gray-600 border border-gray-200 hover:border-gold hover:text-gold'
                    }`}
                  >
                    Calendar
                  </button>
                  <button
                    onClick={() => setView('list')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      view === 'list'
                        ? 'bg-gold text-white shadow-md'
                        : 'bg-white text-gray-600 border border-gray-200 hover:border-gold hover:text-gold'
                    }`}
                  >
                    List
                  </button>
                </div>
              </div>

              {loading ? (
                <div className="text-center py-16">
                  <p className="text-gray-600">Loading events...</p>
                </div>
              ) : events.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                  <p className="text-navy font-display text-xl font-bold mb-2">No events to display yet</p>
                  <p className="text-gray-500 text-sm">Events from the township calendar will appear here once the calendar is connected. Board meeting agendas can also be published through the CMS admin panel.</p>
                </div>
              ) : view === 'calendar' ? (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <Calendar
                    localizer={localizer}
                    events={calendarEvents}
                    startAccessor="start"
                    endAccessor="end"
                    date={currentDate}
                    view={calendarView}
                    onView={(newView) => setCalendarView(newView)}
                    onNavigate={(date) => setCurrentDate(date)}
                    style={{ height: 700 }}
                    views={['month', 'week', 'day', 'agenda']}
                    onSelectEvent={handleSelectEvent}
                    components={{
                      toolbar: CustomToolbar,
                      event: (props: any) => (
                        <CustomEvent {...props} onSelectEvent={handleSelectEvent} />
                      ),
                    }}
                    eventPropGetter={(event) => {
                      const evt = event.resource as CalendarEvent
                      const isHoliday = evt?.isHoliday
                      const isBoardMeeting = evt?.category === 'Board Meeting'

                      return {
                        style: {
                          backgroundColor: isHoliday
                            ? '#9BA5B5'
                            : isBoardMeeting
                              ? '#1B3A5C'
                              : '#C8960C',
                          borderColor: isHoliday
                            ? '#5A6478'
                            : isBoardMeeting
                              ? '#0F2540'
                              : '#C8960C',
                          color: 'white',
                          cursor: 'pointer',
                        },
                      }
                    }}
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredEvents.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-lg">
                      <p className="text-gray-600">
                        {events.length === 0
                          ? 'No upcoming events scheduled.'
                          : 'No events match your filters.'}
                      </p>
                    </div>
                  ) : (
                    filteredEvents.map((event, index) => {
                      const startDate = new Date(event.startDate)
                      const endDate = new Date(event.endDate)

                      const isAllDay =
                        event.isHoliday ||
                        (startDate.getHours() === 0 &&
                          startDate.getMinutes() === 0 &&
                          endDate.getHours() === 0 &&
                          endDate.getMinutes() === 0)

                      const time = isAllDay
                        ? 'All Day'
                        : `${formatTime(startDate)} – ${formatTime(endDate)}`

                      const isBoardMeeting = event.category === 'Board Meeting'
                      const isHoliday = event.isHoliday

                      return (
                        <div
                          key={index}
                          onClick={() => setSelectedEvent(event)}
                          className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md hover:border-gold transition-all cursor-pointer"
                        >
                          <div className="flex items-start gap-4">
                            {/* Date Badge */}
                            <div className="bg-gold-pale text-gold rounded-lg p-3 text-center min-w-[80px] flex-shrink-0">
                              <div className="text-xs font-semibold uppercase">
                                {startDate.toLocaleDateString('en-US', { month: 'short' })}
                              </div>
                              <div className="text-3xl font-bold leading-none mt-1">
                                {startDate.getDate()}
                              </div>
                              <div className="text-xs text-gray-600 mt-1">
                                {startDate.toLocaleDateString('en-US', { year: 'numeric' })}
                              </div>
                            </div>

                            {/* Event Details */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span
                                      className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
                                        isHoliday
                                          ? 'bg-gray-100 text-gray-600'
                                          : isBoardMeeting
                                            ? 'bg-navy text-white'
                                            : 'bg-gold text-white'
                                      }`}
                                    >
                                      {event.category}
                                    </span>
                                  </div>
                                  <h3 className="text-lg font-display font-bold text-navy mb-1">
                                    {event.title}
                                  </h3>
                                  <p className="text-sm text-gray-600">
                                    {startDate.toLocaleDateString('en-US', {
                                      weekday: 'long',
                                      month: 'long',
                                      day: 'numeric',
                                      year: 'numeric',
                                    })}
                                  </p>
                                  <p className="text-sm text-gray-600 mt-1">
                                    {'🕐'} {time}
                                  </p>
                                  {event.location && (
                                    <p className="text-sm text-gray-600 mt-1 truncate">
                                      {'📍'} {event.location}
                                    </p>
                                  )}
                                </div>
                                <button className="flex-shrink-0 text-gold hover:text-gold-light">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M9 5l7 7-7 7"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-navy text-white px-6 py-6 border-b-[3px] border-gold">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="inline-block px-3 py-1 bg-gold text-white text-xs font-semibold rounded mb-3">
                    {selectedEvent.isHoliday ? 'Holiday' : selectedEvent.category}
                  </div>
                  <h2 className="text-2xl font-display font-bold leading-tight">
                    {selectedEvent.title}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="text-white hover:text-gold-light transition-colors flex-shrink-0"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {/* Date & Time */}
              <div className="flex items-start gap-3">
                <div className="bg-gold-pale text-gold rounded-lg p-3 text-center min-w-[70px]">
                  <div className="text-xs font-semibold uppercase">
                    {new Date(selectedEvent.startDate).toLocaleDateString('en-US', {
                      month: 'short',
                    })}
                  </div>
                  <div className="text-2xl font-bold">
                    {new Date(selectedEvent.startDate).getDate()}
                  </div>
                </div>
                <div>
                  <p className="text-lg font-semibold text-navy">
                    {new Date(selectedEvent.startDate).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  <p className="text-gray-600 mt-1">
                    {new Date(selectedEvent.startDate).toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true,
                    })}{' '}
                    -{' '}
                    {new Date(selectedEvent.endDate).toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true,
                    })}
                  </p>
                </div>
              </div>

              {/* Location */}
              {selectedEvent.location && (
                <div className="flex items-start gap-3 pt-4 border-t">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gold mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-400 uppercase tracking-wide font-medium">
                      Location
                    </p>
                    <p className="text-gray-800 mt-1">{selectedEvent.location}</p>
                  </div>
                </div>
              )}

              {/* Description */}
              {selectedEvent.description && (
                <div className="pt-4 border-t">
                  <p className="text-sm text-gray-400 uppercase tracking-wide font-medium mb-2">
                    Details
                  </p>
                  <div
                    className="text-gray-800 prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: selectedEvent.description
                        .replace(/&lt;/g, '<')
                        .replace(/&gt;/g, '>')
                        .replace(/\n/g, '<br />'),
                    }}
                  />
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-4 border-t flex gap-3">
                {selectedEvent.agendaUrl && (
                  <a
                    href={selectedEvent.agendaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gold text-white px-6 py-3 rounded-lg font-semibold hover:bg-gold-light transition-colors text-center"
                  >
                    View Agenda PDF
                  </a>
                )}
                <button
                  onClick={() => setSelectedEvent(null)}
                  className={`${selectedEvent.agendaUrl ? 'flex-1' : 'w-full'} bg-navy text-white px-6 py-3 rounded-lg font-semibold hover:bg-navy-light transition-colors`}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
