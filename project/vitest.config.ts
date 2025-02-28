import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/jest-dom-setup.ts', './src/test/setup.ts'],
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.tsx', 'src/**/*.ts'],
      exclude: [
        'src/test/**/*',
        'src/vite-env.d.ts',
        'src/main.tsx'
      ],
    },
    exclude: [
      'server/**/*',
      'node_modules/**',
      'node_modules/@mswjs/**',
      'node_modules/**/*.test.ts'
    ],
    deps: {
      inline: [/msw/]
    },
  },
});
