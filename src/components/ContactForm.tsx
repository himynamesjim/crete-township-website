'use client'

import { useState } from 'react'
import { Send, CheckCircle, AlertCircle, Loader2, ChevronDown } from 'lucide-react'

export interface ContactTopic {
  id: string
  label: string
  description?: string | null
  phone?: string | null
}

interface Props {
  topics: ContactTopic[]
}

export default function ContactForm({ topics }: Props) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    topicId: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const selectedTopic = topics.find((t) => t.id === form.topicId)

  function set(field: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name || !form.email || !form.topicId || !form.message) return
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/contact-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Submission failed')
      setStatus('success')
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center text-center py-12 px-6">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="font-display text-xl font-bold text-navy mb-2">Message Sent!</h3>
        <p className="text-gray-600 max-w-sm mb-1">
          Thank you, <strong>{form.name}</strong>. Your message has been sent to{' '}
          <strong>{selectedTopic?.label}</strong>.
        </p>
        <p className="text-sm text-gray-500 mb-6">
          A confirmation has been emailed to <strong>{form.email}</strong>. We typically respond within 1–2 business days.
        </p>
        <button
          onClick={() => {
            setForm({ name: '', email: '', phone: '', topicId: '', message: '' })
            setStatus('idle')
          }}
          className="text-sm font-semibold text-navy hover:text-gold transition-colors underline"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="ct-name">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="ct-name"
            type="text"
            required
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
            placeholder="Jane Smith"
            className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gold transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="ct-email">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            id="ct-email"
            type="email"
            required
            value={form.email}
            onChange={(e) => set('email', e.target.value)}
            placeholder="jane@example.com"
            className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gold transition-colors"
          />
        </div>
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="ct-phone">
          Phone Number <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <input
          id="ct-phone"
          type="tel"
          value={form.phone}
          onChange={(e) => set('phone', e.target.value)}
          placeholder="(708) 555-0100"
          className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gold transition-colors"
        />
      </div>

      {/* Department dropdown */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="ct-topic">
          Department / Topic <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <select
            id="ct-topic"
            required
            value={form.topicId}
            onChange={(e) => set('topicId', e.target.value)}
            className="w-full appearance-none px-4 py-2.5 pr-10 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gold transition-colors bg-white"
          >
            <option value="">Select a department…</option>
            {topics.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
        {/* Selected topic description */}
        {selectedTopic?.description && (
          <p className="mt-1.5 text-xs text-gray-500 flex items-start gap-1">
            <span className="text-gold font-bold">→</span>
            {selectedTopic.description}
            {selectedTopic.phone && (
              <span className="ml-1">
                · <a href={`tel:${selectedTopic.phone}`} className="text-navy hover:text-gold transition-colors">{selectedTopic.phone}</a>
              </span>
            )}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="ct-message">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="ct-message"
          required
          rows={6}
          value={form.message}
          onChange={(e) => set('message', e.target.value)}
          placeholder="Describe your question or concern in as much detail as helpful…"
          className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gold transition-colors resize-none"
        />
        <p className="text-xs text-gray-400 mt-1 text-right">{form.message.length} characters</p>
      </div>

      {/* Error */}
      {status === 'error' && (
        <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          {errorMsg}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'loading' || !form.name || !form.email || !form.topicId || !form.message}
        className="w-full flex items-center justify-center gap-2 bg-navy hover:bg-navy-light disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm px-6 py-3 rounded-lg transition-colors"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Send Message
          </>
        )}
      </button>

      <p className="text-xs text-gray-400 text-center">
        For urgent matters call <a href="tel:708-672-8279" className="text-navy font-semibold">708-672-8279</a>.
        We typically respond within 1–2 business days.
      </p>
    </form>
  )
}
