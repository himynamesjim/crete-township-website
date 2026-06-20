import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { Source_Sans_3, Merriweather } from 'next/font/google'
import React from 'react'

// Source Sans 3 (formerly Source Sans Pro) - ADA/Section 508 compliant
// Used for all body text, navigation, and UI elements
const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

// Merriweather - Accessible serif for headings only (conservative, readable)
const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-display',
  display: 'swap',
})

import { TownshipHeader } from '@/components/layout/TownshipHeader'
import { TownshipFooter } from '@/components/layout/TownshipFooter'
import { AgendaAlertBarWrapper } from '@/components/layout/AgendaAlertBarWrapper'
import ADAAccessibilityWidget from '@/components/ADAAccessibilityWidget'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html className={cn(sourceSans.variable, merriweather.variable)} lang="en" suppressHydrationWarning>
      <head />
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'GovernmentOrganization',
              name: 'Crete Township',
              alternateName: 'Crete Township Government',
              description: 'Official township government for Crete Township, Will County, Illinois.',
              url: siteUrl,
              logo: `${siteUrl}/crete-logo.jpeg`,
              image: `${siteUrl}/crete-town-hall.jpg`,
              telephone: '+1-708-672-8279',
              faxNumber: '+1-708-672-3327',
              email: 'administrator@cretetownship.com',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '1367 Wood Street',
                addressLocality: 'Crete',
                addressRegion: 'IL',
                postalCode: '60417',
                addressCountry: 'US',
              },
              openingHours: 'Mo-Fr 08:00-16:30',
              areaServed: {
                '@type': 'AdministrativeArea',
                name: 'Crete Township, Will County, Illinois',
              },
              sameAs: [
                'https://www.cretetownship.com',
              ],
            }),
          }}
        />
        <Providers>
          <AgendaAlertBarWrapper />
          <TownshipHeader />
          <main className="flex-1 min-h-screen bg-cream">
            {children}
          </main>
          <TownshipFooter />
          <ADAAccessibilityWidget />
        </Providers>
      </body>
    </html>
  )
}

const siteUrl = getServerSideURL()

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Crete Township | Will County, Illinois',
    template: '%s | Crete Township',
  },
  description: 'Official website of Crete Township, Will County, Illinois. Access board agendas, meeting minutes, financial reports, events, and township services.',
  keywords: ['Crete Township', 'Will County', 'Illinois', 'township government', 'board agendas', 'property assessment', 'road district', 'FOIA'],
  authors: [{ name: 'Crete Township' }],
  creator: 'Crete Township',
  publisher: 'Crete Township',
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    site: '@CreteTownship',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
}
