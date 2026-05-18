import React from 'react'
import { Card, CardContent } from './card'
import { DateBadge } from './badge'
import { cn } from '@/utilities/ui'

export interface EventCardProps {
  title: string
  startDate: Date
  location?: string
  time?: string
  className?: string
}

export const EventCard: React.FC<EventCardProps> = ({
  title,
  startDate,
  location,
  time,
  className,
}) => {
  const month = startDate.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()
  const day = startDate.getDate()

  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardContent className="p-4">
        <div className="flex gap-4 items-start">
          {/* Date Badge */}
          <DateBadge month={month} day={day} className="flex-shrink-0" />

          {/* Event Details */}
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-navy text-base leading-snug mb-1">{title}</h4>

            {time && (
              <p className="text-sm text-gray-600 font-body">
                {time}
                {location && <span className="mx-1">•</span>}
                {location}
              </p>
            )}

            {!time && location && <p className="text-sm text-gray-600 font-body">{location}</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
