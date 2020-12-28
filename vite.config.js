const path = require('path')
module.exports = {
  base: '/',
  port: 34567,
  open: true,
  https: false,
  alias: {
    '/@/': path.resolve(__dirname, './src')
  },
  proxy: {
    '/dev-api': { // 服务器
      target: 'https://minishop.cool',
      changeOrigin: true,
      rewrite: path => path.replace(/^\/dev-api/, '/api')
    }
  }
}