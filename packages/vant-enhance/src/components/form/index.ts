import { withInstall } from '@/shared/index'

import FormItem from './FormItem.vue'
import Form from './Form.vue'

export const VeFormItem = withInstall(FormItem)
export const VeForm = withInstall(Form)

export * from './types'
