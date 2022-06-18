import type { App, Plugin } from 'vue'
import { isComponent } from '@/shared/index'
import * as componentMap from './components'
import * as depComponentMap from './element-plus'

const ElementPlusEnhance: Plugin = {
  install(app: App) {
    // 安装依赖的组件（element-plus 在组件内直接引入打包会出现类型问题，所以在此安装）
    Object.values(depComponentMap).forEach((component) => app.use(component))
    // 我们的组件
    Object.values(componentMap).forEach(
      (component) => isComponent(component) && app.use(component),
    )
  },
}

export default ElementPlusEnhance

export * from './components'
export * from './hooks'

export { readFileContent } from '@/shared/index'
