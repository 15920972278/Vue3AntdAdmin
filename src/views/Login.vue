<template>
  <div class="login">
    <div class="login-container">
      <div class="login-header">
        <h1>Vue3 Antd Admin</h1>
        <p>欢迎回来，请登录</p>
      </div>
      <a-form :model="form" :rules="rules" ref="formRef" layout="vertical">
        <a-form-item label="用户名" name="username">
          <a-input
            v-model:value="form.username"
            placeholder="请输入用户名"
            size="large"
          >
            <template #prefix>
              <UserOutlined />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item label="密码" name="password">
          <a-input-password
            v-model:value="form.password"
            placeholder="请输入密码"
            size="large"
            @pressEnter="handleLogin"
          >
            <template #prefix>
              <LockOutlined />
            </template>
          </a-input-password>
        </a-form-item>
        <a-form-item>
          <div class="login-form-footer">
            <a-checkbox v-model:checked="form.remember">记住我</a-checkbox>
            <a href="#" class="forgot-password">忘记密码？</a>
          </div>
        </a-form-item>
        <a-form-item>
          <a-button
            type="primary"
            size="large"
            block
            @click="handleLogin"
            :loading="loading"
          >
            登录
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'

const router = useRouter()
const formRef = ref()
const loading = ref(false)

// 表单数据
const form = reactive({
  username: 'admin',
  password: 'admin123',
  remember: true
})

// 表单验证规则
const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

// 处理登录
const handleLogin = async () => {
  try {
    await formRef.value.validate()
    loading.value = true
    
    // 模拟登录请求
    setTimeout(() => {
      loading.value = false
      message.success('登录成功')
      router.push('/dashboard')
    }, 1000)
  } catch (error) {
    console.log('表单验证失败:', error)
  }
}
</script>

<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-container {
  width: 400px;
  padding: 40px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.login-header h1 {
  margin: 0 0 10px 0;
  font-size: 28px;
  color: #1890ff;
  font-weight: 600;
}

.login-header p {
  margin: 0;
  color: #666;
  font-size: 14px;
}

.login-form-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.forgot-password {
  color: #1890ff;
  font-size: 14px;
}
</style>