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

    // Create GA inquiry record in CMS
    const inquiry = await payload.create({
      collection: 'ga-inquiries',
      data: {
        fullName: data.fullName,
        phone: data.phone,
        email: data.email,
        streetAddress: data.streetAddress,
        city: data.city,
        residencyDuration: data.residencyDuration,
        assistanceType: data.assistanceType,
        description: data.description,
        consentGiven: data.consentGiven,
        submittedAt: new Date().toISOString(),
        status: 'new',
      },
    })

    const assistanceLabel =
      data.assistanceType === 'emergency'
        ? 'Emergency Assistance (life-threatening / jeopardizes employment)'
        : 'General Assistance (monthly help for basic needs)'

    // Send notification email to township General Assistance office
    await payload.sendEmail({
      to: 'administrator@cretetownship.com',
      subject: `New General Assistance Inquiry from ${data.fullName}`,
      html: `
        <h2>New General Assistance Inquiry</h2>
        <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
        <hr />
        <h3>Applicant Information</h3>
        <p><strong>Name:</strong> ${data.fullName}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Address:</strong> ${data.streetAddress}, ${data.city}</p>
        <p><strong>Crete Township Resident For:</strong> ${data.residencyDuration}</p>
        <p><strong>Type of Assistance:</strong> ${assistanceLabel}</p>
        <h3>Situation Description</h3>
        <p>${data.description.replace(/\n/g, '<br />')}</p>
        <hr />
        <p><strong>Note:</strong> This is a preliminary inquiry only. The formal application must be submitted in person with all required original documents.</p>
        <p><a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin/collections/ga-inquiries/${inquiry.id}">View in Admin Panel</a></p>
      `,
    })

    // Send confirmation email to applicant
    await payload.sendEmail({
      to: data.email,
      subject: 'General Assistance Inquiry Received - Crete Township',
      html: `
        <h2>Thank You for Contacting Crete Township</h2>
        <p>Dear ${data.fullName},</p>
        <p>We have received your General Assistance inquiry submitted on ${new Date().toLocaleDateString()}. A member of our staff will contact you within a few business days.</p>

        <h3>Important Next Steps</h3>
        <ul>
          <li><strong>This is an inquiry only</strong> — it is not a formal application. Crete Township General Assistance requires an in-person application with all original documents.</li>
          <li>You must apply for all eligible state and federal benefits (SNAP, TANF, IDES) <em>before</em> Township assistance can be considered. Please visit <a href="https://abe.illinois.gov">abe.illinois.gov</a> if you have not already done so.</li>
          <li>Gather the required documents listed at our office or on our website before your visit.</li>
        </ul>

        <h3>Contact Our Office</h3>
        <ul>
          <li><strong>Phone:</strong> (708) 672-8279</li>
          <li><strong>Email:</strong> administrator@cretetownship.com</li>
          <li><strong>Address:</strong> 1367 Wood Street, Crete, IL 60417</li>
          <li><strong>Hours:</strong> Monday–Friday, please call ahead</li>
        </ul>

        <p>Thank you,<br />Crete Township General Assistance Office</p>
      `,
    })

    return NextResponse.json({ success: true, id: inquiry.id })
  } catch (error) {
    console.error('GA inquiry submission error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to submit inquiry. Please try again or call (708) 672-8279.' },
      { status: 500 }
    )
  }
}
