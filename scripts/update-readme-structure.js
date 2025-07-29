const fs = require('fs');
const path = require('path');

const ROOT_DIR = process.cwd();
const README_PATH = path.join(ROOT_DIR, 'README.md');

// --- Configuration ---
const IGNORE_LIST = new Set([
  '.git',
  'node_modules',
  'coverage',
  'dist',
  'scripts', // Ignore the scripts folder itself
  'package-lock.json',
  '.DS_Store',
  '.vscode',
  '.idea',
]);

const FILE_DESCRIPTIONS = {
  src: 'Source code',
  'index.js': 'Main application entry point',
  '.github': 'GitHub Actions workflows',
  'ci.yml': 'Continuous Integration (CI) workflow',
  '.eslintignore': 'Files/folders for ESLint to ignore',
  '.eslintrc.json': 'ESLint configuration',
  '.gitignore': 'Files/folders for Git to ignore',
  '.prettierignore': 'Files/folders for Prettier to ignore',
  '.prettierrc.json': 'Prettier configuration',
  'CODE_OF_CONDUCT.md': 'Community standards',
  'CONTRIBUTING.md': 'Guidelines for contributors',
  LICENSE: 'Project license',
  'package.json': 'Project metadata and dependencies',
  'README.md': 'This file',
};
// --- End Configuration ---

/**
 * Generates a tree structure representation of the project directory.
 * @param {*} dir - The directory to scan.
 * @param {*} prefix - The prefix to use for each line (used for indentation).
 * @returns {object} A string representing the directory tree.
 */
function generateTree(dir, prefix = '') {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch (error) {
    return '';
  }

  const filteredEntries = entries
    .filter((entry) => !IGNORE_LIST.has(entry.name))
    .sort((a, b) => {
      if (a.isDirectory() && !b.isDirectory()) return -1;
      if (!a.isDirectory() && b.isDirectory()) return 1;
      return a.name.localeCompare(b.name);
    });

  const content = [];
  const maxLength = Math.max(
    ...filteredEntries.map(
      (e) => (e.name + (e.isDirectory() ? '/' : '')).length,
    ),
  );

  filteredEntries.forEach((entry, index) => {
    const isLast = index === filteredEntries.length - 1;
    const connector = isLast ? '└── ' : '├── ';
    const entryPath = path.join(dir, entry.name);
    const entryNameWithSlash = entry.name + (entry.isDirectory() ? '/' : '');

    const padding = ' '.repeat(maxLength - entryNameWithSlash.length);
    const description = FILE_DESCRIPTIONS[entry.name]
      ? ` ${padding}# ${FILE_DESCRIPTIONS[entry.name]}`
      : '';

    content.push(`${prefix}${connector}${entryNameWithSlash}${description}`);

    if (entry.isDirectory()) {
      const newPrefix = prefix + (isLast ? '    ' : '│   ');
      content.push(generateTree(entryPath, newPrefix));
    }
  });

  return content.join('\n');
}

const projectTree = `.\n${generateTree(ROOT_DIR)}`;
const readmeContent = fs.readFileSync(README_PATH, 'utf8');

const START_MARKER = '<!-- START PROJECT STRUCTURE -->';
const END_MARKER = '<!-- END PROJECT STRUCTURE -->';

const regex = new RegExp(`(${START_MARKER})[\\s\\S]*?(${END_MARKER})`, 'm');

// First, check if the markers exist at all.
if (!regex.test(readmeContent)) {
  // eslint-disable-next-line no-console
  console.error(
    `❌ Error: Could not find project structure markers in README.md.\nEnsure you have "${START_MARKER}" and "${END_MARKER}".`,
  );
  process.exit(1);
}

const newContent = `
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN \`npm run docs:structure\` TO UPDATE -->

\`\`\`plaintext
${projectTree.trim()}
\`\`\`
`;
const newReadmeContent = readmeContent.replace(regex, `$1${newContent}$2`);

// Check if the content actually changed.
if (
  readmeContent.replace(/\r\n/g, '\n') ===
  newReadmeContent.replace(/\r\n/g, '\n')
) {
  // eslint-disable-next-line no-console
  console.log('✅ Project structure in README.md is already up-to-date.');
} else {
  fs.writeFileSync(README_PATH, newReadmeContent, 'utf8');
  // eslint-disable-next-line no-console
  console.log('✅ Successfully updated the project structure in README.md');
}
