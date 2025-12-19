import { defineStore } from 'pinia'
import themeConfig from '@/config/themeConfig'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    // 当前主题名称
    currentTheme: 'light',
    // 所有可用主题
    themes: Object.keys(themeConfig)
  }),
  getters: {
    // 获取当前主题的配置
    currentThemeConfig: (state) => {
      return themeConfig[state.currentTheme]
    }
  },
  actions: {
    // 设置主题
    setTheme(themeName) {
      if (themeConfig[themeName]) {
        this.currentTheme = themeName
        this.applyTheme(themeConfig[themeName])
        // 保存到本地存储
        localStorage.setItem('theme', themeName)
      }
    },
    // 应用主题样式
    applyTheme(theme) {
      const root = document.documentElement
      Object.keys(theme).forEach(key => {
        root.style.setProperty(key, theme[key])
      })
    },
    // 初始化主题
    initTheme() {
      // 从本地存储获取主题，如果没有则使用默认主题
      const savedTheme = localStorage.getItem('theme')
      const themeToUse = savedTheme || this.currentTheme
      this.setTheme(themeToUse)
    }
  }
})