import type { CollectionConfig } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'
import { canCreateOrUpdate, canDelete, canRead } from '../access'
import { parseDocumentMetadata } from '../utilities/parseDocumentMetadata'
import { notifySubscribers } from '../lib/notifySubscribers'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const BoardAgendas: CollectionConfig = {
  slug: 'board-agendas',
  labels: {
    singular: 'Board Agenda',
    plural: 'Board Agendas',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', 'documentType', 'status', 'updatedAt'],
    group: 'Documents',
    description: 'Upload and manage board meeting agendas and minutes',
  },
  access: {
    // Editors and above can create
    create: canCreateOrUpdate,
    // Only admins and super admins can delete
    delete: canDelete,
    // Public can read published, authenticated can read all
    read: canRead,
    // Editors and above can update
    update: canCreateOrUpdate,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Document Title',
      admin: {
        placeholder: 'Leave blank to auto-generate from the meeting date',
        description:
          'Auto-generated from Meeting Date and Document Type when left blank (e.g., "August 12, 2026 - Agenda")',
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
      defaultValue: 'regular',
      options: [
        {
          label: 'Regular Board Meeting',
          value: 'regular',
        },
        {
          label: 'Special Meeting',
          value: 'special',
        },
        {
          label: 'Annual Town Meeting',
          value: 'annual',
        },
      ],
    },
    {
      name: 'meetingTime',
      type: 'text',
      label: 'Meeting Time',
      defaultValue: '7:00 PM',
      admin: {
        placeholder: 'e.g., 7:00 PM',
        description: 'Time the meeting starts (e.g., 7:00 PM)',
      },
    },
    {
      name: 'location',
      type: 'text',
      label: 'Meeting Location',
      defaultValue: 'Crete Town Hall, 1367 Wood St',
      admin: {
        placeholder: 'e.g., Crete Town Hall, 1367 Wood St',
        description: 'Physical location of the meeting',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description (optional)',
      admin: {
        placeholder: 'Brief description of agenda items...',
      },
    },
    {
      name: 'file',
      type: 'upload',
      relationTo: 'documents',
      required: true,
      label: 'Agenda PDF',
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
          label: 'Archived',
          value: 'archived',
        },
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
    beforeValidate: [
      async ({ data }) => {
        // Auto-generate the title from Meeting Date + Document Type when
        // left blank, e.g. "August 12, 2026 - Agenda". Runs before
        // validation so the title field can stay empty in the form.
        if (data && !data.title && data.date) {
          const dateLabel = new Date(data.date).toLocaleDateString('en-US', {
            timeZone: 'UTC',
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })
          const suffix =
            data.documentType === 'special'
              ? 'Special Meeting Agenda'
              : data.documentType === 'annual'
                ? 'Annual Town Meeting Agenda'
                : 'Agenda'
          data.title = `${dateLabel} - ${suffix}`
        }
        return data
      },
    ],
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
    afterChange: [
      async ({ doc, previousDoc, operation, req }) => {
        if (
          doc.status === 'published' &&
          (operation === 'create' || previousDoc?.status !== 'published')
        ) {
          notifySubscribers({
            payload: req.payload,
            category: 'board-agendas',
            collectionLabel: 'Board Agenda',
            title: doc.title,
            date: doc.date,
            description: doc.description,
            viewPath: '/documents/agendas',
          }).catch((err) =>
            req.payload.logger.error({ err, message: '[Notify] board-agendas failed' }),
          )
        }
      },
    ],
  },
}
