'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { Search, X, FileText, Calendar, User, Megaphone, BookOpen, Loader2 } from 'lucide-react'
import type { SearchGroup, SearchResult } from '@/app/api/search/route'

interface Props {
  open: boolean
  onClose: () => void
}

const QUICK_LINKS = [
  { label: 'Meeting Agendas', href: '/documents/agendas', icon: 'file' as const },
  { label: 'Meeting Minutes', href: '/documents/meeting-minutes', icon: 'file' as const },
  { label: 'Events Calendar', href: '/events', icon: 'calendar' as const },
  { label: 'Offices & Officials', href: '/officials', icon: 'person' as const },
  { label: 'FOIA Request', href: '/services/foia', icon: 'megaphone' as const },
  { label: 'Newsletters', href: '/documents/newsletters', icon: 'newsletter' as const },
]

const COLLECTION_COLORS: Record<string, string> = {
  'board-agendas': '#1B3A5C',
  'meeting-minutes': '#2563EB',
  'financial-reports': '#15803D',
  'assessor-documents': '#7E22CE',
  'road-district-reports': '#EA580C',
  newsletters: '#C8960C',
  events: '#0D9488',
  announcements: '#DC2626',
  officials: '#1B3A5C',
}

type IconName = 'file' | 'calendar' | 'person' | 'megaphone' | 'newsletter'

function ResultIcon({ icon, collection }: { icon: IconName; collection?: string }) {
  const color = collection ? (COLLECTION_COLORS[collection] ?? '#1B3A5C') : '#1B3A5C'
  const cls = 'w-4 h-4 flex-shrink-0'
  switch (icon) {
    case 'file':
      return <FileText className={cls} style={{ color }} />
    case 'calendar':
      return <Calendar className={cls} style={{ color }} />
    case 'person':
      return <User className={cls} style={{ color }} />
    case 'megaphone':
      return <Megaphone className={cls} style={{ color }} />
    case 'newsletter':
      return <BookOpen className={cls} style={{ color }} />
    default:
      return <FileText className={cls} style={{ color }} />
  }
}

export const SearchModal: React.FC<Props> = ({ open, onClose }) => {
  const [query, setQuery] = useState('')
  const [groups, setGroups] = useState<SearchGroup[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [focusedIndex, setFocusedIndex] = useState(-1)

  const inputRef = useRef<HTMLInputElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Flat list of all results for keyboard navigation
  const flatResults: SearchResult[] = groups.flatMap((g) => g.results)

  // Focus input on open
  useEffect(() => {
    if (open) {
      setQuery('')
      setGroups([])
      setError(null)
      setFocusedIndex(-1)
      // Small delay so the modal is rendered first
      const t = setTimeout(() => inputRef.current?.focus(), 50)
      return () => clearTimeout(t)
    }
  }, [open])

  // ESC key closes modal
  useEffect(() => {
    if (!open) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  const fetchResults = useCallback(async (q: string) => {
    if (q.length < 2) {
      setGroups([])
      setLoading(false)
      return
    }
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`)
      if (!res.ok) throw new Error(`Search failed (${res.status})`)
      const data = await res.json()
      setGroups(data.groups ?? [])
      setFocusedIndex(-1)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed. Please try again.')
      setGroups([])
    } finally {
      setLoading(false)
    }
  }, [])

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setQuery(val)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    if (val.length < 2) {
      setGroups([])
      setLoading(false)
      return
    }
    setLoading(true)
    debounceRef.current = setTimeout(() => fetchResults(val), 300)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!flatResults.length) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setFocusedIndex((i) => (i < flatResults.length - 1 ? i + 1 : i))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setFocusedIndex((i) => (i > 0 ? i - 1 : -1))
    } else if (e.key === 'Enter' && focusedIndex >= 0) {
      e.preventDefault()
      const result = flatResults[focusedIndex]
      if (result) {
        window.location.href = result.url
      }
    }
  }

  if (!open) return null

  const showQuickLinks = query.length < 2 && !loading
  const showResults = query.length >= 2 && !loading && !error
  const showNoResults = showResults && groups.length === 0

  return (
    <div
      className="fixed inset-0 bg-black/50 z-[100] flex items-start justify-center pt-16 px-4"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      aria-label="Site search"
    >
      <div
        className="bg-white rounded-lg shadow-2xl w-full max-w-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4" style={{ backgroundColor: '#1B3A5C' }}>
          <h2 className="text-lg font-display font-bold text-white">Search</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input */}
        <div className="px-5 py-4 border-b border-gray-100">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            {loading && (
              <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 animate-spin" />
            )}
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={handleQueryChange}
              onKeyDown={handleKeyDown}
              placeholder="Search documents, officials, events..."
              className="w-full pl-12 pr-10 py-3 text-base border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-colors"
              style={{ '--tw-ring-color': '#C8960C' } as React.CSSProperties}
              aria-label="Search query"
              autoComplete="off"
            />
          </div>
          {query.length === 0 && (
            <p className="mt-2 text-xs text-gray-400">
              Press <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-xs font-semibold">ESC</kbd> to close
            </p>
          )}
        </div>

        {/* Body — scrollable */}
        <div className="max-h-[60vh] overflow-y-auto">
          {/* Error state */}
          {error && (
            <div className="px-5 py-6 text-center">
              <p className="text-red-600 text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Quick Links (idle state) */}
          {showQuickLinks && (
            <div className="px-5 py-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Quick Links</p>
              <div className="grid grid-cols-2 gap-2">
                {QUICK_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700 hover:text-navy"
                  >
                    <ResultIcon icon={link.icon} />
                    <span>{link.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* No results state */}
          {showNoResults && (
            <div className="px-5 py-8 text-center">
              <p className="text-gray-700 font-medium">No results for &ldquo;{query}&rdquo;</p>
              <p className="text-sm text-gray-400 mt-1">Try different keywords or browse using the quick links above.</p>
            </div>
          )}

          {/* Results grouped by collection */}
          {showResults && groups.length > 0 && (
            <div className="divide-y divide-gray-50">
              {groups.map((group) => (
                <div key={group.label} className="px-5 py-3">
                  {/* Group header */}
                  <div className="flex items-center gap-2 mb-2">
                    <ResultIcon icon={group.icon} collection={group.results[0]?.collection} />
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      {group.label}
                    </span>
                  </div>

                  {/* Result rows */}
                  <ul>
                    {group.results.map((result, idx) => {
                      const globalIndex = flatResults.indexOf(result)
                      const isFocused = globalIndex === focusedIndex
                      return (
                        <li key={`${result.collection}-${result.id}-${idx}`}>
                          <div
                            className={`flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors ${
                              isFocused ? 'bg-gold-pale' : 'hover:bg-gray-50'
                            }`}
                          >
                            {/* Row link (wraps title + subtitle) */}
                            <Link
                              href={result.url}
                              onClick={onClose}
                              className="flex-1 min-w-0"
                              aria-label={result.title}
                            >
                              <span className="block text-sm font-semibold text-gray-800 truncate">
                                {result.title}
                              </span>
                              {result.subtitle && (
                                <span className="block text-xs text-gray-400 mt-0.5 truncate">
                                  {result.subtitle}
                                </span>
                              )}
                            </Link>

                            {/* PDF badge */}
                            {result.fileUrl && (
                              <a
                                href={result.fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="flex-shrink-0 mt-0.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold text-white transition-opacity hover:opacity-90"
                                style={{ backgroundColor: '#C8960C' }}
                                aria-label={`Open PDF for ${result.title}`}
                              >
                                ↓ PDF
                              </a>
                            )}
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchModal
