'use client'

import React, { useState } from 'react'

// Announcements longer than this many characters are collapsed behind a
// "View more" toggle so a single long post doesn't dominate the homepage
const COLLAPSE_LIMIT = 280

/** Cut at the limit, then back off to the previous word boundary. */
function truncateAtWord(text: string, limit: number): string {
  const slice = text.slice(0, limit)
  const lastSpace = slice.lastIndexOf(' ')
  return (lastSpace > limit * 0.6 ? slice.slice(0, lastSpace) : slice).trimEnd()
}

/** Render plain text with URLs as links (bodies are CMS textareas). */
function Linkified({ text }: { text: string }) {
  const parts = text.split(/(https?:\/\/[^\s]+)/g)
  return (
    <>
      {parts.map((part, i) => {
        if (!/^https?:\/\//.test(part)) return part
        // Keep trailing sentence punctuation out of the link target
        const url = part.replace(/[.,;:)]+$/, '')
        const trailing = part.slice(url.length)
        return (
          <React.Fragment key={i}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-navy font-semibold underline hover:text-gold transition-colors break-all"
            >
              {url}
            </a>
            {trailing}
          </React.Fragment>
        )
      })}
    </>
  )
}

export function AnnouncementBody({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false)
  const isLong = text.length > COLLAPSE_LIMIT
  const shown = !isLong || expanded ? text : `${truncateAtWord(text, COLLAPSE_LIMIT)}…`

  return (
    <div className="text-sm text-gray-600 mb-2 leading-relaxed">
      <p className="whitespace-pre-line">
        <Linkified text={shown} />
      </p>
      {isLong && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="mt-1.5 text-sm font-semibold text-gold hover:text-gold-light transition-colors"
        >
          {expanded ? 'View less ↑' : 'View more →'}
        </button>
      )}
    </div>
  )
}
