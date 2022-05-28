<script setup lang="ts">
import { type Ref } from 'vue'
import { useVModel } from '@vueuse/core'

import type { FieldProps } from '@/shared/types'
import type { FieldEmits } from './types'

defineOptions({ name: 'EpeInputField' })

const props = withDefaults(defineProps<FieldProps>(), {
  readonly: false,
  disabled: false,
  rules: () => [],
  placeholder: '',
  isLink: false,
  align: 'left',
})
const emit = defineEmits<FieldEmits>()

const _value = useVModel(props, 'value', emit) as Ref<string | number>
</script>

<template>
  <el-input
    v-model="_value"
    :type="props.inputType"
    :readonly="props.readonly"
    :disabled="props.disabled"
    :placeholder="props.placeholder || '请输入'"
    :rows="props.inputRows || 4"
    :maxlength="props.inputMaxLength"
    show-word-limit
    resize="none"
    size="default"
  />
</template>

<style scoped></style>
