'use client'

import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react'

interface FormData {
  fullName: string
  phone: string
  email: string
  streetAddress: string
  city: string
  residencyDuration: string
  assistanceType: string
  description: string
  consentGiven: boolean
}

const emptyForm: FormData = {
  fullName: '',
  phone: '',
  email: '',
  streetAddress: '',
  city: 'Crete',
  residencyDuration: '',
  assistanceType: '',
  description: '',
  consentGiven: false,
}

export default function InquiryForm() {
  const [formData, setFormData] = useState<FormData>(emptyForm)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [charCount, setCharCount] = useState(0)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    if (name === 'description') {
      setCharCount(value.length)
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      const response = await fetch('/api/ga-inquiry-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to submit inquiry')
      }

      setSubmitted(true)
      setFormData(emptyForm)
      setCharCount(0)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'There was an error submitting your inquiry. Please try again or call (708) 672-8279.'
      )
      console.error('GA inquiry submission error:', err)
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-8">
          <div className="flex items-start gap-4">
            <CheckCircle2 className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-display font-bold text-green-900 mb-2">
                Inquiry Submitted Successfully
              </h3>
              <p className="text-green-800 mb-4">
                Thank you for reaching out. A member of our staff will contact you within a few
                business days. You will also receive a confirmation email with next steps.
              </p>
              <p className="text-sm text-green-700 mb-4">
                <strong>Remember:</strong> This is a preliminary inquiry only. Please apply for all
                eligible state and federal benefits (SNAP, TANF, IDES) before your visit to the
                township office.
              </p>
              <p className="text-sm text-green-700">
                Questions? Call us at{' '}
                <a href="tel:708-672-8279" className="font-semibold text-green-900 underline">
                  (708) 672-8279
                </a>
              </p>
            </div>
          </div>
          <div className="mt-6">
            <Button
              onClick={() => setSubmitted(false)}
              variant="outline"
              className="border-green-700 text-green-800 hover:bg-green-100"
            >
              Submit Another Inquiry
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      {error && (
        <Card className="mb-6 bg-red-50 border-red-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-red-800">{error}</p>
            </div>
          </CardContent>
        </Card>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardContent className="p-8">
            <h3 className="text-xl font-display font-bold text-navy mb-6">Your Information</h3>

            <div className="space-y-5">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-semibold text-navy mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                  autoComplete="name"
                />
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-navy mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                    autoComplete="tel"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-navy mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                    autoComplete="email"
                  />
                  <p className="text-xs text-gray-500 mt-1">Confirmation will be sent here</p>
                </div>
              </div>

              {/* Address */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="md:col-span-2">
                  <label
                    htmlFor="streetAddress"
                    className="block text-sm font-semibold text-navy mb-2"
                  >
                    Street Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="streetAddress"
                    name="streetAddress"
                    required
                    value={formData.streetAddress}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                    autoComplete="street-address"
                  />
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm font-semibold text-navy mb-2">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                    autoComplete="address-level2"
                  />
                </div>
              </div>

              {/* Residency Duration */}
              <div>
                <label
                  htmlFor="residencyDuration"
                  className="block text-sm font-semibold text-navy mb-2"
                >
                  How long have you lived in Crete Township?{' '}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="residencyDuration"
                  name="residencyDuration"
                  required
                  placeholder="e.g. 2 years, 8 months"
                  value={formData.residencyDuration}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Township assistance requires 6 months of continuous residency.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-8">
            <h3 className="text-xl font-display font-bold text-navy mb-6">Your Request</h3>

            <div className="space-y-5">
              {/* Type of Assistance */}
              <div>
                <label
                  htmlFor="assistanceType"
                  className="block text-sm font-semibold text-navy mb-2"
                >
                  Type of Assistance Needed <span className="text-red-500">*</span>
                </label>
                <select
                  id="assistanceType"
                  name="assistanceType"
                  required
                  value={formData.assistanceType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                >
                  <option value="">— Select one —</option>
                  <option value="general">General Assistance — monthly help for basic needs</option>
                  <option value="emergency">
                    Emergency Assistance — life-threatening or jeopardizes employment (once per 12
                    months)
                  </option>
                </select>
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-semibold text-navy mb-2"
                >
                  Brief Description of Your Situation <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  rows={5}
                  maxLength={500}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Briefly describe your situation and the type of help you are seeking. Do not include Social Security numbers, bank account numbers, or income figures — those are collected on the formal in-person application."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                />
                <p className="text-xs text-gray-500 mt-1 text-right">{charCount}/500 characters</p>
              </div>

              {/* Privacy note */}
              <div className="bg-gold-pale border border-gold rounded-lg px-4 py-3">
                <p className="text-sm text-gray-700">
                  <strong className="text-navy">Privacy notice:</strong> Do not submit Social
                  Security numbers, bank account numbers, or detailed income information through this
                  form. Those details are collected only on the official in-person application.
                </p>
              </div>

              {/* Consent */}
              <div className="pt-2 border-t border-gray-200">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="consentGiven"
                    required
                    checked={formData.consentGiven}
                    onChange={handleChange}
                    className="w-4 h-4 text-gold focus:ring-gold mt-1 flex-shrink-0"
                  />
                  <span className="text-sm text-gray-700">
                    <span className="font-semibold text-navy">I understand</span> that this is an
                    inquiry only, not a formal application. The formal application requires in-person
                    submission to the township office with all original documents.{' '}
                    <span className="text-red-500">*</span>
                  </span>
                </label>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Button type="submit" size="lg" disabled={submitting} className="min-w-[220px]">
            {submitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit Inquiry'
            )}
          </Button>
        </div>
      </form>
    </>
  )
}
