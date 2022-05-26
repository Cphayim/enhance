<script setup lang="ts">
import { ref } from 'vue'

const info = ref({
  name: '',
  phone: '',
})
</script>

<template>
  <div>
    <ve-input-field
      label="姓名"
      name="name"
      v-model:value="info.name"
      :rules="[{ required: true, message: '请输入姓名' }]"
    />
    <ve-input-field
      title="手机号"
      name="phone"
      v-model:value="info.phone"
      :rules="[{ required: true, message: '请输入手机号' }]"
    />
  </div>
</template>

<style scoped></style>
