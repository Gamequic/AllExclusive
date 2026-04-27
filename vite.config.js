import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/AllExclusive/',
  server: {
    port: 3030,
    open: false,
  }
})
