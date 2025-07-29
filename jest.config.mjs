/** @type {import('jest').Config} */
const config = {
  // The root directory that Jest should scan for tests and modules within.
  roots: ['<rootDir>/src', '<rootDir>/tests'],

  // A list of paths to directories that Jest should use to search for files.
  testMatch: ['**/tests/**/*.test.js', '**/src/**/*.test.js'],

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',
};

export default config;