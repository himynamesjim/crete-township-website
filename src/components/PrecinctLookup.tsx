'use client'

import React, { useState, useRef } from 'react'
import { Search, MapPin, CheckCircle2, AlertCircle, Loader2, ExternalLink } from 'lucide-react'

interface Precinct {
  number: number
  name: string
  detail?: string
  address: string
  city: string
}

interface PrecinctLookupProps {
  precincts: Precinct[]
}

type Status = 'idle' | 'loading' | 'found' | 'not-found' | 'outside' | 'error'

export function PrecinctLookup({ precincts }: PrecinctLookupProps) {
  const [address, setAddress] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [result, setResult] = useState<Precinct | null>(null)
  const [matchedAddress, setMatchedAddress] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleLookup(e: React.FormEvent) {
    e.preventDefault()
    if (!address.trim()) return

    setStatus('loading')
    setResult(null)

    try {
      // Proxied through /api/precinct-lookup to avoid CORS restrictions.
      const res = await fetch(
        `/api/precinct-lookup?address=${encodeURIComponent(address.trim())}`,
      )
      if (!res.ok) throw new Error('Geocoder request failed')
      const data = await res.json()

      const matches = data?.result?.addressMatches
      if (!matches?.length) {
        setStatus('not-found')
        return
      }

      const match = matches[0]
      setMatchedAddress(match.matchedAddress ?? address)

      // The Census returns "Voting Districts" geographies.
      // Will County VTDs come back with BASENAME like "CRETE PCT 002".
      const vtds: Array<{ BASENAME?: string; NAME?: string; VTD?: string }> =
        match.geographies?.['Voting Districts'] ?? []

      if (!vtds.length) {
        // Address geocoded but no VTD returned — likely outside township boundaries.
        setStatus('outside')
        return
      }

      // Extract the precinct number from the first VTD entry.
      // BASENAME = "CRETE PCT 002" → digits "002" → parseInt → 2
      const raw = vtds[0].BASENAME ?? vtds[0].NAME ?? vtds[0].VTD ?? ''
      const digits = raw.match(/\d+$/) ?? raw.match(/\d+/)
      const precinctNum = digits ? parseInt(digits[0], 10) : NaN

      const found = isNaN(precinctNum)
        ? null
        : precincts.find((p) => p.number === precinctNum) ?? null

      if (found) {
        setResult(found)
        setStatus('found')
      } else {
        setStatus('outside')
      }
    } catch {
      setStatus('error')
    }
  }

  function handleReset() {
    setAddress('')
    setStatus('idle')
    setResult(null)
    setMatchedAddress('')
    inputRef.current?.focus()
  }

  return (
    <div className="bg-navy-dark rounded-xl overflow-hidden shadow-lg grid grid-cols-1 lg:grid-cols-2">

      {/* ── Left: search panel ── */}
      <div className="flex flex-col border-b lg:border-b-0 lg:border-r border-white/10">
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gold flex items-center justify-center flex-shrink-0">
              <MapPin className="w-4 h-4 text-navy" />
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-white">Find Your Precinct</h3>
              <p className="text-xs text-white/60 mt-0.5">Enter your street address to look up your polling place</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="px-6 py-5 flex-1 flex flex-col">
          <form onSubmit={handleLookup} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
              <input
                ref={inputRef}
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="e.g. 1367 Wood St, Crete, IL"
                className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              disabled={status === 'loading' || !address.trim()}
              className="bg-gold hover:bg-gold-light disabled:opacity-50 disabled:cursor-not-allowed text-navy font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors flex items-center gap-2 flex-shrink-0"
            >
              {status === 'loading' ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Search className="w-4 h-4" />
              )}
              {status === 'loading' ? 'Looking up…' : 'Look Up'}
            </button>
          </form>

          {/* Error / warning states (shown left only) */}
          {status === 'not-found' && (
            <div className="mt-4 bg-red-900/30 border border-red-500/30 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-white text-sm font-semibold">Address not found</p>
                <p className="text-white/60 text-xs mt-1 leading-relaxed">
                  Try including city and state (e.g. "1367 Wood St, Crete, IL") or call{' '}
                  <a href="tel:7086728279" className="text-gold hover:underline">708-672-8279</a>.
                </p>
                <button onClick={handleReset} className="mt-2 text-xs text-white/50 hover:text-white transition-colors underline underline-offset-2">Try again</button>
              </div>
            </div>
          )}

          {status === 'outside' && (
            <div className="mt-4 bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-white text-sm font-semibold">Address may be outside township boundaries</p>
                <p className="text-white/60 text-xs mt-1 leading-relaxed">
                  Contact the Township Office at{' '}
                  <a href="tel:7086728279" className="text-gold hover:underline">708-672-8279</a> to confirm.
                </p>
                <button onClick={handleReset} className="mt-2 text-xs text-white/50 hover:text-white transition-colors underline underline-offset-2">Try a different address</button>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="mt-4 bg-red-900/30 border border-red-500/30 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-white text-sm font-semibold">Lookup service unavailable</p>
                <p className="text-white/60 text-xs mt-1 leading-relaxed">
                  Please call <a href="tel:7086728279" className="text-gold hover:underline">708-672-8279</a>.
                </p>
                <button onClick={handleReset} className="mt-2 text-xs text-white/50 hover:text-white transition-colors underline underline-offset-2">Try again</button>
              </div>
            </div>
          )}

          <p className="mt-auto pt-5 text-xs text-white/25">
            Powered by U.S. Census Bureau geocoder · No data stored
          </p>
        </div>
      </div>

      {/* ── Right: result panel ── */}
      <div className="flex flex-col">
        {status === 'idle' && (
          <div className="flex flex-col items-center justify-center h-full px-8 py-10 text-center gap-4">
            <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-white/20" />
            </div>
            <div>
              <p className="text-white/40 text-sm font-semibold">Your result will appear here</p>
              <p className="text-white/25 text-xs mt-1">Enter your address on the left to get started</p>
            </div>
          </div>
        )}

        {status === 'loading' && (
          <div className="flex flex-col items-center justify-center h-full px-8 py-10 gap-3">
            <Loader2 className="w-8 h-8 text-gold animate-spin" />
            <p className="text-white/50 text-sm">Looking up your address…</p>
          </div>
        )}

        {status === 'found' && result && (
          <div className="flex flex-col h-full px-6 py-6 gap-5">
            {/* Matched address */}
            <p className="text-xs text-white/40 truncate">{matchedAddress}</p>

            {/* Precinct badge */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gold flex items-center justify-center flex-shrink-0 shadow-lg">
                <span className="text-navy text-2xl font-black">{result.number}</span>
              </div>
              <div>
                <p className="text-white/60 text-xs uppercase tracking-widest">Your Precinct</p>
                <p className="text-white font-display text-2xl font-bold leading-tight">Precinct {result.number}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                  <p className="text-green-400 text-xs font-semibold">Address verified</p>
                </div>
              </div>
            </div>

            {/* Polling place card */}
            <div className="bg-white/8 border border-white/10 rounded-xl p-5 flex-1">
              <p className="text-xs text-white/50 uppercase tracking-widest mb-3">Your Polling Place</p>
              <p className="text-white font-display text-lg font-bold leading-snug">{result.name}</p>
              {result.detail && (
                <p className="text-gold text-sm font-medium mt-1">{result.detail}</p>
              )}
              <div className="flex items-start gap-2 mt-3">
                <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <div className="text-white/70 text-sm leading-relaxed">
                  <p>{result.address}</p>
                  <p>{result.city}</p>
                </div>
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${result.address}, ${result.city}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 bg-gold hover:bg-gold-light text-navy font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Get Directions
              </a>
            </div>

            <button
              onClick={handleReset}
              className="text-xs text-white/40 hover:text-white transition-colors underline underline-offset-2 text-left"
            >
              Look up a different address
            </button>
          </div>
        )}

        {/* Show idle placeholder for error/not-found/outside on right side */}
        {(status === 'not-found' || status === 'outside' || status === 'error') && (
          <div className="flex flex-col items-center justify-center h-full px-8 py-10 text-center gap-4">
            <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-white/20" />
            </div>
            <p className="text-white/25 text-xs">No result to display</p>
          </div>
        )}
      </div>

    </div>
  )
}
