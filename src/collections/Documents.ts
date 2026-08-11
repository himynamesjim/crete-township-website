import type { CollectionConfig } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'
import { authenticated } from '../access/authenticated'
import { anyone } from '../access/anyone'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Documents: CollectionConfig = {
  slug: 'documents',
  admin: {
    group: 'System',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone, // Public documents
    update: authenticated,
  },
  upload: {
    // Using Vercel Blob storage - no staticDir needed
    mimeTypes: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  },
  hooks: {
    beforeOperation: [
      async ({ req, operation }) => {
        // Auto-convert uploaded .docx files to PDF so residents always get
        // a PDF. On conversion failure the original .docx is kept as-is.
        const file = req.file
        if (
          (operation === 'create' || operation === 'update') &&
          file?.data &&
          (file.mimetype ===
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
            file.name?.toLowerCase().endsWith('.docx'))
        ) {
          try {
            const { convertDocxToPdf } = await import('../lib/convertDocxToPdf')
            const pdf = await convertDocxToPdf(file.data)
            file.data = pdf
            file.name = file.name.replace(/\.docx?$/i, '') + '.pdf'
            file.mimetype = 'application/pdf'
            file.size = pdf.length
            req.payload.logger.info(`Converted "${file.name}" from DOCX to PDF`)
          } catch (error) {
            req.payload.logger.error({
              err: error,
              message: 'DOCX to PDF conversion failed — keeping original file',
            })
          }
        }
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Description',
    },
  ],
}
