<script setup lang="ts">
import { computed, CSSProperties, ref } from 'vue'

import type { FormProps } from './types'
import FormItem from './FormItem.vue'
import { FieldProps } from '../fields'
import { onClickOutside } from '@vueuse/core'

defineOptions({ name: 'EpeForm' })

const props = withDefaults(defineProps<FormProps>(), {
  colGutter: 10,
  rowGutter: 8,
  labelWidth: 100,
})

const emit = defineEmits<{
  (e: 'update:data', values: any): void
  (e: 'update:items', values: any): void
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
const currentField = ref<FieldProps | null>(null)

// 上移项
const handleUpItem = (index: number) => {
  if (index <= 0) return
  const items = [...props.items] as FieldProps[]
  swap(items, index, index - 1)
  emit('update:items', items)
}
// 下移项
const handleDownItem = (index: number) => {
  if (index >= props.items.length - 1) return
  const items = [...props.items] as FieldProps[]
  swap(items, index, index + 1)
  emit('update:items', items)
}
const handleRemove = (index: number) => {
  const items = [...props.items] as FieldProps[]
  items.splice(index, 1)
  emit('update:items', items)
}
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

const target = ref<HTMLElement | null>(null)
onClickOutside(target, (_) => (currentField.value = null))
</script>

<template>
  <el-form
    ref="formRef"
    :model="props.data"
    :label-width="props.labelWidth"
    @submit.prevent
  >
    <el-row :gutter="props.colGutter * 2" ref="target">
      <template v-for="(item, index) in props.items" :key="item.name">
        <el-col :span="item.col" :style="rowGutterStyle">
          <FormItem
            v-bind="item"
            :value="data[item.name]"
            @update:value="(value) => handleValueChange(item.name, value)"
            :editMode="editMode"
            :editing="item === currentField"
            @edit:checked="currentField = item"
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
        </el-col>
      </template>
    </el-row>
  </el-form>
</template>

<style scoped>
.my-10 {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
