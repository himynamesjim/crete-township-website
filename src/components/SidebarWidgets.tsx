import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { ExternalLink, MapPin, Phone, Mail, Clock, ChevronRight, AlertCircle } from 'lucide-react'

type QuickLinksWidget = {
  blockType: 'quick-links'
  title: string
  links: Array<{ label: string; url: string; newTab: boolean }>
}

type ContactCardWidget = {
  blockType: 'contact-card'
  title: string
  office?: string
  address?: string
  cityStateZip?: string
  phone?: string
  fax?: string
  email?: string
  hours?: string
}

type AnnouncementWidget = {
  blockType: 'announcement-alert'
  title: string
  body: string
  style: 'info' | 'warning' | 'alert' | 'neutral'
  linkLabel?: string
  linkUrl?: string
}

type Widget = QuickLinksWidget | ContactCardWidget | AnnouncementWidget

const alertStyles: Record<string, { border: string; bg: string; icon: string; title: string }> = {
  info:    { border: '#1B3A5C', bg: '#EEF3F8', icon: '#1B3A5C', title: '#1B3A5C' },
  warning: { border: '#C8960C', bg: '#FDF4DC', icon: '#C8960C', title: '#7A5A00' },
  alert:   { border: '#DC2626', bg: '#FEF2F2', icon: '#DC2626', title: '#991B1B' },
  neutral: { border: '#9BA5B5', bg: '#F4F6F9', icon: '#5A6478', title: '#2C3444' },
}

function QuickLinksWidget({ widget }: { widget: QuickLinksWidget }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      <div className="bg-navy px-4 py-3">
        <h3 className="text-sm font-semibold text-white uppercase tracking-wide">{widget.title}</h3>
      </div>
      <ul className="divide-y divide-gray-100">
        {widget.links.map((link, i) => (
          <li key={i}>
            <a
              href={link.url}
              target={link.newTab ? '_blank' : undefined}
              rel={link.newTab ? 'noopener noreferrer' : undefined}
              className="flex items-center justify-between px-4 py-3 text-sm text-gray-700 hover:bg-gold-pale hover:text-navy transition-colors group"
            >
              <span className="flex items-center gap-2">
                <ChevronRight className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                {link.label}
              </span>
              {link.newTab && <ExternalLink className="w-3 h-3 text-gray-400 flex-shrink-0" />}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

function ContactCardWidget({ widget }: { widget: ContactCardWidget }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      <div className="bg-navy px-4 py-3">
        <h3 className="text-sm font-semibold text-white uppercase tracking-wide">{widget.title}</h3>
      </div>
      <div className="p-4 space-y-3">
        {widget.office && (
          <p className="text-sm font-semibold text-navy">{widget.office}</p>
        )}
        {(widget.address || widget.cityStateZip) && (
          <div className="flex items-start gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
            <div>
              {widget.address && <p>{widget.address}</p>}
              {widget.cityStateZip && <p>{widget.cityStateZip}</p>}
            </div>
          </div>
        )}
        {widget.phone && (
          <div className="flex items-center gap-2 text-sm">
            <Phone className="w-4 h-4 text-gold flex-shrink-0" />
            <a href={`tel:${widget.phone}`} className="text-gray-700 hover:text-navy transition-colors">
              {widget.phone}
            </a>
          </div>
        )}
        {widget.fax && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <span>Fax: {widget.fax}</span>
          </div>
        )}
        {widget.email && (
          <div className="flex items-center gap-2 text-sm">
            <Mail className="w-4 h-4 text-gold flex-shrink-0" />
            <a href={`mailto:${widget.email}`} className="text-gray-700 hover:text-navy transition-colors break-all">
              {widget.email}
            </a>
          </div>
        )}
        {widget.hours && (
          <div className="flex items-start gap-2 text-sm text-gray-600 pt-1 border-t border-gray-100">
            <Clock className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
            <p className="whitespace-pre-line">{widget.hours}</p>
          </div>
        )}
      </div>
    </div>
  )
}

function AnnouncementWidget({ widget }: { widget: AnnouncementWidget }) {
  const s = alertStyles[widget.style] || alertStyles.info
  return (
    <div
      className="rounded-lg overflow-hidden shadow-sm"
      style={{ border: `1px solid ${s.border}`, background: s.bg }}
    >
      <div className="px-4 py-3 flex items-center gap-2" style={{ borderBottom: `1px solid ${s.border}20` }}>
        <AlertCircle className="w-4 h-4 flex-shrink-0" style={{ color: s.icon }} />
        <h3 className="text-sm font-semibold" style={{ color: s.title }}>{widget.title}</h3>
      </div>
      <div className="p-4">
        <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{widget.body}</p>
        {widget.linkLabel && widget.linkUrl && (
          <a
            href={widget.linkUrl}
            className="inline-block mt-3 text-xs font-semibold px-3 py-1.5 rounded transition-colors"
            style={{ background: s.border, color: '#fff' }}
          >
            {widget.linkLabel}
          </a>
        )}
      </div>
    </div>
  )
}

export async function SidebarWidgets() {
  const payload = await getPayload({ config })

  let widgets: Widget[] = []
  try {
    const result = await payload.findGlobal({ slug: 'sidebar-widgets' })
    widgets = (result?.widgets ?? []) as Widget[]
  } catch {
    return null
  }

  if (!widgets.length) return null

  return (
    <aside className="space-y-4">
      {widgets.map((widget, i) => {
        if (widget.blockType === 'quick-links') {
          return <QuickLinksWidget key={i} widget={widget} />
        }
        if (widget.blockType === 'contact-card') {
          return <ContactCardWidget key={i} widget={widget} />
        }
        if (widget.blockType === 'announcement-alert') {
          return <AnnouncementWidget key={i} widget={widget} />
        }
        return null
      })}
    </aside>
  )
}
