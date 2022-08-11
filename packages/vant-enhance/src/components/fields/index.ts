import { withInstall } from '@/shared/index'

import InputField from './InputFiled.vue'
import SelectField from './SelectField.vue'
import DatetimeField from './DatetimeField.vue'
import UploadField from './UploadField.vue'

export * from './types'

export const VeInputField = withInstall(InputField)
export const VeSelectField = withInstall(SelectField)
export const VeDatetimeField = withInstall(DatetimeField)
export const VeUploadField = withInstall(UploadField)
