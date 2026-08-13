'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { PDFModal } from '@/components/ui/PDFModal'
import { BOARD_MEETING_ZOOM_URL } from '@/lib/meetingInfo'

interface AgendaAlertBarProps {
  agenda: {
    title: string
    date: string
    fileUrl: string
    meetingTime?: string
    location?: string
  } | null
}

export const AgendaAlertBar: React.FC<AgendaAlertBarProps> = ({ agenda }) => {
  const [modalOpen, setModalOpen] = useState(false)

  if (!agenda) return null

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      timeZone: 'UTC', // day-only dates are stored anchored to UTC midnight
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const handleViewAgenda = (e: React.MouseEvent) => {
    e.preventDefault()
    setModalOpen(true)
  }

  return (
    <>
      {/* Navy text on gold: white-on-gold is 2.7:1 and fails WCAG AA */}
      <div className="bg-gold text-navy-dark border-b-[3px] border-gold-light">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
          <div className="py-2 min-h-12 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-y-1 gap-x-2 text-center text-sm font-semibold">
            <span>
              <strong>
                <span className="sm:hidden">Board Meeting:</span>
                <span className="hidden sm:inline">Upcoming Board Meeting Agenda:</span>
              </strong>{' '}
              {formatDate(agenda.date)}
              {agenda.meetingTime && ` at ${agenda.meetingTime}`}
              {/* Location adds too much length for small screens */}
              {agenda.location && <span className="hidden md:inline"> — {agenda.location}</span>}
            </span>
            <span className="flex items-center gap-2 whitespace-nowrap">
              <span className="hidden sm:inline" aria-hidden>
                |
              </span>
              <button
                onClick={handleViewAgenda}
                className="underline hover:text-navy cursor-pointer"
              >
                View Agenda →
              </button>
              <span aria-hidden>|</span>
              <a
                href={BOARD_MEETING_ZOOM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-navy"
              >
                Join via Zoom
              </a>
            </span>
          </div>
        </div>
      </div>

      <PDFModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        pdfUrl={agenda.fileUrl}
        title={agenda.title}
      />
    </>
  )
}
