<script setup lang="ts">
import { computed, ref } from 'vue'
import { FieldOption, FieldRule } from '../fields'
import { FormItemProps } from './types'

defineOptions({ name: 'EpeFormEditorDefaultEditPanel' })

const props = defineProps<{
  current: any
  setCurrent: (item: FormItemProps) => void
}>()

const item = computed<FormItemProps>(() => props.current)
const handleChange = (key: string, value: any) => {
  const newItem = { ...item.value, [key]: value }
  props.setCurrent(newItem)
}

const required = ref(false)
const handleRequired = (val: boolean) => {
  required.value = val
  handleChange('rules', rulesComp.value)
}

const regStr = ref('')
const regTip = ref('')
const handleRegStr = (str: string) => {
  regStr.value = str
  handleChange('rules', rulesComp.value)
}
const handleRegTip = (str: string) => {
  regTip.value = str
  handleChange('rules', rulesComp.value)
}

const rulesComp = computed(() => {
  const rules: FieldRule[] = [
    { required: required.value, message: '必填项不能为空' },
  ]
  if (regStr.value) {
    rules.push({ regex: regStr.value, message: regTip.value || '校验失败' })
  }
  return rules
})

let count = 1
const optionSync = ref(true)
const options = ref<FieldOption[]>([])
const handleOptionAdd = () => {
  options.value.push({
    label: `标签${count}`,
    value: optionSync.value ? `标签${count}` : `${count}`,
  })
  handleChange('options', options.value)
}
const handleOptionChange = (index: number) => {
  if (optionSync.value) {
    options.value[index].value = options.value[index].label
  }
  handleChange('options', options.value)
}
const handleOptionsRemove = (index: number) => {
  options.value.splice(index, 1)
  handleChange('options', options.value)
}
</script>

<template>
  <!-- 通用 -->
  <div class="epe-form-editor-default">
    <div class="epe-form-editor-default-category">
      <!-- name：如果是自动生成则只读 -->
      <el-row class="epe-form-editor-default-config">
        <div class="epe-form-editor-default-title">字段名：</div>
        <el-input
          :modelValue="item.name"
          @update:modelValue="(val:string) => handleChange('name', val)"
          disabled
        />
      </el-row>

      <!-- label -->
      <el-row class="epe-form-editor-default-config">
        <div class="epe-form-editor-default-title">标签名：</div>
        <el-input
          :modelValue="item.label"
          @update:modelValue="(val:string) => handleChange('label', val)"
        />
      </el-row>

      <!-- placeholder -->
      <el-row class="epe-form-editor-default-config">
        <div class="epe-form-editor-default-title">占位文本：</div>
        <el-input
          :modelValue="item.placeholder"
          @update:modelValue="(val:string) => handleChange('placeholder', val)"
        />
      </el-row>

      <el-row class="epe-form-editor-default-config">
        <el-col :span="12">
          <!-- readonly -->
          <el-checkbox
            label="是否只读"
            :modelValue="item.readonly"
            @update:modelValue="(val:boolean) => handleChange('readonly', val)"
          />
        </el-col>
        <el-col :span="12">
          <!-- disabled -->
          <el-checkbox
            label="是否禁用"
            :modelValue="item.disabled"
            @update:modelValue="(val:boolean) => handleChange('disabled', val)"
          />
        </el-col>
      </el-row>

      <el-row class="epe-form-editor-default-config">
        <el-col :span="12">
          <!-- required -->
          <el-checkbox
            label="是否必填"
            :modelValue="required"
            @update:modelValue="(val:boolean) => handleRequired(val)"
          />
        </el-col>
      </el-row>

      <!-- 仅输入框有正则校验 -->
      <template v-if="item.type === 'input'">
        <!-- 正则表达式 -->
        <el-row class="epe-form-editor-default-config">
          <div class="epe-form-editor-default-title">校验正则表达式：</div>
          <el-input
            :modelValue="regStr"
            @update:modelValue="(str:string) => handleRegStr(str)"
            placeholder="例：/^[a-zA-Z\\d\\u4e00-\\u9fa5\\s]*$/"
          />
        </el-row>
        <!-- 校验失败提示 -->
        <el-row class="epe-form-editor-default-config">
          <div class="epe-form-editor-default-title">校验失败提示：</div>
          <el-input
            :modelValue="regTip"
            @update:modelValue="(str:string) => handleRegTip(str)"
            placeholder="例：校验失败"
          />
        </el-row>

        <!-- 最大长度 -->
        <el-row class="epe-form-editor-default-config">
          <div class="epe-form-editor-default-title">最大长度限制：</div>
          <el-input
            type="number"
            :modelValue="item.inputMaxLength"
            @update:modelValue="(num:string) => handleChange('inputMaxLength', num ? parseInt(num): undefined)"
          />
        </el-row>

        <!-- 输入框行数：仅 textarea -->
        <el-row
          v-if="item.inputType === 'textarea'"
          class="epe-form-editor-default-config"
        >
          <div class="epe-form-editor-default-title">输入框行数（显示）：</div>
          <el-input
            type="number"
            :modelValue="item.inputRows"
            @update:modelValue="(num:string) => handleChange('inputRows', num ? parseInt(num): 4)"
          />
        </el-row>
      </template>

      <!-- 选择器 -->
      <template v-if="item.type === 'select'">
        <!-- 选项 -->
        <el-row class="epe-form-editor-default-config">
          <el-col :span="24" class="epe-form-editor-default-config-flex">
            <div class="epe-form-editor-default-title">选项：</div>
            <el-checkbox
              label="同步标签与值"
              :modelValue="optionSync"
              @update:modelValue="(val:boolean) => optionSync = val"
            />
          </el-col>
          <el-row
            v-for="(option, index) in options"
            :gutter="10"
            class="epe-form-editor-default-item"
          >
            <!-- option.label -->
            <el-col :span="10">
              <el-input
                v-model="option.label"
                @change="handleOptionChange(index)"
                placeholder="选项标签名"
              />
            </el-col>
            <!-- option.value -->
            <el-col :span="10">
              <el-input
                v-model="option.value"
                @change="handleOptionChange(index)"
                :disabled="optionSync"
                placeholder="选项值"
              />
            </el-col>
            <el-col :span="4">
              <el-button @click="handleOptionsRemove(index)" type="danger" text>
                删除
              </el-button>
            </el-col>
          </el-row>
          <el-button
            @click="handleOptionAdd"
            type="primary"
            plain
            size="default"
            style="width: 100%"
          >
            添加选项
          </el-button>
        </el-row>
      </template>

      <!-- 日期或时间选择 -->
      <template v-if="item.type === 'datetime'">
        <template v-if="item.datetimeType === 'date'">
          <el-row class="epe-form-editor-default-config">
            <div class="epe-form-editor-default-title">日期格式：</div>
            <el-input
              :modelValue="item.datetimeFormat"
              @update:modelValue="(val:string) => handleChange('datetimeFormat', val)"
            />
          </el-row>
        </template>
        <template v-if="item.datetimeType === 'time'">
          <el-row class="epe-form-editor-default-config">
            <div class="epe-form-editor-default-title">时间格式：</div>
            <el-input
              :modelValue="item.datetimeFormat"
              @update:modelValue="(val:string) => handleChange('datetimeFormat', val)"
            />
          </el-row>
        </template>
      </template>

      <template v-if="item.type === 'upload'">
        <el-row class="epe-form-editor-default-config">
          <div class="epe-form-editor-default-title">数量限制：</div>
          <el-input
            type="number"
            :modelValue="item.uploadLimit"
            @update:modelValue="(num:string) => handleChange('uploadLimit', num ? parseInt(num): undefined)"
          />
        </el-row>
        <el-row class="epe-form-editor-default-config">
          <div class="epe-form-editor-default-title">提示文案：</div>
          <el-input
            :modelValue="item.uploadTips"
            @update:modelValue="(val:string) => handleChange('uploadTips', val)"
          />
        </el-row>
      </template>
    </div>
  </div>
</template>

<style>
.epe-form-editor-default-config {
  margin-bottom: 10px;
}
.epe-form-editor-default-title {
  color: var(--epe-color-text-2);
  margin-bottom: 6px;
  font-size: 14px;
}
.epe-form-editor-default-config-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.epe-form-editor-default-item {
  margin: 8px 0;
}
</style>
