export * from './install'

export function isNone(value: unknown): value is undefined | null {
  return value === undefined || value === null
}
