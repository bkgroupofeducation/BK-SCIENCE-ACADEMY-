import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true
  },
  server: {
    allowedHosts: ["almighty-clear-playtime.ngrok-free.dev"],
    proxy: {
      '/api': {
        target: 'http://localhost:5057',
        changeOrigin: true,
        secure: false
      },
      '/uploads': {
        target: 'http://localhost:5057',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
