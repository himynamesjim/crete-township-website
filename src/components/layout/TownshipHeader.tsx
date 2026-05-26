'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Phone, Mail, Facebook, Twitter, Youtube, Menu, X, ChevronDown, Printer } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/ui'

interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}

const navigation: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'About',
    href: '/about',
    children: [
      { label: 'Township Board', href: '/about/board' },
      { label: 'History', href: '/about/history' },
    ],
  },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'General Assistance', href: '/services/general-assistance' },
      { label: 'Senior Programs', href: '/services/seniors' },
    ],
  },
  {
    label: 'Reports',
    href: '/documents',
    children: [
      { label: 'Meeting Agendas', href: '/documents/agendas' },
      { label: 'Meeting Minutes', href: '/documents/meeting-minutes' },
      { label: 'Annual Town Meetings', href: '/documents/annual-town-meetings' },
      { label: 'Assessor Minutes', href: '/documents/assessor-minutes' },
      { label: 'Audited Financial Statements', href: '/documents/audited-financial-statements' },
      { label: 'Cash Balance Reports', href: '/documents/cash-balance-reports' },
      { label: 'Highway Commissioner Reports', href: '/documents/highway-commissioner-reports' },
      { label: 'Town Fund and Road & Bridge Tax Levy Minutes', href: '/documents/town-fund-levy-minutes' },
    ],
  },
  { label: 'Events', href: '/events' },
  { label: 'Newsletters', href: '/newsletters' },
  { label: 'Assessor', href: '/assessor' },
  { label: 'Road District', href: '/road-district' },
  { label: 'Community Center', href: '/community-center' },
  { label: 'Contact', href: '/contact' },
]

export const TownshipHeader: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  // Handle scroll to make navigation sticky
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Board Meeting Alert Banner */}
      <div className="bg-gold text-white border-b-[3px] border-gold-light">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="h-12 flex items-center justify-center text-center">
            <span className="text-sm font-semibold">
              <strong>Board Meeting:</strong> May 13, 2026 at 7:00 PM — Crete Town Hall, 1367 Wood
              St |{' '}
              <Link href="/documents/board-agendas" className="underline hover:text-white/90">
                View Agenda →
              </Link>
            </span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-navy border-b-[3px] border-gold">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="flex items-center justify-between py-4">
            {/* Logo & Title */}
            <Link href="/" className="flex items-center gap-4 hover:opacity-90 transition-opacity">
              <div className="w-16 h-16 flex-shrink-0">
                <img
                  src="/api/media/file/cropped-The-Great-Seal-of-Crete-Township-scaled-1.jpg"
                  alt="The Great Seal of Crete Township"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1 className="text-2xl font-display font-bold text-white leading-tight">
                  Crete Township
                </h1>
                <p className="text-xs tracking-widest text-gray-300 uppercase">
                  Will County, Illinois
                </p>
              </div>
            </Link>

            {/* Contact Info & Social */}
            <div className="hidden lg:flex items-center gap-6">
              {/* Phone */}
              <a
                href="tel:708-672-8279"
                className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>708-672-8279</span>
              </a>

              {/* Fax */}
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Printer className="w-4 h-4" />
                <span>708-672-3327</span>
              </div>

              {/* Email */}
              <a
                href="mailto:administrator@cretetownship.com"
                className="flex items-center gap-2 text-sm text-gold-light hover:text-gold transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>administrator@cretetownship.com</span>
              </a>

              {/* Social Icons */}
              <div className="flex items-center gap-2 pl-4 border-l border-navy-light">
                <a
                  href="#"
                  className="w-8 h-8 rounded bg-navy-light hover:bg-gold transition-colors flex items-center justify-center"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4 text-white" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 rounded bg-navy-light hover:bg-gold transition-colors flex items-center justify-center"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4 text-white" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 rounded bg-navy-light hover:bg-gold transition-colors flex items-center justify-center"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4 text-white" />
                </a>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-white hover:bg-navy-light rounded"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Sticky Navigation */}
      <nav className={cn(
        "bg-cream sticky top-0 z-50 transition-shadow duration-200",
        isScrolled && "shadow-md"
      )}>
        <div className="max-w-[1400px] mx-auto px-8">
          {/* Desktop Navigation with Search */}
          <div className="hidden lg:flex items-center justify-between">
            <ul className="flex items-center gap-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href || (item.children && item.children.some(child => pathname === child.href))

              return (
                <li key={item.href} className="relative group">
                  {item.children ? (
                    <>
                      <button className={cn(
                        "px-4 py-4 text-[13.5px] font-medium transition-colors flex items-center gap-1",
                        isActive
                          ? "text-navy border-b-[3px] border-gold"
                          : "text-gray-600 hover:text-navy hover:bg-white"
                      )}>
                        {item.label}
                        <ChevronDown className="w-3 h-3" />
                      </button>
                      {/* Dropdown */}
                      <ul className="absolute left-0 top-full min-w-[200px] bg-white border border-gray-200 shadow-lg rounded-b opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className="block px-4 py-3 text-sm text-gray-600 hover:text-navy hover:bg-gold-pale transition-colors"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "block px-4 py-4 text-[13.5px] font-medium transition-colors",
                        isActive
                          ? "text-navy border-b-[3px] border-gold"
                          : "text-gray-600 hover:text-navy hover:bg-white"
                      )}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              )
            })}
          </ul>

          {/* Search Bar - Desktop */}
          <div className="py-3">
            <input
              type="search"
              placeholder="Search the site..."
              className="w-80 px-4 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
            />
          </div>
        </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4">
              <ul className="space-y-1">
                {navigation.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block px-4 py-3 text-sm font-medium text-gray-600 hover:text-navy hover:bg-white rounded transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                    {item.children && (
                      <ul className="ml-4 mt-1 space-y-1">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className="block px-4 py-2 text-xs text-gray-500 hover:text-navy hover:bg-white rounded transition-colors"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </nav>
    </>
  )
}
