import request from '../request'

// 角色管理模块API
const roleApi = {
  // 获取角色列表
  getRoleList: (params) => {
    return request({
      url: '/role/list',
      method: 'get',
      params
    })
  },
  
  // 获取角色详情
  getRoleDetail: (id) => {
    return request({
      url: `/role/${id}`,
      method: 'get'
    })
  },
  
  // 创建角色
  createRole: (data) => {
    return request({
      url: '/role',
      method: 'post',
      data
    })
  },
  
  // 更新角色
  updateRole: (id, data) => {
    return request({
      url: `/role/${id}`,
      method: 'put',
      data
    })
  },
  
  // 删除角色
  deleteRole: (id) => {
    return request({
      url: `/role/${id}`,
      method: 'delete'
    })
  },
  
  // 批量删除角色
  batchDeleteRole: (ids) => {
    return request({
      url: '/role/batch-delete',
      method: 'delete',
      data: { ids }
    })
  },
  
  // 获取角色权限
  getRolePermissions: (id) => {
    return request({
      url: `/role/${id}/permissions`,
      method: 'get'
    })
  },
  
  // 分配角色权限
  assignRolePermissions: (id, data) => {
    return request({
      url: `/role/${id}/permissions`,
      method: 'put',
      data
    })
  }
}

export default roleApi