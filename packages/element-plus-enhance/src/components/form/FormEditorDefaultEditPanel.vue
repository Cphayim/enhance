<script setup lang="ts">
import { computed } from 'vue'
import { FormItemProps } from './types'

defineOptions({ name: 'EpeFormEditorDefaultEditPanel' })

const props = defineProps<{
  current: any
  setCurrent: (item: FormItemProps) => void
}>()

const item = computed<FormItemProps>(() => props.current)
const handleChange = (key: string, value: any) => {
  const newItem = { ...item.value, [key]: value }
  props.setCurrent(newItem)
}
</script>

<template>
  <!-- 通用 -->
  <div class="epe-form-editor-default">
    <div class="epe-form-editor-default-category">
      <div class="epe-form-editor-default-config">
        <!-- name：如果是自动生成则只读 -->
        <div class="epe-form-editor-default-title">字段名</div>
        <el-input
          :modelValue="item.name"
          @update:modelValue="(val:string) => handleChange('name', val)"
          disabled
        />
      </div>

      <div class="epe-form-editor-default-config">
        <!-- label -->
        <div class="epe-form-editor-default-title">标签名</div>
        <el-input
          :modelValue="item.label"
          @update:modelValue="(val:string) => handleChange('label', val)"
        />
      </div>
    </div>
  </div>
</template>

<style>
.epe-form-editor-default-config {
  margin: 10px 0;
}
.epe-form-editor-default-title {
  color: var(--epe-color-text-2);
  margin-bottom: 6px;
}
</style>
