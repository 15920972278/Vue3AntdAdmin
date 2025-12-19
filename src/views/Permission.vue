<template>
  <div class="permission-management">
    <div class="page-header">
      <h1>权限管理</h1>
      <div>
        <a-button type="primary" @click="showAddModal = true" style="margin-right: 10px;">
          <template #icon>
            <PlusOutlined />
          </template>
          新增权限
        </a-button>
        <a-button type="default" @click="handleExport">
          <template #icon>
            <DownloadOutlined />
          </template>
          导出数据
        </a-button>
      </div>
    </div>
    
    <!-- 查询表单 -->
    <QueryForm 
      :fields="searchFields" 
      :initial-values="searchForm"
      @search="handleSearch"
      @reset="handleReset"
    />
    
    <!-- 数据表格 -->
    <a-card :bordered="false">
      <a-table
        :columns="columns"
        :data-source="permissions"
        :pagination="pagination"
        row-key="id"
        :scroll="{ x: 800, y: 300 }"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
            <a-button type="link" @click="handleEdit(record)">编辑</a-button>
            <a-button type="link" danger @click="handleDelete(record)">删除</a-button>
          </template>
        </template>
      </a-table>
    </a-card>
    
    <!-- 新增/编辑权限弹窗 -->
    <a-modal
      v-model:open="showAddModal"
      :title="modalTitle"
      @ok="handleSave"
      @cancel="handleCancel"
    >
      <a-form :model="form" layout="vertical">
        <a-form-item label="权限名称" :rules="[{ required: true, message: '请输入权限名称' }]">
          <a-input v-model:value="form.name" placeholder="请输入权限名称" />
        </a-form-item>
        <a-form-item label="权限标识" :rules="[{ required: true, message: '请输入权限标识' }]">
          <a-input v-model:value="form.code" placeholder="请输入权限标识，如：user:view" />
        </a-form-item>
        <a-form-item label="权限描述">
          <a-textarea v-model:value="form.description" placeholder="请输入权限描述" rows="3" />
        </a-form-item>
        <a-form-item label="父权限">
          <a-select v-model:value="form.parentId" placeholder="请选择父权限">
            <a-select-option value="0">无父权限</a-select-option>
            <a-select-option v-for="perm in permissions" :key="perm.id" :value="perm.id">{{ perm.name }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="状态">
          <a-switch v-model:checked="form.status" :checked-children="'启用'" :un-checked-children="'禁用'" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { PlusOutlined, DownloadOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import permissionApi from '@api/modules/permission'
import QueryForm from '@components/QueryForm.vue'

// 查询字段配置
const searchFields = [
  { key: 'name', label: '权限名称', type: 'input', placeholder: '请输入权限名称' },
  { key: 'code', label: '权限标识', type: 'input', placeholder: '请输入权限标识' },
  { 
    key: 'status', 
    label: '状态', 
    type: 'select', 
    placeholder: '请选择状态',
    options: [
      { value: true, label: '启用' },
      { value: false, label: '禁用' }
    ]
  },
  { key: 'startTime', label: '开始时间', type: 'date', placeholder: '请选择开始时间' },
  { key: 'endTime', label: '结束时间', type: 'date', placeholder: '请选择结束时间' }
]

// 搜索表单数据
const searchForm = reactive({
  name: '',
  code: '',
  status: '',
  startTime: null,
  endTime: null
})

// 数据表格列配置
const columns = [
  { title: 'ID', dataIndex: 'id', key: 'id' },
  { title: '权限名称', dataIndex: 'name', key: 'name' },
  { title: '权限标识', dataIndex: 'code', key: 'code' },
  { title: '权限描述', dataIndex: 'description', key: 'description' },
  { title: '父权限', dataIndex: 'parentName', key: 'parentName' },
  { title: '状态', dataIndex: 'status', key: 'status', render: (_, record) => record.status ? '启用' : '禁用' },
  { title: '创建时间', dataIndex: 'createdAt', key: 'createdAt' },
  { title: '操作', key: 'action', width: 150, fixed: 'right' }
]

// 权限数据
const permissions = ref([])

// 分页配置
const pagination = ref({
  current: 1,
  pageSize: 5,
  total: 0
})

// 查询权限列表
const handleSearch = (values) => {
  console.log('查询参数:', values)
  // 重置分页为第一页
  pagination.value.current = 1
  // 调用加载权限列表函数，传递查询参数
  loadPermissions(values)
}

// 重置查询表单
const handleReset = () => {
  console.log('重置表单')
  // 重置分页为第一页
  pagination.value.current = 1
  // 重新加载权限列表
  loadPermissions()
}

// 加载权限列表
const loadPermissions = async (queryParams = {}) => {
  try {
    // 合并分页参数和查询参数
    const params = {
      page: pagination.value.current,
      pageSize: pagination.value.pageSize,
      ...queryParams
    }
    
    // 处理日期参数
    if (params.startTime) {
      // 将日期对象转换为字符串格式
      params.startTime = params.startTime.format('YYYY-MM-DD HH:mm:ss')
    }
    if (params.endTime) {
      // 将日期对象转换为字符串格式
      params.endTime = params.endTime.format('YYYY-MM-DD HH:mm:ss')
    }
    
    const response = await permissionApi.getPermissionList(params)
    permissions.value = response.data.records
    pagination.value.total = response.data.total
  } catch (error) {
    console.error('获取权限列表失败:', error)
    message.error('获取权限列表失败')
  }
}

// 组件挂载时加载权限列表
onMounted(() => {
  // loadPermissions()
})

// 新增/编辑表单
const form = reactive({
  name: '',
  code: '',
  description: '',
  parentId: '0',
  status: true
})

// 弹窗状态
const showAddModal = ref(false)
const editingPermission = ref(null)

// 弹窗标题
const modalTitle = computed(() => {
  return editingPermission.value ? '编辑权限' : '新增权限'
})

// 处理编辑
const handleEdit = (record) => {
  editingPermission.value = record
  form.name = record.name
  form.code = record.code
  form.description = record.description
  form.parentId = record.parentId.toString()
  form.status = record.status
  showAddModal.value = true
}

// 处理删除
const handleDelete = (record) => {
  message.info('删除功能待实现')
}

// 处理保存
const handleSave = () => {
  message.success('保存成功')
  showAddModal.value = false
  resetForm()
}

// 处理取消
const handleCancel = () => {
  showAddModal.value = false
  resetForm()
}

// 重置表单
const resetForm = () => {
  form.name = ''
  form.code = ''
  form.description = ''
  form.parentId = '0'
  form.status = true
  editingPermission.value = null
}

// 导出数据
const handleExport = async () => {
  try {
    const response = await permissionApi.exportPermissionList()
    const blob = new Blob([response.data], { type: 'application/vnd.ms-excel' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `权限数据_${new Date().toISOString().slice(0, 10)}.xlsx`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    message.success('导出成功')
  } catch (error) {
    console.error('导出失败:', error)
    message.error('导出失败')
    
    // 降级方案：使用前端导出
    try {
      // 准备导出数据
      const exportData = permissions.value.map(perm => {
        return {
          'ID': perm.id,
          '权限名称': perm.name,
          '权限标识': perm.code,
          '权限描述': perm.description,
          '父权限': perm.parentName,
          '状态': perm.status ? '启用' : '禁用',
          '创建时间': perm.createdAt
        }
      })
      
      if (exportData.length === 0) {
        message.warning('没有数据可导出')
        return
      }
      
      // 创建CSV内容
      const headers = Object.keys(exportData[0])
      const csvContent = [
        headers.join(','), // 表头
        ...exportData.map(row => headers.map(fieldName => row[fieldName]).join(','))
      ].join('\n')
      
      // 创建Blob并下载
      const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', `权限数据_${new Date().toISOString().slice(0, 10)}.csv`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      message.success('导出成功（降级方案）')
    } catch (fallbackError) {
      console.error('降级导出也失败:', fallbackError)
      message.error('导出失败，请稍后重试')
    }
  }
}
</script>

<style scoped>
.permission-management .page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.permission-management h1 {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
}
</style>