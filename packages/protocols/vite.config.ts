import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { createBaseConfig } from '../vite.base.config'

export default defineConfig(({ mode }) => {
  return {
    ...createBaseConfig(mode),

    build: {
      outDir: resolve(__dirname, 'dist'),
      emptyOutDir: true,
      sourcemap: true,
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        formats: ['es', 'cjs'],
        fileName: (format) => `index${format === 'es' ? '.mjs' : '.cjs'}`,
      },
      rollupOptions: {
        external: ['@cphayim/enhance-shared'],
      },
    },
    plugins: [
      dts({
        rollupTypes: mode === 'production',
        copyDtsFiles: false,
      }),
    ],
    resolve: {
      dedupe: ['@cphayim/enhance-shared'],
    },
    optimizeDeps: {
      exclude: ['@cphayim/enhance-shared'],
    },
  }
})
