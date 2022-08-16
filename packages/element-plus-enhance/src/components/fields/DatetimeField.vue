<script setup lang="ts">
import { computed } from 'vue'
import { useVModel } from '@vueuse/core'
import dayjs from 'dayjs'

import type { FieldProps } from '@/shared/field'
import type { FieldEmits } from './types'

defineOptions({ name: 'EpeDatetimeField' })

const props = withDefaults(defineProps<FieldProps>(), {
  // 全部通用
  readonly: false,
  disabled: false,
  rules: () => [],
  placeholder: '请选择',
  align: 'left',
  // 选择器通用
  closeOnClickOverlay: false,
  showToolbar: true,
  // datetime
  datetimeType: 'date',
  datetimeFormat: 'YYYY-MM-DD',
})

const emit = defineEmits<FieldEmits>()

// element-plus 日期自带格式转换，不需要额外处理
const _dateValue = useVModel(props, 'value', emit)

// 时间需要处理对 vant 的适配
const _timeValue = computed({
  get() {
    if (!props.value) return void 0
    // props.value: "12:00"
    // 转成 date 对象给 time-picker
    return dayjs(dayjs().format('YYYY-MM-DD') + props.value).toDate()
  },
  set(date: Date | undefined) {
    if (!date) {
      emit('update:value', null)
    } else {
      // time 的格式化固定为 hh:mm
      emit('update:value', dayjs(date).format('hh:mm'))
    }
  },
})
</script>

<template>
  <!-- 时间选择 -->
  <template v-if="props.datetimeType === 'time'">
    <el-time-picker
      v-model="_timeValue"
      :readonly="props.readonly"
      :disabled="props.disabled"
      :placeholder="props.placeholder"
    />
  </template>
  <!-- 日期选择 -->
  <template v-else>
    <el-date-picker
      type="date"
      v-model="_dateValue"
      :format="props.datetimeFormat"
      :value-format="props.datetimeFormat"
      :readonly="props.readonly"
      :disabled="props.disabled"
      :placeholder="props.placeholder"
    />
  </template>
</template>

<style scoped></style>
