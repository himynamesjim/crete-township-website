import { Document as PayloadDocument } from '@/payload-types'

/**
 * Transform Payload collection documents to UI component format
 * Handles the file relationship which can be either an ID or populated Document object
 */
export function transformDocument(doc: any) {
  return {
    id: doc.id,
    title: doc.title,
    date: doc.date,
    description: doc.description,
    documentType: doc.documentType,
    file: {
      url: typeof doc.file === 'object' && doc.file?.url ? doc.file.url : '',
    },
  }
}

/**
 * Transform an array of Payload documents
 */
export function transformDocuments(docs: any[]) {
  return docs.map(transformDocument)
}
