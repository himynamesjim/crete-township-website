'use client'

import React, { useState } from 'react'
import { X, AlertTriangle, Info, CheckCircle, AlertCircle } from 'lucide-react'

interface CMSAlertBannerProps {
  message: string
  type: 'info' | 'warning' | 'emergency' | 'success'
  linkUrl: string | null
  linkText: string | null
}

const styles = {
  info:      { bar: 'bg-navy-dark border-navy',     text: 'text-white',       icon: Info,          iconColor: 'text-blue-300' },
  warning:   { bar: 'bg-gold border-gold-light',    text: 'text-navy-dark',   icon: AlertTriangle, iconColor: 'text-navy-dark' },
  emergency: { bar: 'bg-red-700 border-red-900',    text: 'text-white',       icon: AlertCircle,   iconColor: 'text-red-200' },
  success:   { bar: 'bg-green-700 border-green-900',text: 'text-white',       icon: CheckCircle,   iconColor: 'text-green-200' },
}

export function CMSAlertBanner({ message, type, linkUrl, linkText }: CMSAlertBannerProps) {
  const [dismissed, setDismissed] = useState(false)
  if (dismissed) return null

  const { bar, text, icon: Icon, iconColor } = styles[type] ?? styles.info

  return (
    <div className={`${bar} border-b-2`}>
      <div className="max-w-[1400px] mx-auto px-8">
        <div className="min-h-12 py-2 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 justify-center">
            <Icon className={`w-4 h-4 flex-shrink-0 ${iconColor}`} />
            <span className={`text-sm font-semibold ${text} text-center`}>
              {message}
              {linkUrl && linkText && (
                <>
                  {' — '}
                  <a
                    href={linkUrl}
                    className="underline hover:opacity-80 transition-opacity"
                  >
                    {linkText} →
                  </a>
                </>
              )}
            </span>
          </div>
          <button
            onClick={() => setDismissed(true)}
            aria-label="Dismiss alert"
            className={`flex-shrink-0 ${text} hover:opacity-70 transition-opacity`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
