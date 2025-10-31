import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Only run unit tests under src/ and exclude e2e folder
    include: ['src/**/*.test.{ts,tsx}', 'src/**/*.spec.{ts,tsx}'],
    exclude: ['**/e2e/**'],
    environment: 'jsdom',
  },
});
