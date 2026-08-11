import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'
import { AgendaAlertBar } from './AgendaAlertBar'
import { CMSAlertBanner } from './CMSAlertBanner'

/**
 * Fetches the CMS alert banner + next board meeting once per minute and
 * shares the result across all page renders.
 *
 * IMPORTANT: this component renders in the frontend layout, i.e. on every
 * page. It previously called unstable_noStore(), which forced EVERY page on
 * the site to be dynamically rendered on EVERY request (a DB round-trip per
 * pageview, including crawler traffic). Caching here is what allows the rest
 * of the site to be served statically. CMS changes to the banner appear
 * within ~60 seconds.
 */
const getAlertData = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    let banner: Record<string, unknown> | null = null
    let agenda: Record<string, unknown> | null = null

    try {
      banner = (await payload.findGlobal({ slug: 'alert-banner' })) as unknown as Record<string, unknown>
    } catch (error) {
      console.error('Error fetching alert banner:', error)
    }

    try {
      const result = await payload.find({
        collection: 'board-agendas',
        where: {
          and: [
            { status: { equals: 'published' } },
            { date: { greater_than_equal: today.toISOString() } },
          ],
        },
        sort: 'date',
        limit: 1,
      })
      agenda = (result.docs[0] as unknown as Record<string, unknown>) ?? null
    } catch (error) {
      console.error('Error fetching next agenda:', error)
    }

    return { banner, agenda }
  },
  ['alert-bar-data'],
  { revalidate: 60, tags: ['alert-banner'] },
)

export async function AgendaAlertBarWrapper() {
  const { banner, agenda } = await getAlertData()

  // Resolve CMS alert banner
  let cmsAlert: React.ReactNode = null
  if (banner) {
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
  if (agenda) {
    let fileUrl = ''
    if (agenda.file && typeof agenda.file === 'object' && 'url' in agenda.file) {
      fileUrl = (agenda.file as { url?: string }).url || ''
    }
    agendaBar = (
      <AgendaAlertBar
        agenda={{
          title: (agenda.title as string) || 'Board Meeting Agenda',
          date: (agenda.date as string) || '',
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
}
