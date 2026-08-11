'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { PDFModal } from '@/components/ui/PDFModal'

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
      <div className="bg-gold text-white border-b-[3px] border-gold-light">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="h-12 flex items-center justify-center text-center">
            <span className="text-sm font-semibold">
              <strong>Upcoming Board Meeting Agenda:</strong> {formatDate(agenda.date)}
              {agenda.meetingTime && ` at ${agenda.meetingTime}`}
              {agenda.location && ` — ${agenda.location}`} |{' '}
              <button
                onClick={handleViewAgenda}
                className="underline hover:text-white/90 cursor-pointer"
              >
                View Agenda →
              </button>
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
