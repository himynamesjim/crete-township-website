import type { CollectionConfig } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'
import { canCreateOrUpdate, canDelete, canRead } from '../access'
import { parseDocumentMetadata } from '../utilities/parseDocumentMetadata'
import { notifySubscribers } from '../lib/notifySubscribers'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const MeetingMinutes: CollectionConfig = {
  slug: 'meeting-minutes',
  labels: {
    singular: 'Meeting Minutes',
    plural: 'Meeting Minutes',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', 'documentType', 'status', 'updatedAt'],
    group: 'Documents',
    description: 'Upload board and committee meeting minutes',
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
      label: 'Meeting Date',
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
        placeholder: 'Leave blank to auto-generate from date and document type',
        description: 'Title will be auto-generated when you save (e.g., "June 13, 2026 - Meeting Minutes"). You can also enter a custom title.',
      },
    },
    {
      name: 'documentType',
      type: 'select',
      required: true,
      defaultValue: 'regular-board',
      options: [
        {
          label: 'Regular Board Minutes',
          value: 'regular-board',
        },
        {
          label: 'Special Board Minutes',
          value: 'special-board',
        },
        {
          label: 'Assessor Minutes',
          value: 'assessor',
        },
        {
          label: 'Road District Minutes',
          value: 'road-district',
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
      label: 'Minutes PDF',
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
      async ({ req, operation, data, originalDoc }) => {
        // Auto-generate title from date and documentType if title is empty
        if (data.date && data.documentType && !data.title) {
          const dateObj = new Date(data.date)
          const formattedDate = dateObj.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })

          const typeLabels: Record<string, string> = {
            'regular-board': 'Meeting Minutes',
            'special-board': 'Special Meeting Minutes',
            'assessor': 'Assessor Minutes',
            'road-district': 'Road District Minutes',
          }

          const generatedTitle = `${formattedDate} - ${typeLabels[data.documentType] || 'Meeting Minutes'}`
          data.title = generatedTitle

          req.payload.logger.info(`Auto-generated title: "${generatedTitle}"`)
        }

        // Auto-parse metadata from uploaded file (fallback)
        if (operation === 'create' && data.file && !data.title) {
          try {
            // Fetch the document details to get the filename
            const doc = await req.payload.findByID({
              collection: 'documents',
              id: data.file,
            })

            if (doc?.filename) {
              const parsed = parseDocumentMetadata(doc.filename)

              // Only auto-fill if fields are empty
              if (!data.title) {
                data.title = parsed.title
              }
              if (!data.date && parsed.date) {
                data.date = parsed.date
              }
              if (!data.description && parsed.description) {
                data.description = parsed.description
              }

              req.payload.logger.info(
                `Auto-parsed metadata from "${doc.filename}": title="${parsed.title}", date="${parsed.date}"`,
              )
            }
          } catch (error) {
            req.payload.logger.error({ err: error, message: 'Error parsing document metadata' })
            // Continue without auto-parsing if there's an error
          }
        }

        // Auto-set publishedAt when status changes to published
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
            category: 'meeting-minutes',
            collectionLabel: 'Meeting Minutes',
            title: doc.title,
            date: doc.date,
            description: doc.description,
            viewPath: '/documents/meeting-minutes',
          }).catch((err) =>
            req.payload.logger.error({ err, message: '[Notify] meeting-minutes failed' }),
          )
        }
      },
    ],
  },
}
