import { FieldRule } from '@/shared/index'

export const normalizeRules = (rules: FieldRule[]): FieldRule[] => {
  return rules.map((rule) => {
    const newRule = { ...rule }
    if (typeof newRule.pattern === 'string') {
      // vant 的 pattern 只支持正则表达式对象，所以这里需要转换一下
      newRule.pattern = new RegExp(newRule.pattern)
    }
    return newRule
  })
}
