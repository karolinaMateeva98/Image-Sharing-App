// module.exports = {
//   preset: 'ts-jest',
//   testEnvironment: 'node',
//   transform: {
//     '^.+\\.ts?$': 'ts-jest'
//   },
//   transformIgnorePatterns: ['/node_modules/']
// };

// {
//   "testEnvironment": "jsdom",
//   "transform": {
//     "^.+\\.tsx?$": "ts-jest"
//   },
//   "setupFilesAfterEnv": ["@testing-library/jest-dom/extend-expect"]
// }

import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  },
  transformIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/node_modules/(?!(react-toastify))'
  ]
};

export default config;
