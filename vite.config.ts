import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base:"/shudd/",
  plugins: [react()],
  build: {
    rollupOptions: {
      input: './src/main.tsx'
    }
  }
})
