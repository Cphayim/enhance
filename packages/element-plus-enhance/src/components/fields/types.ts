export * from '@/shared/field'
export * from '@/shared/biz-field'

export type FieldEmits = {
  // v-model
  (e: 'update:value', value: any): void
}
