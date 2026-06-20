import type { CollectionConfig } from 'payload'

export const NewsletterSubscribers: CollectionConfig = {
  slug: 'newsletter-subscribers',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'firstName', 'subscribedAt', 'status', 'categories'],
    group: 'Forms',
    description: 'Manage email subscribers for document notification updates',
  },
  access: {
    read: ({ req: { user } }) => {
      if (!user) return false
      return ['super-admin', 'township-admin', 'admin', 'editor'].includes(user.role)
    },
    create: () => true, // Allow public to subscribe
    update: ({ req: { user } }) => {
      if (!user) return false
      return ['super-admin', 'township-admin', 'admin'].includes(user.role)
    },
    delete: ({ req: { user } }) => {
      if (!user) return false
      return ['super-admin', 'township-admin', 'admin'].includes(user.role)
    },
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
      label: 'Email Address',
      admin: {
        description: 'Subscriber email address',
      },
    },
    {
      name: 'firstName',
      type: 'text',
      label: 'First Name',
      admin: {
        description: 'Optional - for personalized emails',
      },
    },
    {
      name: 'lastName',
      type: 'text',
      label: 'Last Name',
      admin: {
        description: 'Optional - for personalized emails',
      },
    },
    {
      name: 'categories',
      type: 'select',
      hasMany: true,
      required: true,
      defaultValue: ['all'],
      label: 'Notification Categories',
      options: [
        { label: 'All Documents', value: 'all' },
        { label: 'Board Agendas', value: 'board-agendas' },
        { label: 'Meeting Minutes', value: 'meeting-minutes' },
        { label: 'Financial Reports', value: 'financial-reports' },
        { label: 'Assessor Documents', value: 'assessor-documents' },
        { label: 'Road District Reports', value: 'road-district-reports' },
        { label: 'Newsletters', value: 'newsletters' },
        { label: 'Events', value: 'events' },
        { label: 'Announcements', value: 'announcements' },
      ],
      admin: {
        description: 'Select which types of documents to receive notifications for',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'active',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Unsubscribed', value: 'unsubscribed' },
        { label: 'Bounced', value: 'bounced' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Subscription status',
      },
    },
    {
      name: 'subscribedAt',
      type: 'date',
      required: true,
      defaultValue: () => new Date().toISOString(),
      label: 'Subscribed Date',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
    {
      name: 'unsubscribedAt',
      type: 'date',
      label: 'Unsubscribed Date',
      admin: {
        position: 'sidebar',
        readOnly: true,
        condition: (data) => data.status === 'unsubscribed',
      },
    },
    {
      name: 'unsubscribeToken',
      type: 'text',
      label: 'Unsubscribe Token',
      admin: {
        position: 'sidebar',
        readOnly: true,
        hidden: true,
      },
    },
    {
      name: 'ipAddress',
      type: 'text',
      label: 'IP Address',
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'IP address at time of signup',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Internal Notes',
      admin: {
        description: 'Internal notes about this subscriber (not visible to subscriber)',
      },
    },
  ],
}
