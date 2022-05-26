<script setup lang="ts">
import { VeDatetimeField } from '..'
import { ref } from 'vue'

const info = ref({
  date: '2013-11-24',
  time: '23:50',
})
</script>

<template>
  <div>
    <ve-datetime-field
      label="日期"
      name="date"
      v-model:value="info.date"
      datetime-type="date"
      datetime-format="YYYY-MM-DD"
      :rules="[{ required: true, message: '请选择' }]"
    />
    <ve-datetime-field
      label="时间"
      name="time"
      v-model:value="info.time"
      datetime-type="time"
      datetime-format="HH:mm"
      :rules="[{ required: true, message: '请选择' }]"
    />
  </div>
</template>

<style scoped></style>
