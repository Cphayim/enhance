<!--
 * @Author: Cphayim
 * @Date: 2022-06-01 01:33:27
 * @Description: 表单组件，根据配置项生成表单
-->
<script setup lang="ts">
import { computed, ref, type CSSProperties } from 'vue'

import type { FormProps } from './types'
import FormItem from './FormItem.vue'

defineOptions({ name: 'EpeForm' })

const props = withDefaults(defineProps<FormProps>(), {
  colGutter: 10,
  rowGutter: 8,
  labelWidth: 100,
  size: 'default',
})

const emit = defineEmits<{
  (e: 'update:data', values: any): void
  (e: 'update:items', values: any): void
  (e: 'edit:checked', index: number): void
}>()

const formRef = ref<any>()

const handleValueChange = (fieldName: string, value: any) => {
  emit('update:data', {
    ...props.data,
    [fieldName]: value,
  })
}

const validate = async () => {
  if (!formRef.value) return
  // 保持和 vant 一致
  return new Promise((resolve, reject) => {
    formRef.value!.validate((valid: boolean, fields: any[]) => {
      if (valid) resolve(undefined)
      else reject(fields)
    })
  })
}

const clearValidate = (names?: string | string[]) => {
  if (!formRef.value) return
  // @enhance: 当没有传递 names 时，清除所有验证结果
  if (!names) {
    names = props.items.map((item) => item.name)
  }
  formRef.value!.clearValidate(names)
}

const getValues = () => props.data

defineExpose({
  validate,
  clearValidate,
  getValues,
})

const rowGutterStyle = computed<CSSProperties>(() => ({
  marginTop: `${props.rowGutter / 2}px`,
  marginBottom: `${props.rowGutter / 2}px`,
}))
</script>

<template>
  <el-form
    ref="formRef"
    :model="props.data"
    :label-width="props.labelWidth"
    @submit.prevent
    :size="props.size"
  >
    <el-row :gutter="props.colGutter * 2" ref="target">
      <template v-for="item in props.items" :key="item.name">
        <el-col
          v-if="!item.hidden"
          :span="item.col || 24"
          :style="rowGutterStyle"
        >
          <div :style="{ width: `${(item.width / 24 || 1) * 100}%` }">
            <FormItem
              v-bind="item"
              :value="data[item.name]"
              @update:value="(value) => handleValueChange(item.name, value)"
            >
              <!-- 将 FieldItem 的插槽作用域再传出去 -->
              <template #default="itemSlotScope">
                <slot :name="item.name" v-bind="itemSlotScope" />
              </template>
            </FormItem>
          </div>
        </el-col>
      </template>
    </el-row>
  </el-form>
</template>

<style></style>
