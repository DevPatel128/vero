import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.test.ts'],
  moduleNameMapper: {
    '^@rie/crypto$': '<rootDir>/../../packages/crypto/src/index.ts',
    '^@rie/shared$': '<rootDir>/../../packages/shared/src/index.ts',
  },
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/services/**/*.ts',
    '!src/services/__tests__/**',
  ],
};

export default config;
