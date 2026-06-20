import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token')

  if (!token) {
    return htmlResponse(400, 'Invalid Link', 'This unsubscribe link is missing a token.', false)
  }

  try {
    const payload = await getPayload({ config })

    const result = await payload.find({
      collection: 'newsletter-subscribers',
      where: { unsubscribeToken: { equals: token } },
      limit: 1,
    })

    if (!result.docs.length) {
      return htmlResponse(
        404,
        'Link Not Found',
        'This unsubscribe link is invalid or has already been processed.',
        false,
      )
    }

    const subscriber = result.docs[0]

    if (subscriber.status === 'unsubscribed') {
      return htmlResponse(
        200,
        'Already Unsubscribed',
        'You have already been removed from our mailing list.',
        true,
      )
    }

    await payload.update({
      collection: 'newsletter-subscribers',
      id: subscriber.id,
      data: {
        status: 'unsubscribed',
        unsubscribedAt: new Date().toISOString(),
      },
    })

    return htmlResponse(
      200,
      'Successfully Unsubscribed',
      "You've been removed from Crete Township email notifications. You won't receive any more document notification emails.",
      true,
    )
  } catch (error) {
    console.error('Unsubscribe error:', error)
    return htmlResponse(
      500,
      'Something Went Wrong',
      'Please try again or contact administrator@cretetownship.com.',
      false,
    )
  }
}

function htmlResponse(status: number, title: string, message: string, success: boolean) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.cretetownship.com'
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} — Crete Township</title>
  <style>
    * { box-sizing: border-box; }
    body { margin: 0; padding: 0; font-family: Arial, sans-serif; background: #F8F5F0; }
    .header { background: #1B3A5C; border-bottom: 4px solid #C8960C; padding: 20px 32px; }
    .header span { color: #fff; font-size: 20px; font-weight: 700; }
    .card { max-width: 480px; margin: 60px auto; background: #fff; border-radius: 8px;
            border: 1px solid #E8EDF3; box-shadow: 0 2px 8px rgba(0,0,0,.06);
            padding: 40px; text-align: center; }
    .icon { font-size: 48px; margin-bottom: 16px; }
    h1 { color: #1B3A5C; font-size: 22px; margin: 0 0 12px; }
    p { color: #5A6478; line-height: 1.6; margin: 0 0 24px; font-size: 15px; }
    a.btn { display: inline-block; background: #1B3A5C; color: #fff; text-decoration: none;
            padding: 11px 26px; border-radius: 6px; font-size: 14px; font-weight: 600; }
  </style>
</head>
<body>
  <div class="header"><span>Crete Township</span></div>
  <div class="card">
    <div class="icon">${success ? '✅' : '❌'}</div>
    <h1>${title}</h1>
    <p>${message}</p>
    <a href="${siteUrl}" class="btn">Return to Website</a>
  </div>
</body>
</html>`

  return new NextResponse(html, {
    status,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  })
}
