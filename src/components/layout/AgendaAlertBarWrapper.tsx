import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_noStore as noStore } from 'next/cache'
import { AgendaAlertBar } from './AgendaAlertBar'
import { CMSAlertBanner } from './CMSAlertBanner'

export async function AgendaAlertBarWrapper() {
  noStore()
  try {
    const payload = await getPayload({ config })
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const [alertBannerResult, agendaResult] = await Promise.allSettled([
      payload.findGlobal({ slug: 'alert-banner' }),
      payload.find({
        collection: 'board-agendas',
        where: {
          and: [
            { status: { equals: 'published' } },
            { date: { greater_than_equal: today.toISOString() } },
          ],
        },
        sort: 'date',
        limit: 1,
      }),
    ])

    // Resolve CMS alert banner
    let cmsAlert: React.ReactNode = null
    if (alertBannerResult.status === 'fulfilled') {
      const banner = alertBannerResult.value as Record<string, unknown>
      const enabled = banner.enabled as boolean
      const expiresAt = banner.expiresAt as string | null
      const notExpired = !expiresAt || new Date(expiresAt) > new Date()
      if (enabled && notExpired) {
        const link = banner.link as { url?: string; text?: string } | null
        cmsAlert = (
          <CMSAlertBanner
            message={banner.message as string}
            type={(banner.type as 'info' | 'warning' | 'emergency' | 'success') ?? 'info'}
            linkUrl={link?.url ?? null}
            linkText={link?.text ?? null}
          />
        )
      }
    }

    // Resolve agenda bar
    let agendaBar: React.ReactNode = null
    if (agendaResult.status === 'fulfilled' && agendaResult.value.docs?.length > 0) {
      const agenda = agendaResult.value.docs[0]
      let fileUrl = ''
      if (agenda.file && typeof agenda.file === 'object' && 'url' in agenda.file) {
        fileUrl = (agenda.file as { url?: string }).url || ''
      }
      agendaBar = (
        <AgendaAlertBar
          agenda={{
            title: agenda.title || 'Board Meeting Agenda',
            date: agenda.date || '',
            fileUrl,
            meetingTime: (agenda.meetingTime as string) || undefined,
            location: (agenda.location as string) || undefined,
          }}
        />
      )
    }

    if (!cmsAlert && !agendaBar) return null

    return (
      <>
        {cmsAlert}
        {agendaBar}
      </>
    )
  } catch (error) {
    console.error('Error fetching alert banners:', error)
    return null
  }
}
