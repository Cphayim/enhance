import { resolve } from 'path'
import { defineConfig } from 'vite'

import baseConfig from '../vite.base.config'

export default defineConfig({
  ...baseConfig,
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
    dedupe: ['vue', 'vant'],
  },
})
