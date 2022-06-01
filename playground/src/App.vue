<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
const locale = zhCn
</script>

<template>
  <el-config-provider :locale="locale">
    <div class="header">
      <router-link to="/test-form">表单组件测试</router-link>
      <router-link to="/test-form-editor">表单编辑器</router-link>
    </div>
    <router-view />
  </el-config-provider>
</template>

<style>
body {
  background-color: #f7f7f7;
}
.header {
  display: flex;
  justify-content: center;
  padding: 20px 0;
}
.header a {
  margin: 0 20px;
  color: #666;
}
.header a.router-link-active {
  color: rgb(34, 152, 225);
}
.mx-20 {
  margin-left: 20px;
  margin-right: 20px;
}
.flex {
  display: flex;
}
.justify-center {
  justify-content: center;
}
</style>
