# Vue3 Antd Admin

基于 Vue3 + Ant Design Vue 的后台管理系统框架

## 技术栈

- **Vue 3**：渐进式 JavaScript 框架
- **Ant Design Vue**：企业级 UI 组件库
- **Vue Router**：路由管理
- **Pinia**：状态管理
- **Vite**：构建工具

## 功能特性

- ✅ 响应式布局设计
- ✅ 侧边栏导航菜单
- ✅ 顶部用户信息栏
- ✅ 仪表盘页面
- ✅ 用户管理
- ✅ 角色管理
- ✅ 权限管理
- ✅ 登录页面
- ✅ 表单验证
- ✅ 数据表格
- ✅ 模态框操作

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 项目结构

```
src/
├── components/          # 组件目录
│   └── Layout.vue      # 布局组件
├── views/              # 页面目录
│   ├── Dashboard.vue   # 仪表盘
│   ├── User.vue        # 用户管理
│   ├── Role.vue        # 角色管理
│   ├── Permission.vue  # 权限管理
│   └── Login.vue       # 登录页面
├── router/             # 路由配置
│   └── index.js
├── store/              # 状态管理
│   └── index.js
├── main.js             # 应用入口
└── App.vue             # 根组件
```

## 开发指南

### 添加新页面

1. 在 `views` 目录下创建新的 Vue 文件
2. 在 `router/index.js` 中配置路由
3. 在 `components/Layout.vue` 中的菜单配置中添加新的菜单项

### 使用组件

```vue
<template>
  <a-button type="primary">按钮</a-button>
</template>

<script setup>
// 按需导入组件
import { Button } from 'ant-design-vue'
</script>
```

### 使用路由

```vue
<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

// 跳转到指定页面
router.push('/dashboard')
</script>
```

### 使用状态管理

```javascript
// store/user.js
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: null
  }),
  actions: {
    setUserInfo(userInfo) {
      this.userInfo = userInfo
    }
  }
})
```

```vue
<script setup>
import { useUserStore } from '@/store/user'

const userStore = useUserStore()

// 设置用户信息
userStore.setUserInfo({ name: 'admin' })
</script>
```

## 浏览器支持

- Chrome (最新)
- Firefox (最新)
- Safari (最新)
- Edge (最新)

## 许可证

MIT