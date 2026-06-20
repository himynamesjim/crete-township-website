import type { CollectionConfig } from 'payload'

export const Officials: CollectionConfig = {
  slug: 'officials',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'title', 'department', 'displayOrder'],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => {
      if (!user) return false
      return ['super-admin', 'township-admin', 'admin', 'editor'].includes(user.role)
    },
    update: ({ req: { user } }) => {
      if (!user) return false
      return ['super-admin', 'township-admin', 'admin', 'editor'].includes(user.role)
    },
    delete: ({ req: { user } }) => {
      if (!user) return false
      return ['super-admin', 'township-admin', 'admin'].includes(user.role)
    },
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Full Name',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title/Position',
    },
    {
      name: 'department',
      type: 'select',
      required: true,
      options: [
        { label: 'Board of Trustees', value: 'board' },
        { label: 'Assessor', value: 'assessor' },
        { label: 'Road District', value: 'road-district' },
        { label: 'Clerk', value: 'clerk' },
        { label: 'Collector', value: 'collector' },
        { label: 'General Assistance', value: 'general-assistance' },
      ],
      defaultValue: 'board',
    },
    {
      name: 'responsibilities',
      type: 'text',
      label: 'Responsibilities (optional)',
      admin: {
        description: 'e.g., "Mosquito and Youth" or "Senior and Special Events"',
      },
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      label: 'Photo',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Phone Number',
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email Address',
    },
    {
      name: 'bio',
      type: 'textarea',
      label: 'Biography / Excerpt',
      admin: {
        description: 'Short bio or description (optional)',
      },
    },
    {
      name: 'displayOrder',
      type: 'number',
      label: 'Display Order',
      defaultValue: 0,
      admin: {
        description: 'Lower numbers appear first. Use for custom ordering within departments.',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'published',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Archived', value: 'archived' },
      ],
    },
  ],
}
