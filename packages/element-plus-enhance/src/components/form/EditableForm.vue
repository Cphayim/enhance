<!--
 * @Author: Cphayim
 * @Date: 2022-06-01 01:33:27
 * @Description: 可编辑的表单组件，根据配置项生成表单，并可编辑，仅用于 FormEditor，不导出外部
-->
<script setup lang="ts">
import { computed, watchEffect, ref, type CSSProperties } from 'vue'
import draggable from 'vuedraggable/src/vuedraggable'

import type { FormProps } from './types'
import FormItem from './FormItem.vue'
import { FieldProps } from '../fields'
import { randomStr } from '@/shared/index'
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

// setCurrent(0)

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
    name: `${items[index].name.split('_')[0]}_${randomStr(6)}`, // name 不能重复
    label: `${items[index].label}`,
  }
  items.push(field)
  emit('update:items', items)
}

function swap(items: unknown[], i1: number, i2: number) {
  ;[items[i1], items[i2]] = [items[i2], items[i1]]
}

// const target = ref<HTMLElement | null>(null)
// onClickOutside(target, (_) => setCurrent(-1))
const handleDragLog = (_: any) => {
  //
}
const handleDragChoose = (_: any) => {
  setCurrent(_.oldIndex)
}
const handleDragAdd = (_: any) => {
  setCurrent(_.newIndex)
}

defineExpose({
  validate,
  getValues,
  setCurrent,
  currentFieldIndex,
})
</script>

<template>
  <el-form
    ref="formRef"
    :model="props.data"
    :label-width="props.labelWidth"
    @submit.prevent
    :size="props.size"
    class="epe-editable-form"
  >
    <draggable
      :list="props.items"
      group="people"
      item-key="name"
      tag="el-row"
      class="epe-editable-form-row"
      :gutter="props.colGutter * 2"
      @change="handleDragLog"
      @add="handleDragAdd"
      @choose="handleDragChoose"
      ref="target"
    >
      <template #item="{ element: item, index }">
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
            </FormItem>
          </div>
        </el-col>
      </template>
    </draggable>
  </el-form>
</template>

<style>
.epe-editable-form {
  user-select: none;
}
.epe-editable-form .epe-form-editor-item {
  flex: 0 0 100%;
}
.epe-editable-form .epe-form-item .el-form-item {
  margin: 0;
  padding-top: 9px;
  padding-bottom: 9px;
}
.epe-editable-form-row {
  /* 方便拖放到底部 */
  padding-bottom: 50px;
}
</style>
