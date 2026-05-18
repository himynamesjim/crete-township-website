#!/usr/bin/env node

/**
 * WordPress Media File Sorter for Crete Township
 *
 * Sorts WordPress uploads into Payload CMS collection folders based on filename keywords.
 *
 * Usage:
 *   node scripts/sort-media.js [source-dir] [destination-dir]
 *
 * Examples:
 *   node scripts/sort-media.js ./migration/raw ./migration/sorted
 *   node scripts/sort-media.js ~/Desktop/wp-uploads ./migration/sorted
 */

const fs = require('fs');
const path = require('path');

// Configuration
const SOURCE_DIR = process.argv[2] || './migration/raw';
const DEST_DIR = process.argv[3] || './migration/sorted';

// Sorting rules - keywords to match in filenames
const SORTING_RULES = {
  'board-agendas': {
    keywords: ['agenda', 'agendas'],
  },
  'meeting-minutes': {
    keywords: ['minutes', 'minute'],
  },
  'financial-reports': {
    keywords: [
      'financial', 'finance', 'audit', 'audited', 'budget',
      'cash', 'balance', 'treasurer', 'annual-report'
    ],
  },
  'assessor-documents': {
    keywords: [
      'assessor', 'assessment', 'hoa', 'homeowner',
      'exemption', 'property'
    ],
  },
  'road-district-reports': {
    keywords: [
      'road', 'highway', 'commissioner', 'storm', 'sewer',
      'environmental', 'drainage', 'branch'
    ],
  },
  'newsletters': {
    keywords: ['newsletter', 'news-letter'],
  },
  'special-meetings': {
    keywords: ['special', 'emergency'],
  },
};

// Image extensions
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];

// Stats tracking
const stats = {
  totalFiles: 0,
  sortedAuto: 0,
  images: 0,
  unsorted: 0,
  multipleMatches: 0,
  fileLog: [],
};

/**
 * Recursively get all files from a directory
 */
function getAllFiles(dirPath, arrayOfFiles = []) {
  if (!fs.existsSync(dirPath)) {
    console.error(`❌ Error: Source directory does not exist: ${dirPath}`);
    console.log('\n💡 Usage:');
    console.log('   node scripts/sort-media.js [source-dir] [destination-dir]');
    console.log('\nExample:');
    console.log('   node scripts/sort-media.js ~/Desktop/wp-uploads ./migration/sorted');
    process.exit(1);
  }

  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
    } else {
      arrayOfFiles.push(filePath);
    }
  });

  return arrayOfFiles;
}

/**
 * Check if filename matches any keywords in a category
 */
function matchesCategory(filename, keywords) {
  const lowerFilename = filename.toLowerCase();
  return keywords.some(keyword => lowerFilename.includes(keyword.toLowerCase()));
}

/**
 * Determine the destination folder for a file
 */
function categorizeFile(filename, extension) {
  // Check if it's an image first
  if (IMAGE_EXTENSIONS.includes(extension.toLowerCase())) {
    return { folder: 'images', matches: 1, reason: 'image extension' };
  }

  // Check each category for keyword matches
  const matchedCategories = [];

  for (const [folder, rules] of Object.entries(SORTING_RULES)) {
    if (matchesCategory(filename, rules.keywords)) {
      matchedCategories.push(folder);
    }
  }

  // If exactly one match, use it
  if (matchedCategories.length === 1) {
    return { folder: matchedCategories[0], matches: 1, reason: 'keyword match' };
  }

  // If multiple matches, mark as unsorted
  if (matchedCategories.length > 1) {
    return {
      folder: 'unsorted',
      matches: matchedCategories.length,
      reason: `multiple matches: ${matchedCategories.join(', ')}`
    };
  }

  // No matches - unsorted
  return { folder: 'unsorted', matches: 0, reason: 'no keyword match' };
}

/**
 * Copy file to destination folder
 */
function copyFile(sourcePath, destFolder) {
  const filename = path.basename(sourcePath);
  const destPath = path.join(DEST_DIR, destFolder, filename);

  // Create destination folder if it doesn't exist
  const destDir = path.dirname(destPath);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  // Handle duplicate filenames
  let finalDestPath = destPath;
  let counter = 1;
  while (fs.existsSync(finalDestPath)) {
    const ext = path.extname(filename);
    const nameWithoutExt = path.basename(filename, ext);
    finalDestPath = path.join(DEST_DIR, destFolder, `${nameWithoutExt}-${counter}${ext}`);
    counter++;
  }

  // Copy the file
  fs.copyFileSync(sourcePath, finalDestPath);

  return path.relative(DEST_DIR, finalDestPath);
}

/**
 * Main sorting function
 */
function sortFiles() {
  console.log('🔍 Crete Township Media Sorter');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`📂 Source: ${path.resolve(SOURCE_DIR)}`);
  console.log(`📁 Destination: ${path.resolve(DEST_DIR)}`);
  console.log('');

  // Get all files
  console.log('📋 Scanning files...');
  const files = getAllFiles(SOURCE_DIR);
  stats.totalFiles = files.length;
  console.log(`   Found ${stats.totalFiles} files\n`);

  // Create destination directory
  if (!fs.existsSync(DEST_DIR)) {
    fs.mkdirSync(DEST_DIR, { recursive: true });
  }

  // Process each file
  console.log('🚀 Sorting files...\n');
  files.forEach((filePath, index) => {
    const filename = path.basename(filePath);
    const extension = path.extname(filePath);
    const relativePath = path.relative(SOURCE_DIR, filePath);

    // Categorize the file
    const { folder, matches, reason } = categorizeFile(filename, extension);

    // Update stats
    if (folder === 'images') {
      stats.images++;
    } else if (folder === 'unsorted') {
      stats.unsorted++;
      if (matches > 1) {
        stats.multipleMatches++;
      }
    } else {
      stats.sortedAuto++;
    }

    // Copy file
    const destPath = copyFile(filePath, folder);

    // Log the action
    const logEntry = {
      original: relativePath,
      destination: destPath,
      folder: folder,
      reason: reason,
    };
    stats.fileLog.push(logEntry);

    // Progress indicator
    if ((index + 1) % 50 === 0 || index === files.length - 1) {
      process.stdout.write(`   Processed ${index + 1}/${stats.totalFiles} files\r`);
    }
  });

  console.log('\n');
}

/**
 * Generate and save report
 */
function generateReport() {
  const reportPath = path.join(DEST_DIR, 'sort-report.txt');

  let report = '';
  report += '═══════════════════════════════════════════════════════\n';
  report += '   Crete Township WordPress Media Sort Report\n';
  report += `   Generated: ${new Date().toLocaleString()}\n`;
  report += '═══════════════════════════════════════════════════════\n\n';

  report += 'SUMMARY\n';
  report += '───────────────────────────────────────────────────────\n';
  report += `Total files processed:           ${stats.totalFiles}\n`;
  report += `Sorted automatically:            ${stats.sortedAuto}\n`;
  report += `Images (sorted to images/):      ${stats.images}\n`;
  report += `Multiple category matches:       ${stats.multipleMatches}\n`;
  report += `Needs manual review (unsorted/): ${stats.unsorted}\n\n`;

  report += 'FILE LOG\n';
  report += '───────────────────────────────────────────────────────\n\n';

  // Group by destination folder
  const byFolder = {};
  stats.fileLog.forEach(entry => {
    if (!byFolder[entry.folder]) {
      byFolder[entry.folder] = [];
    }
    byFolder[entry.folder].push(entry);
  });

  // Output each folder group
  Object.keys(byFolder).sort().forEach(folder => {
    report += `\n📁 ${folder.toUpperCase()} (${byFolder[folder].length} files)\n`;
    report += '─'.repeat(55) + '\n';

    byFolder[folder].forEach(entry => {
      report += `  ${entry.original}\n`;
      report += `    → ${entry.destination}\n`;
      if (entry.reason !== 'keyword match' && entry.reason !== 'image extension') {
        report += `    ℹ️  ${entry.reason}\n`;
      }
      report += '\n';
    });
  });

  // Save report
  fs.writeFileSync(reportPath, report);

  return reportPath;
}

/**
 * Display summary
 */
function displaySummary(reportPath) {
  console.log('✅ Sorting Complete!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log('📊 SUMMARY');
  console.log(`   Total files:           ${stats.totalFiles}`);
  console.log(`   Sorted automatically:  ${stats.sortedAuto}`);
  console.log(`   Images:                ${stats.images}`);
  console.log(`   Multiple matches:      ${stats.multipleMatches}`);
  console.log(`   Needs review:          ${stats.unsorted}\n`);

  console.log('📝 Detailed report saved to:');
  console.log(`   ${path.resolve(reportPath)}\n`);

  if (stats.unsorted > 0) {
    console.log('⚠️  ACTION REQUIRED:');
    console.log(`   ${stats.unsorted} files in unsorted/ need manual review`);
    console.log(`   Location: ${path.resolve(DEST_DIR, 'unsorted')}\n`);
  }

  console.log('📂 Sorted files location:');
  console.log(`   ${path.resolve(DEST_DIR)}\n`);
}

/**
 * Main execution
 */
function main() {
  try {
    sortFiles();
    const reportPath = generateReport();
    displaySummary(reportPath);
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run the script
main();
