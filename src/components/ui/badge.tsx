import { cn } from '@/utilities/ui'
import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

const badgeVariants = cva(
  'inline-flex items-center font-body font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
  {
    variants: {
      variant: {
        // Category pills for announcements, events
        default: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
        board: 'bg-gold-pale text-gold border border-gold/30',
        roadDistrict: 'bg-navy/10 text-navy border border-navy/30',
        assessor: 'bg-blue-50 text-blue-700 border border-blue-200',
        community: 'bg-green-50 text-green-700 border border-green-200',
        general: 'bg-gray-100 text-gray-700 border border-gray-300',

        // Date box for events calendar
        dateBox: 'flex-col bg-gold text-white items-center justify-center rounded-md shadow-sm',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs rounded',
        default: 'px-3 py-1 text-sm rounded-full',
        lg: 'px-4 py-1.5 text-base rounded-full',
        // Special size for date boxes
        date: 'w-14 h-14 p-2',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface BadgeProps
  extends React.ComponentProps<'div'>,
    VariantProps<typeof badgeVariants> {}

const Badge: React.FC<BadgeProps> = ({ className, variant, size, ...props }) => {
  return <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
}

// Special DateBadge component for event calendar boxes
interface DateBadgeProps extends React.ComponentProps<'div'> {
  month: string
  day: string | number
}

const DateBadge: React.FC<DateBadgeProps> = ({ month, day, className, ...props }) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center w-14 h-14 bg-gold text-white rounded-md shadow-sm',
        className,
      )}
      {...props}
    >
      <span className="text-[10px] font-medium uppercase tracking-wide">{month}</span>
      <span className="text-2xl font-bold leading-none">{day}</span>
    </div>
  )
}

export { Badge, DateBadge, badgeVariants }
