import { resolve } from 'path'
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {
  ElementPlusResolver,
  VantResolver,
} from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'

import baseConfig from '../vite.base.config'

export default defineConfig({
  ...baseConfig,
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
    dedupe: ['vue', 'vant'],
  },
  plugins: [
    ...baseConfig.plugins,
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia', '@vueuse/core'],
      resolvers: [ElementPlusResolver()],
      eslintrc: { enabled: true },
      dts: resolve(__dirname, 'src/auto-imports.d.ts'),
    }),

    Components({
      resolvers: [ElementPlusResolver(), VantResolver()],
      dts: resolve(__dirname, 'src/components.d.ts'),
    }),

    ElementPlus(),
  ],
})
