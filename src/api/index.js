// 统一导出所有API模块
import userApi from './modules/user'
import roleApi from './modules/role'
import permissionApi from './modules/permission'

// 导出所有API
export default {
  user: userApi,
  role: roleApi,
  permission: permissionApi
}

// 也可以按需导出
export { userApi, roleApi, permissionApi }