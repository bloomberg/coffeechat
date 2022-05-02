const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

module.exports = createJestConfig({
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.spec.[jt]s?(x)'],
  setupFiles: ['<rootDir>/.jest/storyBookTesting.ts'],
  setupFilesAfterEnv: ['<rootDir>/.jest/jestDomSetup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  globalSetup: '<rootDir>/.jest/globalSetup.ts',
  moduleNameMapper: {
    '\\.(scss|sass|css)$': 'identity-obj-proxy',
  },
})
