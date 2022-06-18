// 在此引入 组件库所依赖的所有组件，通过 install 方法一起安装掉
// 这样打包时，我们的组件类型中不会出现 element-plus 的类型
// 在组件中 import element-plus 的组件打包时会导致类型问题，无法生成类型文件

export { CellGroup, Field } from 'vant'
import 'vant/es/cell-group/style/index'
import 'vant/es/field/style/index'

export { Popup, Picker } from 'vant'
import 'vant/es/popup/style/index'
import 'vant/es/picker/style/index'

export { DatetimePicker } from 'vant'
import 'vant/es/datetime-picker/style/index'

export { Uploader, Toast } from 'vant'
import 'vant/es/uploader/style/index'
import 'vant/es/toast/style/index'

export { Form } from 'vant'
import 'vant/es/form/style/index'
