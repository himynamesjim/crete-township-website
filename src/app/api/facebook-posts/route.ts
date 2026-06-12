import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const pageId = '102522678698264'
    let accessToken = process.env.FACEBOOK_ACCESS_TOKEN

    // If no access token, try to generate one from App ID + App Secret
    if (!accessToken) {
      const appId = process.env.FACEBOOK_APP_ID
      const appSecret = process.env.FACEBOOK_APP_SECRET

      if (appId && appSecret) {
        // Generate app access token
        const tokenUrl = `https://graph.facebook.com/oauth/access_token?client_id=${appId}&client_secret=${appSecret}&grant_type=client_credentials`
        const tokenResponse = await fetch(tokenUrl)

        if (tokenResponse.ok) {
          const tokenData = await tokenResponse.json()
          accessToken = tokenData.access_token
        }
      }
    }

    if (!accessToken) {
      // Return mock data if no access token (for development)
      return NextResponse.json({
        posts: [
          {
            id: '1',
            message: 'Chris Manola is back at the Crete Township Community Center & offering sound meditation sessions. Allow Chris to bring a bit of peace to your life, and help calm your nervous system.\n\nThe next session is Monday, June 29 from 7-9 p.m, at the Crete Township Community Center.',
            created_time: '2026-06-10T10:00:00+0000',
            permalink_url: 'https://www.facebook.com/102522678698264',
            full_picture: null,
            likes: { summary: { total_count: 3 } },
            comments: { summary: { total_count: 0 } },
            shares: { count: 0 }
          },
          {
            id: '2',
            message: 'Join Sandi\'s "Craft of the Month" at the Crete Township Community Center!!\n\nCreate this crushed glass American Flag on an 8x10 white or oak wood frame. $45.00\n\n~Wednesday, June 24th at 6:30pm\nEMAIL sandi.smigel@gmail.com to register.\n\nPerfect decoration for July 4th & our country\'s 250th anniversary! ❤️ 💙',
            created_time: '2026-06-08T14:30:00+0000',
            permalink_url: 'https://www.facebook.com/102522678698264',
            full_picture: null,
            likes: { summary: { total_count: 5 } },
            comments: { summary: { total_count: 2 } },
            shares: { count: 1 }
          },
          {
            id: '3',
            message: 'Township Board Meeting tonight at 7:00 PM. All residents are welcome to attend. Agenda available on our website.',
            created_time: '2026-06-05T12:00:00+0000',
            permalink_url: 'https://www.facebook.com/102522678698264',
            full_picture: null,
            likes: { summary: { total_count: 12 } },
            comments: { summary: { total_count: 3 } },
            shares: { count: 2 }
          },
        ]
      })
    }

    // Fetch posts from Facebook Graph API
    const fields = 'id,message,created_time,permalink_url,full_picture,attachments{media,type,url},likes.summary(true),comments.summary(true),shares'
    const url = `https://graph.facebook.com/v18.0/${pageId}/posts?fields=${fields}&access_token=${accessToken}&limit=6`

    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Facebook API error: ${response.status}`)
    }

    const data = await response.json()

    return NextResponse.json({
      posts: data.data || []
    })

  } catch (error) {
    console.error('Error fetching Facebook posts:', error)

    // Return empty array on error
    return NextResponse.json({
      posts: []
    }, { status: 500 })
  }
}
