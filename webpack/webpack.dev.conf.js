const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.conf');
const path = require('path');
const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, '../app');
const fs = require('fs');

console.log('lala')
const config = merge(baseConfig, {
  mode: "development",
  devtool: "source-map",
  devServer: {
    proxy: { // proxy URLs to backend development server
      // url路径包含下面的就被代理转发
      '*/sns/*': {
        target: 'https://api.weixin.qq.com',//远端测试地址如：http://xxx.xxx.xx.xxx
        secure: false
      },
       //url路径包含下面的就被代理转发
      '*/wechat/*': {
        target: 'http://43.241.220.166/',//远端测试地址如：http://xxx.xxx.xx.xxx
        secure: false
      },
      //转发至本地mock
      '*/mock/*': {
        target: 'http://127.0.0.1:8809',
        secure: false
      },
      // 接口代理
      // '*/api/*' : {
      //   target: 'http://120.79.26.58:8020',
      //   // pathRewrite: {'^/online' : ''},
      //   secure: false,
      //   changeOrigin: true
      // }
    },
    port: 8888,
    contentBase: path.join(__dirname, '../dist'), // boolean | string | array, static file location
    compress: true, // enable gzip compression
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
    https: false, // true for self-signed, object for cert authority
    noInfo: true, // only errors & warns on hot reload
    // ...
  },
  plugins: [
  ],
})

module.exports = config;