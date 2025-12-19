<template>
  <div class="user-management">
    <div class="page-header">
      <h1>用户管理</h1>
      <a-button type="primary" @click="showAddModal = true">
        <template #icon>
          <PlusOutlined />
        </template>
        新增用户
      </a-button>
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
        :data-source="users"
        :pagination="pagination"
        row-key="id"
        :scroll="{ x: 800 }"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'status'">
            <a-switch v-model:checked="record.status" :checked-children="'启用'" :un-checked-children="'禁用'" />
          </template>
          <template v-else-if="column.key === 'action'">
            <a-button type="link" @click="handleEdit(record)">编辑</a-button>
            <a-button type="link" danger @click="handleDelete(record)">删除</a-button>
          </template>
        </template>
      </a-table>
    </a-card>
    
    <!-- 新增/编辑用户弹窗 -->
    <a-modal
      v-model:open="showAddModal"
      :title="modalTitle"
      @ok="handleSave"
      @cancel="handleCancel"
    >
      <a-form :model="form" layout="vertical">
        <a-form-item label="用户名" :rules="[{ required: true, message: '请输入用户名' }]">
          <a-input v-model:value="form.username" placeholder="请输入用户名" />
        </a-form-item>
        <a-form-item label="邮箱" :rules="[{ required: true, message: '请输入邮箱' }, { type: 'email', message: '请输入有效的邮箱地址' }]">
          <a-input v-model:value="form.email" placeholder="请输入邮箱" />
        </a-form-item>
        <a-form-item label="密码" v-if="!editingUser">
          <a-input-password v-model:value="form.password" placeholder="请输入密码" />
        </a-form-item>
        <a-form-item label="角色">
          <a-select v-model:value="form.role" mode="multiple" placeholder="请选择角色">
            <a-select-option value="admin">管理员</a-select-option>
            <a-select-option value="editor">编辑</a-select-option>
            <a-select-option value="viewer">查看者</a-select-option>
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
import { ref, reactive, computed } from 'vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'

// 导入查询组件
import QueryForm from '@components/QueryForm.vue'

// 查询字段配置
const searchFields = [
  { key: 'username', label: '用户名', type: 'input', placeholder: '请输入用户名' },
  { 
    key: 'status', 
    label: '状态', 
    type: 'select', 
    placeholder: '请选择状态',
    options: [
      { value: '1', label: '启用' },
      { value: '0', label: '禁用' }
    ]
  }
]

// 数据表格列配置
const columns = [
  { title: 'ID', dataIndex: 'id', key: 'id' },
  { title: '用户名', dataIndex: 'username', key: 'username' },
  { title: '邮箱', dataIndex: 'email', key: 'email' },
  { title: '角色', dataIndex: 'role', key: 'role', render: (_, record) => record.role.join(', ') },
  { title: '状态', key: 'status', width: 100 },
  { title: '创建时间', dataIndex: 'createdAt', key: 'createdAt' },
  { title: '操作', key: 'action', width: 150, fixed: 'right' }
]

// 用户数据
const users = ref([
  { id: 1, username: 'admin', email: 'admin@example.com', role: ['admin'], status: true, createdAt: '2024-05-01 10:00:00' },
  { id: 2, username: 'editor', email: 'editor@example.com', role: ['editor'], status: true, createdAt: '2024-05-02 11:00:00' },
  { id: 3, username: 'viewer', email: 'viewer@example.com', role: ['viewer'], status: false, createdAt: '2024-05-03 12:00:00' }
])

// 分页配置
const pagination = ref({
  current: 1,
  pageSize: 10,
  total: 3
})

// 查询表单
const searchForm = reactive({
  username: '',
  status: ''
})

// 新增/编辑表单
const form = reactive({
  username: '',
  email: '',
  password: '',
  role: [],
  status: true
})

// 弹窗状态
const showAddModal = ref(false)
const editingUser = ref(null)

// 弹窗标题
const modalTitle = computed(() => {
  return editingUser.value ? '编辑用户' : '新增用户'
})

// 处理搜索
const handleSearch = () => {
  message.info('搜索功能待实现')
}

// 处理重置
const handleReset = () => {
  searchForm.username = ''
  searchForm.status = ''
}

// 处理编辑
const handleEdit = (record) => {
  editingUser.value = record
  form.username = record.username
  form.email = record.email
  form.role = [...record.role]
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
  form.username = ''
  form.email = ''
  form.password = ''
  form.role = []
  form.status = true
  editingUser.value = null
}
</script>

<style scoped>
.user-management .page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.user-management h1 {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
}
</style>