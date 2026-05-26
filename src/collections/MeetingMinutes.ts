import type { CollectionConfig } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'
import { canCreateOrUpdate, canDelete, canRead } from '../access'
import { parseDocumentMetadata } from '../utilities/parseDocumentMetadata'

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
      name: 'title',
      type: 'text',
      required: true,
      label: 'Document Title',
      admin: {
        placeholder: 'e.g., May 2026 Board Meeting Minutes',
      },
    },
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
      async ({ req, operation, data }) => {
        // Auto-parse metadata from uploaded file
        if (operation === 'create' && data.file) {
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
  },
}
