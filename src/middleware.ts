import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Passes the pathname to server components as a header — required by the
 * payload-totp plugin to avoid a redirect loop on the admin TOTP screens.
 */
export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  response.headers.append('x-pathname', request.nextUrl.pathname)
  return response
}
