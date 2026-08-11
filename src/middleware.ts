import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Passes the pathname to server components as a request header — required by
 * the payload-totp plugin to know which admin screen is being rendered.
 *
 * NOTE: the header must be set on the REQUEST (via NextResponse.next's
 * request option), not appended to the response — `headers()` in server
 * components only sees request headers. With the response-only variant the
 * plugin falls back to "/" for every page and redirects to the verify screen
 * in an infinite loop (endless spinner after entering the MFA code).
 */
export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-pathname', request.nextUrl.pathname)
  return NextResponse.next({ request: { headers: requestHeaders } })
}

export const config = {
  matcher: ['/admin/:path*', '/admin'],
}
