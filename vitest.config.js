import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config.js';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      projects: [
        {
          extends: true,
          test: {
            name: 'unit',
            include: ['tests/**/*.test.js'],
            exclude: ['tests/e2e/**'],
            environment: 'node',
            restoreMocks: true,
          },
        },
        {
          extends: true,
          test: {
            // Runs against the production build in dist/ — `npm run build` first.
            name: 'e2e',
            include: ['tests/e2e/**/*.test.js'],
            environment: 'node',
            testTimeout: 60_000,
            hookTimeout: 60_000,
          },
        },
      ],
    },
  }),
);
