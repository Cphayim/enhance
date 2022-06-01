<!--
 * @Author: Cphayim
 * @Date: 2022-06-01 20:51:25
 * @Description: 上传
-->
<script setup lang="ts">
defineOptions({ name: 'EpeUploadField' })
</script>

<template>
  <el-upload
    class="upload-demo"
    drag
    action="https://jsonplaceholder.typicode.com/posts/"
    multiple
  >
    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">
      Drop file here or <em>click to upload</em>
    </div>
    <template #tip>
      <div class="el-upload__tip">
        jpg/png files with a size less than 500kb
      </div>
    </template>
  </el-upload>
</template>

<style scoped></style>
