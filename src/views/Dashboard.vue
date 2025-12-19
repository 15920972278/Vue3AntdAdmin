<template>
  <div class="dashboard">
    <h1>仪表盘</h1>
    <a-row :gutter="[16, 16]">
      <a-col :span="6">
        <a-card title="总用户数" :bordered="false">
          <div class="card-content">
            <span class="number">1,234</span>
            <span class="desc">本月新增 120</span>
          </div>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card title="总角色数" :bordered="false">
          <div class="card-content">
            <span class="number">56</span>
            <span class="desc">本月新增 3</span>
          </div>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card title="总权限数" :bordered="false">
          <div class="card-content">
            <span class="number">89</span>
            <span class="desc">本月新增 5</span>
          </div>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card title="活跃用户" :bordered="false">
          <div class="card-content">
            <span class="number">456</span>
            <span class="desc">今日新增 23</span>
          </div>
        </a-card>
      </a-col>
    </a-row>
    
    <a-row :gutter="[16, 16]" style="margin-top: 20px">
      <a-col :span="12">
        <a-card title="最近登录用户" :bordered="false">
          <a-list
            :data-source="recentUsers"
            :pagination="false"
          >
            <template #renderItem="item">
              <a-list-item>
                <a-list-item-meta>
                  <template #avatar>
                    <a-avatar>{{ item?.name ? item.name.charAt(0) : '?' }}</a-avatar>
                  </template>
                  <template #title>
                    <a href="">{{ item?.name || '未知用户' }}</a>
                  </template>
                  <template #description>
                    {{ item.time }}
                  </template>
                </a-list-item-meta>
              </a-list-item>
            </template>
          </a-list>
        </a-card>
      </a-col>
      <a-col :span="12">
        <a-card title="系统状态" :bordered="false">
          <div class="system-status">
            <div class="status-item">
              <span class="label">CPU使用率：</span>
              <a-progress type="circle" :percent="45" :size="80" />
            </div>
            <div class="status-item">
              <span class="label">内存使用率：</span>
              <a-progress type="circle" :percent="68" :size="80" status="active" />
            </div>
          </div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 最近登录用户数据
const recentUsers = ref([
  { name: '张三', time: '2024-05-20 14:30' },
  { name: '李四', time: '2024-05-20 13:20' },
  { name: '王五', time: '2024-05-20 12:10' },
  { name: '赵六', time: '2024-05-20 11:00' },
  { name: '钱七', time: '2024-05-20 10:30' }
])
</script>

<style scoped>
.dashboard h1 {
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: 600;
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-content .number {
  font-size: 32px;
  font-weight: 600;
  color: #1890ff;
  margin-bottom: 8px;
}

.card-content .desc {
  font-size: 14px;
  color: #666;
}

.system-status {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.status-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.status-item .label {
  margin-bottom: 10px;
  font-size: 14px;
  color: #666;
}
</style>