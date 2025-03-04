const esModules = ['@polkadot/', '@unique-nft/types'].join('|');

module.exports = {
  displayName: 'web',
  preset: '../../jest.preset.js',
  maxWorkers: 1,
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/packages/web',
  testPathIgnorePatterns: ['./utils.test.ts'],
  resolver: './tests/resolver.ts',
};
