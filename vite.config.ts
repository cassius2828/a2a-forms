import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      // Optionally set the HMR options (defaults should work fine)
      protocol: 'ws', // WebSocket protocol (default)
      host: 'localhost', // HMR server host
    }
  }
})