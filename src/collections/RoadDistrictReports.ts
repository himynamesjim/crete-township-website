import type { CollectionConfig } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'
import { canCreateOrUpdate, canDelete, canRead } from '../access'
import { notifySubscribers } from '../lib/notifySubscribers'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const RoadDistrictReports: CollectionConfig = {
  slug: 'road-district-reports',
  labels: {
    singular: 'Road District Report',
    plural: 'Road District Reports',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', 'documentType', 'status'],
    group: 'Documents',
    description: 'Highway commissioner reports and road district documents',
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
      label: 'Report Date',
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
        placeholder: 'Leave blank to auto-generate (e.g., "June 13, 2026 - Highway Commissioner Report")',
        description: 'Title will be auto-generated from date and document type when you save.',
      },
    },
    {
      name: 'documentType',
      type: 'select',
      required: true,
      defaultValue: 'highway-commissioner',
      options: [
        {
          label: 'Highway Commissioner Report',
          value: 'highway-commissioner',
        },
        {
          label: 'Environmental Report',
          value: 'environmental',
        },
        {
          label: 'Storm Sewer Report',
          value: 'storm-sewer',
        },
        {
          label: 'Road & Bridge Levy',
          value: 'road-bridge-levy',
        },
        // Environmental / Storm Sewer sub-types
        {
          label: 'Storm Water Pollution',
          value: 'storm-water-pollution',
        },
        {
          label: 'Storm Water Runoff',
          value: 'storm-water-runoff',
        },
        {
          label: 'Maintaining Your Septic System',
          value: 'maintaining-septic-system',
        },
        {
          label: 'NPDES – NOI',
          value: 'npdes-noi',
        },
        {
          label: 'NPDES – Storm Water Management',
          value: 'npdes-storm-water-management',
        },
        {
          label: 'NPDES – Annual Facility Report',
          value: 'npdes-annual-facility-report',
        },
        {
          label: 'Environmental Justice',
          value: 'environmental-justice',
        },
        {
          label: 'Other Road District Document',
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
      label: 'Report PDF',
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
            'highway-commissioner': 'Highway Commissioner Report',
            'environmental': 'Environmental Report',
            'storm-sewer': 'Storm Sewer Report',
            'road-bridge-levy': 'Road & Bridge Levy',
            'storm-water-pollution': 'Storm Water Pollution Report',
            'storm-water-runoff': 'Storm Water Runoff Report',
            'maintaining-septic-system': 'Maintaining Your Septic System',
            'npdes-noi': 'NPDES – NOI',
            'npdes-storm-water-management': 'NPDES – Storm Water Management',
            'npdes-annual-facility-report': 'NPDES – Annual Facility Report',
            'environmental-justice': 'Environmental Justice Report',
            'other': 'Road District Report',
          }

          const generatedTitle = `${formattedDate} - ${typeLabels[data.documentType] || 'Road District Report'}`
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
            category: 'road-district-reports',
            collectionLabel: 'Road District Report',
            title: doc.title,
            date: doc.date,
            description: doc.description,
            viewPath: '/documents/highway-commissioner-reports',
          }).catch((err) =>
            req.payload.logger.error({ err, message: '[Notify] road-district-reports failed' }),
          )
        }
      },
    ],
  },
}
