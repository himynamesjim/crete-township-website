import React from 'react'
import { Card, CardContent } from './card'
import { cn } from '@/utilities/ui'
import { FileText, Download } from 'lucide-react'

export interface DocCardProps {
  title: string
  date: Date
  fileSize?: string
  fileType?: string
  downloadUrl?: string
  className?: string
}

export const DocCard: React.FC<DocCardProps> = ({
  title,
  date,
  fileSize,
  fileType = 'PDF',
  downloadUrl,
  className,
}) => {
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <Card className={cn('overflow-hidden hover:border-gold transition-colors', className)}>
      <CardContent className="p-4">
        <div className="flex gap-4 items-start">
          {/* PDF Icon */}
          <div className="flex-shrink-0 w-12 h-12 bg-red-50 rounded flex items-center justify-center">
            <FileText className="w-6 h-6 text-red-600" />
          </div>

          {/* Document Details */}
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-navy text-base leading-snug mb-1">{title}</h4>
            <p className="text-xs text-gray-500 mb-2">
              Posted {formattedDate} · {fileType.toUpperCase()} · {fileSize}
            </p>

            {downloadUrl && (
              <a
                href={downloadUrl}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold hover:text-gold-light transition-colors"
                download
              >
                <Download className="w-4 h-4" />
                Download {fileType.toUpperCase()}
              </a>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
