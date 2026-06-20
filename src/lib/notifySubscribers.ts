import type { Payload } from 'payload'
import { sendMailgunEmail } from './mailgun'

export interface NotifyOptions {
  payload: Payload
  category:
    | 'board-agendas'
    | 'meeting-minutes'
    | 'financial-reports'
    | 'assessor-documents'
    | 'road-district-reports'
    | 'newsletters'
    | 'events'
    | 'announcements'
  collectionLabel: string
  title: string
  date?: string | null
  description?: string | null
  viewPath: string
}

export async function notifySubscribers({
  payload,
  category,
  collectionLabel,
  title,
  date,
  description,
  viewPath,
}: NotifyOptions): Promise<void> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.cretetownship.com'
  const viewUrl = `${siteUrl}${viewPath}`

  // Find all active subscribers for this category or 'all'
  const result = await payload.find({
    collection: 'newsletter-subscribers',
    where: {
      and: [
        { status: { equals: 'active' } },
        {
          or: [
            { categories: { in: [category] } },
            { categories: { in: ['all'] } },
          ],
        },
      ],
    },
    limit: 1000,
    pagination: false,
  })

  if (!result.docs.length) {
    payload.logger.info(`[Notify] No active subscribers for "${category}"`)
    return
  }

  payload.logger.info(
    `[Notify] Sending "${collectionLabel}" notification to ${result.docs.length} subscriber(s)`,
  )

  const formattedDate = date
    ? new Date(date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'America/Chicago',
      })
    : null

  const subject = `New ${collectionLabel} Posted — Crete Township`

  // Fire all sends concurrently; log individual failures without aborting
  const sends = await Promise.allSettled(
    result.docs.map(async (subscriber) => {
      const unsubscribeUrl = `${siteUrl}/api/newsletter-unsubscribe?token=${subscriber.unsubscribeToken}`
      const html = buildEmailHtml({
        firstName: subscriber.firstName || null,
        collectionLabel,
        title,
        formattedDate,
        description: description || null,
        viewUrl,
        unsubscribeUrl,
        siteUrl,
      })
      await sendMailgunEmail({ to: subscriber.email, subject, html })
    }),
  )

  const failed = sends.filter((r) => r.status === 'rejected') as PromiseRejectedResult[]
  if (failed.length) {
    failed.forEach((f) =>
      payload.logger.error({ err: f.reason, message: `[Notify] Email send failed` }),
    )
  }
  payload.logger.info(
    `[Notify] ${sends.length - failed.length}/${sends.length} emails sent for "${category}"`,
  )
}

function buildEmailHtml({
  firstName,
  collectionLabel,
  title,
  formattedDate,
  description,
  viewUrl,
  unsubscribeUrl,
  siteUrl,
}: {
  firstName: string | null
  collectionLabel: string
  title: string
  formattedDate: string | null
  description: string | null
  viewUrl: string
  unsubscribeUrl: string
  siteUrl: string
}) {
  const greeting = firstName ? `Hi ${firstName},` : 'Hello,'

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background:#F8F5F0;font-family:Arial,sans-serif;color:#2C3444;">

  <!-- Header -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#1B3A5C;border-bottom:4px solid #C8960C;">
    <tr>
      <td style="padding:22px 32px;">
        <a href="${siteUrl}" style="text-decoration:none;">
          <span style="font-size:20px;font-weight:700;color:#ffffff;font-family:Georgia,serif;">Crete Township</span>
          <br>
          <span style="font-size:11px;color:#9BA5B5;letter-spacing:0.08em;text-transform:uppercase;">Will County, Illinois</span>
        </a>
      </td>
    </tr>
  </table>

  <!-- Body -->
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td style="padding:32px 16px;">
        <table width="600" cellpadding="0" cellspacing="0" align="center"
          style="max-width:600px;width:100%;background:#ffffff;border-radius:8px;border:1px solid #E8EDF3;box-shadow:0 2px 8px rgba(0,0,0,0.06);">

          <!-- Category label -->
          <tr>
            <td style="padding:28px 32px 0;">
              <span style="display:inline-block;background:#E8EDF3;color:#1B3A5C;font-size:11px;font-weight:600;letter-spacing:0.07em;text-transform:uppercase;padding:4px 12px;border-radius:20px;">
                ${collectionLabel}
              </span>
            </td>
          </tr>

          <!-- Title -->
          <tr>
            <td style="padding:14px 32px 0;">
              <h1 style="margin:0;font-size:22px;font-weight:700;color:#1B3A5C;font-family:Georgia,serif;line-height:1.3;">
                ${title}
              </h1>
            </td>
          </tr>

          ${
            formattedDate
              ? `<tr>
            <td style="padding:10px 32px 0;">
              <p style="margin:0;font-size:14px;color:#9BA5B5;">&#128197; ${formattedDate}</p>
            </td>
          </tr>`
              : ''
          }

          <!-- Greeting + body text -->
          <tr>
            <td style="padding:20px 32px 0;">
              <p style="margin:0;font-size:15px;color:#5A6478;line-height:1.6;">
                ${greeting}<br><br>
                A new <strong>${collectionLabel}</strong> has been posted on the Crete Township website.
                ${description ? `<br><br>${description}` : ''}
              </p>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:28px 32px 32px;">
              <a href="${viewUrl}"
                style="display:inline-block;background:#C8960C;color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;padding:13px 28px;border-radius:6px;">
                View Document &#8594;
              </a>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:0 32px;">
              <hr style="border:none;border-top:1px solid #E8EDF3;margin:0;" />
            </td>
          </tr>

          <!-- Unsubscribe footer -->
          <tr>
            <td style="padding:18px 32px 26px;">
              <p style="margin:0;font-size:12px;color:#9BA5B5;line-height:1.5;">
                You're receiving this because you subscribed to Crete Township document notifications.
                To stop receiving these emails,
                <a href="${unsubscribeUrl}" style="color:#9BA5B5;text-decoration:underline;">unsubscribe here</a>.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

  <!-- Footer -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0F2540;">
    <tr>
      <td style="padding:20px 32px;text-align:center;">
        <p style="margin:0;font-size:12px;color:#9BA5B5;line-height:1.6;">
          Crete Township &middot; 1367 Wood Street &middot; Crete, IL 60417<br>
          708-672-8279 &middot;
          <a href="${siteUrl}" style="color:#9BA5B5;text-decoration:none;">cretetownship.com</a>
        </p>
      </td>
    </tr>
  </table>

</body>
</html>`
}
