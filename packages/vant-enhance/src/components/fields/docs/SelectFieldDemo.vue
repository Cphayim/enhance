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
  { label: '轿车', value: 1 },
  { label: 'SUV', value: 2 },
  { label: '跑车', value: 3 },
  { label: '货车', value: 4 },
]
const foodOptions: FieldOption[] = [
  {
    label: '水果',
    values: [
      { label: '苹果', value: 11 },
      { label: '香蕉', value: 12 },
      { label: '西瓜', value: 13 },
    ],
  },
  {
    label: '蔬菜',
    values: [
      { label: '黄瓜', value: 21 },
      { label: '西红柿', value: 22 },
      { label: '茄子', value: 23 },
    ],
  },
  {
    label: '肉类',
    values: [
      { label: '牛肉', value: 31 },
      { label: '猪肉', value: 32 },
      { label: '鸡肉', value: 33 },
    ],
  },
]

const areaOptions: FieldOption[] = [
  {
    label: '福建',
    value: 1,
    children: [
      { label: '福州', value: 11 },
      { label: '厦门', value: 12 },
    ],
  },
  {
    label: '浙江',
    value: 2,
    children: [
      { label: '杭州', value: 21 },
      { label: '温州', value: 22 },
    ],
  },
  {
    label: '江苏',
    value: 3,
    children: [
      { label: '苏州', value: 31 },
      { label: '南京', value: 32 },
    ],
  },
]
</script>

<template>
  <div>
    <ve-select-field
      label="车型"
      name="carModelId"
      v-model:value="info.carModelId"
      :options="catModelOptions"
      :rules="[{ required: true, message: '请选择车型' }]"
    />
    <ve-select-field
      label="食物"
      name="foodIds"
      v-model:value="info.foodIds"
      :options="foodOptions"
      :rules="[{ required: true, message: '请选择' }]"
    />
    <ve-select-field
      label="地区"
      name="areaIds"
      v-model:value="info.areaIds"
      :options="areaOptions"
      :rules="[{ required: true, message: '请选择' }]"
    />
  </div>
</template>

<style scoped></style>
