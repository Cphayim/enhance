# @cphayim/element-plus-enhance

[![npm package](https://badgen.net/npm/v/@cphayim/element-plus-enhance)](https://www.npmjs.com/package/@cphayim/element-plus-enhance)
[![pnpm](https://img.shields.io/badge/maintained%20with-pnpm-f49033.svg)](https://pnpm.io/)

该包是针对 `element-plus` 进行的上层封装，目的是为提供双端（PC，移动）一致的配置来优化开发体验和提升效率。

Demo: http://enhance.vrndeco.cn/test-form-editor

移动端对应包： [@cphayim/vant-enhance](https://www.npmjs.com/package/@cphayim/vant-enhance)

[TOC]

## 安装

```sh
npm i @cphayim/element-plus-enhance
```

注意：你需要确保项目中已安装如下对等依赖

```
"peerDependencies": {
    "element-plus": "^2.2.0",
    "vue": "^3.2.25",
}
```

然后在当前 Vue 实例上安装此包并引入样式

```typescript
import ElementPlusEnhance from '@cphayim/element-plus-enhance'
import '@cphayim/element-plus-enhance/style'

const app = createApp(App).use(ElementPlusEnhance).mount('#app')
```

你无需在项目中全量安装 `element-plus`，依然可以使用按需导入或自动导入。事实上此包中也是按需导入了使用到的 `element-plus`的相关组件与样式，因此全量安装此包不会对你的项目体积产生较大影响。

## EpeForm - 表单生成器组件

`EpeForm` 是一个约定配置化的表单生成器组件，和 [@cphayim/vant-enhance](https://www.npmjs.com/package/@cphayim/vant-enhance) 中的 `VeForm` 组件一样，遵循了一套配置规则（最小共同能力）。我们使用同一套配置即可在双端生成能力相同的表单而无需顾忌两套 UI 框架的 API 差异。

### 最简示例

现在，我们要使用配置来创建拥有 `username` 和 `message`两个字段的表单

```html
<script setup lang="ts">
  import { useForm } from '@cphayim/element-plus-enhance'

  const { formData, formItems, formRef } = useForm(
    {
      username: null,
      message: null,
    },
    [
      { type: 'input', label: '用户名', name: 'username' },
      { type: 'input', label: '留言', name: 'message' },
    ],
  )

  const handleSubmit = async () => {
    try {
      await formRef.value?.validate()
      console.log(formData.value)
      // fetch('/form', { method: 'POST', body: JSON.stringify(formData.value) })
    } catch (error) {
      console.error(error)
    }
  }
</script>

<template>
  <div>
    <EpeForm
      ref="formRef"
      :items="formItems"
      v-model:data="formData"
      :labelWidth="100"
    ></EpeForm>
    <el-button @click="handleSubmit" type="primary" size="large">
      提交
    </el-button>
  </div>
</template>
```

在此我们使用了 `useForm` 函数来创建了 `formData` 和 `formItems` 两个响应式对象（`ref`），它们是 `EpeForm` 组件的必要 `props`，之后 `EpeForm` 就会根据 `formItems` 的配置来渲染表单项，所有表单项中的值变化都会反应到 `formData` 上。

当然，如果你愿意的话，也完全可以直接创建这两个对象，`useForm` 钩子函数提供了第三个参数，可以抽离公共配置项进行合并，这个会在后面介绍

```typescript
import { FormItemProps } from '@cphayim/element-plus-enhance'

// 等同于上面使用 useForm 创建的
const formData = ref({
  username: null,
  message: null,
})
// 使用 FormItemProps 进行类型提示和自动完成
const formItems = ref<FormItemProps[]>([
  { type: 'input', label: '用户名', name: 'username' },
  { type: 'input', label: '留言', name: 'message' },
])
```

### 配置项与类型

`EpeForm` 及其子组件所需的 `props`

```typescript
/**
 * EpeForm 组件 props
 */
export type FormProps = {
  /**
   * 表单项
   */
  items: FormItemProps[]
  /**
   * 表单值
   */
  data: Record<string, any>
  /**
   * 组件样式大小
   */
  size: 'small' | 'default' | 'large'
  /**
   * 列间距 px，默认 10
   */
  rowGutter?: number
  /**
   * 行间隔 px，默认 0
   */
  colGutter?: number
  /**
   * 左侧标题宽度 px，默认 100
   */
  labelWidth?: number
}

/**
 * 表单项 props
 */
export type FormItemProps<F = string> = {
  /**
   * 表单项类型
   */
  type: FormItemType
  /**
   * 列宽 格: 1-24, 默认 24
   */
  col?: number
  /**
   * 内容宽度 格: 1-24, 默认 24
   *
   * 通常你只需要设置 col，当你的场景是两个表单元素的 col 都是 12，又需要独占一行时
   * 将 col 设为 24，width 设为 12
   */
  width?: number
} & FieldProps<F> // FieldProps 是通用字段描述类型，和 @cphayim/vant-enhance 中的完全一致

/**
 * 表单项类型
 */
export type FormItemType = 'input' | 'select' | 'datetime' | 'upload'
```

`FieldProps` 是通用字段描述类型，和 `@cphayim/vant-enhance` 中的完全一致

需要注意的是 `@access` 标注的配置属性仅在某一侧有效

```typescript
export type FieldProps<F = string, E = any> = CommonFieldProps<F, E> &
  (InputFieldProps | SelectFieldProps | DatetimeFieldProps | UploadFieldProps)

/**
 * 通用配置
 */
type CommonFieldProps<F = string, E = any> = {
  /**
   * 左侧标题
   */
  label: string
  /**
   * 字段名
   */
  name: F
  /**
   * 字段值, v-model:value
   */
  value?: any
  /**
   * 额外内容，你可以再此存储一些特定业务场景的东西，比如 select 对应的枚举或字典值，上传地址等
   *
   * 组件不负责处理该内容，使用前自行转化为有效的组件 props
   */
  extra?: E
  /**
   * 只读
   */
  readonly?: boolean
  /**
   * 禁用
   */
  disabled?: boolean
  /**
   * 占位
   */
  placeholder?: string
  /**
   * 验证规则
   */
  rules?: FieldRule[]
  /**
   * 是否隐藏当前项
   */
  hidden?: boolean
  /**
   * 对齐方式
   * @access vant
   */
  align?: 'left' | 'center' | 'right'
  /**
   * 右侧是否显示箭头
   * @access vant
   */
  isLink?: boolean
}

/**
 * 输入框配置
 */
type InputFieldProps = {
  /**
   * 输入框类型
   */
  inputType?: 'text' | 'password' | 'textarea'
  /**
   * 最大长度
   */
  inputMaxLength?: number
  /**
   * 输入框行数，仅 textarea 有效
   */
  inputRows?: number
}

/**
 * 选择器通用配置
 */
type PickerCommonFieldProps = {
  /**
   * 是否在点击遮罩层后关闭
   * @access vant
   */
  closeOnClickOverlay?: boolean
  /**
   * 显示顶部栏
   * @access vant
   */
  showToolbar?: boolean
}

/**
 * Select 配置
 */
type SelectFieldProps = PickerCommonFieldProps & {
  /**
   * select 选项
   */
  options?: FieldOption[]
  /**
   * 选择器类型，普通或级联
   * @access element-plus
   */
  selectType?: 'select' | 'cascader'
  /**
   * 选择器是否多选
   * @access element-plus
   */
  selectMultiple?: boolean
}

/**
 * 日期或时间选择器配置
 */
type DatetimeFieldProps = PickerCommonFieldProps & {
  /**
   * 日期选择器类型
   */
  datetimeType?:
    | 'date'
    | 'datetime'
    | 'year-month' // 仅 vant
    | 'month-day' // 仅 vant
    | 'datehour' // 仅 vant
    | 'time'
  /**
   * 日期格式
   */
  datetimeFormat?: string
  /**
   * 最小日期
   */
  minDate?: Date
  /**
   * 最大日期
   */
  maxDate?: Date
}

/**
 * 上传器类型
 */
type UploadFieldProps = {
  /**
   * 上传器选项
   * 默认值: 'object'
   *
   * 'object':
   * 值为 FieldUploadFile[]
   *
   * 'string':
   * 值为 'url1,url2,url3'，组件将从 url 中推断文件名
   */
  uploadStruct?: 'object' | 'string'
  /**
   * url 分隔符
   * 仅 uploadStruct 为 'string' 时有效
   * 默认值 ','
   */
  uploadStringSeparator?: string
  /**
   * 上传数量限制
   */
  uploadLimit?: number
  /**
   * 上传器底部提示文案，支持 \n 换行
   */
  uploadTips?: string
  /**
   * 自定义文件验证器函数
   *
   * 返回 true 表示验证通过，字符串为验证失败的提示文字
   */
  uploadValidate?: (file: File) => boolean | string
  /**
   * 自定义上传请求函数（必传）
   *
   * 在该函数内用户需实现文件的上传请求，之后返回一个 Promise<FieldUploadFile>
   */
  uploadSend?: (file: File) => Promise<FieldUploadFile>
}

/**
 * 字段选项，用于 select
 */
export type FieldOption = {
  /**
   * 显示用文本
   */
  label: string
  /**
   * 值
   */
  value?: number | string
  /**
   * 级联选择子项
   */
  children?: FieldOption[]
}

/**
 * 已上传的文件结果
 */
export type FieldUploadFile = {
  /**
   * 文件名
   */
  name?: string
  /**
   * 文件 url
   */
  url: string
}

/**
 * 字段校验规则
 */
export type FieldRule = {
  /**
   * 是否必填
   */
  required?: boolean
  /**
   * 正则表达式或正则表达式字符串
   *
   * 注意，如果传递的是字符串
   * /\d+/ 对应为 '\\d+'
   */
  regex?: RegExp | string
  /**
   * 验证失败的错误消息
   */
  message?: string
}
```

### useForm 钩子

```typescript
type UseFormOptions = {
  defaultProps?: Partial<Omit<FormItemProps, 'type | name | value'>>
}

export function useForm<
  T extends Record<string, any>,
  U = IsNotEmptyObject<T> extends false ? keyof T : string,
>(originData: T, items: FormItemProps<U>[], options: UseFormOptions = {}): {
  formData: Ref<T>,
  formItems: Ref<FormItemProps<U>[]>,
  getItem: (name: U) => FormItemProps<U>,
  updateItem: (name: U, updateItem: Partial<FormItemProps>) => void,
  setOptions: (name: U, options: FieldOption[]) => void,
  formRef: Ref<<InstanceType<typeof EpeForm>>,
  setFormRef: (instance: FormInstance) => void,
}
```

- 入参:

  - `originData`: 用于绑定数据的对象，可以是一个空对象
  - `items`: 表单配置项数组
  - `options`: 其它选项
    - `defaultProps`：你可以将除了签名中排除的三个属性外的其余公用属性传入，而不需要在 `items` 中逐个填写，它们将在创建 `formItems` 时被软合并

- 返回值
  - `formData`: 表单键值的响应式对象
  - `formItems`: 表单配置项的响应式对象
  - `getItem`: 你可以通过传入 `name` 来快速拿到对应的 `item` 配置项
  - `updateItem`: 你可以通过传入 `name` 来快速修改其对应 `item` 配置项的部分属性
  - `setOptions`：用于快速设置对应 `name` 的 `select` 选项
  - `formRef`: 表单组件实例
  - `setFormRef`: 通常不需要，当你在同一个组件中使用了两个表单生成组件时，请将该函数传递给 `:ref="setFormRef"` 来保证唯一性

来看一个例子，假设我们有 `carMode` 和 `roomId` 两个字段的表单，仅当 `carMode` 的值对应跑车时，出现房号输入框：

```html
<script setup lang="ts">
  import { useForm } from '@cphayim/element-plus-enhance'

  const { formData, formItems, formRef } = useForm(
    {
      carMode: null,
      roomId: null,
    },
    [
      {
        label: '车型',
        type: 'select',
        name: 'carMode',
        options: [
          { label: '轿车', value: 1 },
          { label: '三轮车', value: 2 },
          { label: '跑车', value: 3 },
          { label: '货车', value: 4 },
        ],
      },
      { type: 'input', label: '房号', name: 'roomId', hidden: true },
    ],
  )

  watchEffect(() => {
    if (formData.value.carMode === 3) {
      updateItem('roomId', { hidden: false })
    }
  })
</script>

<template>
  <div>
    <EpeForm
      ref="formRef"
      :items="formItems"
      v-model:data="formData"
      :labelWidth="100"
    ></EpeForm>
  </div>
</template>
```

### 字段动态插槽

我们默认的配置项和提供支持的组件无法覆盖到所有业务场景，如果你的业务场景特殊，可以使用字段动态插槽

假设配置项是用户名和密码，用户名使用默认的组件行为，而自定义密码的渲染内容

```typescript
;[
  { type: 'input', label: '用户名', name: 'username' },
  { type: 'input', label: '密码', name: 'password' },
]
```

```html
<EpeForm
  ref="formRef"
  :items="formItems"
  v-model:data="formData"
  :labelWidth="100"
>
  <template #password="item">
    <div>{{ item.label }}</div>
    <input type="text" v-model="formData.password" />
  </template>
</EpeForm>
```

插槽名称就是你希望覆盖的字段名，插槽作用域会将该字段所对应的 `item` 传入，上述例子中，因为 `input` 和 定义的数据在同一组件中，可以直接使用 `v-model`

## EpeFormEditor - 表单编辑器组件

`EpeFormEditor` 用于生产提供给 `EpeForm` 消费的表单配置项，具体看顶部 demo

> 注意：该组件通常是给用户使用的可视化编辑，生成表单配置项，如果结构确定，仍建议开发者手动配置

### 最简实例

```html
<script setup lang="ts">
  import {
    EpeFormEditor,
    type FormItemProps,
  } from '@cphayim/element-plus-enhance'

  const formEditorRef = ref<InstanceType<typeof EpeFormEditor>>()
  const initItems = ref<FormItemProps[]>([
    { type: 'select', name: 'input_aserdd', label: '选择器' },
    {
      type: 'input',
      name: 'input_aserde',
      label: '多行输入',
      inputType: 'textarea',
    },
  ])

  const handleGetItems = () => {
    console.log(formEditorRef.value?.getFormItems())
  }
</script>

<template>
  <div class="mx-20">
    <el-card>
      <EpeFormEditor
        ref="formEditorRef"
        :init-items="initItems"
      ></EpeFormEditor>
      <div class="flex justify-center">
        <el-button @click="handleGetItems" type="primary">
          获取配置项（控制台）
        </el-button>
      </div>
    </el-card>
  </div>
</template>
```

### 配置项与类型

`EpeFormEditor` 的 `props`

```typescript
/**
 * 表单编辑器支持的功能
 */
export enum FormEditorFeatures {
  All = 'all',
  Input = 'input',
  Textarea = 'textarea',
  Select = 'select',
  Date = 'date',
  Time = 'time',
  ImageUpload = 'imageUpload',
}

export type FormEditorProps = {
  /**
   * 初始表单项
   */
  initItems?: FormItemProps[]
}
```

### 类型控件动态插槽

我们在编辑器右侧提供的“默认编辑面板”（`FormEditorDefaultEditPanel`）的交互配置项无法覆盖到所有业务场景，作为通用组件，也不适合包含特定的业务逻辑

例如你可能需要支持在编辑 `Select ` 控件时不仅支持手填选项（`Options`），还要支持关联某个枚举值或数据库中的字典值，这超出了 `FormEditorDefaultEditPanel` 的职责范围，但是我们提供了类型控件动态插槽，你可以使用它在业务侧解决这个问题

```html
<EpeFormEditor ref="formEditorRef" :init-items="initItems">
  <template #input="{ current, setCurrent }">
    {{ current.name }} {{ current.label }}
  </template>
</EpeFormEditor>
```

这样就完全自定义了 `input` 类型控件的右侧编辑面板，作用域插槽接收 `current` 即是当前中间区域被选中的控件对应的 `item`, 你可以通过调用 `setCurrent` 传入新的 `item` 来修改配置项
