import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  publicDir:"static",
  plugins: [react()],
  server: {
      host: "0.0.0.0",
      port: 500,
      open: false,
      proxy: {
        '/apiflask':{
              target: 'https://navel.maev02.com/',
              changeOrigin: true
        },
        '/api': {
            // target: 'https://navel.maev02.com/',
            target: 'http://127.0.0.1:2000/',
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
