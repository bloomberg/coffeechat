module.exports = {
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.spec.[jt]s?(x)'],
  setupFiles: ['<rootDir>/.jest/storyBookTesting.ts'],
  setupFilesAfterEnv: ['<rootDir>/.jest/jestDomSetup.ts'],
}
