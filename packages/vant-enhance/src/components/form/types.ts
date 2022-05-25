import { type FieldProps } from '../fields'

/**
 * 表单项类型
 */
export type FormItemType = 'input' | 'select' | 'datetime'

export type FormItemProps = FieldProps & {
  /**
   * 表单项类型
   */
  type: FormItemType
}

export type FormProps = {
  /**
   * 表单项
   */
  items: any[] // FormItemProps
  values: Record<string, any>
}
