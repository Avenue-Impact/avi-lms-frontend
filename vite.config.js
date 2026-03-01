import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  server: {
    host: true,
    port: 5173
  },
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
      // eslint-disable-next-line no-undef
      "@": path.resolve(__dirname, "./src")
    },
  },
  css: {
    postcss: './postcss.config.cjs',
  },
})
