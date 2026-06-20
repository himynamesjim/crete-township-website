import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const payload = await getPayload({ config })
    const data = await request.json()

    // Validate email
    if (!data.email || !data.email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid email address' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const existingSubscriber = await payload.find({
      collection: 'newsletter-subscribers',
      where: {
        email: {
          equals: data.email.toLowerCase(),
        },
      },
      limit: 1,
    })

    if (existingSubscriber.docs.length > 0) {
      const subscriber = existingSubscriber.docs[0]

      // If previously unsubscribed, allow re-subscription
      if (subscriber.status === 'unsubscribed') {
        await payload.update({
          collection: 'newsletter-subscribers',
          id: subscriber.id,
          data: {
            status: 'active',
            subscribedAt: new Date().toISOString(),
            categories: data.categories || ['all'],
            firstName: data.firstName || subscriber.firstName,
            lastName: data.lastName || subscriber.lastName,
          },
        })

        // Send re-subscription confirmation email
        await payload.sendEmail({
          to: data.email,
          subject: 'Welcome Back - Crete Township Document Notifications',
          html: `
            <h2>Welcome Back!</h2>
            <p>Hi${data.firstName ? ` ${data.firstName}` : ''},</p>
            <p>You've successfully resubscribed to Crete Township document notifications.</p>
            <p><strong>Your notification preferences:</strong></p>
            <ul>
              ${(data.categories || ['all']).map((cat: string) => {
                const labels: Record<string, string> = {
                  'all': 'All Documents',
                  'board-agendas': 'Board Agendas',
                  'meeting-minutes': 'Meeting Minutes',
                  'financial-reports': 'Financial Reports',
                  'assessor-documents': 'Assessor Documents',
                  'road-district-reports': 'Road District Reports',
                  'newsletters': 'Newsletters',
                  'events': 'Events',
                  'announcements': 'Announcements',
                }
                return `<li>${labels[cat] || cat}</li>`
              }).join('')}
            </ul>
            <p>You'll receive notifications when new documents matching your preferences are posted.</p>
            <hr />
            <p style="font-size: 12px; color: #666;">
              To unsubscribe, <a href="${process.env.NEXT_PUBLIC_SITE_URL}/unsubscribe?token=${subscriber.unsubscribeToken}">click here</a>.
            </p>
          `,
        })

        return NextResponse.json({ success: true, message: 'Welcome back! You are now resubscribed.' })
      }

      return NextResponse.json(
        { success: false, error: 'This email is already subscribed' },
        { status: 400 }
      )
    }

    // Generate unique unsubscribe token
    const unsubscribeToken = crypto.randomBytes(32).toString('hex')

    // Get client IP address
    const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'

    // Create new subscriber
    const subscriber = await payload.create({
      collection: 'newsletter-subscribers',
      data: {
        email: data.email.toLowerCase(),
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        categories: data.categories || ['all'],
        status: 'active',
        subscribedAt: new Date().toISOString(),
        unsubscribeToken,
        ipAddress,
      },
    })

    // Send welcome email
    await payload.sendEmail({
      to: data.email,
      subject: 'Subscription Confirmed - Crete Township Document Notifications',
      html: `
        <h2>Welcome to Crete Township Notifications!</h2>
        <p>Hi${data.firstName ? ` ${data.firstName}` : ''},</p>
        <p>Thank you for subscribing to receive notifications from Crete Township. You'll now receive email updates when new documents are posted.</p>

        <p><strong>Your notification preferences:</strong></p>
        <ul>
          ${(data.categories || ['all']).map((cat: string) => {
            const labels: Record<string, string> = {
              'all': 'All Documents',
              'board-agendas': 'Board Agendas',
              'meeting-minutes': 'Meeting Minutes',
              'financial-reports': 'Financial Reports',
              'assessor-documents': 'Assessor Documents',
              'road-district-reports': 'Road District Reports',
              'newsletters': 'Newsletters',
              'events': 'Events',
              'announcements': 'Announcements',
            }
            return `<li>${labels[cat] || cat}</li>`
          }).join('')}
        </ul>

        <p>We'll keep you informed about important township documents and updates.</p>

        <hr />
        <p style="font-size: 14px;">
          <strong>Contact Information:</strong><br />
          Crete Township<br />
          1367 Wood Street<br />
          Crete, IL 60417<br />
          Phone: 708-672-8279<br />
          Email: administrator@cretetownship.com
        </p>

        <hr />
        <p style="font-size: 12px; color: #666;">
          To unsubscribe at any time, <a href="${process.env.NEXT_PUBLIC_SITE_URL}/unsubscribe?token=${unsubscribeToken}">click here</a>.
        </p>
      `,
    })

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed! Check your email for confirmation.',
      id: subscriber.id
    })
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    )
  }
}
