import { type FieldProps } from '../fields'

/**
 * 表单项类型
 */
export type FormItemType = 'input' | 'select' | 'datetime'

export type FormItemProps<F = string> = {
  /**
   * 表单项类型
   */
  type: FormItemType
  /**
   * 列宽 格: 1-24, 默认 24
   */
  col?: number
} & FieldProps<F>

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
