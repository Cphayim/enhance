<script setup lang="ts">
import { computed } from 'vue'
import { useVModel } from '@vueuse/core'

import type { FormItemType } from './types'
import {
  VeInputField,
  VeSelectField,
  VeDatetimeField,
  VeUploadField,
} from '../fields'

defineOptions({ name: 'VeFormItem', inheritAttrs: false })

const props = defineProps<{
  type: FormItemType
  value?: any
}>()

const emit = defineEmits<{
  (e: 'update:value', value: any): void
}>()

const CompMap: Record<FormItemType, any> = {
  input: VeInputField,
  select: VeSelectField,
  datetime: VeDatetimeField,
  upload: VeUploadField,
}
const comp = computed(() => CompMap[props.type])
const _value = useVModel(props, 'value', emit)
</script>

<template>
  <slot v-bind="$attrs" :value="_value">
    <component :is="comp" v-bind="$attrs" v-model:value="_value" />
  </slot>
</template>

<style scoped></style>
