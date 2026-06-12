'use client'

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface NextBoardMeetingProps {
  agenda: {
    title: string
    date: string
    meetingTime?: string
    location?: string
  } | null
}

export const NextBoardMeeting: React.FC<NextBoardMeetingProps> = ({ agenda }) => {
  if (!agenda) return null

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const zoomLink = 'https://us06web.zoom.us/j/88684426493?pwd=4MajrSPKJ1nMKpzpDeF0jeBGxppatf.1'
  const meetingId = '886 8442 6493'

  return (
    <Card className="bg-navy-dark text-white border-none">
      <CardContent className="p-6">
        <h3 className="text-lg font-display font-bold text-gold uppercase tracking-wide mb-4">
          Next Board Meeting
        </h3>
        <div className="mb-4">
          <div className="text-2xl font-display font-bold mb-1">
            {agenda.title || 'Township Board Meeting'}
          </div>
          <div className="text-sm text-gray-300 mb-2">
            {formatDate(agenda.date)}
          </div>
          <div className="text-sm text-gray-300">
            {agenda.meetingTime || '7:00 PM – 8:30 PM'}
            <br />
            {agenda.location || 'Crete Town Hall'}
          </div>
        </div>
        <a href={zoomLink} target="_blank" rel="noopener noreferrer">
          <Button variant="navy" className="w-full bg-gold hover:bg-gold-light">
            📹 Join via Zoom
          </Button>
        </a>
        <p className="text-xs text-gray-400 mt-2">Meeting ID: {meetingId}</p>
      </CardContent>
    </Card>
  )
}
