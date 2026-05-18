#!/usr/bin/env node

/**
 * Intelligent File Renamer for Crete Township Documents
 *
 * Extracts dates from filenames and renames them to a clean format:
 * "January 13, 2025 - Meeting Minutes.pdf"
 *
 * Usage:
 *   node scripts/rename-files.cjs [directory]
 *
 * Examples:
 *   node scripts/rename-files.cjs ./migration/sorted/meeting-minutes
 *   node scripts/rename-files.cjs ./migration/sorted  (processes all subdirs)
 */

const fs = require('fs');
const path = require('path');

// Configuration
const TARGET_DIR = process.argv[2] || './migration/sorted';

// Month name mappings
const MONTH_NAMES = {
  'jan': 'January', 'january': 'January', '01': 'January', '1': 'January',
  'feb': 'February', 'february': 'February', '02': 'February', '2': 'February',
  'mar': 'March', 'march': 'March', '03': 'March', '3': 'March',
  'apr': 'April', 'april': 'April', '04': 'April', '4': 'April',
  'may': 'May', '05': 'May', '5': 'May',
  'jun': 'June', 'june': 'June', '06': 'June', '6': 'June',
  'jul': 'July', 'july': 'July', '07': 'July', '7': 'July',
  'aug': 'August', 'august': 'August', '08': 'August', '8': 'August',
  'sep': 'September', 'sept': 'September', 'september': 'September', '09': 'September', '9': 'September',
  'oct': 'October', 'october': 'October', '10': 'October',
  'nov': 'November', 'november': 'November', '11': 'November',
  'dec': 'December', 'december': 'December', '12': 'December',
};

// Document type labels based on folder
const DOCUMENT_LABELS = {
  'board-agendas': 'Board Agenda',
  'meeting-minutes': 'Meeting Minutes',
  'financial-reports': 'Financial Report',
  'assessor-documents': 'Assessor Document',
  'road-district-reports': 'Road District Report',
  'newsletters': 'Newsletter',
  'special-meetings': 'Special Meeting',
};

// Stats
const stats = {
  total: 0,
  renamed: 0,
  skipped: 0,
  errors: 0,
  renameLog: [],
};

/**
 * Parse various date formats from filename
 */
function extractDate(filename) {
  const lower = filename.toLowerCase();

  // Remove common prefixes/suffixes
  let cleaned = lower
    .replace(/\.pdf$/i, '')
    .replace(/\.docx?$/i, '')
    .replace(/\.txt$/i, '')
    .replace(/minutes?[-_]?/gi, '')
    .replace(/agenda[-_]?/gi, '')
    .replace(/meeting[-_]?/gi, '')
    .replace(/board[-_]?/gi, '')
    .replace(/special[-_]?/gi, '')
    .replace(/draft[-_]?/gi, '')
    .replace(/final[-_]?/gi, '');

  // Try different date patterns

  // Pattern: month-day-year or month_day_year (e.g., "jan-13-2025", "january_13_2025")
  let match = cleaned.match(/([a-z]+)[-_]?(\d{1,2})[-_]?(\d{4})/);
  if (match) {
    const [, month, day, year] = match;
    const monthName = MONTH_NAMES[month];
    if (monthName) {
      return { month: monthName, day: parseInt(day), year: parseInt(year) };
    }
  }

  // Pattern: month-year (e.g., "jan-2025", "january_2025")
  match = cleaned.match(/([a-z]+)[-_]?(\d{4})/);
  if (match) {
    const [, month, year] = match;
    const monthName = MONTH_NAMES[month];
    if (monthName) {
      return { month: monthName, day: null, year: parseInt(year) };
    }
  }

  // Pattern: MM-DD-YYYY or MM_DD_YYYY (e.g., "01-13-2025", "1_13_2025")
  match = cleaned.match(/(\d{1,2})[-_](\d{1,2})[-_](\d{4})/);
  if (match) {
    const [, month, day, year] = match;
    const monthName = MONTH_NAMES[month];
    if (monthName) {
      return { month: monthName, day: parseInt(day), year: parseInt(year) };
    }
  }

  // Pattern: YYYY-MM-DD or YYYY_MM_DD (e.g., "2025-01-13", "2025_1_13")
  match = cleaned.match(/(\d{4})[-_](\d{1,2})[-_](\d{1,2})/);
  if (match) {
    const [, year, month, day] = match;
    const monthName = MONTH_NAMES[month];
    if (monthName) {
      return { month: monthName, day: parseInt(day), year: parseInt(year) };
    }
  }

  // Pattern: YYYYMMDD (e.g., "20250113")
  match = cleaned.match(/(\d{4})(\d{2})(\d{2})/);
  if (match) {
    const [, year, month, day] = match;
    const monthName = MONTH_NAMES[month];
    if (monthName) {
      return { month: monthName, day: parseInt(day), year: parseInt(year) };
    }
  }

  // Pattern: year only (e.g., "2025")
  match = cleaned.match(/(\d{4})/);
  if (match) {
    const year = parseInt(match[1]);
    if (year >= 2000 && year <= 2030) {
      return { month: null, day: null, year: year };
    }
  }

  return null;
}

/**
 * Generate a descriptive name from filename
 */
function extractDescription(filename) {
  const lower = filename.toLowerCase();

  // Check for specific keywords
  if (lower.includes('special')) return 'Special';
  if (lower.includes('annual')) return 'Annual';
  if (lower.includes('emergency')) return 'Emergency';
  if (lower.includes('regular')) return 'Regular';
  if (lower.includes('draft')) return 'Draft';
  if (lower.includes('final')) return 'Final';

  return null;
}

/**
 * Build new filename
 */
function buildNewFilename(date, folderName, originalName, extension) {
  const docLabel = DOCUMENT_LABELS[folderName] || 'Document';
  const description = extractDescription(originalName);

  let newName = '';

  // Add date
  if (date) {
    if (date.day) {
      newName = `${date.month} ${date.day}, ${date.year}`;
    } else if (date.month) {
      newName = `${date.month} ${date.year}`;
    } else {
      newName = `${date.year}`;
    }
  }

  // Add description if exists
  if (description) {
    newName = newName ? `${newName} - ${description}` : description;
  }

  // Add document type
  newName = newName ? `${newName} - ${docLabel}` : docLabel;

  return `${newName}${extension}`;
}

/**
 * Process a single file
 */
function processFile(filePath, folderName) {
  const filename = path.basename(filePath);
  const extension = path.extname(filePath);
  const nameWithoutExt = path.basename(filePath, extension);

  // Skip already renamed files
  if (filename.match(/^[A-Z][a-z]+ \d+, \d{4}/)) {
    stats.skipped++;
    stats.renameLog.push({
      original: filename,
      new: null,
      reason: 'Already properly formatted',
    });
    return;
  }

  // Extract date
  const date = extractDate(nameWithoutExt);

  if (!date) {
    stats.skipped++;
    stats.renameLog.push({
      original: filename,
      new: null,
      reason: 'Could not parse date',
    });
    return;
  }

  // Build new filename
  const newFilename = buildNewFilename(date, folderName, nameWithoutExt, extension);
  const newPath = path.join(path.dirname(filePath), newFilename);

  // Check if target already exists
  if (fs.existsSync(newPath)) {
    // Add counter if duplicate
    let counter = 1;
    let finalPath = newPath;
    while (fs.existsSync(finalPath)) {
      const baseName = newFilename.replace(extension, '');
      finalPath = path.join(path.dirname(filePath), `${baseName} (${counter})${extension}`);
      counter++;
    }

    fs.renameSync(filePath, finalPath);
    stats.renamed++;
    stats.renameLog.push({
      original: filename,
      new: path.basename(finalPath),
      reason: 'Renamed with duplicate counter',
    });
    return;
  }

  // Rename the file
  try {
    fs.renameSync(filePath, newPath);
    stats.renamed++;
    stats.renameLog.push({
      original: filename,
      new: newFilename,
      reason: 'Successfully renamed',
    });
  } catch (error) {
    stats.errors++;
    stats.renameLog.push({
      original: filename,
      new: null,
      reason: `Error: ${error.message}`,
    });
  }
}

/**
 * Process all files in a folder
 */
function processFolder(folderPath) {
  const folderName = path.basename(folderPath);

  // Skip non-document folders
  if (folderName === 'images' || folderName === 'unsorted') {
    return;
  }

  if (!fs.existsSync(folderPath)) {
    return;
  }

  const files = fs.readdirSync(folderPath);

  files.forEach(file => {
    const filePath = path.join(folderPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isFile()) {
      stats.total++;
      processFile(filePath, folderName);
    }
  });
}

/**
 * Process all subfolders or single folder
 */
function processAll() {
  console.log('📝 Crete Township File Renamer');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`📂 Target: ${path.resolve(TARGET_DIR)}\n`);

  const stat = fs.statSync(TARGET_DIR);

  if (stat.isDirectory()) {
    // Check if it's a document folder or parent folder
    const subfolders = fs.readdirSync(TARGET_DIR).filter(item => {
      const itemPath = path.join(TARGET_DIR, item);
      return fs.statSync(itemPath).isDirectory();
    });

    // If has subfolders that match our categories, process each
    const hasCategories = subfolders.some(folder => DOCUMENT_LABELS[folder]);

    if (hasCategories) {
      console.log('🔍 Processing all category folders...\n');
      subfolders.forEach(folder => {
        if (DOCUMENT_LABELS[folder]) {
          console.log(`  📁 Processing ${folder}...`);
          processFolder(path.join(TARGET_DIR, folder));
        }
      });
    } else {
      // Process single folder
      console.log('🔍 Processing single folder...\n');
      processFolder(TARGET_DIR);
    }
  }
}

/**
 * Generate report
 */
function generateReport() {
  console.log('\n✅ Renaming Complete!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log('📊 SUMMARY');
  console.log(`   Total files:        ${stats.total}`);
  console.log(`   Renamed:            ${stats.renamed}`);
  console.log(`   Skipped:            ${stats.skipped}`);
  console.log(`   Errors:             ${stats.errors}\n`);

  // Save detailed report
  const reportPath = path.join(TARGET_DIR, 'rename-report.txt');
  let report = '';
  report += '═══════════════════════════════════════════════════════\n';
  report += '   Crete Township File Rename Report\n';
  report += `   Generated: ${new Date().toLocaleString()}\n`;
  report += '═══════════════════════════════════════════════════════\n\n';
  report += 'SUMMARY\n';
  report += '───────────────────────────────────────────────────────\n';
  report += `Total files processed:  ${stats.total}\n`;
  report += `Successfully renamed:   ${stats.renamed}\n`;
  report += `Skipped:                ${stats.skipped}\n`;
  report += `Errors:                 ${stats.errors}\n\n`;
  report += 'DETAILED LOG\n';
  report += '───────────────────────────────────────────────────────\n\n';

  stats.renameLog.forEach(entry => {
    report += `Original: ${entry.original}\n`;
    if (entry.new) {
      report += `     New: ${entry.new}\n`;
    }
    report += `  Reason: ${entry.reason}\n\n`;
  });

  fs.writeFileSync(reportPath, report);

  console.log('📝 Detailed report saved to:');
  console.log(`   ${path.resolve(reportPath)}\n`);

  if (stats.skipped > 0) {
    console.log('ℹ️  Some files were skipped - check the report for details\n');
  }
}

/**
 * Main execution
 */
function main() {
  try {
    processAll();
    generateReport();
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run the script
main();
