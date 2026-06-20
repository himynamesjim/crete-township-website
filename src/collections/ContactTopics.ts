import type { CollectionConfig } from 'payload'
import { canCreateOrUpdate, canDelete, canRead } from '../access'

export const ContactTopics: CollectionConfig = {
  slug: 'contact-topics',
  labels: {
    singular: 'Contact Topic',
    plural: 'Contact Topics',
  },
  admin: {
    useAsTitle: 'label',
    defaultColumns: ['label', 'email', 'phone', 'active', 'displayOrder'],
    group: 'Site Configuration',
    description: 'Departments and topics shown in the Contact Us form dropdown',
  },
  access: {
    create: canCreateOrUpdate,
    delete: canDelete,
    read: canRead,
    update: canCreateOrUpdate,
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
      label: 'Label',
      admin: { placeholder: "e.g. Assessor's Office" },
    },
    {
      name: 'description',
      type: 'text',
      label: 'Description',
      admin: {
        placeholder: 'e.g. Property assessment, exemptions, HOA questions',
        description: 'Shown as a subtitle in the dropdown to help residents pick the right department',
      },
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'Notification Email',
      admin: { description: 'Form submissions for this topic are sent to this address' },
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Phone Number',
      admin: { placeholder: '708-672-8279' },
    },
    {
      name: 'active',
      type: 'checkbox',
      label: 'Show in contact form',
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'displayOrder',
      type: 'number',
      label: 'Display Order',
      defaultValue: 99,
      admin: { position: 'sidebar' },
    },
  ],
}
