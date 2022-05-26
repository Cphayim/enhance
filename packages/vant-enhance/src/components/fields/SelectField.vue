<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import {
  CellGroup as VanCellGroup,
  Field as VanField,
  Popup as VanPopup,
  Picker as VanPicker,
} from 'vant'
import 'vant/es/cell-group/style/index'
import 'vant/es/field/style/index'
import 'vant/es/popup/style/index'
import 'vant/es/picker/style/index'

import { isNone } from '../../../../shared'
import { FieldProps, FieldEmits, FieldOption } from './types'

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
  defaultIndex: 0,
})

const emit = defineEmits<FieldEmits>()

const showPicker = ref(false)

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

const _selected = ref<FieldOption | FieldOption[]>()

// 选项索引，仅单列有效
const _selectIndex = computed(() => {
  if (Array.isArray(props.value)) {
    return -1 // vant 不支持多列默认值
  }
  return props.options.findIndex((option) => option.value === props.value)
})

// 输入框显示的值
const _selectLabel = computed(() => getSelectLabel())
// 获取当前选择的文本
function getSelectLabel() {
  if (isNone(_selected.value)) return getSelectInitialLabel()
  if (Array.isArray(_selected.value)) {
    return _selected.value.map((option) => option.label).join(', ')
  } else {
    return _selected.value.label
  }
}
// 获取初始选择文本
function getSelectInitialLabel() {
  if (isNone(props.value)) return ''
  if (Array.isArray(props.value)) {
    return props.value
      .map((value) => optionMap.value.get(value)?.label)
      .join(', ')
  } else {
    return optionMap.value.get(props.value)?.label
  }
}

const handleSelectConfirm = (selected: FieldOption | FieldOption[]) => {
  _selected.value = selected
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
      :label="title"
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
        :title="title"
        :columns="options"
        @confirm="handleSelectConfirm"
        @cancel="showPicker = false"
        :default-index="_selectIndex"
        :show-toolbar="showToolbar"
        ref="selectRef"
      />
    </van-popup>
  </van-cell-group>
</template>

<style scoped></style>
