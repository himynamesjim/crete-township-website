'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Bell, CheckCircle2, Mail } from 'lucide-react'

interface NewsletterSignupProps {
  variant?: 'default' | 'compact' | 'sidebar'
  showCategories?: boolean
}

export function NewsletterSignup({ variant = 'default', showCategories = false }: NewsletterSignupProps) {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    categories: ['all'] as string[],
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleCategoryChange = (category: string) => {
    setFormData((prev) => {
      const categories = prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category]

      // If 'all' is selected, clear other categories
      if (category === 'all' && categories.includes('all')) {
        return { ...prev, categories: ['all'] }
      }
      // If other categories selected, remove 'all'
      if (category !== 'all' && categories.length > 0) {
        return { ...prev, categories: categories.filter(c => c !== 'all') }
      }

      return { ...prev, categories: categories.length > 0 ? categories : ['all'] }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/newsletter-subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe')
      }

      setSubmitted(true)
      setFormData({ email: '', firstName: '', lastName: '', categories: ['all'] })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-green-900 mb-1">
                Successfully Subscribed!
              </h3>
              <p className="text-sm text-green-800 mb-3">
                Thank you for subscribing. You'll receive email notifications when new documents are posted.
              </p>
              <Button
                onClick={() => setSubmitted(false)}
                variant="outline"
                size="sm"
                className="text-green-700 border-green-300 hover:bg-green-100"
              >
                Subscribe Another Email
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Compact variant for sidebar
  if (variant === 'compact' || variant === 'sidebar') {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <Bell className="w-5 h-5 text-gold" />
            <h3 className="font-display font-bold text-navy text-lg">
              Get Document Notifications
            </h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Subscribe to receive email notifications when new documents are posted.
          </p>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              name="email"
              placeholder="Your email address"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
            />
            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}
            <Button
              type="submit"
              disabled={loading}
              className="w-full"
              size="sm"
            >
              {loading ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </form>
        </CardContent>
      </Card>
    )
  }

  // Default variant - full form with categories
  return (
    <Card>
      <CardContent className="p-8">
        <p className="text-gray-600 mb-6">
          Subscribe to receive email notifications when new documents, agendas, minutes, and other important information is posted.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-semibold text-navy mb-2">
                First Name <span className="text-gray-400 font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="John"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-semibold text-navy mb-2">
                Last Name <span className="text-gray-400 font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Doe"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-navy mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="your.email@example.com"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
            />
          </div>

          {showCategories && (
            <div>
              <label className="block text-sm font-semibold text-navy mb-3">
                Notification Preferences
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { label: 'All Documents', value: 'all' },
                  { label: 'Board Agendas', value: 'board-agendas' },
                  { label: 'Meeting Minutes', value: 'meeting-minutes' },
                  { label: 'Financial Reports', value: 'financial-reports' },
                  { label: 'Assessor Documents', value: 'assessor-documents' },
                  { label: 'Road District Reports', value: 'road-district-reports' },
                  { label: 'Newsletters', value: 'newsletters' },
                  { label: 'Events', value: 'events' },
                  { label: 'Announcements', value: 'announcements' },
                ].map((category) => (
                  <label
                    key={category.value}
                    className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    <input
                      type="checkbox"
                      checked={formData.categories.includes(category.value)}
                      onChange={() => handleCategoryChange(category.value)}
                      className="w-4 h-4 text-gold border-gray-300 rounded focus:ring-gold"
                    />
                    <span className="text-sm text-gray-700">{category.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Subscribing...' : 'Subscribe to Notifications'}
          </Button>

          <p className="text-xs text-gray-500 text-center">
            You can unsubscribe at any time. We'll never share your email address.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
