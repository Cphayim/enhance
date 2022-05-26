import { FieldRule, FieldType } from 'vant'

/**
 * 字段选项，用于 select
 */
export type FieldOption = {
  /**
   * 显示用文本
   */
  label: string
  /**
   * 值
   */
  value?: number | string
  /**
   * 多列选择子项
   */
  values?: FieldOption[]
  /**
   * 级联选择子项
   */
  children?: FieldOption[]
}

export type FieldProps<F = string> = {
  // 通用
  /**
   * 左侧标题
   */
  title: string
  /**
   * 字段名
   */
  name: F
  /**
   * 字段值, v-model:value
   */
  value?: any
  /**
   * 只读
   */
  readonly?: boolean
  /**
   * 禁用
   */
  disabled?: boolean
  /**
   * 占位
   */
  placeholder?: string
  /**
   * 验证规则
   */
  rules?: FieldRule[]
  /**
   * 对齐方式
   */
  align?: 'left' | 'center' | 'right'
  /**
   * 右侧是否显示箭头
   */
  isLink?: boolean

  // InputField
  /**
   * 输入框类型
   */
  inputType?: FieldType
  /**
   * 最大长度
   */
  inputMaxLength?: number
  /**
   * 输入框行数，仅 textarea 有效
   */
  inputRows?: number

  // 选择器通用
  /**
   * 是否在点击遮罩层后关闭
   */
  closeOnClickOverlay?: boolean
  /**
   * 显示顶部栏
   */
  showToolbar?: boolean

  // SelectField
  /**
   * select 选项
   */
  options?: FieldOption[]

  // DatetimeField
  /**
   * 日期选择器类型
   */
  datetimeType?:
    | 'date'
    | 'datetime'
    | 'year-month'
    | 'month-day'
    | 'datehour'
    | 'time'
  /**
   * 日期格式
   */
  datetimeFormat?: string
  /**
   * 最小日期
   */
  minDate?: Date
  /**
   * 最大日期
   */
  maxDate?: Date
}

export type FieldEmits = {
  (e: 'click'): void
  // v-model
  (e: 'update:value', value: any): void
  // SelectField
  (e: 'change:select', value: any): void
  // DatetimeField
  (e: 'change:datetime', value: any): void
}
