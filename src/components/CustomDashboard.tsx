'use client'

import React, { useRef, useState } from 'react'
import { Banner } from '@payloadcms/ui'

const UPLOAD_CATEGORIES = [
  { value: 'auto', label: 'Auto-detect from filename' },
  { value: 'board-agenda', label: 'Board Meeting Agenda' },
  { value: 'special-agenda', label: 'Special Meeting Agenda' },
  { value: 'annual-town-meeting', label: 'Annual Town Meeting' },
  { value: 'meeting-minutes', label: 'Meeting Minutes' },
  { value: 'special-minutes', label: 'Special Meeting Minutes' },
  { value: 'assessor-minutes', label: 'Assessor Minutes' },
  { value: 'highway-commissioner', label: 'Highway Commissioner Report' },
  { value: 'cash-balance', label: 'Cash Balance Report' },
  { value: 'audited-statement', label: 'Audited Financial Statement' },
  { value: 'newsletter', label: 'Newsletter' },
]

type UploadStatus = { name: string; state: 'uploading' | 'done' | 'error'; message: string }

const QuickUpload: React.FC = () => {
  const [category, setCategory] = useState('auto')
  const [date, setDate] = useState('')
  const [statuses, setStatuses] = useState<UploadStatus[]>([])
  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const uploadFiles = async (files: FileList | File[]) => {
    for (const file of Array.from(files)) {
      setStatuses((prev) => [...prev, { name: file.name, state: 'uploading', message: 'Uploading…' }])
      const update = (state: UploadStatus['state'], message: string) =>
        setStatuses((prev) => prev.map((s) => (s.name === file.name ? { ...s, state, message } : s)))
      try {
        // Stage the file in Vercel Blob straight from the browser — direct
        // multipart POSTs 413 on large PDFs at the platform body-size limit
        const { upload } = await import('@vercel/blob/client')
        const blob = await upload(`quick-upload/${file.name}`, file, {
          access: 'public',
          handleUploadUrl: '/api/quick-upload/blob-token',
          multipart: true,
        })

        const res = await fetch('/api/quick-upload', {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            blobUrl: blob.url,
            filename: file.name,
            category,
            date: date || undefined,
          }),
        })
        let data: any = null
        try {
          data = await res.json()
        } catch {
          // non-JSON error page from the platform
        }
        if (res.ok) {
          update('done', `Published as "${data.title}"`)
        } else {
          update('error', data?.error || `Upload failed (HTTP ${res.status})`)
        }
      } catch (err) {
        update('error', err instanceof Error ? `Upload failed — ${err.message}` : 'Upload failed — network error')
      }
    }
  }

  return (
    <div
      style={{
        marginBottom: '2rem',
        padding: '1.5rem',
        background: 'white',
        borderRadius: '8px',
        border: '2px solid #C8960C',
      }}
    >
      <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.25rem', color: '#1B3A5C' }}>
        ⚡ Quick Upload
      </h2>
      <p style={{ fontSize: '0.85rem', color: '#5A6478', marginBottom: '1rem' }}>
        Drop a PDF or Word file and it publishes immediately. The document type and meeting date are
        read from the filename (e.g. &quot;Board Meeting Minutes 8-13-2025.pdf&quot;), the title is
        generated automatically, and Word files are converted to PDF. If the filename and a manually
        chosen category disagree, the upload is refused so nothing gets filed in the wrong place.
      </p>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        <label style={{ fontSize: '0.85rem', color: '#2C3444' }}>
          Category{' '}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ padding: '0.4rem', borderRadius: '4px', border: '1px solid #E8EDF3', marginLeft: '0.25rem' }}
          >
            {UPLOAD_CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </label>
        <label style={{ fontSize: '0.85rem', color: '#2C3444' }}>
          Meeting date (only if not in the filename){' '}
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={{ padding: '0.35rem', borderRadius: '4px', border: '1px solid #E8EDF3', marginLeft: '0.25rem' }}
          />
        </label>
      </div>

      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault()
          setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragOver(false)
          if (e.dataTransfer.files.length) uploadFiles(e.dataTransfer.files)
        }}
        style={{
          padding: '2rem',
          border: `2px dashed ${dragOver ? '#C8960C' : '#9BA5B5'}`,
          borderRadius: '8px',
          textAlign: 'center',
          cursor: 'pointer',
          background: dragOver ? '#FDF4DC' : '#F8F5F0',
          color: '#5A6478',
          fontSize: '0.95rem',
        }}
      >
        Drag &amp; drop PDF or Word files here, or click to choose
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.doc,.docx"
          multiple
          style={{ display: 'none' }}
          onChange={(e) => {
            if (e.target.files?.length) uploadFiles(e.target.files)
            e.target.value = ''
          }}
        />
      </div>

      {statuses.length > 0 && (
        <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
          {statuses.map((s, i) => (
            <li
              key={`${s.name}-${i}`}
              style={{
                padding: '0.5rem 0.75rem',
                marginBottom: '0.25rem',
                borderRadius: '4px',
                fontSize: '0.85rem',
                background: s.state === 'error' ? '#FEF2F2' : s.state === 'done' ? '#F0FDF4' : '#F4F6F9',
                color: s.state === 'error' ? '#991B1B' : s.state === 'done' ? '#166534' : '#2C3444',
              }}
            >
              {s.state === 'uploading' ? '⏳' : s.state === 'done' ? '✅' : '❌'} <strong>{s.name}</strong> —{' '}
              {s.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export const CustomDashboard: React.FC = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <div style={{
        marginBottom: '2rem',
        padding: '2rem',
        background: 'linear-gradient(135deg, #1B3A5C 0%, #2A5080 100%)',
        borderRadius: '8px',
        color: 'white'
      }}>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          marginBottom: '0.5rem',
          color: 'white'
        }}>
          Crete Township CMS
        </h1>
        <p style={{ fontSize: '1.1rem', opacity: 0.9, color: '#E8EDF3' }}>
          Welcome to your content management system. Manage documents, events, and announcements for Crete Township.
        </p>
      </div>

      <QuickUpload />

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        <DashboardCard
          title="Board Agendas"
          description="Upload and manage board meeting agendas and documents"
          icon="📄"
          link="/admin/collections/board-agendas"
          color="#C8960C"
        />
        <DashboardCard
          title="Events"
          description="Create and manage township events and meetings"
          icon="📅"
          link="/admin/collections/events"
          color="#2A5080"
        />
        <DashboardCard
          title="Announcements"
          description="Post important announcements for residents"
          icon="📢"
          link="/admin/collections/announcements"
          color="#1B3A5C"
        />
        <DashboardCard
          title="Emergency Alerts"
          description="Manage site-wide alert banners"
          icon="⚠️"
          link="/admin/globals/alert-banner"
          color="#C8960C"
        />
      </div>

      <div style={{
        padding: '1.5rem',
        background: '#F8F5F0',
        borderRadius: '8px',
        border: '1px solid #E8EDF3'
      }}>
        <h2 style={{
          fontSize: '1.25rem',
          fontWeight: '600',
          marginBottom: '1rem',
          color: '#1B3A5C'
        }}>
          Quick Links
        </h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <QuickLink href="https://www.cretetownship.com" text="View Live Site" />
          <QuickLink href="/admin/collections/documents" text="Document Library" />
          <QuickLink href="/admin/collections/users" text="Manage Users" />
        </div>
      </div>
    </div>
  )
}

const DashboardCard: React.FC<{
  title: string
  description: string
  icon: string
  link: string
  color: string
}> = ({ title, description, icon, link, color }) => {
  return (
    <a
      href={link}
      style={{
        display: 'block',
        padding: '1.5rem',
        background: 'white',
        borderRadius: '8px',
        border: '2px solid #E8EDF3',
        textDecoration: 'none',
        transition: 'all 0.2s',
        cursor: 'pointer'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = color
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#E8EDF3'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{icon}</div>
      <h3 style={{
        fontSize: '1.25rem',
        fontWeight: '600',
        marginBottom: '0.5rem',
        color: '#1B3A5C'
      }}>
        {title}
      </h3>
      <p style={{ fontSize: '0.9rem', color: '#5A6478', lineHeight: '1.5' }}>
        {description}
      </p>
    </a>
  )
}

// Payload's importMap resolves this path as a default export
export default CustomDashboard

const QuickLink: React.FC<{ href: string; text: string }> = ({ href, text }) => {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      style={{
        padding: '0.5rem 1rem',
        background: '#1B3A5C',
        color: 'white',
        borderRadius: '4px',
        textDecoration: 'none',
        fontSize: '0.9rem',
        fontWeight: '500',
        transition: 'background 0.2s'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = '#2A5080'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = '#1B3A5C'
      }}
    >
      {text}
    </a>
  )
}
