'use client'

import { useEffect, useRef } from 'react'

interface JotFormEmbedProps {
  formId: string
  title?: string
  className?: string
}

export function JotFormEmbed({ formId, title = 'JotForm', className = '' }: JotFormEmbedProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    // Listen for JotForm postMessage resize events
    const handleMessage = (e: MessageEvent) => {
      if (typeof e.data === 'object' && e.data?.action === 'setHeight' && iframeRef.current) {
        iframeRef.current.style.height = `${e.data.value}px`
      }
      // Also handle the older string-based format
      if (typeof e.data === 'string' && e.data.startsWith('setHeight:') && iframeRef.current) {
        const height = e.data.split(':')[1]
        if (height) iframeRef.current.style.height = `${height}px`
      }
    }
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  return (
    <iframe
      ref={iframeRef}
      id={`JotFormIFrame-${formId}`}
      title={title}
      src={`https://form.jotform.com/${formId}`}
      className={`w-full border-0 ${className}`}
      style={{ minHeight: 600 }}
      scrolling="no"
      allowFullScreen
    />
  )
}
