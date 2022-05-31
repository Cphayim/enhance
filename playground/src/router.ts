import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/test-form',
      component: () => import('@/views/TestForm.vue'),
    },
    {
      path: '/test-form',
      name: '表单组件测试',
      component: () => import('@/views/TestForm.vue'),
    },
    {
      path: '/test-form-editor',
      name: '表单编辑器测试',
      component: () => import('@/views/TestFormEditor.vue'),
    },
  ],
})
