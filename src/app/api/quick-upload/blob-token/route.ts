import { NextResponse } from 'next/server'
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client'
import { getPayload } from 'payload'
import config from '@payload-config'

/**
 * Issues short-lived client-upload tokens for the dashboard's Quick Upload.
 * Files go browser → Vercel Blob directly, bypassing the serverless request
 * body limit that 413s large PDFs; /api/quick-upload then ingests by URL.
 */
export async function POST(request: Request): Promise<NextResponse> {
  const payload = await getPayload({ config })

  // Same gate as /api/quick-upload — only admin users may upload
  const { user } = await payload.auth({ headers: request.headers })
  if (!user || !['super-admin', 'township-admin', 'admin', 'editor'].includes((user as any).role)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = (await request.json()) as HandleUploadBody

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: [
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ],
        addRandomSuffix: true,
        // Temp staging area — quick-upload deletes the blob after ingesting it
        tokenPayload: String(user.id),
      }),
      onUploadCompleted: async () => {
        // Ingestion happens in /api/quick-upload once the client passes the URL
      },
    })
    return NextResponse.json(jsonResponse)
  } catch (error) {
    console.error('Quick upload token error:', error)
    return NextResponse.json({ error: 'Could not authorize upload' }, { status: 400 })
  }
}
