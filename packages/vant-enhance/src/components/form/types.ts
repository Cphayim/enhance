import { type FieldProps } from '../fields'

/**
 * 表单项类型
 */
export type FormItemType = 'input' | 'select' | 'datetime' | 'upload'

export type FormItemProps<F = string> = {
  /**
   * 表单项类型
   */
  type: FormItemType
} & FieldProps<F>

export type FormProps = {
  /**
   * 表单项
   */
  items: any[] // FormItemProps
  /**
   * 表单键值
   */
  data: Record<string, any>
}
