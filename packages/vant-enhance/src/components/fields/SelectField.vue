<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'

import { isNone } from '../../../../shared'
import type { FieldEmits } from './types'
import type { FieldProps, FieldOption } from '@/shared/types'

defineOptions({ name: 'VeSelectField' })

const props = withDefaults(defineProps<FieldProps>(), {
  readonly: false,
  disabled: false,
  rules: () => [],
  placeholder: '',
  align: 'left',
  // 选择器通用
  closeOnClickOverlay: false,
  showToolbar: true,
  // select
  options: () => [],
  selectType: 'select',
})

const emit = defineEmits<FieldEmits>()

const showPicker = ref(false)
const columnFieldNames = ref({
  text: 'label',
  values: 'values',
  children: 'children',
})

const optionMap = ref(new Map<string | number, FieldOption>())

// 将所有 option 收集到 map 中
const trackOption = (options: FieldOption[]) => {
  if (!options) return
  options.forEach((option) => {
    if (option.values) {
      trackOption(option.values)
    }
    if (option.children) {
      trackOption(option.children)
    }
    if (option.value) {
      optionMap.value.set(option.value, option)
    }
  })
}
watchEffect(() => {
  optionMap.value = new Map()
  trackOption(props.options)
})

// 选项索引，仅单列有效
const _selectIndex = computed(() => {
  // vant 不支持多列默认值，如果设置 -1 会导致不渲染级联
  if (props.selectType === 'cascader') return void 0

  return props.options.findIndex((option) => option.value === props.value)
})

// 输入框显示的值
const _selectLabel = computed(() => getSelectLabel())
// 获取当前选择的文本
function getSelectLabel() {
  if (isNone(props.value)) return ''
  if (Array.isArray(props.value)) {
    return props.value
      .map((value) => optionMap.value.get(value)?.label)
      .join(' / ')
  } else {
    return optionMap.value.get(props.value)?.label
  }
}

const handleSelectConfirm = (selected: FieldOption | FieldOption[]) => {
  const value = Array.isArray(selected)
    ? selected.map((item) => item.value)
    : selected.value
  emit('update:value', value)
  emit('change:select', selected)
  showPicker.value = false
}

const handleFieldClick = () => {
  if (props.readonly || props.disabled) return
  emit('click')
  showPicker.value = true
}
</script>

<template>
  <van-cell-group>
    <!-- 选择器 input 始终为 readonly，props.readonly 用于控制 is-link -->
    <van-field
      :label="label"
      :name="name"
      :modelValue="_selectLabel"
      :disabled="disabled"
      :placeholder="placeholder || '请选择'"
      :rules="rules"
      readonly
      :is-link="!readonly"
      :input-align="align"
      @click="handleFieldClick"
    >
    </van-field>
    <van-popup
      v-model:show="showPicker"
      position="bottom"
      :close-on-click-overlay="closeOnClickOverlay"
      round
      safe-area-inset-bottom
    >
      <van-picker
        :title="label"
        :columns="options"
        @confirm="handleSelectConfirm"
        @cancel="showPicker = false"
        :default-index="_selectIndex"
        :show-toolbar="showToolbar"
        :columns-field-names="columnFieldNames"
        ref="selectRef"
      />
    </van-popup>
  </van-cell-group>
</template>

<style scoped></style>
