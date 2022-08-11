<script setup lang="ts">
import {
  BizFeatureOptions,
  EpeFormEditor,
  type FormItemProps,
} from '@cphayim/element-plus-enhance'
import consola from 'consola'

const formEditorRef = ref<InstanceType<typeof EpeFormEditor>>()
const initItems = ref<FormItemProps[]>([
  {
    type: 'input',
    name: 'input_aserde',
    label: '单行输入',
  },
  {
    type: 'input',
    label: '物品',
    name: 'item_DQRJAm',
    extra: {
      biz: true,
      bizName: 'ItemUnitPriceQuantity',
      bizField: 'item',
      bizKey: 'DQRJAm',
    },
  },
  {
    type: 'input',
    label: '单价',
    name: 'unitPrice_DQRJAm',
    extra: {
      biz: true,
      bizName: 'ItemUnitPriceQuantity',
      bizField: 'unitPrice',
      bizKey: 'DQRJAm',
    },
  },
  {
    type: 'input',
    label: '数量',
    name: 'quantity_DQRJAm',
    extra: {
      biz: true,
      bizName: 'ItemUnitPriceQuantity',
      bizField: 'quantity',
      bizKey: 'DQRJAm',
    },
  },
  {
    type: 'input',
    label: '物品',
    name: 'item_f2YsKk',
    extra: {
      biz: true,
      bizName: 'ItemUnitPriceQuantity',
      bizField: 'item',
      bizKey: 'f2YsKk',
    },
  },
  {
    type: 'input',
    label: '单价',
    name: 'unitPrice_f2YsKk',
    extra: {
      biz: true,
      bizName: 'ItemUnitPriceQuantity',
      bizField: 'unitPrice',
      bizKey: 'f2YsKk',
    },
  },
  {
    type: 'input',
    label: '数量',
    name: 'quantity_f2YsKk',
    extra: {
      biz: true,
      bizName: 'ItemUnitPriceQuantity',
      bizField: 'quantity',
      bizKey: 'f2YsKk',
    },
  },
  {
    type: 'input',
    label: '物品',
    name: 'item_3Brk7A',
    extra: {
      biz: true,
      bizName: 'ItemUnitPriceQuantity',
      bizField: 'item',
      bizKey: '3Brk7A',
    },
  },
  {
    type: 'input',
    label: '单价',
    name: 'unitPrice_3Brk7A',
    extra: {
      biz: true,
      bizName: 'ItemUnitPriceQuantity',
      bizField: 'unitPrice',
      bizKey: '3Brk7A',
    },
  },
  {
    type: 'input',
    label: '数量',
    name: 'quantity_3Brk7A',
    extra: {
      biz: true,
      bizName: 'ItemUnitPriceQuantity',
      bizField: 'quantity',
      bizKey: '3Brk7A',
    },
  },
])

const bizFeatures: BizFeatureOptions[] = [
  {
    bizName: 'ItemUnitPriceQuantity',
    bizLabel: '物品+单价+数量',
    bizTransform: {
      toReal: (_, random) => {
        return [
          {
            type: 'input',
            label: '物品',
            name: `item_${random}`,
            extra: {
              biz: true,
              bizName: 'ItemUnitPriceQuantity',
              bizField: 'item',
              bizKey: random,
            },
          },
          {
            type: 'input',
            label: '单价',
            name: `unitPrice_${random}`,
            extra: {
              biz: true,
              bizName: 'ItemUnitPriceQuantity',
              bizField: 'unitPrice',
              bizKey: random,
            },
          },
          {
            type: 'input',
            label: '数量',
            name: `quantity_${random}`,
            extra: {
              biz: true,
              bizName: 'ItemUnitPriceQuantity',
              bizField: 'quantity',
              bizKey: random,
            },
          },
        ]
      },
      toPlaceHolder: (_, random) => {
        return {
          type: 'biz-placeholder',
          name: `biz_${random}`,
          label: '业务组件',
          extra: {
            biz: true,
            bizName: 'ItemUnitPriceQuantity',
            bizLabel: '物品+单价+数量',
          },
        }
      },
    },
  },
]

const handleGetItems = () => {
  consola.info('获取到配置项：')
  consola.info(JSON.parse(JSON.stringify(formEditorRef.value?.getFormItems())))
}
const handlePreview = () => {
  consola.info('打开预览')
}
</script>

<template>
  <div class="mx-20">
    <el-card>
      <EpeFormEditor
        ref="formEditorRef"
        :init-items="initItems"
        :biz-features="bizFeatures"
      >
      </EpeFormEditor>
      <div class="flex justify-center">
        <el-button @click="handleGetItems" type="primary"
          >获取配置项（控制台）</el-button
        >
        <el-button v-if="false" @click="handlePreview" type="success"
          >双端效果预览</el-button
        >
      </div>
    </el-card>
  </div>
</template>

<style></style>
