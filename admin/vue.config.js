module.exports = {
  outputDir: __dirname + '/../server/admin',
  publicPath: process.env.NODE_ENV === "production" 
  ? '/admin/' 
  : '/', 
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'components': '@/components',
        'views': '@/views',
        'network': '@/network',
        'common': '@/common',
      }
    }
  }
}