'use client'

import React from 'react'
import { Banner } from '@payloadcms/ui'

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
