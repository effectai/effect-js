// import {  } from 'ts-jest'

const config = {
  name: "Effect-JS",
  preset: 'ts-jest',
  // preset: 'ts-jest/presets/default-esm', // other preset that might be usefulw
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

export default config;
