<script setup lang="ts">
import {
  EpeFormEditor,
  type FormItemProps,
} from '@cphayim/element-plus-enhance'
import consola from 'consola'

const formEditorRef = ref<InstanceType<typeof EpeFormEditor>>()
const initItems = ref<FormItemProps[]>([
  { type: 'select', name: 'input_aserdd', label: '选择器' },
  {
    type: 'input',
    name: 'input_aserde',
    label: '多行输入',
    inputType: 'textarea',
  },
])

const handleGetItems = () => {
  consola.info('获取到配置项：')
  consola.info(JSON.parse(JSON.stringify(formEditorRef.value?.getFormItems())))
}
const handlePreview = () => {
  consola.info('打开预览')
}
</script>

<template>
  <div class="mx-20">
    <el-card>
      <EpeFormEditor
        ref="formEditorRef"
        :init-items="initItems"
      ></EpeFormEditor>
      <div class="flex justify-center">
        <el-button @click="handleGetItems" type="primary"
          >获取配置项（控制台）</el-button
        >
        <el-button @click="handlePreview" type="success"
          >双端效果预览</el-button
        >
      </div>
    </el-card>
  </div>
</template>

<style></style>
