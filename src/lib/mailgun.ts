interface MailgunOptions {
  to: string
  subject: string
  html: string
}

export async function sendMailgunEmail({ to, subject, html }: MailgunOptions): Promise<void> {
  const apiKey = process.env.MAILGUN_API_KEY
  const domain = process.env.MAILGUN_DOMAIN
  const from = process.env.MAILGUN_FROM_EMAIL || `Crete Township <noreply@${domain}>`

  if (!apiKey || !domain) {
    console.warn('[Mailgun] Not configured — skipping email to:', to)
    return
  }

  const body = new URLSearchParams({ from, to, subject, html })

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
}
