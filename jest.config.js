module.exports = {
  preset: "ts-jest",
  testEnvironment: "node", // Use Node.js environment
  moduleNameMapper: {
    // Mock worker files during tests
    "^.+\\.worker\\.(js|ts)$": "<rootDir>/src/__mocks__/mctsWorkerMock.ts",
  },
  transform: {
    "^.+\\.tsx?$": "ts-jest", // Transform TypeScript files
  },
  testPathIgnorePatterns: [
    "/node_modules/",
    ".next/", // Ignore Next.js build output
  ],
};
