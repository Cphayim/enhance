import { withInstall } from '../../../../shared'

import InputField from './InputFiled.vue'
import SelectField from './SelectField.vue'
import DatetimeField from './DatetimeField.vue'

export * from './types'

export const VeInputField = withInstall(InputField)
export const VeSelectField = withInstall(SelectField)
export const VeDatetimeField = withInstall(DatetimeField)
