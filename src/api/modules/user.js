import request from '../request'

// 用户管理模块API
const userApi = {
  // 获取用户列表
  getUserList: (params) => {
    return request({
      url: '/user/list',
      method: 'get',
      params
    })
  },
  
  // 获取用户详情
  getUserDetail: (id) => {
    return request({
      url: `/user/${id}`,
      method: 'get'
    })
  },
  
  // 创建用户
  createUser: (data) => {
    return request({
      url: '/user',
      method: 'post',
      data
    })
  },
  
  // 更新用户
  updateUser: (id, data) => {
    return request({
      url: `/user/${id}`,
      method: 'put',
      data
    })
  },
  
  // 删除用户
  deleteUser: (id) => {
    return request({
      url: `/user/${id}`,
      method: 'delete'
    })
  },
  
  // 批量删除用户
  batchDeleteUser: (ids) => {
    return request({
      url: '/user/batch-delete',
      method: 'delete',
      data: { ids }
    })
  },
  
  // 更新用户状态
  updateUserStatus: (id, status) => {
    return request({
      url: `/user/${id}/status`,
      method: 'put',
      data: { status }
    })
  }
}

export default userApi