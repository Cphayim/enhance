import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/test',
      component: () => import('@/views/TestForm.vue'),
    },
    {
      path: '/test',
      name: '组件测试',
      component: () => import('@/views/TestForm.vue'),
    },
  ],
})
