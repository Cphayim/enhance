<script setup lang="ts">
import { computed } from 'vue'
import { useVModel } from '@vueuse/core'

import type { FieldProps } from '@/shared/types'
import type { FieldEmits } from './types'

defineOptions({ name: 'EpeSelectField' })

const props = withDefaults(defineProps<FieldProps>(), {
  readonly: false,
  disabled: false,
  rules: () => [],
  placeholder: '',
  // select
  options: () => [],
  selectType: 'select',
  selectMultiple: false,
})

const emit = defineEmits<FieldEmits>()
const _value = useVModel(props, 'value', emit)
const _cascaderProps = computed(() => {
  return {
    multiple: props.selectMultiple,
    expandTrigger: 'click',
  } as any
})
</script>

<template>
  <template v-if="props.selectType === 'cascader'">
    <el-cascader
      v-model="_value"
      :options="props.options"
      :props="_cascaderProps"
    />
  </template>

  <template v-else>
    <el-select
      v-model="_value"
      :placeholder="props.placeholder"
      :multiple="selectMultiple"
      size="default"
    >
      <el-option
        v-for="option in props.options"
        :key="option.value"
        :label="option.label"
        :value="option.value!"
      />
    </el-select>
  </template>
</template>

<style scoped></style>
