import type { CollectionConfig } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'
import { canCreateOrUpdate, canDelete, canRead } from '../access'
import { notifySubscribers } from '../lib/notifySubscribers'

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
      name: 'fiscalYear',
      type: 'number',
      required: true,
      label: 'Fiscal Year',
      admin: {
        placeholder: '2026',
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
      name: 'title',
      type: 'text',
      required: false,
      label: 'Document Title (auto-generated)',
      admin: {
        placeholder: 'Leave blank to auto-generate (e.g., "FY 2026 - Audited Financial Statement")',
        description: 'Title will be auto-generated from fiscal year and document type when you save.',
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
        // Auto-generate title from fiscalYear and documentType if title is empty
        if (data.fiscalYear && data.documentType && !data.title) {
          const typeLabels: Record<string, string> = {
            'audited-statement': 'Audited Financial Statement',
            'cash-balance': 'Cash Balance Report',
            'budget-ordinance': 'Budget Ordinance',
            'tax-levy': 'Tax Levy',
            'other': 'Financial Document',
          }

          const generatedTitle = `FY ${data.fiscalYear} - ${typeLabels[data.documentType] || 'Financial Report'}`
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
            category: 'financial-reports',
            collectionLabel: 'Financial Report',
            title: doc.title,
            date: doc.date,
            description: doc.description,
            viewPath: '/documents/audited-financial-statements',
          }).catch((err) =>
            req.payload.logger.error({ err, message: '[Notify] financial-reports failed' }),
          )
        }
      },
    ],
  },
}
