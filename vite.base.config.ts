import { resolve } from 'path'
import { defineConfig, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Markdown from 'vite-plugin-md'
import VueTypeImports from 'vite-plugin-vue-type-imports'
import DefineOptions from 'unplugin-vue-define-options/vite'

import { name } from './package.json'

export const ROOT = resolve(__dirname, '..')
export const libName = name.split('/').length > 1 ? name.split('/')[1] : name

export default defineConfig({
  plugins: [
    vue({ include: [/\.vue$/, /\.md$/] }),
    VueTypeImports(), // import type props
    DefineOptions(), // defineOptions 宏
    Markdown(), // .md -> .vue
  ],
}) as UserConfig
