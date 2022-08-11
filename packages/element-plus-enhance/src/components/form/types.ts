import { type FieldProps } from '../fields'

/**
 * 表单项类型
 */
export type FormItemType =
  | 'input'
  | 'select'
  | 'datetime'
  | 'upload'
  | 'biz-placeholder'

export type FormItemProps<F = string, E = any> = {
  /**
   * 表单项类型
   */
  type: FormItemType
  /**
   * 列宽 格: 1-24, 默认 24
   */
  col?: number
  /**
   * 内容宽度 格: 1-24, 默认 24
   *
   * 通常你只需要设置 col，当你的场景是两个表单元素的 col 都是 12，又需要独占一行时
   * 将 col 设为 24，width 设为 12
   */
  width?: number
} & FieldProps<F, E>

export type FormProps = {
  /**
   * 表单项
   */
  items: any[] // FormItemProps
  /**
   * 表单值
   */
  data: Record<string, any>
  /**
   * 组件样式大小
   */
  size: 'small' | 'default' | 'large'
  /**
   * 列间距 px，默认 10
   */
  rowGutter?: number
  /**
   * 行间隔 px，默认 0
   */
  colGutter?: number
  /**
   * 左侧标题宽度 px，默认 100
   */
  labelWidth?: number
  /**
   * 编辑模式，用于编辑表单项配置的模式
   * 开启后，表单控件本身无法交互
   */
  editMode?: boolean
}

/**
 * 表单编辑器支持的功能
 */
export enum FormEditorFeatures {
  All = 'all',
  Input = 'input',
  Textarea = 'textarea',
  Select = 'select',
  Date = 'date',
  Time = 'time',
  ImageUpload = 'imageUpload',
  Biz = 'Biz',
}

/**
 * 业务表单控件 占位配置项 需要的额外字段
 */
export type BizPlaceHolderExtra = {
  biz: true
  /**
   * 业务表单控件名（业务表单控件可能是组合式控件，由多个常规控件组合，此时即为组名）
   */
  bizName: string
  /**
   * 显示在表单编辑器上的 label 名称
   */
  bizLabel: string
}

/**
 * 业务表单控件 真实配置项 需要的额外字段
 */
export type BizRealExtra = {
  biz: true
  /**
   * 业务表单控件名（业务表单控件可能是组合式控件，由多个常规控件组合，此时即为组名）
   */
  bizName: string
  /**
   * 业务表单控件字段名
   */
  bizField: string
  /**
   * 业务表单控件随机值（同一组表单控件拥有相同 bizName 和 bizKey）
   */
  bizKey: string
}

/**
 * 占位 FormItemProps 和 实际 FormItemProps 的转换器，支持一转多(toReal) 和 多转一(toPlaceHolder)
 *
 * 由业务侧定义，如果没有传递，业务侧需要在出入口处自行转换配置项
 */
export type BizTransform = {
  /**
   * 将占位配置转为真实配置，将在 getFormItems 时调用，可以将一个占位配置替换为多个真实配置的控件
   */
  toReal: (
    item: FormItemProps<string, BizPlaceHolderExtra>,
    randomStr: string,
  ) =>
    | FormItemProps<string, BizRealExtra>
    | FormItemProps<string, BizRealExtra>[]
  /**
   * 将真实配置转为换占位配置，通常用于对已有配置进行编辑的 initItems
   */
  toPlaceHolder: (
    itemOrItems:
      | FormItemProps<string, BizRealExtra>
      | FormItemProps<string, BizRealExtra>[],
    randomStr: string,
  ) => FormItemProps<string, BizPlaceHolderExtra>
}

export type BizFeatureOptions = {
  /**
   * 业务组件标识（唯一），将放置在 extra.bizName
   */
  bizName: string
  /**
   * 业务组件 label，将在表单编辑器左侧显示的名字
   */
  bizLabel: string
  /**
   * 占位 FormItemProps 和 实际 FormItemProps 的转换器, 支持一转多(toReal) 和 多转一(toPlaceHolder)
   *
   * 由业务侧定义
   */
  bizTransform: BizTransform
}

export type FormEditorProps = {
  /**
   * 初始表单项
   */
  initItems?: any[] // FormItemProps
  /**
   * 左侧支持的业务型表单控件列表
   */
  bizFeatures?: BizFeatureOptions[]
}
