import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    include: [
      "packages/**/__tests__/**/*.test.ts?(x)",
      "apps/web/src/**/__tests__/**/*.test.ts?(x)",
      "apps/web/src/**/*test.ts?(x)",
    ],
    setupFiles: ["./vitest.setup.ts"],
  },
  resolve: {
    alias: {
      "@countdown-calender/api-client": "/packages/api-client/src",
      "@countdown-calender/state": "/packages/state/src",
      "@countdown-calender/domain": "/packages/domain/src",
      "@countdown-calender/ui": "/packages/ui/src",
    },
  },
});
