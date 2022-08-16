<script setup lang="ts">
import dayjs from 'dayjs'
import { ref, computed } from 'vue'

import type { FieldEmits } from './types'
import type { FieldProps } from '@/shared/field'

defineOptions({ name: 'VeDatetimeField' })

const props = withDefaults(defineProps<FieldProps>(), {
  // 全部通用
  readonly: false,
  disabled: false,
  rules: () => [],
  placeholder: '',
  align: 'left',
  // 选择器通用
  closeOnClickOverlay: false,
  showToolbar: true,
  // datetime
  datetimeType: 'date',
  datetimeFormat: 'YYYY-MM-DD',
})

const emit = defineEmits<FieldEmits>()

const showPicker = ref(false)
// 输入框显示的值，这里可能包含初始化情况，需要进行格式化
const _datetimeText = computed(() => {
  if (!props.value) return ''
  if (props.datetimeType === 'time') return props.value as string
  const d = dayjs(props.value as string)
  return d.isValid() ? d.format(props.datetimeFormat) : (props.value as string)
})
// 用于 v-model 的值
const _currentDatetime = ref<string | Date>(
  props.datetimeType === 'time'
    ? (props.value as string)
    : dayjs(
        (props.value as string) /* 空串会出现 invalid date */ || undefined,
      ).toDate(),
)

const handleDatetimeConfirm = (value: string | Date) => {
  // 这里有两种情况
  // 如果 datetimeType 是 'time'，传递过来的是 '12:00' 这样的字符串
  // 否则是一个 Date 对象
  const fValue =
    value instanceof Date ? dayjs(value).format(props.datetimeFormat) : value
  emit('update:value', fValue)
  emit('change:datetime', value)
  showPicker.value = false
}
// 选择器时间格式化
const dtf = (type: string, value: string) => {
  const map = {
    year: '年',
    month: '月',
    day: '日',
  }
  const suffix = map[type as keyof typeof map]
  return suffix ? `${value}${suffix}` : value
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
      :modelValue="_datetimeText"
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
      <van-datetime-picker
        :type="datetimeType"
        :title="label"
        v-model="_currentDatetime"
        :min-date="minDate"
        :max-date="maxDate"
        :formatter="dtf"
        @confirm="handleDatetimeConfirm"
        @cancel="showPicker = false"
        :show-tool-bar="showToolbar"
      />
    </van-popup>
  </van-cell-group>
</template>

<style scoped></style>
