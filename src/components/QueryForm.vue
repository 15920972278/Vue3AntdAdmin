<template>
  <a-card :bordered="false" style="margin-bottom: 16px">
    <a-form :model="formData" layout="inline">
      <a-form-item 
        v-for="item in fields" 
        :key="item.key" 
        :label="item.label"
      >
        <!-- 输入框 -->
        <a-input 
          v-if="item.type === 'input'" 
          v-model:value="formData[item.key]" 
          :placeholder="item.placeholder"
        />
        
        <!-- 下拉选择 -->
        <a-select 
          v-else-if="item.type === 'select'" 
          v-model:value="formData[item.key]" 
          :placeholder="item.placeholder"
        >
          <a-select-option 
            v-for="option in item.options" 
            :key="option.value" 
            :value="option.value"
          >
            {{ option.label }}
          </a-select-option>
        </a-select>
        
        <!-- 开关 -->
        <a-switch 
          v-else-if="item.type === 'switch'" 
          v-model:checked="formData[item.key]"
        />
        
        <!-- 时间选择器 -->
        <a-date-picker 
          v-else-if="item.type === 'date'" 
          v-model:value="formData[item.key]" 
          :placeholder="item.placeholder"
          :format="item.format || 'YYYY年MM月DD日'"
        />
      </a-form-item>
      
      <!-- 操作按钮 -->
      <a-form-item>
        <a-button type="primary" @click="handleSearch">查询</a-button>
        <a-button @click="handleReset">重置</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script setup>
import { reactive, watch } from 'vue'
import { message } from 'ant-design-vue'

// 接收父组件传递的属性
const props = defineProps({
  // 查询字段配置
  fields: {
    type: Array,
    required: true,
    default: () => []
  },
  // 初始表单数据
  initialValues: {
    type: Object,
    default: () => {}
  }
})

// 定义事件
const emit = defineEmits(['search', 'reset'])

// 表单数据
const formData = reactive({})

// 初始化表单数据
const initFormData = () => {
  // 先清空表单
  for (const key in formData) {
    delete formData[key]
  }
  
  // 设置默认值
  props.fields.forEach(field => {
    // 如果有初始值，则使用初始值
    if (props.initialValues.hasOwnProperty(field.key)) {
      formData[field.key] = props.initialValues[field.key]
    } else {
      // 否则根据字段类型设置默认值
      switch (field.type) {
        case 'input':
        case 'select':
          formData[field.key] = ''
          break
        case 'switch':
          formData[field.key] = false
          break
        case 'date':
          formData[field.key] = null
          break
        default:
          formData[field.key] = ''
      }
    }
  })
}

// 查询按钮点击事件
const handleSearch = () => {
  emit('search', { ...formData })
}

// 重置按钮点击事件
const handleReset = () => {
  initFormData()
  emit('reset')
}

// 监听初始值变化，重新初始化表单
watch(
  () => props.initialValues,
  () => {
    initFormData()
  },
  { deep: true }
)

// 组件挂载时初始化表单
defineExpose({
  initFormData
})
</script>

<style scoped>
/* 可以添加一些自定义样式 */
</style>