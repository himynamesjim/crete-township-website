import type { CollectionConfig } from 'payload'
import { canCreateOrUpdate, canDelete, canRead } from '../access'

export const Announcements: CollectionConfig = {
  slug: 'announcements',
  labels: {
    singular: 'Announcement',
    plural: 'Announcements',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'active', 'expiresAt'],
    group: 'Content',
    description: 'Create announcements to display on the township homepage',
  },
  access: {
    create: canCreateOrUpdate,
    delete: canDelete,
    read: canRead,
    update: canCreateOrUpdate,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Announcement Title',
      admin: {
        placeholder: 'e.g., May 2026 Board Meeting — Zoom Link Available',
      },
    },
    {
      name: 'body',
      type: 'textarea',
      required: true,
      label: 'Announcement Text',
      admin: {
        placeholder: 'Enter the full announcement text...',
        rows: 4,
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'general',
      options: [
        {
          label: 'Board',
          value: 'board',
        },
        {
          label: 'Road District',
          value: 'road-district',
        },
        {
          label: 'Assessor',
          value: 'assessor',
        },
        {
          label: 'Community',
          value: 'community',
        },
        {
          label: 'General',
          value: 'general',
        },
      ],
    },
    {
      name: 'active',
      type: 'checkbox',
      label: 'Active',
      defaultValue: true,
      admin: {
        description: 'Uncheck to hide this announcement from the site',
        position: 'sidebar',
      },
    },
    {
      name: 'expiresAt',
      type: 'date',
      label: 'Expiration Date (optional)',
      admin: {
        description: 'Announcement will auto-hide after this date',
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Published Date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ req, operation, data }) => {
        if (operation === 'create' && !data.publishedAt) {
          data.publishedAt = new Date().toISOString()
        }
        return data
      },
    ],
  },
}
