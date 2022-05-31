<!--
 * @Author: Cphayim
 * @Description: 测试表单
-->

<script setup lang="ts">
import dayjs from 'dayjs'

import { useForm } from '@cphayim/element-plus-enhance'
// import { useForm } from '@cphayim/vant-enhance'

const { formData, formItems } = useForm(
  {
    name: null,
    password: null,
    content: null,
    carMode: null,
    food: null,
    birthday: null,
    clock: null,
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
  ],
  {
    defaultProps: {
      align: 'right',
    },
  },
)
</script>

<template>
  <div class="f">
    <div class="pc">
      <el-card>
        <EpeForm
          :items="formItems"
          v-model:data="formData"
          :labelWidth="100"
        ></EpeForm>
        <button>提交</button>
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
