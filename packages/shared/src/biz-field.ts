import type { FieldProps } from './field'

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

export type BizFieldProps<E = BizPlaceHolderExtra | BizRealExtra> = FieldProps<
  string,
  E
> & {
  type: any // 对应 FormItemProps.type
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
    item: BizFieldProps<BizPlaceHolderExtra>,
    randomStr: string,
  ) => BizFieldProps<BizRealExtra> | BizFieldProps<BizRealExtra>[]
  /**
   * 将真实配置转为换占位配置，通常用于对已有配置进行编辑的 initItems
   */
  toPlaceHolder: (
    itemOrItems: BizFieldProps<BizRealExtra> | BizFieldProps<BizRealExtra>[],
    randomStr: string,
  ) => BizFieldProps<BizPlaceHolderExtra>
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

/**
 * 从所有表单配置项中过滤出 biz 配置项
 */
export function filterBizItems(
  items: FieldProps[],
): BizFieldProps<BizRealExtra>[] {
  return (items as BizFieldProps<BizRealExtra>[]).filter(
    (item: any) => item.extra?.biz,
  )
}

export function findBizValuesMap(
  data: Record<string, any>,
  items: FieldProps[],
  bizName: string,
  bizFields: string[],
) {
  const fItems = filterBizItems(items)
  const map: Record<string, any[]> = {}
  fItems.forEach((item) => {
    const extra = item.extra!
    if (extra.bizName !== bizName) return

    const list = map[extra.bizKey] ?? []
    bizFields.forEach((field, index) => {
      if (extra.bizField === field) {
        list[index] = data[item.name]
      }
    })
    map[extra.bizKey] = list
  })
  return map
}
