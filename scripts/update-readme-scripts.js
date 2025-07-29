const fs = require('fs');
const path = require('path');

/**
 * Generates Markdown content for the available scripts section.
 * @param {object} scripts - The scripts object from package.json.
 * @param {object} scriptDescriptions - The script descriptions object from package.json.
 * @param {object} scriptCategories - The script categories object from package.json.
 * @returns {string} A Markdown formatted string of script categories and their scripts.
 */
function generateScriptsContent(
  scripts,
  scriptDescriptions = {},
  scriptCategories = {},
) {
  let content = '';
  const allCategorizedScripts = new Set();

  // Sort categories by name for consistent order
  const sortedCategories = Object.keys(scriptCategories).sort((a, b) =>
    a.localeCompare(b),
  );

  for (const categoryName of sortedCategories) {
    content += `### ${categoryName}\n`;
    const scriptsInCategory = scriptCategories[categoryName].sort();

    for (const scriptName of scriptsInCategory) {
      if (!scripts[scriptName]) {
        console.warn(
          `⚠️  Warning: Script '${scriptName}' in category '${categoryName}' does not exist in package.json scripts.`,
        );
        continue;
      }
      allCategorizedScripts.add(scriptName);
      const description = scriptDescriptions[scriptName];
      if (!description) {
        console.warn(
          `⚠️  Warning: Script '${scriptName}' is missing a description in package.json.`,
        );
      }
      content += `*   \`npm run ${scriptName}\`: ${description || 'No description available.'}\n`;
    }
    content += '\n';
  }

  // Check for any script that exists but has not been categorized
  Object.keys(scripts).forEach((scriptName) => {
    if (!allCategorizedScripts.has(scriptName)) {
      console.warn(
        `⚠️  Warning: Script '${scriptName}' is not assigned to any category in package.json.`,
      );
    }
  });

  return content.trim();
}

/**
 *
 */
function main() {
  try {
    const packageJsonPath = path.resolve(__dirname, '..', 'package.json');
    const readmePath = path.resolve(__dirname, '..', 'README.md');

    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const readmeContent = fs.readFileSync(readmePath, 'utf8');

    const scriptsContent = generateScriptsContent(
      packageJson.scripts,
      packageJson.scriptDescriptions,
      packageJson.scriptCategories,
    );

    const startMarker = '<!-- START AVAILABLE SCRIPTS -->';
    const endMarker = '<!-- END AVAILABLE SCRIPTS -->';

    const startIndex = readmeContent.indexOf(startMarker);
    const endIndex = readmeContent.indexOf(endMarker);

    if (startIndex === -1 || endIndex === -1) {
      console.error('Error: Could not find script markers in README.md.');
      console.error(
        `Please add '${startMarker}' and '${endMarker}' to your README.md`,
      );
      process.exit(1);
    }

    const contentBefore = readmeContent.substring(
      0,
      startIndex + startMarker.length,
    );
    const contentAfter = readmeContent.substring(endIndex);

    const doNotEditComment = `\n<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN npm run docs:scripts TO UPDATE -->\n\n`;

    const newReadmeContent = `${contentBefore}${doNotEditComment}${scriptsContent}\n\n${contentAfter}`;
    fs.writeFileSync(readmePath, newReadmeContent, 'utf8');
    console.log(
      '✅ Successfully updated the Available Scripts section in README.md',
    );
  } catch (error) {
    console.error('❌ An error occurred while updating the README:', error);
    process.exit(1);
  }
}

main();
