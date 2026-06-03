import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src/tests'],
  testMatch: ['**/*.test.ts'],
  collectCoverageFrom: [
    'src/lib/**/*.ts',
    '!src/lib/index.ts'
  ],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 100,
      lines: 95,
      statements: 95
    }
  },
  coverageReporters: ['text', 'lcov'],
  verbose: true
};

export default config;