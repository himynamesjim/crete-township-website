import type { CollectionConfig } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'
import { canCreateOrUpdate, canDelete, canRead } from '../access'

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
      name: 'title',
      type: 'text',
      required: true,
      label: 'Document Title',
      admin: {
        placeholder: 'e.g., Highway Commissioner Report May 2026',
      },
    },
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
