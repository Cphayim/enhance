import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    root: __dirname,
    environment: 'node',
    include: [
      'packages/**/__tests__/**/*.{ts,tsx,vue}',
      'packages/**/*.{spec,test}.{ts,tsx,vue}',
      '!**/*.d.ts', //
    ],
    coverage: {
      include: ['packages/**/src/**/*.{ts,tsx,vue}'],
      reporter: ['text', 'lcov'],
      statements: 90,
    },
  },
})
