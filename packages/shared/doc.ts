export type FieldProps<F = string, E = any> = CommonFieldProps<F, E> &
  (InputFieldProps | SelectFieldProps | DatetimeFieldProps | UploadFieldProps)

type CommonFieldProps<F = string, E = any> = {
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
   * 额外内容，你可以再此存储一些特定业务场景的东西，比如 select 对应的枚举或字典值，上传地址等
   *
   * 组件不负责处理该内容，使用前自行转化为有效的组件 props
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
   * 是否隐藏当前项
   */
  hidden?: boolean
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
}

type InputFieldProps = {
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
}

type PickerCommonFieldProps = {
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
}

type SelectFieldProps = PickerCommonFieldProps & {
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
}

type DatetimeFieldProps = PickerCommonFieldProps & {
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
 * 上传器类型
 */
type UploadFieldProps = {
  /**
   * 上传器选项
   * 默认值: 'object'
   *
   * 'object':
   * 值为 FieldUploadFile[]
   *
   * 'string':
   * 值为 'url1,url2,url3'，组件将从 url 中推断文件名
   */
  uploadStruct?: 'object' | 'string'
  /**
   * url 分隔符
   * 仅 uploadStruct 为 'string' 时有效
   * 默认值 ','
   */
  uploadStringSeparator?: string
  /**
   * 上传数量限制
   */
  uploadLimit?: number
  /**
   * 上传器底部提示文案，支持 \n 换行
   */
  uploadTips?: string
  /**
   * 自定义文件验证器函数
   *
   * 返回 true 表示验证通过，字符串为验证失败的提示文字
   */
  uploadValidate?: (file: File) => boolean | string
  /**
   * 自定义上传请求函数（必传）
   *
   * 在该函数内用户需实现文件的上传请求，之后返回一个 Promise<FieldUploadFile>
   */
  uploadSend?: (file: File) => Promise<FieldUploadFile>
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
 * 已上传的文件结果
 */
export type FieldUploadFile = {
  /**
   * 文件名
   */
  name?: string
  /**
   * 文件 url
   */
  url: string
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
