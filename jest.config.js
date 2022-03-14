module.exports = {
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.spec.[jt]s?(x)'],
  setupFiles: ['<rootDir>/.jest/storyBookTesting.ts'],
  setupFilesAfterEnv: ['<rootDir>/.jest/jestDomSetup.ts'],
  testEnvironment: 'jsdom',
  globalSetup: '<rootDir>/.jest/globalSetup.ts',
  transform: {
    '\\.(js|jsx|tsx|ts)$': ['babel-jest', { configFile: './jest.babelrc' }],
  },
}
