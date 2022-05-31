export * from './install'
export * from './types'

export function isNone(value: unknown): value is undefined | null {
  return value === undefined || value === null
}

export function randomStr(length: number) {
  length = length || 32
  let t = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678',
    a = t.length,
    n = ''
  for (let i = 0; i < length; i++) n += t.charAt(Math.floor(Math.random() * a))
  return n
}
