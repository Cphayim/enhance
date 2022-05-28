import { withInstall } from '../../../../shared'

import InputField from './InputFiled.vue'
import SelectField from './SelectField.vue'
import DatetimeField from './DatetimeField.vue'

export * from './types'

export const EpeInputField = withInstall(InputField)
export const EpeSelectField = withInstall(SelectField)
export const EpeDatetimeField = withInstall(DatetimeField)
