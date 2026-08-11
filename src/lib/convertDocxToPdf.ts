import React from 'react'

/**
 * Convert a .docx buffer to a PDF buffer, entirely in JS (serverless-safe:
 * no LibreOffice or headless browser required).
 *
 * Pipeline: mammoth (docx → semantic HTML) → react-pdf-html → @react-pdf/renderer.
 * Fidelity is good for text documents (agendas, minutes): headings, bold,
 * lists, and simple tables survive; complex layouts (columns, text boxes)
 * are flattened.
 */
export async function convertDocxToPdf(docx: Buffer): Promise<Buffer> {
  const mammoth = await import('mammoth')
  const { value: html } = await mammoth.convertToHtml({ buffer: docx })

  const { Document, Page, renderToBuffer } = await import('@react-pdf/renderer')
  const { default: Html } = await import('react-pdf-html')

  const element = React.createElement(
    Document,
    null,
    React.createElement(
      Page,
      { size: 'LETTER', style: { paddingVertical: 54, paddingHorizontal: 54 } },
      React.createElement(Html, {
        style: { fontSize: 11 },
        children: `<html><body>${html}</body></html>`,
      }),
    ),
  )

  // renderToBuffer's element typing is stricter than what createElement returns
  return Buffer.from(await renderToBuffer(element as React.ReactElement<any>))
}
