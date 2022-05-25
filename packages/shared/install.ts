import type { App, Plugin } from 'vue'

export type SFCWithInstall<T> = T & Plugin

export const withInstall = <T>(comp: T): SFCWithInstall<T> => {
  ;(comp as any).install = (app: App): void => {
    app.component((comp as any).name, comp)
  }
  return comp as SFCWithInstall<T>
}
