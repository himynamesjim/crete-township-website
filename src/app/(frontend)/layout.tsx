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
      <head>
        {/* InitTheme disabled - government site uses light theme only */}
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          <TownshipHeader />
          <main className="flex-1 min-h-screen bg-cream">
            {children}
          </main>
          <TownshipFooter />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}
