import type { CollectionConfig } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'
import { canCreateOrUpdate, canDelete, canRead } from '../access'
import { notifySubscribers } from '../lib/notifySubscribers'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const AssessorDocuments: CollectionConfig = {
  slug: 'assessor-documents',
  labels: {
    singular: 'Assessor Document',
    plural: 'Assessor Documents',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', 'documentType', 'status'],
    group: 'Documents',
    description: 'Manage assessor forms, exemptions, and HOA documents',
  },
  access: {
    create: canCreateOrUpdate,
    delete: canDelete,
    read: canRead,
    update: canCreateOrUpdate,
  },
  fields: [
    {
      name: 'date',
      type: 'date',
      required: true,
      label: 'Document Date',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'title',
      type: 'text',
      required: false,
      label: 'Document Title (auto-generated)',
      admin: {
        placeholder: 'Leave blank to auto-generate (e.g., "June 13, 2026 - Exemption Form")',
        description: 'Title will be auto-generated from date and document type when you save.',
      },
    },
    {
      name: 'documentType',
      type: 'select',
      required: true,
      defaultValue: 'exemption-form',
      options: [
        {
          label: 'Exemption Forms',
          value: 'exemption-form',
        },
        {
          label: 'HOA Documents',
          value: 'hoa',
        },
        {
          label: 'Assessor Minutes',
          value: 'assessor-minutes',
        },
        {
          label: 'Other Assessor Document',
          value: 'other',
        },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description (optional)',
    },
    {
      name: 'file',
      type: 'upload',
      relationTo: 'documents',
      required: true,
      label: 'Document PDF',
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Archived', value: 'archived' },
      ],
      admin: {
        position: 'sidebar',
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
        // Auto-generate title from date and documentType if title is empty
        if (data.date && data.documentType && !data.title) {
          const dateObj = new Date(data.date)
          const formattedDate = dateObj.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })

          const typeLabels: Record<string, string> = {
            'exemption-form': 'Exemption Form',
            'hoa': 'HOA Document',
            'assessor-minutes': 'Assessor Minutes',
            'other': 'Assessor Document',
          }

          const generatedTitle = `${formattedDate} - ${typeLabels[data.documentType] || 'Assessor Document'}`
          data.title = generatedTitle

          req.payload.logger.info(`Auto-generated title: "${generatedTitle}"`)
        }

        if (operation === 'create' || operation === 'update') {
          if (data.status === 'published' && !data.publishedAt) {
            data.publishedAt = new Date().toISOString()
          }
        }
        return data
      },
    ],
    afterChange: [
      async ({ doc, previousDoc, operation, req }) => {
        if (
          doc.status === 'published' &&
          (operation === 'create' || previousDoc?.status !== 'published')
        ) {
          notifySubscribers({
            payload: req.payload,
            category: 'assessor-documents',
            collectionLabel: 'Assessor Document',
            title: doc.title,
            date: doc.date,
            description: doc.description,
            viewPath: '/documents/assessor-minutes',
          }).catch((err) =>
            req.payload.logger.error({ err, message: '[Notify] assessor-documents failed' }),
          )
        }
      },
    ],
  },
}
