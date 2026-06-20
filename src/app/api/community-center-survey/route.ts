import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function POST(request: NextRequest) {
  try {
    const payload = await getPayload({ config })
    const data = await request.json()

    await payload.create({
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

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Survey submission error:', error)
    return NextResponse.json({ error: 'Failed to submit survey.' }, { status: 500 })
  }
}
