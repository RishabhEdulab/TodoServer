// const dotenv=require('dotenv');
// dotenv.config({path:"./.env.test"}); 
/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
   testMatch:["**/**/*.test.ts"],
  verbose: true,
  forceExit: true,
 
  //  globalSetup: './__tests__/JestStart.ts',
  // globalTeardown: './__tests__/JestEnd.ts',
  //  setupFiles: ['./__tests__/jest.setup.ts'],
  // setupFiles: ["./__tests__/jest.setup.ts"],
};