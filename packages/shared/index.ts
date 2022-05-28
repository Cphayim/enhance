export * from './install'
export * from './types'

export function isNone(value: unknown): value is undefined | null {
  return value === undefined || value === null
}
