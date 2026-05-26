/**
 * Parse document metadata from filename
 * Handles formats like:
 * - "January 13, 2025 - Meeting Minutes.pdf"
 * - "March 15, 2024 - Board Agenda.pdf"
 * - "FY2024 - Audited Financial Statement.pdf"
 * - "2024-01-15 - Highway Commissioner Report.pdf"
 */

export interface ParsedMetadata {
  title: string
  date: string | null // ISO format: YYYY-MM-DD
  description: string
  fiscalYear?: number
}

/**
 * Parse date from various formats
 */
function parseDate(dateStr: string): string | null {
  // Try ISO format: 2024-01-15
  const isoMatch = dateStr.match(/(\d{4})-(\d{2})-(\d{2})/)
  if (isoMatch) {
    return dateStr
  }

  // Try "Month DD, YYYY" format: January 13, 2025
  const monthNames = [
    'january',
    'february',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december',
  ]

  const longDateMatch = dateStr.match(/([a-zA-Z]+)\s+(\d{1,2}),?\s+(\d{4})/)
  if (longDateMatch) {
    const monthName = longDateMatch[1].toLowerCase()
    const day = parseInt(longDateMatch[2], 10)
    const year = parseInt(longDateMatch[3], 10)

    const monthIndex = monthNames.findIndex((m) => m.startsWith(monthName.toLowerCase()))
    if (monthIndex !== -1) {
      const month = String(monthIndex + 1).padStart(2, '0')
      const dayPadded = String(day).padStart(2, '0')
      return `${year}-${month}-${dayPadded}`
    }
  }

  // Try "MM/DD/YYYY", "MM-DD-YYYY", or "M-D-YYYY"
  const slashDateMatch = dateStr.match(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/)
  if (slashDateMatch) {
    const month = String(parseInt(slashDateMatch[1], 10)).padStart(2, '0')
    const day = String(parseInt(slashDateMatch[2], 10)).padStart(2, '0')
    const year = slashDateMatch[3]
    return `${year}-${month}-${day}`
  }

  // Try "YYYY-M-D" or "YYYY-MM-DD" (already in ISO format or close to it)
  const isoLikeMatch = dateStr.match(/(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})/)
  if (isoLikeMatch) {
    const year = isoLikeMatch[1]
    const month = String(parseInt(isoLikeMatch[2], 10)).padStart(2, '0')
    const day = String(parseInt(isoLikeMatch[3], 10)).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  return null
}

/**
 * Extract fiscal year from filename
 */
function extractFiscalYear(filename: string): number | undefined {
  const fyMatch = filename.match(/FY\s*(\d{4})/i)
  if (fyMatch) {
    return parseInt(fyMatch[1], 10)
  }

  // Also check for just "2024" in financial document names
  const yearMatch = filename.match(/(\d{4})/)
  if (yearMatch) {
    return parseInt(yearMatch[1], 10)
  }

  return undefined
}

/**
 * Clean up title by removing file extension and common prefixes
 */
function cleanTitle(title: string): string {
  // Remove file extension
  title = title.replace(/\.(pdf|docx?|txt)$/i, '')

  // Remove leading/trailing whitespace and dashes
  title = title.trim().replace(/^[\s\-]+|[\s\-]+$/g, '')

  // Capitalize first letter
  if (title.length > 0) {
    title = title.charAt(0).toUpperCase() + title.slice(1)
  }

  return title
}

/**
 * Generate description based on document type and date
 */
function generateDescription(title: string, date: string | null): string {
  if (date) {
    const dateObj = new Date(date)
    const formattedDate = dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    return `${title} from ${formattedDate}`
  }
  return title
}

/**
 * Main parsing function
 */
export function parseDocumentMetadata(filename: string): ParsedMetadata {
  // Remove file extension for processing
  const nameWithoutExt = filename.replace(/\.(pdf|docx?|txt)$/i, '')

  let date: string | null = null
  let title = nameWithoutExt

  // Try to split by common separators: " - ", " – ", " — "
  const parts = nameWithoutExt.split(/\s*[-–—]\s*/)

  if (parts.length >= 2) {
    // First part might be a date
    const potentialDate = parseDate(parts[0])
    if (potentialDate) {
      date = potentialDate
      title = parts.slice(1).join(' - ')
    } else {
      // Last part might be a date
      const potentialDate2 = parseDate(parts[parts.length - 1])
      if (potentialDate2) {
        date = potentialDate2
        title = parts.slice(0, -1).join(' - ')
      }
    }
  }

  // If no date found yet, try to find a date pattern anywhere in the filename
  if (!date) {
    // Look for date patterns in the entire filename
    const datePatterns = [
      /(\d{1,2})-(\d{1,2})-(\d{4})/,  // 4-8-2026 or 04-08-2026
      /(\d{1,2})\/(\d{1,2})\/(\d{4})/, // 4/8/2026 or 04/08/2026
      /(\d{4})-(\d{1,2})-(\d{1,2})/,  // 2026-4-8 or 2026-04-08
      /([A-Za-z]+)\s+(\d{1,2}),?\s+(\d{4})/, // January 13, 2025
    ]

    for (const pattern of datePatterns) {
      const match = nameWithoutExt.match(pattern)
      if (match) {
        const potentialDate = parseDate(match[0])
        if (potentialDate) {
          date = potentialDate
          // Remove the date from the title
          title = nameWithoutExt.replace(match[0], '').trim()
          break
        }
      }
    }
  }

  title = cleanTitle(title)
  const description = generateDescription(title, date)
  const fiscalYear = extractFiscalYear(filename)

  return {
    title,
    date,
    description,
    fiscalYear,
  }
}

/**
 * Test the parser with example filenames
 */
export function testParser() {
  const testFiles = [
    'January 13, 2025 - Meeting Minutes.pdf',
    'March 15, 2024 - Board Agenda.pdf',
    'FY2024 - Audited Financial Statement.pdf',
    '2024-01-15 - Highway Commissioner Report.pdf',
    'Meeting Minutes - January 13, 2025.pdf',
    '01-15-2024 - Special Board Meeting.pdf',
    'Newsletter Spring 2024.pdf',
  ]

  console.log('=== Document Metadata Parser Test ===\n')
  testFiles.forEach((filename) => {
    const result = parseDocumentMetadata(filename)
    console.log(`Filename: ${filename}`)
    console.log(`  Title: ${result.title}`)
    console.log(`  Date: ${result.date}`)
    console.log(`  Description: ${result.description}`)
    if (result.fiscalYear) {
      console.log(`  Fiscal Year: ${result.fiscalYear}`)
    }
    console.log()
  })
}
