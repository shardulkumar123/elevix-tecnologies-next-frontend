import nextJest from "next/jest.js";

import type { Config } from "jest";

const createJestConfig = nextJest({
  // Path to Next.js app to load next.config.js and .env files
  dir: "./",
});

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    // Handle path aliases
    "^@/(.*)$": "<rootDir>/$1",
  },
};

export default createJestConfig(config);
