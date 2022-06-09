import { computed, ref } from 'vue'

import type { IsNotEmptyObject } from '@/shared/utils'
import type { FieldOption } from '../components/fields'
import type { FormItemProps } from '../components/form'
import Form from '../components/form/Form.vue'
import { deepClone } from '@/shared/index'

type UseFormOptions = {
  defaultProps?: Partial<Omit<FormItemProps, 'type | name | value'>>
}

export function useForm<
  T extends Record<string, any>,
  U = IsNotEmptyObject<T> extends false ? keyof T : string,
>(originData: T, items: FormItemProps<U>[], options: UseFormOptions = {}) {
  // 表单数据 v-model:values
  const formData = ref(deepClone(originData))
  // 表单配置项 :items, 和 defaultProps 合并
  const formItems = ref(
    items.map((item) => ({ ...options.defaultProps, ...item })),
  )

  const map = computed(() => {
    const m = new Map()
    formItems.value.forEach((item) => {
      m.set(item.name, item)
    })
    return m as Map<U, FormItemProps<U>>
  })

  const resetData = () => {
    formData.value = deepClone(originData)
  }

  const getItem = (name: U) => map.value.get(name) as FormItemProps<U>

  const updateItem = (name: U, updateItem: Partial<FormItemProps>) => {
    const item = getItem(name)
    if (item) {
      Object.assign(item, updateItem)
    }
  }

  const setOptions = (name: U, options: FieldOption[]) => {
    updateItem(name, { options })
  }

  type FormInstance = InstanceType<typeof Form>
  const formRef = ref<FormInstance>()
  const setFormRef = (instance: FormInstance) => {
    formRef.value = instance
  }

  return {
    formData,
    formItems,
    resetData,
    getItem,
    updateItem,
    setOptions,
    formRef,
    setFormRef,
  }
}
