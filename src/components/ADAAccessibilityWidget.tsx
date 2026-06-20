'use client'

import { useState, useEffect, useRef } from 'react'
import { X, RotateCcw } from 'lucide-react'

interface ADAPrefs {
  textSize: 'default' | 'lg' | 'xl' | '2xl'
  contrast: boolean
  grayscale: boolean
  dyslexia: boolean
  reduceMotion: boolean
}

const DEFAULT_PREFS: ADAPrefs = {
  textSize: 'default',
  contrast: false,
  grayscale: false,
  dyslexia: false,
  reduceMotion: false,
}

const STORAGE_KEY = 'crete-ada-prefs'

function applyPrefs(prefs: ADAPrefs) {
  const html = document.documentElement
  // Text size
  html.classList.remove('ada-text-lg', 'ada-text-xl', 'ada-text-2xl')
  if (prefs.textSize !== 'default') html.classList.add(`ada-text-${prefs.textSize}`)
  // Toggles
  html.classList.toggle('ada-contrast', prefs.contrast)
  html.classList.toggle('ada-grayscale', prefs.grayscale)
  html.classList.toggle('ada-dyslexia', prefs.dyslexia)
  html.classList.toggle('ada-reduce-motion', prefs.reduceMotion)
}

export default function ADAAccessibilityWidget() {
  const [open, setOpen] = useState(false)
  const [prefs, setPrefs] = useState<ADAPrefs>(DEFAULT_PREFS)
  const panelRef = useRef<HTMLDivElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)

  // Load saved prefs
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved) as ADAPrefs
        setPrefs(parsed)
        applyPrefs(parsed)
      }
    } catch {}
  }, [])

  // Apply whenever prefs change
  useEffect(() => {
    applyPrefs(prefs)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs))
    } catch {}
  }, [prefs])

  // Close on Escape or outside click
  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    function onClickOutside(e: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        btnRef.current &&
        !btnRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClickOutside)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClickOutside)
    }
  }, [open])

  function update(patch: Partial<ADAPrefs>) {
    setPrefs((p) => ({ ...p, ...patch }))
  }

  function reset() {
    setPrefs(DEFAULT_PREFS)
  }

  const hasChanges =
    prefs.textSize !== 'default' ||
    prefs.contrast ||
    prefs.grayscale ||
    prefs.dyslexia ||
    prefs.reduceMotion

  const TEXT_SIZES = [
    { key: 'default', label: 'A', title: 'Default size' },
    { key: 'lg',      label: 'A',  title: 'Large text', scale: 'text-base' },
    { key: 'xl',      label: 'A',  title: 'Larger text', scale: 'text-lg' },
    { key: '2xl',     label: 'A',  title: 'Largest text', scale: 'text-xl' },
  ] as const

  const TOGGLES: { key: keyof ADAPrefs; label: string; desc: string }[] = [
    { key: 'contrast',     label: 'High Contrast',     desc: 'Increases visual contrast' },
    { key: 'grayscale',    label: 'Grayscale',          desc: 'Removes color from the page' },
    { key: 'dyslexia',     label: 'Dyslexia-Friendly',  desc: 'Improves spacing and readability' },
    { key: 'reduceMotion', label: 'Reduce Motion',      desc: 'Disables animations' },
  ]

  return (
    <div className="fixed bottom-6 right-6 z-[9999]" aria-label="Accessibility options">

      {/* Panel */}
      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Accessibility Options"
          className="absolute bottom-14 right-0 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden"
          style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.18)' }}
        >
          {/* Header */}
          <div className="bg-navy px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-gold" aria-hidden="true">
                <circle cx="12" cy="3.5" r="1.75" />
                <path d="M14.5 7.5H9L8 13h4l1.5 4.5H16l-1.5-4.5H16L14.5 7.5z" />
                <path d="M10.5 13.5c0 2.2-1.8 4-4 4a4 4 0 0 1-4-4c0-1.8 1.2-3.4 3-3.8V7.6a6 6 0 1 0 7 9.4l-1.1-1.6c-.6.7-1.5 1.1-2.4 1.1-1.7 0-3-1.3-3-3z" />
              </svg>
              <h2 className="text-white font-display font-bold text-sm">Accessibility Options</h2>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/60 hover:text-white transition-colors rounded p-0.5"
              aria-label="Close accessibility panel"
            >
              <X size={16} />
            </button>
          </div>

          <div className="p-4 space-y-5">
            {/* Text Size */}
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Text Size
              </p>
              <div className="flex gap-2">
                {TEXT_SIZES.map((s, i) => (
                  <button
                    key={s.key}
                    onClick={() => update({ textSize: s.key })}
                    aria-pressed={prefs.textSize === s.key}
                    title={s.title}
                    className={`flex-1 py-2 rounded-lg border-2 font-bold transition-all ${
                      prefs.textSize === s.key
                        ? 'border-gold bg-gold/10 text-navy'
                        : 'border-gray-200 text-gray-500 hover:border-gray-300'
                    }`}
                    style={{ fontSize: `${13 + i * 3}px` }}
                  >
                    A
                  </button>
                ))}
              </div>
              <div className="flex gap-2 mt-1">
                {['Default', 'Large', 'Larger', 'Largest'].map((label) => (
                  <span key={label} className="flex-1 text-center text-[9px] text-gray-400">{label}</span>
                ))}
              </div>
            </div>

            {/* Toggles */}
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Display Options
              </p>
              <div className="space-y-2">
                {TOGGLES.map(({ key, label, desc }) => {
                  const active = prefs[key] as boolean
                  return (
                    <button
                      key={key}
                      onClick={() => update({ [key]: !active })}
                      aria-pressed={active}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg border-2 transition-all text-left ${
                        active
                          ? 'border-gold bg-gold/10'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div>
                        <p className={`text-sm font-semibold ${active ? 'text-navy' : 'text-gray-700'}`}>
                          {label}
                        </p>
                        <p className="text-[11px] text-gray-400 mt-0.5">{desc}</p>
                      </div>
                      {/* Toggle pill */}
                      <div
                        className={`relative w-10 h-5 rounded-full flex-shrink-0 transition-colors ${
                          active ? 'bg-gold' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${
                            active ? 'translate-x-5' : 'translate-x-0.5'
                          }`}
                        />
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Reset */}
            {hasChanges && (
              <button
                onClick={reset}
                className="w-full flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-navy border border-gray-200 hover:border-gray-300 rounded-lg py-2 transition-all"
              >
                <RotateCcw size={13} />
                Reset to defaults
              </button>
            )}
          </div>

          {/* Footer note */}
          <div className="bg-gray-50 border-t border-gray-100 px-4 py-2">
            <p className="text-[10px] text-gray-400 text-center">
              Settings are saved in your browser.{' '}
              <a href="/accessibility" className="text-navy hover:underline">
                Full accessibility statement
              </a>
            </p>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        ref={btnRef}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label="Open accessibility options"
        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm shadow-lg transition-all ${
          open || hasChanges
            ? 'bg-gold text-navy-dark'
            : 'bg-navy text-white hover:bg-navy-light'
        }`}
        style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.25)' }}
      >
        {/* Official ISA wheelchair accessibility symbol */}
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current flex-shrink-0" aria-hidden="true">
          <circle cx="12" cy="3.5" r="1.75" />
          <path d="M14.5 7.5H9L8 13h4l1.5 4.5H16l-1.5-4.5H16L14.5 7.5z" />
          <path d="M10.5 13.5c0 2.2-1.8 4-4 4a4 4 0 0 1-4-4c0-1.8 1.2-3.4 3-3.8V7.6a6 6 0 1 0 7 9.4l-1.1-1.6c-.6.7-1.5 1.1-2.4 1.1-1.7 0-3-1.3-3-3z" />
        </svg>
        <span className="hidden sm:inline">Accessibility</span>
        {hasChanges && (
          <span className="w-2 h-2 rounded-full bg-white flex-shrink-0" aria-hidden="true" />
        )}
      </button>
    </div>
  )
}
