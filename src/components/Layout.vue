<template>
  <div class="app-layout">
    <a-layout style="min-height: '100vh'">
      <!-- 侧边栏 -->
      <a-layout-sider
        v-model:collapsed="collapsed"
        collapsible
        :trigger="null"
        style="background: #fff"
      >
        <div class="logo">
          <h3>{{ collapsed ? 'Admin' : 'Vue3 Antd Admin' }}</h3>
        </div>
        <a-menu
          v-model:selectedKeys="selectedKeys"
          v-model:openKeys="openKeys"
          mode="inline"
          theme="light"
          :items="menuItems"
          @click="handleMenuClick"
        />
      </a-layout-sider>
      
      <!-- 主内容区 -->
      <a-layout>
        <!-- 头部 -->
        <a-layout-header style="padding: 0 20px; background: var(--header-bg); box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); color: var(--text-color)">
          <div class="header-content">
            <a-button
              type="text"
              @click="collapsed = !collapsed"
              style="margin-right: 20px; color: var(--text-color)"
            ><MenuOutlined /></a-button>
            
            <!-- 访问过的菜单 -->
            <div class="visited-menus">
              <a-tag
                v-for="(menu, index) in visitedMenus"
                :key="menu.key"
                color="blue"
                closable
                @close="removeVisitedMenu(index)"
                @click="handleVisitedMenuClick(menu)"
                style="cursor: pointer; margin-right: 8px;"
              >
                {{ menu.label }}
              </a-tag>
            </div>
            
            <div class="header-right">
              <!-- 主题切换 -->
              <a-dropdown :trigger="['click']" style="margin-right: 20px">
                <a-button type="text" style="color: var(--text-color)">
                  <BulbOutlined />
                  主题
                </a-button>
                <template #overlay>
                  <a-menu>
                    <a-menu-item 
                      v-for="option in themeOptions" 
                      :key="option.key"
                      @click="themeStore.setTheme(option.key)"
                    >
                      <span>{{ option.icon }}</span> {{ option.label }}
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
              
              <a-dropdown>
                <span class="user-info" style="color: var(--text-color)">
                  <a-avatar>U</a-avatar>
                  <span style="margin-left: 8px">管理员</span>
                </span>
                <template #overlay>
                  <a-menu>
                    <a-menu-item key="1">
                      <UserOutlined />个人中心
                    </a-menu-item>
                    <a-menu-item key="2">
                      <SettingOutlined />设置
                    </a-menu-item>
                    <a-menu-divider />
                    <a-menu-item key="3">
                      <LogoutOutlined />退出登录
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </div>
          </div>
        </a-layout-header>
        
        <!-- 内容区 -->
        <a-layout-content style="margin: 20px; padding: 24px; background: #fff; min-height: 280px; border-radius: 8px">
          <router-view />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useThemeStore } from '@/store'
import {
  MenuOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  DashboardOutlined,
  TeamOutlined,
  SafetyCertificateOutlined,
  LockOutlined,
  BulbOutlined
} from '@ant-design/icons-vue'

const router = useRouter()
const collapsed = ref(false)
const selectedKeys = ref(['dashboard'])
const openKeys = ref([])
const themeStore = useThemeStore()

// 存储访问过的菜单
const visitedMenus = ref([])

// 主题选项
const themeOptions = [
  { key: 'light', label: '亮色', icon: '🌞' },
  { key: 'dark', label: '暗色', icon: '🌙' },
  { key: 'green', label: '绿色', icon: '🍃' },
  { key: 'blue', label: '蓝色', icon: '💧' }
]

// 菜单配置
const menuItems = [
  {
    key: 'dashboard',
    icon: '<DashboardOutlined />',
    label: '仪表盘',
    path: '/dashboard'
  },
  {
    key: 'user',
    icon: '<TeamOutlined />',
    label: '用户管理',
    path: '/user'
  },
  {
    key: 'role',
    icon: '<SafetyCertificateOutlined />',
    label: '角色管理',
    path: '/role'
  },
  {
    key: 'permission',
    icon: '<LockOutlined />',
    label: '权限管理',
    path: '/permission'
  }
]

// 处理菜单点击
const handleMenuClick = ({ key, keyPath, item, domEvent }) => {
  const menuItem = menuItems.find(item => item.key === key)
  if (menuItem && menuItem.path) {
    // 添加到访问过的菜单
    addVisitedMenu(menuItem)
    router.push(menuItem.path)
  }
}

// 添加访问过的菜单
const addVisitedMenu = (menuItem) => {
  // 检查是否已存在
  const existingIndex = visitedMenus.value.findIndex(item => item.key === menuItem.key)
  if (existingIndex !== -1) {
    // 如果已存在，移到最前面
    const [existingItem] = visitedMenus.value.splice(existingIndex, 1)
    visitedMenus.value.unshift(existingItem)
  } else {
    // 如果不存在，添加到最前面
    visitedMenus.value.unshift({ ...menuItem })
    // 限制最大显示数量
    if (visitedMenus.value.length > 5) {
      visitedMenus.value.pop()
    }
  }
}

// 移除访问过的菜单
const removeVisitedMenu = (index) => {
  visitedMenus.value.splice(index, 1)
}

// 点击访问过的菜单
const handleVisitedMenuClick = (menuItem) => {
  router.push(menuItem.path)
  selectedKeys.value = [menuItem.key]
}

// 监听路由变化，更新选中的菜单
router.beforeEach((to, from, next) => {
  if (to.path && to.path !== '/') {
    const key = to.path.split('/')[1]
    selectedKeys.value = [key]
  }
  next()
})
</script>

<style scoped>
.app-layout {
  height: 100vh;
  background-color: var(--background-color);
  color: var(--text-color);
}

.logo {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 24px;
  border-bottom: 1px solid var(--border-color);
}

.logo h3 {
  margin: 0;
  font-size: 18px;
  color: var(--primary-color);
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.header-right {
  display: flex;
  align-items: center;
}

.visited-menus {
  display: flex;
  align-items: center;
  margin-right: auto;
  flex-wrap: nowrap;
  overflow: hidden;
}

.user-info {
  display: flex;
  align-items: center;
  cursor: pointer;
}
</style>

<style>
/* 全局主题样式 */
#app {
  background-color: var(--background-color);
  color: var(--text-color);
  transition: background-color 0.3s, color 0.3s;
}

.ant-layout {
  background-color: var(--background-color);
}

.ant-layout-sider {
  background-color: var(--sidebar-bg);
  border-right: 1px solid var(--border-color);
}

.ant-layout-content {
  background-color: var(--content-bg);
}

.ant-card {
  background-color: var(--background-color);
  color: var(--text-color);
  border: 1px solid var(--border-color);
}

.ant-menu {
  background-color: transparent;
  color: var(--text-color);
}

.ant-menu-item {
  color: var(--text-color);
}

.ant-menu-item-selected {
  background-color: rgba(24, 144, 255, 0.1);
  color: var(--primary-color);
}

.ant-input, .ant-select-selector {
  background-color: var(--background-color);
  color: var(--text-color);
  border: 1px solid var(--border-color);
}

.ant-input::placeholder, .ant-select-selector::placeholder {
  color: rgba(255, 255, 255, 0.5);
}
</style>