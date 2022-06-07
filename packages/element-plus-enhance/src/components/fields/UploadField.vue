<!--
 * @Author: Cphayim
 * @Date: 2022-06-01 20:51:25
 * @Description: 上传
-->
<script setup lang="ts">
import { computed, ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'

import { randomStr } from '@/shared/index'
import type { FieldProps, FieldUploadFile } from '@/shared/types'
import type { FieldEmits } from './types'
import { ElMessage, UploadProps, UploadRequestOptions } from 'element-plus'

defineOptions({ name: 'EpeUploadField' })

const props = withDefaults(defineProps<FieldProps>(), {
  readonly: false,
  disabled: false,
  rules: () => [],
  placeholder: '',
  // upload
  uploadStruct: 'object',
  uploadStringSeparator: ',',
  uploadLimit: 5,
  uploadValidate: (_: File) => true,
  uploadSend: (_: File) => Promise.reject(`FormItem 未传入 uploadSend 函数`),
})

const emit = defineEmits<FieldEmits>()

const fileList = computed<FieldUploadFile[]>(() => {
  if (!props.value) return []
  if (props.uploadStruct === 'object') return props.value as FieldUploadFile[]
  const result = (props.value as string)
    .split(props.uploadStringSeparator)
    .map((url) => ({
      url,
      name: getFileName(url),
    }))
  return result
})

const getFileName = (url: string) =>
  url.split('#')[0].split('?')[0].split('/').pop() || randomStr(6)

const uploadValidateWrap = (file: File) => {
  try {
    const result = props.uploadValidate(file)
    if (result === true) return true
    ElMessage.error({ message: result as string, duration: 3000 })
    throw new Error(result as string)
  } catch (error) {
    console.error(error)
    return false
  }
}

const uploadSendWrap = async (options: UploadRequestOptions) => {
  try {
    // 发送请求拿到 FieldUploadFile
    const f = await props.uploadSend(options.file)
    verifyFieldUploadFile(f)
    const newValue =
      props.uploadStruct === 'object'
        ? [...(props.value || []), f]
        : [
            ...(!props.value
              ? []
              : props.value.split(props.uploadStringSeparator)),
            f.url,
          ].join(props.uploadStringSeparator)
    emit('update:value', newValue)
  } catch (error) {
    console.error(error)
    throw error
  }
}

const verifyFieldUploadFile = (f: FieldUploadFile): f is FieldUploadFile => {
  if (!f?.url)
    throw new Error(
      `FormItem.uploadSend 的返回值不是合法的 FieldUploadFile 类型`,
    )
  return true
}

// 删除
const handleRemove: UploadProps['onRemove'] = (_, files) => {
  // 剩余的
  const rest = files.map((f) => ({ name: f.name, url: f.url }))

  const newValue =
    props.uploadStruct === 'object'
      ? rest
      : rest.map((f) => f.url).join(props.uploadStringSeparator)
  emit('update:value', newValue)
}

// 超限提示
const handleExceed = () => {
  ElMessage.warning({ message: '已达到上传数量限制' })
}

const dialogImageUrl = ref('')
const dialogVisible = ref(false)

// 预览
const handlePreview: UploadProps['onPreview'] = (file) => {
  dialogImageUrl.value = file.url!
  dialogVisible.value = true
}
</script>

<template>
  <div class="epe-upload">
    <el-upload
      ref="uploadRef"
      action="/"
      accept="image/*"
      :file-list="fileList"
      :before-upload="uploadValidateWrap"
      :http-request="uploadSendWrap"
      :limit="props.uploadLimit"
      :on-remove="handleRemove"
      :on-preview="handlePreview"
      list-type="picture-card"
      :on-exceed="handleExceed"
      :disabled="props.disabled"
      :readonly="props.readonly"
    >
      <el-icon><Plus /></el-icon>

      <template #tip>
        <pre class="el-upload__tip">{{ props.uploadTips }}</pre>
      </template>
    </el-upload>

    <el-dialog v-model="dialogVisible">
      <img w-full :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
  </div>
</template>

<style>
.epe-upload .el-upload__tip {
  line-height: 20px;
}
.epe-upload .el-upload-list__item,
.epe-upload .el-upload-list--picture-card .el-upload-list__item-actions {
  transition: none;
}
</style>
