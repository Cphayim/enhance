export * from '@/shared/types'

export type FieldEmits = {
  (e: 'click'): void
  // v-model
  (e: 'update:value', value: any): void
  // SelectField
  (e: 'change:select', value: any): void
  // DatetimeField
  (e: 'change:datetime', value: any): void
}
