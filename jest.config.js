/**
 * Main Jest configuration file
 * This configuration only includes unit tests. 
 * For other tests such as e2e and intergration tests see the test/ folder and 
 * their respective configuration files.
 */

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  name: "Effect-JS",
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,

  // Generate coverage report from the following folders
  collectCoverageFrom: [
    'src/**/*.{ts, tsx, js, jsx}',
    '!**/node_modules/**',
    '!**/dist/**',
  ],

  // Ignore the following folders, for now especially end to end tests.
  testPathIgnorePatterns: [
    '/dist/',
    '/node_modules/',
    '/test/e2e/',
    '/test/integration/'
  ],
};

