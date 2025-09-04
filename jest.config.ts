import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
 setupFilesAfterEnv: ["<rootDir>/tests/setupTests.ts"],
 moduleNameMapper: {
  "^@/(.*)$": "<rootDir>/src/$1",
  "\\.(svg|png|jpg|jpeg|gif)$": "<rootDir>/tests/fileMock.js"
}
};

export default config;
