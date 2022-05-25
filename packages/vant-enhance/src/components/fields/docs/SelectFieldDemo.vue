<script setup lang="ts">
import type { FieldOption } from '../types'
import { VeSelectField } from '..'
import { ref } from 'vue'

const info = ref({
  carModelId: 2,
  foodIds: [11, 22, 31],
  areaIds: [],
})

const catModelOptions: FieldOption[] = [
  { text: '轿车', value: 1 },
  { text: 'SUV', value: 2 },
  { text: '跑车', value: 3 },
  { text: '货车', value: 4 },
]
const foodOptions: FieldOption[] = [
  {
    text: '水果',
    values: [
      { text: '苹果', value: 11 },
      { text: '香蕉', value: 12 },
      { text: '西瓜', value: 13 },
    ],
  },
  {
    text: '蔬菜',
    values: [
      { text: '黄瓜', value: 21 },
      { text: '西红柿', value: 22 },
      { text: '茄子', value: 23 },
    ],
  },
  {
    text: '肉类',
    values: [
      { text: '牛肉', value: 31 },
      { text: '猪肉', value: 32 },
      { text: '鸡肉', value: 33 },
    ],
  },
]

const areaOptions: FieldOption[] = [
  {
    text: '福建',
    value: 1,
    children: [
      { text: '福州', value: 11 },
      { text: '厦门', value: 12 },
    ],
  },
  {
    text: '浙江',
    value: 2,
    children: [
      { text: '杭州', value: 21 },
      { text: '温州', value: 22 },
    ],
  },
  {
    text: '江苏',
    value: 3,
    children: [
      { text: '苏州', value: 31 },
      { text: '南京', value: 32 },
    ],
  },
]
</script>

<template>
  <div>
    <ve-select-field
      title="车型"
      fieldName="carModelId"
      v-model:value="info.carModelId"
      :options="catModelOptions"
      :rules="[{ required: true, message: '请选择车型' }]"
    />
    <ve-select-field
      title="食物"
      fieldName="foodIds"
      v-model:value="info.foodIds"
      :options="foodOptions"
      :rules="[{ required: true, message: '请选择' }]"
    />
    <ve-select-field
      title="地区"
      fieldName="areaIds"
      v-model:value="info.areaIds"
      :options="areaOptions"
      :rules="[{ required: true, message: '请选择' }]"
    />
  </div>
</template>

<style scoped></style>
