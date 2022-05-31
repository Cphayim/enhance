<!--
 * @Author: Cphayim
 * @Date: 2022-05-30 11:45:08
 * @Description: 表单编辑器，用于生成 FormItems 配置项
-->
<script setup lang="ts">
import { computed, ref } from 'vue'
// import draggable from 'vuedraggable/src/vuedraggable'

import { randomStr } from '@/shared/index'

import EpeEditableForm from './EditableForm.vue'
import EpeFormEditorDefaultEditPanel from './FormEditorDefaultEditPanel.vue'
import type { FormEditorProps, FormItemProps } from './types'

defineOptions({ name: 'EpeFormEditor' })
const props = withDefaults(defineProps<FormEditorProps>(), {
  initItems: () => [],
})

const formData = ref<Record<string, any>>({})
const formItems = ref<FormItemProps[]>([...props.initItems])

// 当前正在编辑项的索引
const currentIndex = ref(-1)
const current = computed({
  get: () => formItems.value[currentIndex.value],
  set: (item: FormItemProps) => (formItems.value[currentIndex.value] = item),
})
const setCurrent = (item: FormItemProps) => {
  current.value = item
}

const handleChecked = (index: number) => {
  currentIndex.value = index
  console.log(formItems.value[index])
}

const genDefaultItemMap: Record<string, () => FormItemProps> = {
  input: () => ({
    type: 'input',
    label: '单行输入',
    name: `input_${randomStr(6)}`,
  }),
  textarea: () => ({
    type: 'input',
    label: '多行输入',
    name: `text_${randomStr(6)}`,
    inputType: 'textarea',
    inputRows: 4,
    inputMaxLength: 200,
  }),
  select: () => ({
    type: 'select',
    label: '下拉选择',
    name: `select_${randomStr(6)}`,
    options: [
      { label: '选项一', value: '选项一' },
      { label: '选项二', value: '选项二' },
    ],
  }),
  date: () => ({
    type: 'datetime',
    label: '日期选择',
    name: `date_${randomStr(6)}`,
    datetimeType: 'date',
    datetimeFormat: 'YYYY-MM-DD',
  }),
  time: () => ({
    type: 'datetime',
    label: '时间选择',
    name: `time_${randomStr(6)}`,
    datetimeType: 'time',
    datetimeFormat: 'hh:mm',
  }),
}

const categories = ref([
  {
    label: '输入型',
    buttons: [
      { label: '单行输入', key: 'input' },
      { label: '多行输入', key: 'textarea' },
    ],
  },
  {
    label: '选择型',
    buttons: [
      { label: '下拉选择', key: 'select' },
      { label: '日期选择', key: 'date' },
      { label: '时间选择', key: 'time' },
    ],
  },
])

const handleAdd = (key: string) => {
  const genFn = genDefaultItemMap[key]
  if (genFn) {
    const item = genFn()
    formItems.value.push(item)
  }
}
</script>

<template>
  <div class="epe-form-editor">
    <!-- 左侧选择控件区 -->
    <div class="epe-form-editor-l-side">
      <div
        v-for="category in categories"
        :key="category.label"
        class="epe-form-editor-category"
      >
        <div class="epe-form-editor-title">{{ category.label }}</div>
        <div class="epe-form-editor-list">
          <div
            v-for="button in category.buttons"
            :key="button.label"
            @click="handleAdd(button.key)"
            class="epe-form-editor-item"
          >
            {{ button.label }}
          </div>
        </div>
        <!-- <draggable
          v-model="category.buttons"
          group="people"
          :move="checkMove"
          :sort="false"
          item-key="key"
          class="epe-form-editor-list"
        >
          <template #item="{ element }">
            <div @click="handleAdd(element.key)" class="epe-form-editor-item">
              {{ element.label }}
            </div>
          </template>
        </draggable> -->
      </div>
    </div>
    <!-- 中间控件编辑区 -->
    <div class="epe-form-editor-content">
      <EpeEditableForm
        :data="formData"
        v-model:items="formItems"
        edit-mode
        @edit:checked="handleChecked"
      />
    </div>
    <!-- 右侧配置项编辑区 -->
    <div class="epe-form-editor-r-side">
      <!-- 动态 type 插槽，用户可以通过不同 name: FormItemType 的插槽名来自定义编辑区 -->
      <slot v-if="current" :name="current.type">
        <EpeFormEditorDefaultEditPanel
          :current="current"
          :setCurrent="setCurrent"
        />
      </slot>
    </div>
  </div>
</template>

<style>
.epe-form-editor {
  display: flex;
  min-height: 500px;
}
.epe-form-editor * {
  box-sizing: border-box;
}
.epe-form-editor-l-side,
.epe-form-editor-r-side {
  flex: 0 0 auto;
  width: 300px;
  padding: 20px;
}
.epe-form-editor-l-side {
  border-right: 1px solid var(--epe-color-border);
}
.epe-form-editor-r-side {
  border-left: 1px solid var(--epe-color-border);
}
.epe-form-editor-content {
  flex: 1;
  padding: 20px;
}
.epe-form-editor-category {
  margin-bottom: 20px;
}
.epe-form-editor-title {
  color: var(--epe-color-text-2);
}
.epe-form-editor-list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 10px 0;
}
.epe-form-editor-item {
  cursor: pointer;
  flex: 0 0 48%;
  padding: 10px 0;
  margin: 6px 0;
  text-align: center;
  background-color: var(--epe-color-form-editor-button);
}
.epe-form-editor-item:active {
  filter: brightness(0.75);
}
</style>
