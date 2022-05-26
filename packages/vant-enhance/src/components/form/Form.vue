<script setup lang="ts">
import { ref } from 'vue'
import { Form as VanForm, type FormInstance } from 'vant'
import 'vant/es/form/style/index'

import type { FormProps } from './types'
import FormItem from './FormItem.vue'

defineOptions({ name: 'VeForm' })

const props = defineProps<FormProps>()

const emit = defineEmits<{
  (e: 'update:values', values: any): void
}>()

const formRef = ref<FormInstance>()

const handleValueChange = (name: string, value: any) => {
  emit('update:values', {
    ...props.values,
    [name]: value,
  })
}

const validate = async (name?: string | string[]) => {
  if (!formRef.value) return
  return formRef.value.validate(name)
}

const getValues = () => props.values

defineExpose({
  validate,
  getValues,
})
</script>

<template>
  <van-form ref="formRef" input-align="right" error-message-align="right">
    <template v-for="field in items" :key="field.name">
      <FormItem
        v-bind="field"
        :value="values[field.name]"
        @update:value="(value) => handleValueChange(field.name, value)"
      >
        <!-- 将 FieldItem 的插槽作用域再传出去 -->
        <template #default="itemSlotScope">
          <slot :name="field.name" v-bind="itemSlotScope" />
        </template>
      </FormItem>
    </template>
  </van-form>
</template>

<style scoped></style>
