export * from '@/shared/types'

export type FieldEmits = {
  // v-model
  (e: 'update:value', value: any): void
}
