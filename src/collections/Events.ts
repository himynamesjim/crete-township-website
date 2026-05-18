import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { canCreateOrUpdate, canDelete, canRead } from '../access'

export const Events: CollectionConfig = {
  slug: 'events',
  labels: {
    singular: 'Event',
    plural: 'Events',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'startDate', 'category', 'featured', 'status'],
    group: 'Content',
    description: 'Manage township calendar events and meetings',
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
      label: 'Event Title',
      admin: {
        placeholder: 'e.g., Township Board Meeting',
      },
    },
    {
      name: 'startDate',
      type: 'date',
      required: true,
      label: 'Start Date & Time',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'endDate',
      type: 'date',
      label: 'End Date & Time (optional)',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'location',
      type: 'text',
      label: 'Location',
      admin: {
        placeholder: 'e.g., Crete Town Hall, 1367 Wood St',
      },
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Event Description',
      editor: lexicalEditor(),
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'general',
      options: [
        {
          label: 'Board Meeting',
          value: 'board-meeting',
        },
        {
          label: 'Community',
          value: 'community',
        },
        {
          label: 'Senior Programs',
          value: 'senior-programs',
        },
        {
          label: 'Recreational',
          value: 'recreational',
        },
        {
          label: 'Food Pantry',
          value: 'food-pantry',
        },
        {
          label: 'General',
          value: 'general',
        },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Featured Event',
      defaultValue: false,
      admin: {
        description: 'Display this event prominently on the homepage',
        position: 'sidebar',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        {
          label: 'Draft',
          value: 'draft',
        },
        {
          label: 'Published',
          value: 'published',
        },
        {
          label: 'Cancelled',
          value: 'cancelled',
        },
        {
          label: 'Archived',
          value: 'archived',
        },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
