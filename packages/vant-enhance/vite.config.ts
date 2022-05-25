import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

import baseConfig from '../../vite.base.config'
import { name } from './package.json'

export const libName = name.split('/').length > 1 ? name.split('/')[1] : name

export default defineConfig({
  ...baseConfig,
  resolve: {
    alias: {
      '@/shared': resolve(__dirname, '../shared'),
    },
  },
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'VantEnhance',
      formats: ['es', 'cjs', 'umd'],
      fileName: (format) => {
        return `${libName}.${
          format === 'es' ? 'es.mjs' : format === 'cjs' ? 'cjs.js' : 'umd.js'
        }`
      },
    },
    rollupOptions: {
      external: ['vue', 'vant'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
          vant: 'vant',
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') {
            return `${libName}.css`
          }
          return assetInfo.name!
        },
      },
    },
  },
  plugins: [
    ...baseConfig.plugins!,
    dts({
      // tsConfigFilePath: resolve(ROOT, 'tsconfig.json'),
      outputDir: resolve(__dirname, 'dist'),
      entryRoot: resolve(__dirname, 'src'),
      rollupTypes: true,
      // copyDtsFiles: false,
      beforeWriteFile: (filePath, content) => {
        // console.log(filePath)
        return { filePath, content }
      },
    }),
  ],
})
