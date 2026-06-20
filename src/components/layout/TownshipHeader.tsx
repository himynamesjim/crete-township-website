'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Phone, Mail, Facebook, Twitter, Youtube, Menu, X, ChevronDown, Printer, Search } from 'lucide-react'
import { cn } from '@/utilities/ui'
import { SearchModal } from '@/components/SearchModal'

interface NavItem {
  label: string
  href: string
  children?: NavItem[]
  festive?: boolean
}

const navigation: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'About',
    href: '/about',
    children: [
      { label: 'Township Board', href: '/officials' },
      { label: 'History', href: '/about/history' },
    ],
  },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'FOIA / Public Records Request', href: '/services/foia' },
      { label: 'General Assistance', href: '/services/general-assistance' },
      { label: 'Marriage Licenses', href: '/services/marriage-licenses' },
      { label: 'Planning Commission', href: '/services/planning-commission' },
    ],
  },
  {
    label: 'Documents',
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
      { label: 'Newsletters', href: '/documents/newsletters' },
    ],
  },
  {
    label: 'Clerk',
    href: '/clerk',
    children: [
      { label: 'Clerk Home', href: '/clerk' },
      { label: 'Polling Places', href: '/clerk/polling-places' },
    ],
  },
  {
    label: 'Assessor',
    href: '/assessor',
    children: [
      { label: 'Assessor Home', href: '/assessor' },
      { label: 'Homeowners Associations', href: '/assessor/hoa' },
      { label: 'Will County Phone Numbers', href: '/assessor/will-county-phones' },
    ],
  },
  {
    label: 'Road District',
    href: '/road-district',
    children: [
      { label: 'Road District Home', href: '/road-district' },
      { label: 'Environment & Storm Sewer', href: '/road-district/environment' },
      { label: '2026 Branch Pickup', href: '/road-district/branch-pickup' },
      { label: 'Highway Commissioner Reports', href: '/documents/highway-commissioner-reports' },
    ],
  },
  { label: 'Events', href: '/events' },
  { label: 'USA Fest', href: '/usa-fest', festive: true },
  {
    label: 'Community Center',
    href: '/community-center',
    children: [
      { label: 'Community Center Home', href: '/community-center' },
      { label: 'Building Usage Application', href: '/community-center' },
      { label: 'Resident Survey', href: '/community-center/survey' },
    ],
  },
  { label: 'Contact', href: '/contact' },
]

export const TownshipHeader: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  // Handle scroll to make navigation sticky
  React.useEffect(() => {
    const handleScroll = () => {
      // Logo appears when main header is scrolled past (~120px)
      setIsScrolled(window.scrollY > 120)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
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
            <div className="flex items-center gap-8">
              {/* Logo (visible when scrolled) */}
              {isScrolled && (
                <Link href="/" className="flex items-center gap-2 py-2 hover:opacity-90 transition-opacity duration-200">
                  <div className="w-10 h-10 flex-shrink-0">
                    <img
                      src="/api/media/file/cropped-The-Great-Seal-of-Crete-Township-scaled-1.jpg"
                      alt="Crete Township Seal"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="leading-tight">
                    <span className="text-sm font-display font-bold text-navy">Crete Township</span>
                  </div>
                </Link>
              )}

              {/* Navigation Menu */}
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
                          <li key={child.label}>
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
                        "block px-4 py-4 text-[13.5px] transition-colors",
                        item.festive
                          ? "font-bold text-red-600 hover:bg-red-600 hover:text-white rounded"
                          : cn(
                              "font-medium",
                              isActive
                                ? "text-navy border-b-[3px] border-gold"
                                : "text-gray-600 hover:text-navy hover:bg-white"
                            )
                      )}
                    >
                      {item.festive ? `★ ${item.label} ★` : item.label}
                    </Link>
                  )}
                </li>
              )
            })}
          </ul>
            </div>

          {/* Search Icon - Desktop */}
          <button
            onClick={() => setSearchOpen(true)}
            className="p-2 text-gray-600 hover:text-navy hover:bg-white rounded-full transition-colors"
            aria-label="Open search"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4">
              <ul className="space-y-1">
                {navigation.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "block px-4 py-3 text-sm rounded transition-colors",
                        item.festive
                          ? "font-bold text-red-600 hover:bg-red-600 hover:text-white"
                          : "font-medium text-gray-600 hover:text-navy hover:bg-white"
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.festive ? `★ ${item.label} ★` : item.label}
                    </Link>
                    {item.children && (
                      <ul className="ml-4 mt-1 space-y-1">
                        {item.children.map((child) => (
                          <li key={child.label}>
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

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
