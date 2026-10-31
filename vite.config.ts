import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages 构建使用 pages 模式，本地开发与预览保持根路径
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'pages' ? '/hospital-check-guide/' : '/',
}))
