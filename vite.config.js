import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/reactApp/'  // <--- rruga relative për GitHub Pages
})
