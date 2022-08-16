export * from '@/shared/field'
export * from '@/shared/biz-field'

export type FieldEmits = {
  (e: 'click'): void
  // v-model
  (e: 'update:value', value: any): void
  // SelectField
  (e: 'change:select', value: any): void
  // DatetimeField
  (e: 'change:datetime', value: any): void
}
