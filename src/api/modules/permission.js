import request from '../request'

// 权限管理模块API
const permissionApi = {
  // 获取权限列表
  getPermissionList: (params) => {
    return request({
      url: '/permission/list',
      method: 'get',
      params
    })
  },
  
  // 获取权限详情
  getPermissionDetail: (id) => {
    return request({
      url: `/permission/${id}`,
      method: 'get'
    })
  },
  
  // 创建权限
  createPermission: (data) => {
    return request({
      url: '/permission',
      method: 'post',
      data
    })
  },
  
  // 更新权限
  updatePermission: (id, data) => {
    return request({
      url: `/permission/${id}`,
      method: 'put',
      data
    })
  },
  
  // 删除权限
  deletePermission: (id) => {
    return request({
      url: `/permission/${id}`,
      method: 'delete'
    })
  },
  
  // 批量删除权限
  batchDeletePermission: (ids) => {
    return request({
      url: '/permission/batch-delete',
      method: 'delete',
      data: { ids }
    })
  },
  
  // 获取权限树
  getPermissionTree: () => {
    return request({
      url: '/permission/tree',
      method: 'get'
    })
  },
  
  // 导出权限列表
  exportPermissionList: (params) => {
    return request({
      url: '/permission/export',
      method: 'get',
      params,
      responseType: 'blob' // 设置响应类型为blob，用于下载文件
    })
  }
}

export default permissionApi