import { NextResponse } from 'next/server'

const FACEBOOK_PAGE_ID = '102522678698264'
const FACEBOOK_ACCESS_TOKEN = process.env.FACEBOOK_ACCESS_TOKEN || ''

export async function GET() {
  try {
    // Fetch recent posts from Facebook Graph API
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${FACEBOOK_PAGE_ID}/posts?fields=id,message,created_time,permalink_url,full_picture&limit=5&access_token=${FACEBOOK_ACCESS_TOKEN}`,
      {
        next: { revalidate: 300 }, // Cache for 5 minutes
      }
    )

    if (!response.ok) {
      throw new Error(`Facebook API error: ${response.status}`)
    }

    const data = await response.json()

    // Transform the data for easier consumption
    const posts = data.data?.map((post: any) => ({
      id: post.id,
      message: post.message || '',
      createdTime: post.created_time,
      link: post.permalink_url,
      image: post.full_picture || null,
    })) || []

    return NextResponse.json({ posts, success: true })
  } catch (error) {
    console.error('Error fetching Facebook posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch Facebook posts', success: false },
      { status: 500 }
    )
  }
}
