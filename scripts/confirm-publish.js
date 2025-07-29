const prompts = require('prompts');
const { execSync } = require('child_process');

/**
 * This script is a post-tag hook for standard-version.
 * It asks for user confirmation before publishing the new version to npm.
 */
async function main() {
  const { version } = require('../package.json');

  const { shouldPublish } = await prompts({
    type: 'confirm',
    name: 'shouldPublish',
    message: `You have successfully created version ${version}. Do you want to publish this version to npm?`,
    initial: false,
  });

  if (shouldPublish) {
    console.log('Publishing to npm...');
    try {
      // Use execSync for simplicity as the output is useful.
      execSync('npm publish', { stdio: 'inherit' });
      console.log(`✅ Successfully published version ${version} to npm.`);
    } catch (error) {
      console.error(
        `❌ Failed to publish to npm. Please check the error above.`,
      );
      process.exit(1);
    }
  } else {
    console.log('Skipping npm publish.');
  }

  console.log(
    '\nNext step: Push the commit and tag to GitHub to trigger the release workflow:',
  );
  console.log('  git push --follow-tags origin main');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
