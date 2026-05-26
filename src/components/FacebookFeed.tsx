'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { ExternalLink } from 'lucide-react'
import Link from 'next/link'

interface FacebookPost {
  id: string
  message: string
  createdTime: string
  link: string
  image: string | null
}

export function FacebookFeed() {
  const [posts, setPosts] = useState<FacebookPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('/api/facebook-feed')
        const data = await response.json()

        if (data.success && data.posts) {
          setPosts(data.posts)
        } else {
          setError(true)
        }
      } catch (err) {
        console.error('Error fetching Facebook posts:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffHours / 24)

    if (diffHours < 24) {
      return diffHours === 1 ? '1 hour ago' : `${diffHours} hours ago`
    } else if (diffDays < 7) {
      return diffDays === 1 ? '1 day ago' : `${diffDays} days ago`
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
      })
    }
  }

  const truncateText = (text: string, maxLength: number = 120) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength).trim() + '...'
  }

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-4">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error || posts.length === 0) {
    return (
      <Card>
        <CardContent className="p-4 text-center text-sm text-gray-500">
          Unable to load Facebook posts at this time.
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-3">
      {posts.map((post) => (
        <Card key={post.id} className="hover:border-gold transition-colors">
          <CardContent className="p-4">
            {post.image && (
              <div className="mb-3 -mx-4 -mt-4">
                <img
                  src={post.image}
                  alt=""
                  className="w-full h-32 object-cover rounded-t-lg"
                />
              </div>
            )}
            <p className="text-sm text-gray-600 mb-2 leading-relaxed">
              {truncateText(post.message)}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">
                {formatDate(post.createdTime)}
              </span>
              <Link
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gold hover:text-gold-light font-medium flex items-center gap-1"
              >
                View on Facebook
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
