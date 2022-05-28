import { createApp } from 'vue'
import App from './App.vue'

import ElementPlusEnhance from '@cphayim/element-plus-enhance'
import '@cphayim/element-plus-enhance/style'

import VantEnhance from '@cphayim/vant-enhance'
import '@cphayim/vant-enhance/style'

import { router } from './router'

const app = createApp(App)
  .use(router)
  .use(ElementPlusEnhance)
  .use(VantEnhance)
  .mount('#app')
