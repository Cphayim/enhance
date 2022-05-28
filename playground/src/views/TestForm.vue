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
    name: '',
    password: '',
    content: '',
    carMode: '',
    publishTime: dayjs().format('YYYY-MM-DD HH:mm'), //发起时间
    orderContent: '', // 工单内容
  },
  [
    {
      label: '名称',
      type: 'input',
      name: 'name',
      rules: [{ required: true, message: '请输入' }],
    },
    {
      label: '密码',
      type: 'input',
      inputType: 'password',
      name: 'password',
      rules: [{ required: true, message: '请输入' }],
    },
    {
      label: '留言板',
      type: 'input',
      inputType: 'textarea',
      name: 'content',
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
      label: '工单内容',
      type: 'input',
      name: 'orderContent',
      placeholder: '请输入工单内容',
      inputType: 'textarea',
      inputRows: 4,
      inputMaxLength: 200,
      align: 'left',
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
      <EpeForm
        :items="formItems"
        v-model:data="formData"
        :labelWidth="100"
      ></EpeForm>
    </div>
    <div class="mobile">
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
  border: 1px solid #000;
  border-radius: 4px;
}
</style>
