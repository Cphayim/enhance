<!--
 * @Author: Cphayim
 * @Date: 2022-06-01 01:33:27
 * @Description: 可编辑的表单组件，根据配置项生成表单，并可编辑，仅用于 FormEditor，不导出外部
-->
<script setup lang="ts">
import { computed, watchEffect, ref, type CSSProperties } from 'vue'

import type { FormProps } from './types'
import FormItem from './FormItem.vue'
import { FieldProps } from '../fields'
// import { onClickOutside } from '@vueuse/core'

defineOptions({ name: 'EpeEditableForm' })

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

const getValues = () => props.data
defineExpose({
  validate,
  getValues,
})

const rowGutterStyle = computed<CSSProperties>(() => ({
  marginTop: `${props.rowGutter / 2}px`,
  marginBottom: `${props.rowGutter / 2}px`,
}))

// 编辑模式-------------------------------------------------------------
const currentFieldIndex = ref<number>(-1)
const currentField = ref<FieldProps | null>(null)

// 当 currentFieldIndex 变化时始终通知外部
watchEffect(() => {
  emit('edit:checked', currentFieldIndex.value)
})

function setCurrent(index = -1, skipField = false) {
  currentFieldIndex.value = index
  if (!skipField) {
    currentField.value = index === -1 ? null : props.items[index]
  }
}

setCurrent(0)

const handleChecked = (index: number) => setCurrent(index)
// 上移项
const handleUpItem = (index: number) => {
  if (index <= 0) return
  const items = [...props.items] as FieldProps[]
  swap(items, index, index - 1)
  emit('update:items', items)
  setCurrent(index - 1, true)
}
// 下移项
const handleDownItem = (index: number) => {
  if (index >= props.items.length - 1) return
  const items = [...props.items] as FieldProps[]
  swap(items, index, index + 1)
  emit('update:items', items)
  setCurrent(index + 1, true)
}
// 删除项
const handleRemove = (index: number) => {
  const items = [...props.items] as FieldProps[]
  items.splice(index, 1)
  emit('update:items', items)
  setCurrent(-1)
}
// 复制项
const handleCopy = (index: number) => {
  const items = [...props.items] as FieldProps[]
  const field: FieldProps = {
    ...items[index],
    name: `${items[index].name}_1`, // name 不能重复
    label: `${items[index].label}_1`,
  }
  items.push(field)
  emit('update:items', items)
}

function swap(items: unknown[], i1: number, i2: number) {
  ;[items[i1], items[i2]] = [items[i2], items[i1]]
}

// const target = ref<HTMLElement | null>(null)
// onClickOutside(target, (_) => setCurrent(-1))
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
      <template v-for="(item, index) in props.items" :key="item.name">
        <el-col :span="item.col || 24" :style="rowGutterStyle">
          <div :style="{ width: `${(item.width / 24 || 1) * 100}%` }">
            <FormItem
              v-bind="item"
              :value="data[item.name]"
              @update:value="(value) => handleValueChange(item.name, value)"
              :editMode="editMode"
              :editing="item === currentField"
              @edit:checked="handleChecked(index)"
              @edit:up="handleUpItem(index)"
              @edit:down="handleDownItem(index)"
              @edit:remove="handleRemove(index)"
              @edit:copy="handleCopy(index)"
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
