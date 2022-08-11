import { randomStr } from '@/shared/index'
import { BizFeatureOptions, FormItemProps } from '.'

/**
 * 将 items 中所有 biz 配置项通过 bizFeatures 中对应的转换器转为 biz-placeholder 配置项
 */
export function transformBizRealToPlaceHolder(
  items: FormItemProps[],
  bizFeatures: BizFeatureOptions[],
) {
  // 有的业务组件可能包含多个配置，先进行去重
  // 根据 item.extra.bizName+item.extra.bizKey 去重
  const uniqueItems = unique(items)
  const transformedItems: FormItemProps[] = []

  uniqueItems.forEach((item) => {
    if (!item.extra?.biz) {
      // normal formItem
      transformedItems.push(item)
    } else {
      // biz formItem
      const { bizName } = item.extra
      const bizFeature = bizFeatures.find(
        (bizFeature) => bizFeature.bizName === bizName,
      )
      if (!bizFeature) {
        throw new Error(
          `transformBizRealToPlaceHolder error, no matching bizFeature was found, bizName: ${bizName}`,
        )
      }
      // 执行 toPlaceHolder 转换
      const placeHolderItem = bizFeature.bizTransform.toPlaceHolder(
        item,
        randomStr(6),
      )
      transformedItems.push(placeHolderItem)
    }
  })
  return transformedItems
}

/**
 * 将 items 中所有 biz-placeholder 配置项通过 bizFeatures 中对应的转换器转为真实配置项
 */
export function transformBizPlaceHolderToReal(
  items: FormItemProps[],
  bizFeatures: BizFeatureOptions[],
) {
  const transformedItems: FormItemProps[] = []
  items.forEach((item) => {
    if (!item.extra?.biz) {
      // normal formItem
      transformedItems.push(item)
    } else {
      // biz formItem
      const { bizName } = item.extra
      const bizFeature = bizFeatures.find(
        (bizFeature) => bizFeature.bizName === bizName,
      )
      if (!bizFeature) {
        throw new Error(
          `transformBizPlaceHolderToReal error, no matching bizFeature was found, bizName: ${bizName}`,
        )
      }

      // 执行 toReal 转换，结果可能是一个或多个配置项
      const itemOrItems = bizFeature.bizTransform.toReal(item, randomStr(6))
      Array.isArray(itemOrItems)
        ? transformedItems.push(...itemOrItems)
        : transformedItems.push(itemOrItems)
    }
  })
  return transformedItems
}

function unique(items: FormItemProps[]) {
  const set = new Set<string>()

  return items.filter((item) => {
    if (!item.extra?.biz) return true

    const flag = item.extra.bizName + item.extra.bizKey
    if (set.has(flag)) return false

    set.add(flag)
    return true
  })
}
