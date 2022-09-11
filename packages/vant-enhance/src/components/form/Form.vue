<script setup lang="ts">
import { ref } from 'vue'
import { type FormInstance } from 'vant'

import type { FormProps } from './types'
import FormItem from './FormItem.vue'

defineOptions({ name: 'VeForm' })

const props = defineProps<FormProps>()

const emit = defineEmits<{
  (e: 'update:data', values: any): void
}>()

const formRef = ref<FormInstance>()

const handleValueChange = (name: string, value: any) => {
  emit('update:data', {
    ...props.data,
    [name]: value,
  })
}

const validate = async (name?: string | string[]) => {
  if (!formRef.value) return
  return formRef.value.validate(name)
}

const clearValidate = (names: string | string[]) => {
  if (!formRef.value) return
  formRef.value!.resetValidation(names)
}

const getValues = () => props.data

defineExpose({
  validate,
  clearValidate,
  getValues,
})
</script>

<template>
  <van-form ref="formRef" input-align="right" error-message-align="right">
    <template v-for="field in items" :key="field.name">
      <FormItem
        v-if="!field.hidden"
        v-bind="field"
        :value="data[field.name]"
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
