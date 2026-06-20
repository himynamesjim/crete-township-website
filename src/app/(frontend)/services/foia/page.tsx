'use client'

import React, { useState } from 'react'
import { PageHero } from '@/components/PageHero'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react'

export default function FOIARequestPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    organization: '',
    email: '',
    phone: '',
    preferredFormat: 'electronic',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    recordsDescription: '',
    dateRangeStart: '',
    dateRangeEnd: '',
    commercialPurpose: '',
    feeWaiverRequested: false,
    feeWaiverJustification: '',
    acknowledgment: false,
  })

  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

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
      const response = await fetch('/api/foia-submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to submit request')
      }

      setSubmitted(true)
      setFormData({
        fullName: '',
        organization: '',
        email: '',
        phone: '',
        preferredFormat: 'electronic',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        recordsDescription: '',
        dateRangeStart: '',
        dateRangeEnd: '',
        commercialPurpose: '',
        feeWaiverRequested: false,
        feeWaiverJustification: '',
        acknowledgment: false,
      })
    } catch (err) {
      setError('There was an error submitting your request. Please try again.')
      console.error('FOIA submission error:', err)
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <>
        <PageHero
          title="FOIA / Public Records Request"
          description="Freedom of Information Act Request Form"
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Services', href: '/services' },
            { label: 'FOIA Request', href: '/services/foia' },
          ]}
        />
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-8">
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-2xl font-display font-bold text-green-900 mb-2">
                      Request Submitted Successfully
                    </h2>
                    <p className="text-green-800 mb-4">
                      Thank you for your FOIA request. You will receive a confirmation email shortly.
                      We will respond to your request within 5 business days as required by Illinois
                      law.
                    </p>
                    <p className="text-sm text-green-700">
                      If you have any questions, please contact our office at 708-672-8279 or{' '}
                      <a
                        href="mailto:administrator@cretetownship.com"
                        className="text-green-900 underline"
                      >
                        administrator@cretetownship.com
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="mt-6 text-center">
              <Button onClick={() => setSubmitted(false)} variant="outline">
                Submit Another Request
              </Button>
            </div>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <PageHero
        title="FOIA / Public Records Request"
        description="Freedom of Information Act Request Form"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'FOIA Request', href: '/services/foia' },
        ]}
      />

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-8">
          {/* Introduction */}
          <Card className="mb-8 bg-gold-pale border-gold">
            <CardContent className="p-6">
              <h2 className="text-xl font-display font-bold text-navy mb-3">
                Illinois Freedom of Information Act (FOIA)
              </h2>
              <p className="text-gray-700 mb-3">
                The Illinois Freedom of Information Act (FOIA), 5 ILCS 140/1 et seq., provides that
                public records made or received by the Township in the course of business shall be
                made available for inspection and copying upon request, unless the records are
                exempt from disclosure.
              </p>
              <p className="text-gray-700 font-semibold">
                You may inspect public records at no charge. Copy fees may apply per Illinois FOIA
                law.
              </p>
            </CardContent>
          </Card>

          {error && (
            <Card className="mb-8 bg-red-50 border-red-200">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-red-800">{error}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Requester Information */}
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-display font-bold text-navy mb-6">
                  Requester Information
                </h3>

                <div className="space-y-6">
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
                    />
                  </div>

                  <div>
                    <label htmlFor="organization" className="block text-sm font-semibold text-navy mb-2">
                      Organization/Affiliation (Optional)
                    </label>
                    <input
                      type="text"
                      id="organization"
                      name="organization"
                      value={formData.organization}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      />
                      <p className="text-xs text-gray-500 mt-1">Confirmation will be sent here</p>
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-navy mb-2">
                        Phone Number (Optional)
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="preferredFormat" className="block text-sm font-semibold text-navy mb-2">
                      Preferred Format <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="preferredFormat"
                      name="preferredFormat"
                      required
                      value={formData.preferredFormat}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                    >
                      <option value="electronic">Electronic (Email)</option>
                      <option value="paper">Paper Copies</option>
                      <option value="inspect">Inspect in Person</option>
                    </select>
                  </div>

                  {formData.preferredFormat === 'paper' && (
                    <div className="space-y-4 p-4 bg-gold-pale border border-gold rounded-lg">
                      <p className="text-sm font-semibold text-navy">
                        Mailing Address <span className="text-red-500">*</span>
                      </p>
                      <p className="text-xs text-gray-600 mb-2">Required for paper copy delivery</p>
                      <input
                        type="text"
                        name="street"
                        placeholder="Street Address"
                        required
                        value={formData.street}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold bg-white"
                      />
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input
                          type="text"
                          name="city"
                          placeholder="City"
                          required
                          value={formData.city}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold bg-white"
                        />
                        <input
                          type="text"
                          name="state"
                          placeholder="State"
                          required
                          value={formData.state}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold bg-white"
                        />
                        <input
                          type="text"
                          name="zipCode"
                          placeholder="Zip Code"
                          required
                          value={formData.zipCode}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold bg-white"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Records Requested */}
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-display font-bold text-navy mb-6">
                  Records Requested
                </h3>

                <div className="space-y-6">
                  <div>
                    <label htmlFor="recordsDescription" className="block text-sm font-semibold text-navy mb-2">
                      Description of Records <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="recordsDescription"
                      name="recordsDescription"
                      required
                      rows={6}
                      value={formData.recordsDescription}
                      onChange={handleChange}
                      placeholder="Please be as specific as possible about the records you are requesting. Include details such as subject matter, document types, departments, officials involved, etc. You do not have to explain why you want them."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-navy mb-3">
                      Date Range of Records <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="dateRangeStart" className="block text-xs font-medium text-gray-600 mb-2">
                          Start Date
                        </label>
                        <input
                          type="date"
                          id="dateRangeStart"
                          name="dateRangeStart"
                          required
                          value={formData.dateRangeStart}
                          onChange={handleChange}
                          max={formData.dateRangeEnd || undefined}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                        />
                      </div>
                      <div>
                        <label htmlFor="dateRangeEnd" className="block text-xs font-medium text-gray-600 mb-2">
                          End Date
                        </label>
                        <input
                          type="date"
                          id="dateRangeEnd"
                          name="dateRangeEnd"
                          required
                          value={formData.dateRangeEnd}
                          onChange={handleChange}
                          min={formData.dateRangeStart || undefined}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                        />
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Select the date range for the records you are requesting
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Information */}
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-display font-bold text-navy mb-6">
                  Additional Information
                </h3>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-3">
                      Is this request for a commercial purpose? <span className="text-red-500">*</span>
                    </label>
                    <p className="text-sm text-gray-600 mb-3">
                      Commercial purpose means using records for sale, resale, or solicitation/advertising
                      for sales or services.
                    </p>
                    <div className="space-y-2">
                      <label className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="commercialPurpose"
                          value="yes"
                          required
                          checked={formData.commercialPurpose === 'yes'}
                          onChange={handleChange}
                          className="w-4 h-4 text-gold focus:ring-gold"
                        />
                        <span className="text-gray-700">Yes</span>
                      </label>
                      <label className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="commercialPurpose"
                          value="no"
                          required
                          checked={formData.commercialPurpose === 'no'}
                          onChange={handleChange}
                          className="w-4 h-4 text-gold focus:ring-gold"
                        />
                        <span className="text-gray-700">No</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        name="feeWaiverRequested"
                        checked={formData.feeWaiverRequested}
                        onChange={handleChange}
                        className="w-4 h-4 text-gold focus:ring-gold mt-1"
                      />
                      <span className="text-sm font-semibold text-navy">Request Fee Waiver</span>
                    </label>
                  </div>

                  {formData.feeWaiverRequested && (
                    <div>
                      <label htmlFor="feeWaiverJustification" className="block text-sm font-semibold text-navy mb-2">
                        Fee Waiver Justification <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="feeWaiverJustification"
                        name="feeWaiverJustification"
                        required={formData.feeWaiverRequested}
                        rows={4}
                        value={formData.feeWaiverJustification}
                        onChange={handleChange}
                        placeholder="Explain how releasing these records serves the public interest"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                      />
                    </div>
                  )}

                  <div className="pt-4 border-t border-gray-200">
                    <label className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        name="acknowledgment"
                        required
                        checked={formData.acknowledgment}
                        onChange={handleChange}
                        className="w-4 h-4 text-gold focus:ring-gold mt-1"
                      />
                      <span className="text-sm text-gray-700">
                        <span className="font-semibold text-navy">I acknowledge that:</span> Inspecting
                        records is free and copy fees may apply per Illinois FOIA law{' '}
                        <span className="text-red-500">*</span>
                      </span>
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-center">
              <Button type="submit" size="lg" disabled={submitting} className="min-w-[200px]">
                {submitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Request'
                )}
              </Button>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}
