'use client'

import React, { useState, useRef, useEffect } from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon, ChevronDown } from 'lucide-react'

const reportLinks = [
  { label: 'Annual Town Meetings', href: '/documents/annual-town-meetings' },
  { label: 'Assessor Minutes', href: '/documents/assessor-minutes' },
  { label: 'Audited Financial Statements', href: '/documents/audited-financial-statements' },
  { label: 'Agendas', href: '/documents/agendas' },
  { label: 'Cash Balance Reports', href: '/documents/cash-balance-reports' },
  { label: 'Highway Commissioner Reports', href: '/documents/highway-commissioner' },
  { label: 'Meeting Minutes', href: '/documents/meeting-minutes' },
  {
    label: 'Town Fund and Road & Bridge Tax Levy Minutes',
    href: '/documents/town-fund-levy-minutes',
  },
]

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
  const [isReportsOpen, setIsReportsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsReportsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <nav className="flex gap-3 items-center">
      {navItems.map(({ link }, i) => {
        return <CMSLink key={i} {...link} appearance="link" />
      })}

      {/* Reports Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsReportsOpen(!isReportsOpen)}
          className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-navy transition-colors uppercase tracking-wide py-2"
        >
          Reports
          <ChevronDown
            className={`w-4 h-4 transition-transform ${isReportsOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {isReportsOpen && (
          <div className="absolute left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
            {reportLinks.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="block px-4 py-2 text-sm text-navy hover:bg-navy-light hover:text-white transition-colors"
                onClick={() => setIsReportsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Events Link */}
      <Link
        href="/events"
        className="text-sm font-medium text-gray-600 hover:text-navy transition-colors uppercase tracking-wide"
      >
        Events
      </Link>

      {/* Newsletters Link */}
      <Link
        href="/documents/newsletters"
        className="text-sm font-medium text-gray-600 hover:text-navy transition-colors uppercase tracking-wide"
      >
        Newsletters
      </Link>

      <Link href="/search">
        <span className="sr-only">Search</span>
        <SearchIcon className="w-5 text-primary" />
      </Link>
    </nav>
  )
}
