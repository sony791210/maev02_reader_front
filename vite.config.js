import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
      host: "0.0.0.0",
      port: 3000,
      open: false,
      proxy: {
        '/api': {
            target: 'http://192.168.88.15:2000/',
            changeOrigin: true,
            // rewrite: (path) => path.replace(/^\/api/, '/api')
        },
        '/chapter': {
            target: 'http://chapter2.zhuishushenqi.com/',
            rewrite: (path) => path.replace(/^\/chapter/, '/chapter'),
            changeOrigin: true
        }
      }

  },
  css: {
      //* css模块化
       modules: { // css模块化 文件以.module.[css|less|scss]结尾
          generateScopedName: '[name]__[local]___[hash:base64:5]',
          hashPrefix: 'prefix',
      },
      preprocessorOptions: {
          less: {
              javascriptEnabled: true,
          },
      },
  },
})
