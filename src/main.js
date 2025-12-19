import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import App from './App.vue'
import router from './router'
import store from './store'
import { useThemeStore } from './store'
import 'ant-design-vue/dist/reset.css'

const app = createApp(App)

app.use(Antd, { locale: zhCN })
app.use(router)
app.use(store)

// 初始化主题
const themeStore = useThemeStore()
themeStore.initTheme()

app.mount('#app')