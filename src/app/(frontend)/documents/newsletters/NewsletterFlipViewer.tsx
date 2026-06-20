'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Download,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  ArrowLeft,
  Maximize2,
  Menu,
  X,
  FileText,
} from 'lucide-react'

export interface Newsletter {
  id: string
  year: number
  issue: number | null
  label: string
  shortLabel: string
  path: string
  description?: string | null
}

export interface YearGroup {
  year: number
  newsletters: Newsletter[]
}

interface Props {
  yearGroups: YearGroup[]
}

export default function NewsletterFlipViewer({ yearGroups }: Props) {
  const allNewsletters = yearGroups.flatMap((g) => [...g.newsletters].reverse())

  // Desktop state
  const [current, setCurrent] = useState(allNewsletters[0])
  const [animState, setAnimState] = useState<'idle' | 'out' | 'in'>('idle')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  // Mobile state
  const [mobileView, setMobileView] = useState<'browse' | 'read'>('browse')
  const [mobileCurrent, setMobileCurrent] = useState(allNewsletters[0])

  const currentIndex = allNewsletters.findIndex((n) => n.id === current.id)
  const mobileIndex = allNewsletters.findIndex((n) => n.id === mobileCurrent.id)

  function switchTo(newsletter: Newsletter) {
    if (newsletter.id === current.id || animState !== 'idle') return
    setAnimState('out')
    setTimeout(() => {
      setCurrent(newsletter)
      setAnimState('in')
      setTimeout(() => setAnimState('idle'), 380)
    }, 380)
  }

  function goPrev() {
    if (currentIndex < allNewsletters.length - 1) switchTo(allNewsletters[currentIndex + 1])
  }
  function goNext() {
    if (currentIndex > 0) switchTo(allNewsletters[currentIndex - 1])
  }

  function mobileGoPrev() {
    if (mobileIndex < allNewsletters.length - 1) setMobileCurrent(allNewsletters[mobileIndex + 1])
  }
  function mobileGoNext() {
    if (mobileIndex > 0) setMobileCurrent(allNewsletters[mobileIndex - 1])
  }

  function openOnMobile(nl: Newsletter) {
    setMobileCurrent(nl)
    setMobileView('read')
  }

  const animClass =
    animState === 'out' ? 'nl-flip-out' : animState === 'in' ? 'nl-flip-in' : 'nl-flip-idle'

  return (
    <>
      <style>{`
        .nl-flip-idle { transform: perspective(1400px) rotateY(-2deg); opacity: 1; }
        @keyframes nlFlipOut {
          0%   { transform: perspective(1400px) rotateY(-2deg) scale(1);     opacity: 1; }
          100% { transform: perspective(1400px) rotateY(-80deg) scale(0.95); opacity: 0; }
        }
        @keyframes nlFlipIn {
          0%   { transform: perspective(1400px) rotateY(80deg) scale(0.95); opacity: 0; }
          100% { transform: perspective(1400px) rotateY(-2deg) scale(1);    opacity: 1; }
        }
        .nl-flip-out { animation: nlFlipOut 0.38s cubic-bezier(0.4,0,1,1) forwards; }
        .nl-flip-in  { animation: nlFlipIn  0.38s cubic-bezier(0,0,0.6,1) forwards; }
        .nl-sidebar::-webkit-scrollbar { width: 4px; }
        .nl-sidebar::-webkit-scrollbar-track { background: transparent; }
        .nl-sidebar::-webkit-scrollbar-thumb { background: rgba(200,150,12,0.3); border-radius: 2px; }
        .nl-sidebar::-webkit-scrollbar-thumb:hover { background: rgba(200,150,12,0.6); }
      `}</style>

      {/* ── MOBILE BROWSE VIEW ──────────────────────────────────── */}
      {mobileView === 'browse' && (
        <div className="md:hidden bg-navy-dark min-h-screen">
          {/* Header */}
          <div className="sticky top-0 z-20 bg-navy border-b border-white/10 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen size={16} className="text-gold" />
              <span className="text-white font-display font-bold text-sm">Newsletters</span>
            </div>
            <Link
              href="/documents"
              className="flex items-center gap-1 text-white/40 hover:text-white/60 text-xs"
            >
              <ArrowLeft size={12} />
              Documents
            </Link>
          </div>

          {/* Year-grouped card grid */}
          <div className="px-4 py-5 space-y-6">
            {yearGroups.map((group) => (
              <div key={group.year}>
                <h3 className="text-gold/70 text-[10px] font-bold uppercase tracking-widest mb-3 px-1">
                  {group.year}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {[...group.newsletters].reverse().map((nl) => (
                    <button
                      key={nl.id}
                      onClick={() => openOnMobile(nl)}
                      className="group text-left bg-navy rounded-xl border border-white/10 hover:border-gold/50 active:border-gold transition-all p-4 flex flex-col gap-3"
                    >
                      {/* Icon */}
                      <div className="w-10 h-12 rounded-md bg-navy-dark flex items-center justify-center border border-white/10 group-hover:border-gold/30 transition-colors">
                        <FileText size={20} className="text-gold/60 group-hover:text-gold transition-colors" />
                      </div>
                      {/* Info */}
                      <div>
                        <p className="text-white text-xs font-semibold leading-snug line-clamp-2">
                          {nl.label}
                        </p>
                        {nl.issue && (
                          <p className="text-white/35 text-[10px] mt-0.5">Issue {nl.issue}</p>
                        )}
                      </div>
                      {/* CTA */}
                      <div className="mt-auto text-gold text-[10px] font-semibold flex items-center gap-1">
                        <span>Read Newsletter</span>
                        <ChevronRight size={10} />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <div className="h-6" />
          </div>
        </div>
      )}

      {/* ── MOBILE READ VIEW ────────────────────────────────────── */}
      {mobileView === 'read' && (
        <div
          className="md:hidden flex flex-col bg-navy-dark"
          style={{ height: '100dvh' }}
        >
          {/* Mobile reader header */}
          <div className="flex-shrink-0 bg-navy border-b border-white/10 px-3 py-2.5 flex items-center gap-2">
            {/* Back to browse */}
            <button
              onClick={() => setMobileView('browse')}
              className="flex items-center gap-1 text-white/60 hover:text-white text-xs py-1 px-2 rounded hover:bg-white/10 transition-all"
            >
              <ArrowLeft size={14} />
              All
            </button>

            {/* Title */}
            <div className="flex-1 min-w-0 px-1">
              <p className="text-white text-xs font-semibold truncate leading-tight">
                {mobileCurrent.label}
              </p>
              {mobileCurrent.issue && (
                <p className="text-white/35 text-[10px]">Issue {mobileCurrent.issue}</p>
              )}
            </div>

            {/* Prev / Next */}
            <button
              onClick={mobileGoPrev}
              disabled={mobileIndex === allNewsletters.length - 1}
              className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-white disabled:opacity-25 rounded hover:bg-white/10 transition-all"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={mobileGoNext}
              disabled={mobileIndex === 0}
              className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-white disabled:opacity-25 rounded hover:bg-white/10 transition-all"
            >
              <ChevronRight size={16} />
            </button>

            {/* Download */}
            <a
              href={mobileCurrent.path}
              download
              className="flex items-center gap-1 bg-gold text-navy-dark font-semibold text-[11px] px-3 py-1.5 rounded transition-colors"
            >
              <Download size={12} />
              Save
            </a>
          </div>

          {/* Inline PDF viewer */}
          <div className="flex-1 min-h-0">
            <iframe
              key={mobileCurrent.path}
              src={mobileCurrent.path}
              className="w-full h-full bg-white block"
              title={mobileCurrent.label}
              style={{ border: 'none' }}
            />
          </div>
        </div>
      )}

      {/* ── DESKTOP layout (md+) ────────────────────────────────── */}
      <div
        className="hidden md:flex bg-[#0a0f1a]"
        style={{ height: 'calc(100vh - 80px)' }}
      >
        {/* Sidebar */}
        <div
          className={`nl-sidebar flex-shrink-0 flex flex-col overflow-hidden transition-[width] duration-300 ease-in-out border-r border-white/10 ${
            sidebarOpen ? 'w-72' : 'w-0'
          }`}
          style={{ background: 'linear-gradient(180deg, #0F2540 0%, #0d1c30 100%)' }}
        >
          <div className="flex-shrink-0 px-5 py-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <BookOpen size={16} className="text-gold" />
              <span className="text-white font-display font-bold text-sm tracking-wide">
                Newsletter Archive
              </span>
            </div>
            <p className="text-white/35 text-xs mt-1">
              {allNewsletters.length} editions available
            </p>
          </div>

          <div className="flex-1 overflow-y-auto nl-sidebar">
            {yearGroups.map((group) => (
              <div key={group.year}>
                <div className="px-5 pt-4 pb-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-gold/50">
                  {group.year}
                </div>
                {[...group.newsletters].reverse().map((nl) => {
                  const active = nl.id === current.id
                  return (
                    <button
                      key={nl.id}
                      onClick={() => switchTo(nl)}
                      className={`w-full text-left flex items-center gap-3 px-4 py-2.5 border-l-[3px] transition-all ${
                        active
                          ? 'border-l-gold bg-gold/10'
                          : 'border-l-transparent hover:bg-white/5 hover:border-l-white/20'
                      }`}
                    >
                      <div
                        className={`w-8 h-10 rounded flex-shrink-0 flex items-center justify-center shadow-sm ${
                          active ? 'bg-gold' : 'bg-white/10'
                        }`}
                      >
                        <FileText
                          size={14}
                          className={active ? 'text-navy-dark' : 'text-white/40'}
                        />
                      </div>
                      <div className="min-w-0">
                        <div
                          className={`text-sm font-medium leading-tight truncate ${
                            active ? 'text-gold' : 'text-white/75'
                          }`}
                        >
                          {nl.shortLabel}
                        </div>
                        {nl.issue && (
                          <div className="text-[11px] text-white/35 mt-0.5">Issue {nl.issue}</div>
                        )}
                      </div>
                      {active && (
                        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                      )}
                    </button>
                  )
                })}
              </div>
            ))}
            <div className="h-4" />
          </div>

          <div className="flex-shrink-0 px-5 py-3 border-t border-white/10">
            <Link
              href="/documents"
              className="flex items-center gap-2 text-white/35 hover:text-white/60 text-xs transition-colors"
            >
              <ArrowLeft size={12} />
              Document Library
            </Link>
          </div>
        </div>

        {/* Main viewer */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top bar */}
          <div
            className="flex-shrink-0 flex items-center gap-3 px-5 py-3 border-b border-white/10"
            style={{ background: '#0F2540' }}
          >
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-white/40 hover:text-white/80 transition-colors p-1 rounded"
              title={sidebarOpen ? 'Hide archive' : 'Show archive'}
            >
              {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
            </button>

            <div className="flex-1 min-w-0">
              <h1 className="text-white font-semibold text-sm leading-tight truncate">
                {current.label}
              </h1>
              <p className="text-white/35 text-xs">Crete Township Newsletter</p>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={goPrev}
                disabled={currentIndex === allNewsletters.length - 1 || animState !== 'idle'}
                className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-white disabled:opacity-25 rounded hover:bg-white/10 transition-all"
                title="Older edition"
              >
                <ChevronLeft size={18} />
              </button>
              <span className="text-white/35 text-xs tabular-nums px-1">
                {currentIndex + 1}&nbsp;/&nbsp;{allNewsletters.length}
              </span>
              <button
                onClick={goNext}
                disabled={currentIndex === 0 || animState !== 'idle'}
                className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-white disabled:opacity-25 rounded hover:bg-white/10 transition-all"
                title="Newer edition"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            <a
              href={current.path}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 hidden lg:flex items-center justify-center text-white/40 hover:text-white/80 rounded hover:bg-white/10 transition-all"
              title="Open in new tab"
            >
              <Maximize2 size={16} />
            </a>

            <a
              href={current.path}
              download
              className="flex items-center gap-1.5 bg-gold hover:bg-gold-light text-navy-dark font-semibold text-xs px-4 py-2 rounded transition-colors whitespace-nowrap"
            >
              <Download size={14} />
              Download
            </a>
          </div>

          {/* PDF stage */}
          <div className="flex-1 flex items-stretch justify-center overflow-hidden p-6">
            <div
              className={`relative w-full max-w-5xl ${animClass}`}
              style={{
                boxShadow:
                  '-6px 6px 40px rgba(0,0,0,0.7), 6px 6px 40px rgba(0,0,0,0.5), 0 4px 8px rgba(0,0,0,0.9)',
                borderRadius: '3px',
              }}
            >
              <div
                className="absolute left-0 top-0 bottom-0 w-4 z-10 pointer-events-none rounded-l"
                style={{
                  background:
                    'linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)',
                }}
              />
              <div
                className="absolute top-0 left-0 right-0 h-[3px] z-10 rounded-t"
                style={{ background: '#C8960C' }}
              />
              <iframe
                key={current.path}
                src={`${current.path}#toolbar=1&navpanes=1&view=FitH`}
                className="w-full h-full rounded bg-white block"
                title={current.label}
                style={{ border: 'none', minHeight: 0 }}
              />
            </div>
          </div>

          {/* Bottom filmstrip */}
          <div
            className="flex-shrink-0 flex items-center gap-2 px-5 py-3 border-t border-white/10 overflow-x-auto"
            style={{ background: '#090e18' }}
          >
            {allNewsletters.map((nl) => {
              const active = nl.id === current.id
              return (
                <button
                  key={nl.id}
                  onClick={() => switchTo(nl)}
                  title={nl.label}
                  className={`flex-shrink-0 transition-all ${active ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}
                >
                  <div
                    className={`w-8 h-10 rounded flex flex-col items-center justify-center gap-0.5 shadow ${
                      active
                        ? 'bg-gold ring-2 ring-gold ring-offset-1 ring-offset-[#090e18]'
                        : 'bg-white/10'
                    }`}
                  >
                    <FileText
                      size={11}
                      className={active ? 'text-navy-dark' : 'text-white/50'}
                    />
                    <span
                      className={`text-[8px] font-bold leading-none ${active ? 'text-navy-dark' : 'text-white/50'}`}
                    >
                      {nl.year.toString().slice(-2)}
                      {nl.issue ? `·${nl.issue}` : ''}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
