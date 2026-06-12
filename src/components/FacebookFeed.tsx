'use client'

import { useEffect } from 'react'

interface FacebookFeedProps {
  pageUrl?: string
  width?: number
  height?: number
}

export function FacebookFeed({
  pageUrl = 'https://www.facebook.com/profile.php?id=102522678698264',
  width = 500,
  height = 800
}: FacebookFeedProps) {
  useEffect(() => {
    // Load Facebook SDK
    if (typeof window !== 'undefined' && !(window as any).FB) {
      const script = document.createElement('script')
      script.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0'
      script.async = true
      script.defer = true
      script.crossOrigin = 'anonymous'
      document.body.appendChild(script)
    } else if ((window as any).FB) {
      // If SDK already loaded, parse the plugin
      ;(window as any).FB.XFBML.parse()
    }
  }, [])

  return (
    <div className="w-full overflow-hidden">
      <div id="fb-root"></div>

      {/* Facebook Page Plugin - displays recent posts in a grid-like timeline */}
      <div
        className="fb-page"
        data-href={pageUrl}
        data-tabs="timeline"
        data-width={width}
        data-height={height}
        data-small-header="false"
        data-adapt-container-width="true"
        data-hide-cover="false"
        data-show-facepile="false"
      >
        <blockquote cite={pageUrl} className="fb-xfbml-parse-ignore">
          <a href={pageUrl}>Crete Township</a>
        </blockquote>
      </div>
    </div>
  )
}
