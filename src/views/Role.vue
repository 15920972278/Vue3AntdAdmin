<template>
  <div class="role-management">
    <div class="page-header">
      <h1>角色管理</h1>
      <a-button type="primary" @click="showAddModal = true">
        <template #icon>
          <PlusOutlined />
        </template>
        新增角色
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
        :data-source="roles"
        :pagination="pagination"
        row-key="id"
        :scroll="{ x: 800 }"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
            <a-button type="link" @click="handleEdit(record)">编辑</a-button>
            <a-button type="link" @click="handlePermission(record)">分配权限</a-button>
            <a-button type="link" danger @click="handleDelete(record)">删除</a-button>
          </template>
        </template>
      </a-table>
    </a-card>
    
    <!-- 新增/编辑角色弹窗 -->
    <a-modal
      v-model:open="showAddModal"
      :title="modalTitle"
      @ok="handleSave"
      @cancel="handleCancel"
    >
      <a-form :model="form" layout="vertical">
        <a-form-item label="角色名称" :rules="[{ required: true, message: '请输入角色名称' }]">
          <a-input v-model:value="form.name" placeholder="请输入角色名称" />
        </a-form-item>
        <a-form-item label="角色描述">
          <a-textarea v-model:value="form.description" placeholder="请输入角色描述" rows="3" />
        </a-form-item>
        <a-form-item label="状态">
          <a-switch v-model:checked="form.status" :checked-children="'启用'" :un-checked-children="'禁用'" />
        </a-form-item>
      </a-form>
    </a-modal>
    
    <!-- 分配权限弹窗 -->
    <a-modal
      v-model:open="showPermissionModal"
      title="分配权限"
      width="600px"
      @ok="handlePermissionSave"
      @cancel="handlePermissionCancel"
    >
      <a-tree
        v-model:checkedKeys="permissionCheckedKeys"
        :tree-data="permissionTree"
        checkable
        :selectable="false"
      />
    </a-modal>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import QueryForm from '@components/QueryForm.vue'

// 查询字段配置
const searchFields = [
  { key: 'name', label: '角色名称', type: 'input', placeholder: '请输入角色名称' },
  { 
    key: 'status', 
    label: '状态', 
    type: 'select', 
    placeholder: '请选择状态',
    options: [
      { value: true, label: '启用' },
      { value: false, label: '禁用' }
    ]
  }
]

// 搜索表单数据
const searchForm = reactive({
  name: '',
  status: ''
})

// 数据表格列配置
const columns = [
  { title: 'ID', dataIndex: 'id', key: 'id' },
  { title: '角色名称', dataIndex: 'name', key: 'name' },
  { title: '角色描述', dataIndex: 'description', key: 'description' },
  { title: '状态', dataIndex: 'status', key: 'status', render: (_, record) => record.status ? '启用' : '禁用' },
  { title: '创建时间', dataIndex: 'createdAt', key: 'createdAt' },
  { title: '操作', key: 'action', width: 200, fixed: 'right' }
]

// 角色数据
const roles = ref([
  { id: 1, name: '管理员', description: '系统管理员', status: true, createdAt: '2024-05-01 10:00:00' },
  { id: 2, name: '编辑', description: '内容编辑', status: true, createdAt: '2024-05-02 11:00:00' },
  { id: 3, name: '查看者', description: '只读权限', status: true, createdAt: '2024-05-03 12:00:00' }
])

// 分页配置
const pagination = ref({
  current: 1,
  pageSize: 10,
  total: 3
})

// 查询角色列表
const handleSearch = (values) => {
  console.log('查询参数:', values)
  // 这里可以添加实际的查询逻辑
  message.info('查询功能开发中...')
}

// 重置查询表单
const handleReset = () => {
  console.log('重置表单')
  // 这里可以添加实际的重置逻辑
  message.info('重置功能开发中...')
}

// 新增/编辑表单
const form = reactive({
  name: '',
  description: '',
  status: true
})

// 弹窗状态
const showAddModal = ref(false)
const editingRole = ref(null)

// 弹窗标题
const modalTitle = computed(() => {
  return editingRole.value ? '编辑角色' : '新增角色'
})

// 权限分配相关
const showPermissionModal = ref(false)
const currentRole = ref(null)
const permissionCheckedKeys = ref([])

// 权限树结构
const permissionTree = ref([
  {
    title: '仪表盘',
    key: 'dashboard',
    children: [
      { title: '查看', key: 'dashboard:view' },
      { title: '编辑', key: 'dashboard:edit' }
    ]
  },
  {
    title: '用户管理',
    key: 'user',
    children: [
      { title: '查看', key: 'user:view' },
      { title: '新增', key: 'user:add' },
      { title: '编辑', key: 'user:edit' },
      { title: '删除', key: 'user:delete' }
    ]
  },
  {
    title: '角色管理',
    key: 'role',
    children: [
      { title: '查看', key: 'role:view' },
      { title: '新增', key: 'role:add' },
      { title: '编辑', key: 'role:edit' },
      { title: '删除', key: 'role:delete' },
      { title: '分配权限', key: 'role:assign' }
    ]
  },
  {
    title: '权限管理',
    key: 'permission',
    children: [
      { title: '查看', key: 'permission:view' },
      { title: '新增', key: 'permission:add' },
      { title: '编辑', key: 'permission:edit' },
      { title: '删除', key: 'permission:delete' }
    ]
  }
])

// 处理编辑
const handleEdit = (record) => {
  editingRole.value = record
  form.name = record.name
  form.description = record.description
  form.status = record.status
  showAddModal.value = true
}

// 处理分配权限
const handlePermission = (record) => {
  currentRole.value = record
  permissionCheckedKeys.value = ['dashboard:view', 'user:view'] // 示例数据
  showPermissionModal.value = true
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

// 处理权限保存
const handlePermissionSave = () => {
  message.success('权限分配成功')
  showPermissionModal.value = false
  permissionCheckedKeys.value = []
}

// 处理权限取消
const handlePermissionCancel = () => {
  showPermissionModal.value = false
  permissionCheckedKeys.value = []
}

// 重置表单
const resetForm = () => {
  form.name = ''
  form.description = ''
  form.status = true
  editingRole.value = null
}
</script>

<style scoped>
.role-management .page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.role-management h1 {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
}
</style>