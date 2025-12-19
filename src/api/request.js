import axios from 'axios'
import { message } from 'ant-design-vue'

// 创建axios实例
const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API || '/api', // API基础路径
  timeout: 5000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 从本地存储获取token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    console.error('请求错误:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    // 如果响应类型是blob，直接返回response对象
    if (response.config.responseType === 'blob') {
      return response
    }
    
    const res = response.data
    
    // 根据后端接口规范进行处理
    if (res.code !== 200) {
      message.error(res.message || '请求失败')
      return Promise.reject(new Error(res.message || '请求失败'))
    } else {
      return res
    }
  },
  error => {
    console.error('响应错误:', error)
    
    // 统一错误处理
    if (error.response) {
      switch (error.response.status) {
        case 401:
          message.error('未授权，请重新登录')
          // 跳转到登录页
          window.location.href = '/login'
          break
        case 403:
          message.error('拒绝访问')
          break
        case 404:
          message.error('请求地址不存在')
          break
        case 500:
          message.error('服务器内部错误')
          break
        default:
          message.error(`请求失败：${error.response.status}`)
      }
    } else if (error.request) {
      message.error('网络错误，无法连接服务器')
    } else {
      message.error('请求配置错误')
    }
    
    return Promise.reject(error)
  }
)

export default service