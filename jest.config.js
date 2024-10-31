module.exports = {
    transform: {
      '^.+\\.m?js$': 'babel-jest',
    },
    moduleFileExtensions: ['js', 'mjs'],
    testEnvironment: 'jsdom',
    testMatch: [
      '**/?(*.)+(spec|test).[jt]s?(x)',
      '**/?(*.)+(spec|test).mjs'
    ],
  };
  