import { withInstall } from '@/shared/index'

import FormItem from './FormItem.vue'
import Form from './Form.vue'
import FormEditor from './FormEditor.vue'

export const EpeFormItem = withInstall(FormItem)
export const EpeForm = withInstall(Form)
export const EpeFormEditor = withInstall(FormEditor)

export * from './types'

export type EpeFormInstance = InstanceType<typeof EpeForm>
export type EpeFormEditorInstance = InstanceType<typeof EpeFormEditor>
