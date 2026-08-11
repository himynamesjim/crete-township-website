import type { EmailAdapter } from 'payload'

/**
 * Payload email adapter backed by the Mailgun REST API (no SDK).
 * Makes every `payload.sendEmail()` call — form notifications, admin
 * password resets, etc. — send through Mailgun. Falls back to a console
 * warning when MAILGUN_* env vars are absent (e.g. local dev without keys).
 */

const toList = (value: unknown): string | undefined => {
  if (!value) return undefined
  if (Array.isArray(value)) {
    return value
      .map((v) => (typeof v === 'string' ? v : (v as { address?: string })?.address))
      .filter(Boolean)
      .join(', ')
  }
  if (typeof value === 'string') return value
  return (value as { address?: string })?.address
}

export const mailgunAdapter = (): EmailAdapter<unknown> => {
  return () => ({
    name: 'mailgun-rest',
    defaultFromAddress: process.env.MAILGUN_FROM_EMAIL?.match(/<(.+)>/)?.[1]
      ?? `noreply@${process.env.MAILGUN_DOMAIN ?? 'cretetownship.com'}`,
    defaultFromName: 'Crete Township',
    sendEmail: async (message) => {
      const apiKey = process.env.MAILGUN_API_KEY
      const domain = process.env.MAILGUN_DOMAIN

      const to = toList(message.to)
      if (!apiKey || !domain) {
        console.warn('[Mailgun] Not configured — skipping email to:', to)
        return
      }

      const body = new URLSearchParams({
        from: toList(message.from) || process.env.MAILGUN_FROM_EMAIL || `Crete Township <noreply@${domain}>`,
        to: to || '',
        subject: message.subject || '',
      })
      if (message.html) body.set('html', String(message.html))
      if (message.text) body.set('text', String(message.text))
      const cc = toList(message.cc)
      if (cc) body.set('cc', cc)
      const bcc = toList(message.bcc)
      if (bcc) body.set('bcc', bcc)
      const replyTo = toList(message.replyTo)
      if (replyTo) body.set('h:Reply-To', replyTo)

      const response = await fetch(`https://api.mailgun.net/v3/${domain}/messages`, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${Buffer.from(`api:${apiKey}`).toString('base64')}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body.toString(),
      })

      if (!response.ok) {
        const text = await response.text()
        throw new Error(`Mailgun ${response.status}: ${text}`)
      }

      return response.json()
    },
  })
}
