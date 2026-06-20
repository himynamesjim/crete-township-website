import { NextResponse } from 'next/server'
import ICAL from 'ical.js'
import { getPayload } from 'payload'
import config from '@payload-config'

const TOWNSHIP_EVENTS_URL = process.env.GOOGLE_CALENDAR_ICS_URL || ''

// US federal holidays — actual calendar dates (not observed/shifted dates)
const US_HOLIDAYS: { date: string; name: string }[] = [
  // 2026
  { date: '2026-01-01', name: "New Year's Day" },
  { date: '2026-01-19', name: 'Martin Luther King Jr. Day' },
  { date: '2026-02-16', name: "Presidents' Day" },
  { date: '2026-05-25', name: 'Memorial Day' },
  { date: '2026-06-19', name: 'Juneteenth National Independence Day' },
  { date: '2026-07-04', name: 'Independence Day' },
  { date: '2026-09-07', name: 'Labor Day' },
  { date: '2026-10-12', name: 'Columbus Day' },
  { date: '2026-11-11', name: 'Veterans Day' },
  { date: '2026-11-26', name: 'Thanksgiving Day' },
  { date: '2026-12-25', name: 'Christmas Day' },
  // 2027
  { date: '2027-01-01', name: "New Year's Day" },
  { date: '2027-01-18', name: 'Martin Luther King Jr. Day' },
  { date: '2027-02-15', name: "Presidents' Day" },
  { date: '2027-05-31', name: 'Memorial Day' },
  { date: '2027-06-19', name: 'Juneteenth National Independence Day' },
  { date: '2027-07-04', name: 'Independence Day' },
  { date: '2027-09-06', name: 'Labor Day' },
  { date: '2027-10-11', name: 'Columbus Day' },
  { date: '2027-11-11', name: 'Veterans Day' },
  { date: '2027-11-25', name: 'Thanksgiving Day' },
  { date: '2027-12-25', name: 'Christmas Day' },
]

export async function GET(request: Request) {
  try {
    // Check if we should include past events (for calendar view)
    const { searchParams } = new URL(request.url)
    const includePast = searchParams.get('includePast') === 'true'

    const now = new Date()

    // Fetch township ICS calendar
    const townshipResult = await Promise.allSettled([
      fetch(TOWNSHIP_EVENTS_URL).then(async (r) => {
        const text = await r.text()
        console.log('[calendar] township HTTP', r.status, 'starts-with:', text.slice(0, 60))
        return text
      }),
    ])

    const townshipICS = townshipResult[0].status === 'fulfilled' ? townshipResult[0].value : null
    if (townshipResult[0].status === 'rejected') console.error('[calendar] township fetch error:', (townshipResult[0] as PromiseRejectedResult).reason)

    const allEvents: any[] = []

    // Fetch board agendas from Payload CMS
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())

    // For calendar view, include past 6 months. For upcoming events, only show future.
    const dateThreshold = includePast
      ? (() => {
          const sixMonthsAgo = new Date(now)
          sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)
          return sixMonthsAgo
        })()
      : startOfToday

    const payload = await getPayload({ config })
    const boardAgendas = await payload.find({
      collection: 'board-agendas',
      where: {
        and: [
          { status: { equals: 'published' } },
          { date: { greater_than_equal: dateThreshold.toISOString() } }
        ]
      },
      sort: includePast ? '-date' : 'date', // Descending for calendar view, ascending for upcoming
      limit: 500
    })

    // Add board agendas as calendar events
    boardAgendas.docs.forEach((agenda: any) => {
      const agendaDate = new Date(agenda.date)

      // If meeting time is specified, parse it and set the time
      let startDate = new Date(agendaDate)
      let endDate = new Date(agendaDate)

      if (agenda.meetingTime) {
        // Parse time like "7:00 PM" and set it on the date
        const timeParts = agenda.meetingTime.match(/(\d+):(\d+)\s*(AM|PM)/i)
        if (timeParts) {
          let hours = parseInt(timeParts[1])
          const minutes = parseInt(timeParts[2])
          const isPM = timeParts[3].toUpperCase() === 'PM'

          if (isPM && hours !== 12) hours += 12
          if (!isPM && hours === 12) hours = 0

          startDate.setHours(hours, minutes, 0, 0)
          endDate.setHours(hours + 2, minutes, 0, 0) // 2-hour duration
        }
      } else {
        // Default to 7:00 PM for board meetings without specified time
        startDate.setHours(19, 0, 0, 0)
        endDate.setHours(21, 0, 0, 0)
      }

      allEvents.push({
        title: `Board Meeting - ${agenda.documentType === 'regular' ? 'Regular' : agenda.documentType === 'special' ? 'Special' : 'Annual Town'} Meeting`,
        description: agenda.description || 'Crete Township Board Meeting',
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        location: agenda.location || 'Crete Town Hall, 1367 Wood St, Crete, IL 60417',
        category: 'Board Meeting',
        isHoliday: false,
        agendaId: agenda.id,
        agendaUrl: typeof agenda.file === 'object' ? agenda.file?.url : null,
      })
    })

    // Parse township events
    const townshipVEvents: any[] = []
    if (townshipICS && townshipICS.trim().startsWith('BEGIN:VCALENDAR')) {
      try {
        const townshipJCal = ICAL.parse(townshipICS)
        const townshipComp = new ICAL.Component(townshipJCal)
        townshipVEvents.push(...townshipComp.getAllSubcomponents('vevent'))
        console.log('[calendar] township parsed', townshipVEvents.length, 'events')
      } catch (e) {
        console.error('[calendar] township ICS parse error:', e)
      }
    } else {
      console.warn('[calendar] township ICS not valid — skipping. Got:', townshipICS?.slice(0, 120))
    }

    // Get events for the next 12 months
    const endDate = new Date(now)
    endDate.setMonth(endDate.getMonth() + 12)

    townshipVEvents.forEach((vevent) => {
      const event = new ICAL.Event(vevent)

      // Check if this is a recurring event
      if (event.isRecurring()) {
        // Expand recurring events
        const iterator = event.iterator()
        let next
        let occurrences = 0
        const maxOccurrences = 100 // Limit to prevent infinite loops

        while ((next = iterator.next()) && occurrences < maxOccurrences) {
          const occurrenceDate = next.toJSDate()

          // Stop if we've gone past our end date
          if (occurrenceDate > endDate) break

          // Only include future occurrences
          if (occurrenceDate >= new Date(now.getFullYear(), now.getMonth(), now.getDate())) {
            const duration = event.duration.toSeconds() * 1000 // Convert to milliseconds
            const occurrenceEndDate = new Date(occurrenceDate.getTime() + duration)

            allEvents.push({
              title: event.summary || 'Untitled Event',
              description: event.description || '',
              startDate: occurrenceDate.toISOString(),
              endDate: occurrenceEndDate.toISOString(),
              location: event.location || '',
              category: 'Township Event',
              isHoliday: false,
            })
            occurrences++
          }
        }
      } else {
        // Non-recurring event
        const startDate = event.startDate.toJSDate()

        // Only include future events or events happening today
        if (startDate >= new Date(now.getFullYear(), now.getMonth(), now.getDate())) {
          allEvents.push({
            title: event.summary || 'Untitled Event',
            description: event.description || '',
            startDate: startDate.toISOString(),
            endDate: event.endDate.toJSDate().toISOString(),
            location: event.location || '',
            category: 'Township Event',
            isHoliday: false,
          })
        }
      }
    })

    // Add hardcoded US federal holidays (actual dates, not observed/shifted)
    US_HOLIDAYS.forEach((h) => {
      // Parse at noon local time to avoid any UTC-midnight timezone shift
      const holidayDate = new Date(h.date + 'T12:00:00')
      if (holidayDate >= startOfToday) {
        const nextDay = new Date(holidayDate)
        nextDay.setDate(nextDay.getDate() + 1)
        allEvents.push({
          title: h.name,
          description: '',
          startDate: holidayDate.toISOString(),
          endDate: nextDay.toISOString(),
          location: '',
          category: 'Holiday',
          isHoliday: true,
        })
      }
    })

    // Sort events by start date (earliest first)
    allEvents.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())

    return NextResponse.json({
      events: allEvents,
      count: allEvents.length,
    })
  } catch (error) {
    console.error('Error fetching calendar events:', error)
    return NextResponse.json(
      { error: 'Failed to fetch calendar events', events: [], count: 0 },
      { status: 500 }
    )
  }
}
