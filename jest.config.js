module.exports = {
  preset: 'ts-jest',
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.server.json',
    },
  },
  testMatch: ['**/__tests__/**/*.spec.[jt]s?(x)'],
}
