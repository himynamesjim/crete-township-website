import type { CollectionConfig } from 'payload'
import { canCreateOrUpdate, canDelete, canRead } from '../access'

export const ContactInquiries: CollectionConfig = {
  slug: 'contact-inquiries',
  labels: {
    singular: 'Contact Inquiry',
    plural: 'Contact Inquiries',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'topic', 'status', 'submittedAt'],
    group: 'Site Configuration',
    description: 'Submissions from the website contact form',
  },
  access: {
    create: () => true, // public submission
    delete: canDelete,
    read: canRead,
    update: canCreateOrUpdate,
  },
  fields: [
    { name: 'name', type: 'text', required: true, label: 'Full Name' },
    { name: 'email', type: 'email', required: true, label: 'Email Address' },
    { name: 'phone', type: 'text', label: 'Phone Number' },
    {
      name: 'topic',
      type: 'text',
      required: true,
      label: 'Department / Topic',
      admin: { description: 'Label of the topic selected in the form' },
    },
    {
      name: 'routedTo',
      type: 'email',
      label: 'Routed To',
      admin: { description: 'Email address the notification was sent to' },
    },
    { name: 'message', type: 'textarea', required: true, label: 'Message' },
    {
      name: 'submittedAt',
      type: 'date',
      label: 'Submitted At',
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayAndTime' } },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Read', value: 'read' },
        { label: 'Replied', value: 'replied' },
        { label: 'Archived', value: 'archived' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'internalNotes',
      type: 'textarea',
      label: 'Internal Notes',
      admin: {
        position: 'sidebar',
        description: 'Staff only — not visible to the public',
      },
    },
  ],
}
