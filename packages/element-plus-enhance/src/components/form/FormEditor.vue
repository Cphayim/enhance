<!--
 * @Author: Cphayim
 * @Date: 2022-05-30 11:45:08
 * @Description: 表单编辑器，用于生成 FormItems 配置项
-->
<script setup lang="ts">
import { computed, ref } from 'vue'
import draggable from 'vuedraggable/src/vuedraggable'

import { randomStr } from '@/shared/index'

import EpeEditableForm from './EditableForm.vue'
import EpeFormEditorDefaultEditPanel from './FormEditorDefaultEditPanel.vue'
import { FormEditorFeatures, FormEditorProps, FormItemProps } from './types'

defineOptions({ name: 'EpeFormEditor' })
const props = withDefaults(defineProps<FormEditorProps>(), {
  initItems: () => [],
})

const formRef = ref<InstanceType<typeof EpeEditableForm>>()
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
  formRef.value?.setCurrent(formRef.value.currentFieldIndex)
  console.log(current.value)
}

const handleChecked = (index: number) => {
  currentIndex.value = index
  // console.log(formItems.value[index])
}

const genDefaultItemMap: Record<string, () => FormItemProps> = {
  [FormEditorFeatures.Input]: () => ({
    type: 'input',
    label: '单行输入',
    name: `input_${randomStr(6)}`,
  }),
  [FormEditorFeatures.Textarea]: () => ({
    type: 'input',
    label: '多行输入',
    name: `text_${randomStr(6)}`,
    inputType: 'textarea',
    inputRows: 4,
    inputMaxLength: 200,
  }),
  [FormEditorFeatures.Select]: () => ({
    type: 'select',
    label: '下拉选择',
    name: `select_${randomStr(6)}`,
    options: [
      { label: '选项一', value: '选项一' },
      { label: '选项二', value: '选项二' },
    ],
  }),
  [FormEditorFeatures.Date]: () => ({
    type: 'datetime',
    label: '日期选择',
    name: `date_${randomStr(6)}`,
    datetimeType: 'date',
    datetimeFormat: 'YYYY-MM-DD',
  }),
  [FormEditorFeatures.Time]: () => ({
    type: 'datetime',
    label: '时间选择',
    name: `time_${randomStr(6)}`,
    datetimeType: 'time',
    datetimeFormat: 'hh:mm',
  }),
}

type Category = {
  label: string
  buttons: Button[]
}
type Button = {
  label: string
  key: string
}

const categories = ref<Category[]>([
  {
    label: '输入型',
    buttons: [
      { label: '单行输入', key: FormEditorFeatures.Input },
      { label: '多行输入', key: FormEditorFeatures.Textarea },
    ],
  },
  {
    label: '选择型',
    buttons: [
      { label: '下拉选择', key: FormEditorFeatures.Select },
      { label: '日期选择', key: FormEditorFeatures.Date },
      { label: '时间选择', key: FormEditorFeatures.Time },
    ],
  },
])

// 点击添加
const handleClickAdd = (button: Button) => {
  const genFn = genDefaultItemMap[button.key]
  if (genFn) {
    const item = genFn()
    formItems.value.push(item)
    formRef.value?.setCurrent(formItems.value.length - 1)
  }
}
// 拖动添加
const handleDragAdd = (button: Button) => {
  const genFn = genDefaultItemMap[button.key]
  return genFn()
}

const tips = {
  left: '点击按钮：向表单尾部添加控件\n拖动按钮：向表单合适位置添加控件',
  center:
    '点击控件：选中控件进入编辑，右下角按钮可复制或删除控件，右侧栏可编辑属性\n拖动控件：调整控件在表单中的顺序',
}

const getFormItems = () => formItems.value

defineExpose({
  getFormItems,
})
</script>

<template>
  <div class="epe-form-editor">
    <!-- 左侧选择控件区 -->
    <div class="epe-form-editor-l-side">
      <pre class="epe-form-editor-tip">{{ tips.left }}</pre>
      <div
        v-for="category in categories"
        :key="category.label"
        class="epe-form-editor-category"
      >
        <div class="epe-form-editor-title">{{ category.label }}</div>
        <draggable
          v-model="category.buttons"
          :group="{ name: 'people', pull: 'clone', put: false }"
          :sort="false"
          :clone="handleDragAdd"
          item-key="key"
          ghost-class="epe-form-editor-item-ghost"
          class="epe-form-editor-list"
        >
          <template #item="{ element: button }">
            <div @click="handleClickAdd(button)" class="epe-form-editor-item">
              {{ button.label }}
            </div>
          </template>
        </draggable>
      </div>
    </div>
    <!-- 中间控件编辑区 -->
    <div class="epe-form-editor-content">
      <pre class="epe-form-editor-tip">{{ tips.center }}</pre>
      <EpeEditableForm
        ref="formRef"
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
.epe-form-editor-tip {
  font-size: 14px;
  color: rgb(24, 126, 118);
  padding: 4px;
  border-radius: 4px;
  border: 2px dotted rgb(24, 126, 118);
  background-color: rgba(24, 126, 118, 0.2);
}
.epe-form-editor {
  display: flex;
  min-height: 800px;
}
.epe-form-editor * {
  box-sizing: border-box;
}
.epe-form-editor-l-side,
.epe-form-editor-r-side {
  flex: 0 0 auto;
  width: 320px;
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
  overflow: auto;
  max-height: 900px;
}
/* .epe-form-editor-content::-webkit-scrollbar {
  width: 6px;
  height: 10px;
}
.epe-form-editor-content::-webkit-scrollbar-track {
  border-radius: 6px;
}
.epe-form-editor-content::-webkit-scrollbar-thumb {
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.3);
}
.epe-form-editor-content::-webkit-scrollbar-thumb:window-inactive {
  background: rgba(255, 255, 255, 0.3);
}
.epe-form-editor-content::-webkit-scrollbar-corner {
  background: transparent;
} */

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
  border-radius: 4px;
  border: 2px dotted rgb(13, 131, 241);
  background-color: rgba(13, 131, 241, 0.3);
  color: var(--epe-color-text-2);
}
.epe-form-editor-item:active {
  filter: brightness(0.75);
}
/* .epe-form-editor-item-ghost {
  flex: 0 0 100%;
} */
</style>
