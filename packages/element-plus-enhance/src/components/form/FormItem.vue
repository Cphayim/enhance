<script setup lang="ts">
import { useAttrs } from 'vue'
import { useVModel } from '@vueuse/core'

import type { FormItemType } from './types'
import { FieldProps, EpeInputField, EpeSelectField } from '../fields'

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

// const CompMap: Record<FormItemType, any> = {
//   input: VeInputField,
//   select: VeSelectField,
//   datetime: VeDatetimeField,
// }
// const comp = computed(() => CompMap[props.type])
const _value = useVModel(props, 'value', emit)

// 编辑模式--------------------------------------------------------------------
const edit = useAttrs() as { editMode: boolean; editing: boolean }
</script>

<template>
  <div ref="target" class="item-wrap">
    <el-form-item :label="field.label" :prop="field.name" :rules="field.rules">
      <slot v-bind="field" :value="_value">
        <!-- input -->
        <EpeInputField
          v-if="props.type === 'input'"
          v-bind="field"
          v-model:value="_value"
        ></EpeInputField>
        <!-- select -->
        <EpeSelectField
          v-if="props.type === 'select'"
          v-bind="field"
          v-model:value="_value"
        >
        </EpeSelectField>
        <el-time-picker
          v-if="props.type === 'datetime'"
          v-model="_value"
          placeholder="Arbitrary time"
        />
        <!-- <component :is="comp" v-bind="$attrs" v-model:value="_value" /> -->
      </slot>
    </el-form-item>

    <el-popover
      v-if="edit.editMode"
      :visible="edit.editing"
      placement="bottom"
      title="配置项"
      :width="500"
    >
      <template #reference>
        <div
          @click="$emit('edit:checked')"
          :class="['edit-mode', { active: edit.editing }]"
        >
          <!-- 操作按钮 -->
          <div v-show="edit.editing" class="edit-opt-box" @click.stop>
            <div @click="$emit('edit:up')">上</div>
            <div @click="$emit('edit:down')">下</div>
            <div @click="$emit('edit:copy')">拷</div>
            <div @click="$emit('edit:remove')">删</div>
          </div>
        </div>
      </template>
      <!-- 配置项 -->
      <div class="field-config-panel">
        {{ JSON.stringify(field) }}
      </div>
    </el-popover>
  </div>
</template>

<style scoped>
::v-deep(.el-form-item) {
  margin-top: 14px;
  margin-bottom: 14px;
  padding-right: 8px;
}
::v-deep(.el-select) {
  width: 100%;
}
.item-wrap {
  overflow: hidden;
  position: relative;
}
.edit-mode {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border: 2px dotted rgb(200, 200, 200);
  border-radius: 4px;
  cursor: pointer;
}
.edit-mode.active {
  border: 2px dotted rgb(13, 131, 241);
  background-color: rgba(13, 131, 241, 0.3);
}
.edit-opt-box {
  position: absolute;
  right: 0;
  bottom: 0;
  display: flex;
}
.edit-opt-box > div {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  color: #fff;
  font-size: 14px;
  background-color: rgba(13, 131, 241, 0.8);
}
.edit-opt-box > div:hover {
  background-color: rgba(13, 131, 241, 0.5);
}
.field-config-panel {
}
</style>
