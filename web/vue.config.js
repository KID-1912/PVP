const path = require('path');

module.exports = {
  outputDir: __dirname + '/../server/web',
  transpileDependencies: ['swiper'],

// 目录别名配置
  configureWebpack: {
    resolve: {
      alias: {  //路径别名
        'assets': '@/assets',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views'
      }
    }
  },
  css: {
      loaderOptions: {
          sass: {
              // 全局可用的scss变量
              additionalData: `@import "./src/assets/css/global.scss";`,
          },
      },
  },



}



