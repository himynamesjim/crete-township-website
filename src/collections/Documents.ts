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
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Description',
    },
  ],
}
