<!--
 * @Author: Cphayim
 * @Description: 测试表单
-->

<script setup lang="ts">
import { useForm } from '@cphayim/element-plus-enhance'
import consola from 'consola'
// import { useForm } from '@cphayim/vant-enhance'

const { formData, formItems, formRef } = useForm(
  {
    name: null,
    password: null,
    content: null,
    carMode: null,
    food: null,
    birthday: null,
    clock: null,
    photos: 'https://element-plus.org/images/plant-1.png',
  },
  [
    {
      label: '名称',
      type: 'input',
      name: 'name',
      rules: [{ required: true, message: '请输入' }],
      col: 12,
    },
    {
      label: '密码',
      type: 'input',
      inputType: 'password',
      name: 'password',
      rules: [{ required: true, message: '请输入' }],
      col: 12,
    },
    {
      label: '留言板',
      type: 'input',
      inputType: 'textarea',
      name: 'content',
      align: 'left',
    },
    {
      label: '车型',
      type: 'select',
      name: 'carMode',
      options: [
        { label: '轿车', value: 1 },
        { label: 'SUV', value: 2 },
        { label: '跑车', value: 3 },
        { label: '货车', value: 4 },
      ],
      selectFilterable: true,
    },
    {
      label: '食物',
      type: 'select',
      selectType: 'cascader',
      name: 'food',
      options: [
        {
          label: '水果',
          value: 1,
          children: [
            { label: '苹果', value: 11 },
            { label: '香蕉', value: 12 },
            { label: '西瓜', value: 13 },
          ],
        },
        {
          label: '蔬菜',
          value: 2,
          children: [
            { label: '西红柿', value: 22 },
            { label: '黄瓜', value: 21 },
            { label: '茄子', value: 23 },
          ],
        },
        {
          label: '肉类',
          value: 3,
          children: [
            { label: '牛肉', value: 31 },
            { label: '猪肉', value: 32 },
            { label: '鸡肉', value: 33 },
          ],
        },
      ],
    },
    {
      label: '生日',
      type: 'datetime',
      name: 'birthday',
      datetimeType: 'date',
      col: 12,
    },
    {
      label: '时钟',
      type: 'datetime',
      name: 'clock',
      datetimeType: 'time',
      col: 12,
    },
    {
      label: '照片',
      type: 'upload',
      name: 'photos',
      uploadType: 'image',
      uploadLimit: 3,
      uploadTips: '只能上传 3 张图片\n图片文件大小不能超过 300kb',
    },
    {
      label: '文件',
      type: 'upload',
      name: 'file',
      uploadLimit: 1,
      uploadType: 'file',
      uploadTips: '只能上传 1 个文件',
    },
  ],
  {
    defaultProps: {
      align: 'right',
      uploadStruct: 'string',
      uploadStringSeparator: ',',
      uploadValidate: (file: File) => {
        if (file.size / 1024 > 300) {
          return '图片大小不能超过 300k'
        }
        return true
      },
      uploadSend: async (file: File) => {
        return { url: URL.createObjectURL(file) }
      },
    },
  },
)

const handleSubmit = async () => {
  try {
    await formRef.value?.validate()
    consola.success('正在提交的数据：')
    consola.success(JSON.parse(JSON.stringify(formData.value)))
    // fetch('/form', { method: 'POST', body: JSON.stringify(formData.value) })
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <div class="f">
    <div class="pc">
      <el-card class="card">
        <EpeForm
          ref="formRef"
          :items="formItems"
          v-model:data="formData"
          :labelWidth="100"
        ></EpeForm>
        <div class="flex justify-center">
          <el-button @click="handleSubmit" type="primary" size="large">
            提交
          </el-button>
        </div>
      </el-card>
    </div>
    <div class="mobile">
      <van-nav-bar title="表单测试" left-arrow></van-nav-bar>
      <VeForm :items="formItems" v-model:data="formData"></VeForm>
    </div>
  </div>
</template>

<style scoped>
.f {
  display: flex;
  margin: 20px;
}
.pc {
  flex: 1;
  margin-right: 20px;
}
.card {
  height: 700px;
  overflow: auto;
}
.mobile {
  overflow: auto;
  flex: 0 0 auto;
  width: 375px;
  height: 700px;
  border: 1px solid #999;
  border-radius: 4px;
  background-color: #fff;
}
</style>
