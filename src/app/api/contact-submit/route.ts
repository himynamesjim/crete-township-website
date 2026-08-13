import { NextRequest, NextResponse } from 'next/server'
import { checkBotId } from 'botid/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function POST(request: NextRequest) {
  // Reject automated submissions (Vercel BotID; always passes in local dev)
  const verification = await checkBotId()
  if (verification.isBot) {
    return NextResponse.json({ error: 'Access denied' }, { status: 403 })
  }

  try {
    const payload = await getPayload({ config })
    const data = await request.json()

    const { name, email, phone, topicId, message } = data

    if (!name || !email || !topicId || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Fetch the selected contact topic from CMS
    const topic = await payload.findByID({
      collection: 'contact-topics',
      id: topicId,
    })

    if (!topic) {
      return NextResponse.json({ error: 'Invalid topic selected' }, { status: 400 })
    }

    const routedTo = 'administrator@cretetownship.com'
    const ccRecipients = ['jim.buiter@cretetownship.com', 'michael.liccar@cretetownship.com']
    const topicLabel = topic.label as string

    // Save inquiry to CMS
    const inquiry = await payload.create({
      collection: 'contact-inquiries',
      data: {
        name,
        email,
        phone: phone || undefined,
        topic: topicLabel,
        routedTo,
        message,
        submittedAt: new Date().toISOString(),
        status: 'new',
      },
    })

    // Notify the township administrator (supervisor and clerk copied)
    await payload.sendEmail({
      to: routedTo,
      cc: ccRecipients,
      replyTo: email,
      subject: `Website Contact Form — ${topicLabel}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1B3A5C; padding: 24px; border-radius: 8px 8px 0 0;">
            <h2 style="color: #C8960C; margin: 0; font-size: 20px;">New Contact Form Submission</h2>
            <p style="color: #ffffff; margin: 4px 0 0; font-size: 14px;">Crete Township Website</p>
          </div>
          <div style="background: #f9f9f9; border: 1px solid #e0e0e0; padding: 24px; border-radius: 0 0 8px 8px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 6px 0; color: #666; width: 120px;"><strong>Topic:</strong></td><td style="padding: 6px 0;">${topicLabel}</td></tr>
              <tr><td style="padding: 6px 0; color: #666;"><strong>Name:</strong></td><td style="padding: 6px 0;">${name}</td></tr>
              <tr><td style="padding: 6px 0; color: #666;"><strong>Email:</strong></td><td style="padding: 6px 0;"><a href="mailto:${email}">${email}</a></td></tr>
              ${phone ? `<tr><td style="padding: 6px 0; color: #666;"><strong>Phone:</strong></td><td style="padding: 6px 0;"><a href="tel:${phone}">${phone}</a></td></tr>` : ''}
            </table>
            <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 16px 0;" />
            <p style="color: #666; margin: 0 0 8px;"><strong>Message:</strong></p>
            <div style="background: white; border: 1px solid #e0e0e0; padding: 16px; border-radius: 4px; white-space: pre-wrap;">${message}</div>
            <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 16px 0;" />
            <p style="color: #999; font-size: 12px; margin: 0;">
              Submitted ${new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })} CT ·
              <a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin/collections/contact-inquiries/${inquiry.id}" style="color: #1B3A5C;">View in Admin</a>
            </p>
          </div>
        </div>
      `,
    })

    // Send confirmation to resident
    await payload.sendEmail({
      to: email,
      subject: `We received your message — Crete Township`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1B3A5C; padding: 24px; border-radius: 8px 8px 0 0;">
            <h2 style="color: #C8960C; margin: 0; font-size: 20px;">Message Received</h2>
            <p style="color: #ffffff; margin: 4px 0 0; font-size: 14px;">Crete Township — Will County, Illinois</p>
          </div>
          <div style="background: #f9f9f9; border: 1px solid #e0e0e0; padding: 24px; border-radius: 0 0 8px 8px;">
            <p>Hello ${name},</p>
            <p>Thank you for contacting Crete Township. We have received your message regarding <strong>${topicLabel}</strong> and will respond as soon as possible.</p>
            <div style="background: white; border-left: 4px solid #C8960C; padding: 12px 16px; margin: 16px 0; border-radius: 0 4px 4px 0;">
              <p style="margin: 0; color: #666; font-size: 14px; white-space: pre-wrap;">${message}</p>
            </div>
            <p>If your matter is urgent, please call the Township Office directly at <strong>(708) 672-8279</strong>.</p>
            <p style="color: #666; font-size: 13px; margin-top: 24px;">
              Crete Township · 1367 Wood Street · Crete, IL 60417<br />
              Phone: 708-672-8279 · Fax: 708-672-3327
            </p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true, id: inquiry.id })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Failed to submit. Please call us at 708-672-8279.' }, { status: 500 })
  }
}
