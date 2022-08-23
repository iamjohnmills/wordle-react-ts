import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    hmr: {
      port: 3001,
      clientPort: 5001,
    },
  },
  preview:{
    port: 3000
  }
  // base: 'https://iamjohnmills.github.io/wordle-react-ts/',
})
