import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: ' https://avi-lms-backend.onrender.com',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, '/api/v1/auth')
  //     }

  //   },

  // },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    },
  },
})
