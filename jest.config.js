module.exports = {
  preset: "ts-jest",
  testEnvironment: "node", // Use Node.js environment
  transform: {
    "^.+\\.tsx?$": "ts-jest", // Transform TypeScript files
  },
  testPathIgnorePatterns: [
    "/node_modules/",
    ".next/", // Ignore Next.js build output
  ],
};
