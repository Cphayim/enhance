import { computed, ref } from 'vue'

import type { IsNotEmptyObject } from '@/shared/utils'
import type { FieldOption } from '../components/fields'
import type { FormItemProps } from '../components/form'
import Form from '../components/form/Form.vue'

type UseFormOptions = {
  defaultProps?: Partial<Omit<FormItemProps, 'type | name | value'>>
}

export function useForm<T extends Record<string, any>>(
  originData: T,
  items: FormItemProps<IsNotEmptyObject<{}> extends false ? keyof T : string>[],
  options: UseFormOptions = {},
) {
  // 表单数据 v-model:values
  const formData = ref(originData)
  // 表单配置项 :items, 和 defaultProps 合并
  const formItems = ref(
    items.map((item) => ({ ...options.defaultProps, ...item })),
  )

  const map = computed(() => {
    const m = new Map()
    formItems.value.forEach((item) => {
      m.set(item.name, item)
    })
    return m as Map<keyof T, FormItemProps<keyof T>>
  })

  const getItem = (name: keyof T) => map.value.get(name) as FormItemProps

  const setOptions = (name: keyof T, options: FieldOption[]) => {
    const item = getItem(name)
    if (item) {
      item.options = options
    }
  }

  const formRef = ref<InstanceType<typeof Form>>()
  return {
    formData,
    formItems,
    getItem,
    setOptions,
    formRef,
  }
}
