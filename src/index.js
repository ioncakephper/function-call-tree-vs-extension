/**
 * Generates a configuration object for a file watcher.
 * @returns {object} The configuration object.
 */
function getFileWatcherConfig() {
  return {
    files: ['**/*.{js,md,json}'],
    tasks: ['eslint --fix', 'prettier --write'],
    verbose: true,
    ignore: ['node_modules', 'dist', 'coverage', '.git'],
    watch: {
      paths: {
        glob: '**/*.{js,md,json}',
        options: {
          ignoreInitial: true,
        },
      },
    },
  };
}

module.exports = getFileWatcherConfig;
