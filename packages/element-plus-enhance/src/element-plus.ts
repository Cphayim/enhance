// 在此引入 组件库所依赖的所有组件，通过 install 方法一起安装掉
// 这样打包时，我们的组件类型中不会出现 element-plus 的类型
// 在组件中 import element-plus 的组件打包时会导致类型问题，无法生成类型文件

export { ElForm, ElRow, ElCol } from 'element-plus'
import 'element-plus/es/components/form/style/css'
import 'element-plus/es/components/row/style/css'
import 'element-plus/es/components/col/style/css'

export { ElFormItem, ElPopover } from 'element-plus'
import 'element-plus/es/components/form-item/style/css'
import 'element-plus/es/components/popover/style/css'

export { ElDatePicker, ElTimePicker } from 'element-plus'
import 'element-plus/es/components/date-picker/style/css'
import 'element-plus/es/components/time-picker/style/css'

export { ElInput } from 'element-plus'
import 'element-plus/es/components/input/style/css'

export { ElSelect, ElOption, ElCascader } from 'element-plus'
import 'element-plus/es/components/select/style/css'
import 'element-plus/es/components/option/style/css'
import 'element-plus/es/components/cascader/style/css'
