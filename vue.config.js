const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://220.136.185.117',
        ws: true,
        changeOrigin: true
      },
    }
  }
  
})
