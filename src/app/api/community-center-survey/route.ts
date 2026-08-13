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

    const survey = await payload.create({
      collection: 'community-center-surveys',
      data: {
        residentStatus: data.residentStatus || undefined,
        visitFrequency: data.visitFrequency || undefined,
        facilitiesUsed: data.facilitiesUsed?.join(', ') || undefined,
        overallRating: data.overallRating || undefined,
        cleanlinessRating: data.cleanlinessRating || undefined,
        staffRating: data.staffRating || undefined,
        valuePricingRating: data.valuePricingRating || undefined,
        programsInterest: data.programsInterest?.join(', ') || undefined,
        wouldRecommend: data.wouldRecommend || undefined,
        improvements: data.improvements || undefined,
        additionalComments: data.additionalComments || undefined,
        wantsUpdates: data.wantsUpdates || false,
        name: data.name || undefined,
        email: data.email || undefined,
        submittedAt: new Date().toISOString(),
      },
    })

    // Notify the Community Center of the new response
    const row = (label: string, value?: string | null) =>
      value
        ? `<tr><td style="padding: 6px 0; color: #666; width: 160px; vertical-align: top;"><strong>${label}:</strong></td><td style="padding: 6px 0;">${value}</td></tr>`
        : ''

    try {
    await payload.sendEmail({
      to: 'communitycenter@cretetownship.com',
      subject: 'New Community Center Survey Response',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1B3A5C; padding: 24px; border-radius: 8px 8px 0 0;">
            <h2 style="color: #C8960C; margin: 0; font-size: 20px;">New Survey Response</h2>
            <p style="color: #ffffff; margin: 4px 0 0; font-size: 14px;">Community Center Resident Survey</p>
          </div>
          <div style="background: #f9f9f9; border: 1px solid #e0e0e0; padding: 24px; border-radius: 0 0 8px 8px;">
            <table style="width: 100%; border-collapse: collapse;">
              ${row('Name', data.name)}
              ${row('Email', data.email)}
              ${row('Resident Status', data.residentStatus)}
              ${row('Visit Frequency', data.visitFrequency)}
              ${row('Facilities Used', data.facilitiesUsed?.join(', '))}
              ${row('Overall Rating', data.overallRating)}
              ${row('Cleanliness', data.cleanlinessRating)}
              ${row('Staff', data.staffRating)}
              ${row('Value / Pricing', data.valuePricingRating)}
              ${row('Program Interests', data.programsInterest?.join(', '))}
              ${row('Would Recommend', data.wouldRecommend)}
            </table>
            ${data.improvements ? `<hr style="border: none; border-top: 1px solid #e0e0e0; margin: 16px 0;" /><p style="color: #666; margin: 0 0 8px;"><strong>Suggested Improvements:</strong></p><div style="background: white; border: 1px solid #e0e0e0; padding: 16px; border-radius: 4px; white-space: pre-wrap;">${data.improvements}</div>` : ''}
            ${data.additionalComments ? `<hr style="border: none; border-top: 1px solid #e0e0e0; margin: 16px 0;" /><p style="color: #666; margin: 0 0 8px;"><strong>Additional Comments:</strong></p><div style="background: white; border: 1px solid #e0e0e0; padding: 16px; border-radius: 4px; white-space: pre-wrap;">${data.additionalComments}</div>` : ''}
            <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 16px 0;" />
            <p style="color: #999; font-size: 12px; margin: 0;">
              Submitted ${new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })} CT ·
              <a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin/collections/community-center-surveys/${survey.id}" style="color: #1B3A5C;">View in Admin</a>
            </p>
          </div>
        </div>
      `,
    })
    } catch (emailError) {
      // The survey response is already saved — don't fail the submission
      console.error('Survey notification email failed:', emailError)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Survey submission error:', error)
    return NextResponse.json({ error: 'Failed to submit survey.' }, { status: 500 })
  }
}
