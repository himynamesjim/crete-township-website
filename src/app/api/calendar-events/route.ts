import { NextResponse } from 'next/server'
import ICAL from 'ical.js'
import { getPayload } from 'payload'
import config from '@payload-config'

const TOWNSHIP_EVENTS_URL = 'https://calendar.google.com/calendar/ical/cretetownshipevents%40gmail.com/public/basic.ics'
const HOLIDAYS_URL = 'https://calendar.google.com/calendar/ical/en.usa%23holiday%40group.v.calendar.google.com/public/basic.ics'

export async function GET(request: Request) {
  try {
    // Check if we should include past events (for calendar view)
    const { searchParams } = new URL(request.url)
    const includePast = searchParams.get('includePast') === 'true'

    // Fetch both calendars and board agendas in parallel
    const [townshipResponse, holidaysResponse] = await Promise.all([
      fetch(TOWNSHIP_EVENTS_URL),
      fetch(HOLIDAYS_URL),
    ])

    const [townshipICS, holidaysICS] = await Promise.all([
      townshipResponse.text(),
      holidaysResponse.text(),
    ])

    const now = new Date()
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
    const townshipJCal = ICAL.parse(townshipICS)
    const townshipComp = new ICAL.Component(townshipJCal)
    const townshipVEvents = townshipComp.getAllSubcomponents('vevent')

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

    // Parse holidays
    const holidaysJCal = ICAL.parse(holidaysICS)
    const holidaysComp = new ICAL.Component(holidaysJCal)
    const holidaysVEvents = holidaysComp.getAllSubcomponents('vevent')

    holidaysVEvents.forEach((vevent) => {
      const event = new ICAL.Event(vevent)
      const startDate = event.startDate.toJSDate()

      // Only include future holidays or holidays happening today
      if (startDate >= new Date(now.getFullYear(), now.getMonth(), now.getDate())) {
        allEvents.push({
          title: event.summary || 'Holiday',
          description: event.description || '',
          startDate: startDate.toISOString(),
          endDate: event.endDate.toJSDate().toISOString(),
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
