import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { AgendaAlertBar } from './AgendaAlertBar'

export async function AgendaAlertBarWrapper() {
  try {
    const payload = await getPayload({ config })

    // Get current date at midnight for comparison
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Fetch the most recent upcoming agenda
    const result = await payload.find({
      collection: 'board-agendas',
      where: {
        and: [
          {
            status: {
              equals: 'published',
            },
          },
          {
            date: {
              greater_than_equal: today.toISOString(),
            },
          },
        ],
      },
      sort: 'date',
      limit: 1,
    })

    if (!result.docs || result.docs.length === 0) {
      return null
    }

    const agenda = result.docs[0]

    // Get the file URL
    let fileUrl = ''
    if (agenda.file && typeof agenda.file === 'object' && 'url' in agenda.file) {
      fileUrl = agenda.file.url || ''
    }

    return (
      <AgendaAlertBar
        agenda={{
          title: agenda.title || 'Board Meeting Agenda',
          date: agenda.date || '',
          fileUrl,
          meetingTime: agenda.meetingTime || undefined,
          location: agenda.location || undefined,
        }}
      />
    )
  } catch (error) {
    console.error('Error fetching upcoming agenda:', error)
    return null
  }
}
