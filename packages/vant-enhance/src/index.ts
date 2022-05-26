import type { App, Plugin } from 'vue'
import * as componentMap from './components'

const VantEnhance: Plugin = {
  install(app: App) {
    const components = Object.values(componentMap)
    components.forEach((component) => component.install?.(app))
  },
}

export default VantEnhance

export * from './components'
export * from './hooks'
