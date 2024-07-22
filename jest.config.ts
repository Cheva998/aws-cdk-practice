///** @type {import('ts-jest').JestConfigWithTsJest} **/
// module.exports = {
//   testEnvironment: "node",
//   transform: {
//     "^.+.tsx?$": ["ts-jest",{}],
//   },
// };

import { Config } from '@jest/types';

const baseTestDir = '<rootDir>/test';

const config: Config.InitialOptions = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch:[
        `${baseTestDir}/**/*test.ts`
    ]
}

export default config;