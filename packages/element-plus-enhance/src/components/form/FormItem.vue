<script setup lang="ts">
import { useAttrs, computed } from 'vue'
import { useVModel } from '@vueuse/core'

import type { FormItemType } from './types'
import {
  FieldProps,
  EpeInputField,
  EpeSelectField,
  EpeDatetimeField,
  EpeUploadField,
} from '../fields'

defineOptions({ name: 'EpeFormItem', inheritAttrs: false })

const props = defineProps<{
  type: FormItemType
  value?: any
}>()

const emit = defineEmits<{
  (e: 'update:value', value: any): void
  (e: 'edit:checked'): void // 编辑选中
  (e: 'edit:up'): void // 编辑上移
  (e: 'edit:down'): void // 编辑下移
  (e: 'edit:copy'): void // 编辑复制
  (e: 'edit:remove'): void // 编辑删除
}>()

const field = useAttrs() as FieldProps

const CompMap: Record<FormItemType, any> = {
  input: EpeInputField,
  select: EpeSelectField,
  datetime: EpeDatetimeField,
  upload: EpeUploadField,
  'biz-placeholder': null,
}
const comp = computed(() => CompMap[props.type])
const _value = useVModel(props, 'value', emit)

// 编辑模式--------------------------------------------------------------------
const edit = useAttrs() as { editMode: boolean; editing: boolean }
</script>

<template>
  <div ref="target" class="epe-form-item">
    <el-form-item :label="field.label" :prop="field.name" :rules="field.rules">
      <slot v-bind="field" :value="_value">
        <div v-if="props.type === 'biz-placeholder'">
          <span>{{ ($attrs.extra as any)?.bizLabel || '未知'}}</span>
          <span>（业务组件将在使用时显示）</span>
        </div>
        <component v-else :is="comp" v-bind="$attrs" v-model:value="_value" />
      </slot>
    </el-form-item>

    <div
      v-if="edit.editMode"
      @click="$emit('edit:checked')"
      :class="['epe-form-item-edit-mode', { active: edit.editing }]"
    >
      <!-- 操作按钮 -->
      <div v-show="edit.editing" class="epe-form-item-edit-opt-box" @click.stop>
        <div @click="$emit('edit:copy')">复制</div>
        <div @click="$emit('edit:remove')">删除</div>
      </div>
    </div>
  </div>
</template>

<style>
.epe-form-item .el-form-item {
  padding-right: 8px;
}
.epe-form-item .el-select {
  width: 100%;
}
.epe-form-item .el-cascader {
  width: 100%;
}
.epe-form-item .el-date-editor.el-input {
  width: 100%;
}
.epe-form-item .el-date-editor.el-input .el-input__wrapper {
  width: 100%;
  box-sizing: border-box;
}
.epe-form-item {
  position: relative;
}
.epe-form-item-edit-mode {
  user-select: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border: 2px dotted rgb(200, 200, 200);
  border-radius: 4px;
  cursor: pointer;
}
.epe-form-item-edit-mode:active {
  cursor: move;
}
.epe-form-item-edit-mode.active {
  border: 2px dotted rgb(13, 131, 241);
  background-color: rgba(13, 131, 241, 0.3);
}
.epe-form-item-edit-opt-box {
  position: absolute;
  right: 0;
  bottom: 0;
  display: flex;
}
.epe-form-item-edit-opt-box > div {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  padding: 0 6px;
  color: #fff;
  font-size: 14px;
  background-color: rgba(13, 131, 241, 0.8);
}
.epe-form-item-edit-opt-box > div:hover {
  background-color: rgba(13, 131, 241, 0.5);
}
.epe-form-item-field-config-panel {
}
</style>
