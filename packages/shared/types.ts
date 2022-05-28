export type FieldProps<F = string, E = any> = {
  // 通用
  /**
   * 左侧标题
   */
  label: string
  /**
   * 字段名
   */
  name: F
  /**
   * 字段值, v-model:value
   */
  value?: any
  /**
   * 额外内容，组件不负责处理
   */
  extra?: E
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
   * @access vant
   */
  align?: 'left' | 'center' | 'right'
  /**
   * 右侧是否显示箭头
   * @access vant
   */
  isLink?: boolean

  // InputField
  /**
   * 输入框类型
   */
  inputType?: 'text' | 'password' | 'textarea'
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
   * @access vant
   */
  closeOnClickOverlay?: boolean
  /**
   * 显示顶部栏
   * @access vant
   */
  showToolbar?: boolean

  // SelectField
  /**
   * select 选项
   */
  options?: FieldOption[]
  /**
   * 选择器类型，普通或级联
   * @access element-plus
   */
  selectType?: 'select' | 'cascader'
  /**
   * 选择器是否多选
   * @access element-plus
   */
  selectMultiple?: boolean

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

/**
 * 字段校验规则
 */
export type FieldRule = {
  /**
   * 是否必填
   */
  required?: boolean
  /**
   * 正则表达式或正则表达式字符串
   *
   * 注意，如果传递的是字符串
   * /\d+/ 对应为 '\\d+'
   */
  regex?: RegExp | string
  /**
   * 验证失败的错误消息
   */
  message?: string
}
