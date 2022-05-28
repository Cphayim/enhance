import { withInstall } from '@/shared/index'

import FormItem from './FormItem.vue'
import Form from './Form.vue'

export const EpeFormItem = withInstall(FormItem)
export const EpeForm = withInstall(Form)

export * from './types'
