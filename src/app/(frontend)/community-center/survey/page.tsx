'use client'

import React, { useState } from 'react'
import { PageHero } from '@/components/PageHero'
import { CheckCircle, Loader2, Star } from 'lucide-react'

const facilities = [
  'Large Multi-Purpose Room',
  'Conference Room',
  'Room 4 (Meeting Room)',
  'Room 5 (Classroom)',
  'Room 7',
  'Room 8',
  'Rooms 9 & 10',
  'Room 12',
  'Room 15 or 16',
  'Exterior Park Area',
]

const programs = [
  'Senior Programs & Activities',
  'Youth Programs',
  'Fitness & Wellness Classes',
  'Arts & Crafts',
  'Community Meetings',
  'Educational Workshops',
  'Recreational Sports',
  'Holiday & Seasonal Events',
  'Food & Nutrition Programs',
  'Job Training & Resources',
]

type Rating = '1' | '2' | '3' | '4' | '5' | ''

function StarRating({ value, onChange, label }: { value: Rating; onChange: (v: Rating) => void; label: string }) {
  const [hovered, setHovered] = useState(0)
  const labels = ['', 'Poor', 'Below Average', 'Average', 'Good', 'Excellent']
  return (
    <div>
      <p className="text-sm font-semibold text-gray-700 mb-2">{label}</p>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(String(star) as Rating)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            className="focus:outline-none"
            aria-label={`${star} star${star !== 1 ? 's' : ''}`}
          >
            <Star
              className={`w-7 h-7 transition-colors ${
                star <= (hovered || Number(value))
                  ? 'fill-gold text-gold'
                  : 'fill-gray-200 text-gray-200'
              }`}
            />
          </button>
        ))}
        <span className="ml-2 text-sm text-gray-500">
          {labels[hovered || Number(value)] || ''}
        </span>
      </div>
    </div>
  )
}

function CheckGroup({ options, selected, onChange }: {
  options: string[]
  selected: string[]
  onChange: (v: string[]) => void
}) {
  const toggle = (val: string) =>
    onChange(selected.includes(val) ? selected.filter((s) => s !== val) : [...selected, val])
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {options.map((opt) => (
        <label key={opt} className="flex items-center gap-2.5 cursor-pointer group">
          <input
            type="checkbox"
            checked={selected.includes(opt)}
            onChange={() => toggle(opt)}
            className="w-4 h-4 rounded border-gray-300 text-navy accent-navy cursor-pointer"
          />
          <span className="text-sm text-gray-700 group-hover:text-navy transition-colors">{opt}</span>
        </label>
      ))}
    </div>
  )
}

const inputClass = 'w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gold transition-colors bg-white'
const labelClass = 'block text-sm font-semibold text-gray-700 mb-1.5'

export default function CommunityCenterSurveyPage() {
  const [form, setForm] = useState({
    residentStatus: '',
    visitFrequency: '',
    facilitiesUsed: [] as string[],
    overallRating: '' as Rating,
    cleanlinessRating: '' as Rating,
    staffRating: '' as Rating,
    valuePricingRating: '' as Rating,
    programsInterest: [] as string[],
    wouldRecommend: '',
    improvements: '',
    additionalComments: '',
    wantsUpdates: false,
    name: '',
    email: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/community-center-survey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Submission failed')
      setStatus('success')
    } catch {
      setErrorMsg('Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <>
        <PageHero
          title="Community Center Survey"
          description="Help us improve the Crete Township Community Center"
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Community Center', href: '/community-center' },
            { label: 'Survey', href: '/community-center/survey' },
          ]}
        />
        <div className="bg-cream min-h-[500px] flex items-center justify-center px-8 py-24">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="font-display text-2xl font-bold text-navy mb-3">Thank You!</h2>
            <p className="text-gray-600 mb-2">
              Your feedback has been submitted successfully.
            </p>
            <p className="text-gray-500 text-sm">
              Your responses help us improve the Community Center for everyone in Crete Township.
            </p>
            <a
              href="/community-center"
              className="inline-block mt-8 bg-navy hover:bg-navy-light text-white font-semibold text-sm px-6 py-3 rounded-lg transition-colors"
            >
              Back to Community Center
            </a>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <PageHero
        title="Community Center Resident Survey"
        description="Help us improve the Crete Township Community Center — your feedback matters"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Community Center', href: '/community-center' },
          { label: 'Survey', href: '/community-center/survey' },
        ]}
      />

      <div className="bg-cream py-12 px-8">
        <div className="max-w-[800px] mx-auto">

          {/* Intro */}
          <div className="bg-gold-pale border border-gold/30 rounded-xl px-6 py-5 mb-8">
            <p className="text-sm text-gray-700 leading-relaxed">
              <strong className="text-navy">Your opinion matters.</strong> This short survey helps the
              Crete Township Board understand how residents use the Community Center and what improvements
              would make it more valuable to you. The survey takes about 3–5 minutes and is anonymous
              unless you choose to share your contact information.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">

            {/* Section 1: About You */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
              <h3 className="font-display text-lg font-bold text-navy border-b border-gray-100 pb-3">
                About You
              </h3>

              <div>
                <label className={labelClass}>Are you a Crete Township resident?</label>
                <div className="flex gap-4">
                  {[
                    { label: 'Yes, I am a resident', value: 'resident' },
                    { label: 'No, I am a non-resident', value: 'non-resident' },
                  ].map((opt) => (
                    <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="residentStatus"
                        value={opt.value}
                        checked={form.residentStatus === opt.value}
                        onChange={() => set('residentStatus', opt.value)}
                        className="accent-navy"
                      />
                      <span className="text-sm text-gray-700">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className={labelClass}>How often do you visit the Community Center?</label>
                <select
                  value={form.visitFrequency}
                  onChange={(e) => set('visitFrequency', e.target.value)}
                  className={inputClass}
                >
                  <option value="">Select frequency…</option>
                  <option value="first">This is my first visit</option>
                  <option value="few-year">A few times a year</option>
                  <option value="monthly">Monthly</option>
                  <option value="weekly">Weekly</option>
                  <option value="daily">Daily</option>
                </select>
              </div>
            </div>

            {/* Section 2: Facility Use */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
              <h3 className="font-display text-lg font-bold text-navy border-b border-gray-100 pb-3">
                Facility Use
              </h3>
              <div>
                <label className={labelClass}>Which spaces or facilities have you used? (Select all that apply)</label>
                <CheckGroup
                  options={facilities}
                  selected={form.facilitiesUsed}
                  onChange={(v) => set('facilitiesUsed', v)}
                />
              </div>
            </div>

            {/* Section 3: Satisfaction */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
              <h3 className="font-display text-lg font-bold text-navy border-b border-gray-100 pb-3">
                Satisfaction Ratings
              </h3>
              <StarRating
                label="Overall Experience"
                value={form.overallRating}
                onChange={(v) => set('overallRating', v)}
              />
              <StarRating
                label="Cleanliness & Maintenance"
                value={form.cleanlinessRating}
                onChange={(v) => set('cleanlinessRating', v)}
              />
              <StarRating
                label="Staff Helpfulness & Friendliness"
                value={form.staffRating}
                onChange={(v) => set('staffRating', v)}
              />
              <StarRating
                label="Value / Pricing"
                value={form.valuePricingRating}
                onChange={(v) => set('valuePricingRating', v)}
              />

              <div>
                <label className={labelClass}>Would you recommend the Community Center to friends or family?</label>
                <div className="flex gap-6">
                  {[
                    { label: 'Yes', value: 'yes' },
                    { label: 'No', value: 'no' },
                    { label: 'Not sure', value: 'maybe' },
                  ].map((opt) => (
                    <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="wouldRecommend"
                        value={opt.value}
                        checked={form.wouldRecommend === opt.value}
                        onChange={() => set('wouldRecommend', opt.value)}
                        className="accent-navy"
                      />
                      <span className="text-sm text-gray-700">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Section 4: Programs */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
              <h3 className="font-display text-lg font-bold text-navy border-b border-gray-100 pb-3">
                Programs & Improvements
              </h3>
              <div>
                <label className={labelClass}>Which types of programs or events would you like to see at the Community Center?</label>
                <CheckGroup
                  options={programs}
                  selected={form.programsInterest}
                  onChange={(v) => set('programsInterest', v)}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="improvements">What improvements would make the biggest difference?</label>
                <textarea
                  id="improvements"
                  rows={4}
                  value={form.improvements}
                  onChange={(e) => set('improvements', e.target.value)}
                  placeholder="e.g., better parking, updated equipment, more weekend hours…"
                  className={`${inputClass} resize-none`}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="comments">Any other comments or suggestions?</label>
                <textarea
                  id="comments"
                  rows={3}
                  value={form.additionalComments}
                  onChange={(e) => set('additionalComments', e.target.value)}
                  placeholder="Anything else you'd like us to know…"
                  className={`${inputClass} resize-none`}
                />
              </div>
            </div>

            {/* Section 5: Contact (optional) */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
              <h3 className="font-display text-lg font-bold text-navy border-b border-gray-100 pb-3">
                Stay in Touch <span className="text-sm font-normal text-gray-400">(optional)</span>
              </h3>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.wantsUpdates}
                  onChange={(e) => set('wantsUpdates', e.target.checked)}
                  className="mt-0.5 w-4 h-4 accent-navy"
                />
                <span className="text-sm text-gray-700">
                  I'd like to receive email updates about Community Center programs and events.
                </span>
              </label>
              {form.wantsUpdates && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                  <div>
                    <label className={labelClass} htmlFor="name">Name</label>
                    <input
                      id="name"
                      type="text"
                      value={form.name}
                      onChange={(e) => set('name', e.target.value)}
                      placeholder="Jane Smith"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="email">Email Address</label>
                    <input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => set('email', e.target.value)}
                      placeholder="jane@example.com"
                      className={inputClass}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Error */}
            {status === 'error' && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                {errorMsg}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full flex items-center justify-center gap-2 bg-navy hover:bg-navy-light disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm px-6 py-4 rounded-xl transition-colors"
            >
              {status === 'loading' ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Submitting…</>
              ) : (
                'Submit Survey'
              )}
            </button>
            <p className="text-xs text-center text-gray-400">
              Your responses are anonymous unless you provide contact information above.
            </p>
          </form>
        </div>
      </div>
    </>
  )
}
