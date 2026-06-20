import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function POST(request: NextRequest) {
  try {
    const payload = await getPayload({ config })
    const data = await request.json()

    // Create FOIA request in CMS
    const foiaRequest = await payload.create({
      collection: 'foia-requests',
      data: {
        ...data,
        submittedAt: new Date().toISOString(),
        status: 'new',
      },
    })

    // Get site settings for notification email
    const siteSettings = await payload.findGlobal({
      slug: 'site-settings',
    })

    const notificationEmail = siteSettings?.foiaNotificationEmail || 'administrator@cretetownship.com'

    // Send notification email to township
    await payload.sendEmail({
      to: notificationEmail,
      subject: `New FOIA Request from ${data.fullName}`,
      html: `
        <h2>New FOIA Request Received</h2>
        <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
        <hr />
        <h3>Requester Information</h3>
        <p><strong>Name:</strong> ${data.fullName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
        ${data.organization ? `<p><strong>Organization:</strong> ${data.organization}</p>` : ''}
        <p><strong>Preferred Format:</strong> ${data.preferredFormat}</p>
        ${data.street ? `<p><strong>Address:</strong> ${data.street}, ${data.city}, ${data.state} ${data.zipCode}</p>` : ''}

        <h3>Records Requested</h3>
        <p><strong>Description:</strong></p>
        <p>${data.recordsDescription}</p>
        <p><strong>Date Range:</strong> ${new Date(data.dateRangeStart).toLocaleDateString()} - ${new Date(data.dateRangeEnd).toLocaleDateString()}</p>

        <h3>Additional Information</h3>
        <p><strong>Commercial Purpose:</strong> ${data.commercialPurpose}</p>
        ${data.feeWaiverRequested ? `<p><strong>Fee Waiver Requested:</strong> Yes</p><p><strong>Justification:</strong> ${data.feeWaiverJustification}</p>` : ''}

        <hr />
        <p><a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin/collections/foia-requests/${foiaRequest.id}">View in Admin Panel</a></p>
      `,
    })

    // Send confirmation email to requester
    await payload.sendEmail({
      to: data.email,
      subject: 'FOIA Request Received - Crete Township',
      html: `
        <h2>Thank You for Your FOIA Request</h2>
        <p>Dear ${data.fullName},</p>
        <p>We have received your Freedom of Information Act request submitted on ${new Date().toLocaleDateString()}.</p>
        <p>Under Illinois FOIA law, we will respond to your request within 5 business days. You will be notified via email at ${data.email} regarding the status of your request.</p>

        <h3>Your Request Summary:</h3>
        <p><strong>Records Requested:</strong> ${data.recordsDescription}</p>
        <p><strong>Date Range:</strong> ${new Date(data.dateRangeStart).toLocaleDateString()} - ${new Date(data.dateRangeEnd).toLocaleDateString()}</p>
        <p><strong>Preferred Format:</strong> ${data.preferredFormat}</p>

        <p>If you have any questions, please contact us:</p>
        <ul>
          <li>Phone: 708-672-8279</li>
          <li>Email: administrator@cretetownship.com</li>
          <li>Address: 1367 Wood Street, Crete, IL 60417</li>
        </ul>

        <p>Thank you,<br />Crete Township</p>
      `,
    })

    return NextResponse.json({ success: true, id: foiaRequest.id })
  } catch (error) {
    console.error('FOIA submission error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to submit FOIA request' },
      { status: 500 }
    )
  }
}
