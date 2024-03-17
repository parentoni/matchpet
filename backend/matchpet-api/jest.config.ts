import type {Config} from 'jest'

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': "ts-jest"
  },
};

export default config
