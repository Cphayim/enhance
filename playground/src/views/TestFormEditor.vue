<script setup lang="ts">
import {
  EpeFormEditor,
  type FormItemProps,
} from '@cphayim/element-plus-enhance'

const formEditorRef = ref<InstanceType<typeof EpeFormEditor>>()

const initItems = ref<FormItemProps[]>([
  { type: 'input', name: 'input_aserdd', label: '输入框' },
  { type: 'input', name: 'input_aserde', label: '输入框2' },
])
</script>

<template>
  <div class="mx-20">
    <el-card>
      <EpeFormEditor
        ref="formEditorRef"
        :init-items="initItems"
      ></EpeFormEditor>
    </el-card>
  </div>
</template>

<style>
.mx-20 {
  margin-left: 20px;
  margin-right: 20px;
}
</style>
