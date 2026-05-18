import type { CollectionConfig } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'
import { canCreateOrUpdate, canDelete, canRead } from '../access'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const FinancialReports: CollectionConfig = {
  slug: 'financial-reports',
  labels: {
    singular: 'Financial Report',
    plural: 'Financial Reports',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'fiscalYear', 'documentType', 'status', 'date'],
    group: 'Documents',
    description: 'Manage audited statements, cash balance reports, and budget documents',
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
        placeholder: 'e.g., FY 2026 Audited Financial Statement',
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
      name: 'fiscalYear',
      type: 'number',
      required: true,
      label: 'Fiscal Year',
      admin: {
        placeholder: '2026',
      },
    },
    {
      name: 'documentType',
      type: 'select',
      required: true,
      defaultValue: 'audited-statement',
      options: [
        {
          label: 'Audited Financial Statement',
          value: 'audited-statement',
        },
        {
          label: 'Cash Balance Report',
          value: 'cash-balance',
        },
        {
          label: 'Budget Ordinance',
          value: 'budget-ordinance',
        },
        {
          label: 'Tax Levy',
          value: 'tax-levy',
        },
        {
          label: 'Other Financial Document',
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
      label: 'Financial Report PDF',
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
