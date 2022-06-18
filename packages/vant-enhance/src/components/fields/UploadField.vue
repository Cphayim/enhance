<!--
 * @Author: Cphayim
 * @Date: 2022-06-01 20:51:25
 * @Description: 上传
-->
<script setup lang="ts">
import { computed } from 'vue'
import { Toast } from 'vant'

import { randomStr } from '@/shared/index'
import type { FieldProps, FieldUploadFile } from '@/shared/types'
import type { FieldEmits } from './types'

defineOptions({ name: 'VeUploadField' })

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

const fileList = computed<FieldUploadFile[]>({
  get: () => getFileList().map((item) => ({ ...item, isImage: true })),
  set: (files: FieldUploadFile[]) => {
    const newValue =
      props.uploadStruct === 'object'
        ? files
        : files.map((item) => item.url).join(props.uploadStringSeparator)
    emit('update:value', newValue)
  },
})

const getFileList = () => {
  if (!props.value) return []
  if (props.uploadStruct === 'object') return props.value as FieldUploadFile[]
  return (props.value as string)
    .split(props.uploadStringSeparator)
    .map((url) => ({
      url,
      name: getFileName(url),
    }))
}

const getFileName = (url: string) =>
  url.split('#')[0].split('?')[0].split('/').pop() || randomStr(6)

// 自定义处理文件上传，该函数始终返回 false
const handleFileUpload = async (file: File | File[]): Promise<any> => {
  if (Array.isArray(file)) {
    // 暂不处理多选情况
    return Promise.reject()
  } else {
    try {
      // 执行用户传入的验证函数
      const result = props.uploadValidate(file)
      if (typeof result === 'string') {
        Toast({ message: result as string })
        throw new Error(result as string)
      }
      await execSend(file)
      return Promise.reject()
    } catch (error) {
      console.error(error)
      return Promise.reject()
    }
  }
}

const execSend = async (file: File) => {
  // 发送请求拿到 FieldUploadFile
  const f = await props.uploadSend(file)
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
}

const verifyFieldUploadFile = (f: FieldUploadFile): f is FieldUploadFile => {
  if (!f?.url)
    throw new Error(
      `FormItem.uploadSend 的返回值不是合法的 FieldUploadFile 类型`,
    )
  return true
}
</script>

<template>
  <van-cell-group>
    <div class="ve-upload-header">
      {{ props.label }}
    </div>
    <div class="ve-upload">
      <van-uploader
        v-model="fileList"
        :disabled="props.disabled"
        :readonly="props.readonly"
        :max-count="props.uploadLimit"
        :before-read="handleFileUpload"
      />
      <pre class="ve-upload-tip">{{ props.uploadTips }}</pre>
    </div>
  </van-cell-group>
</template>

<style>
.ve-upload-header {
  color: var(--van-field-label-color);
  font-size: var(--van-cell-font-size);
  padding: var(--van-cell-vertical-padding) var(--van-cell-horizontal-padding);
}
.ve-upload {
  padding: var(--van-cell-vertical-padding) var(--van-cell-horizontal-padding);
}
.ve-upload-tip {
  color: var(--van-text-color-3);
  font-size: var(--van-field-error-message-font-size);
}
</style>
