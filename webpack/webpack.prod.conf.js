const fs = require('fs');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, '../app');
const exec = require('child_process').exec;
// const MinifyPlugin = require("babel-minify-webpack-plugin");

//删除build目录
const child = exec('rm -rf dist', function(err, out) {
  console.log(out); err && console.log(err);
});

const config = merge(baseConfig, {
  mode: "production",
  output: {
    // webpack 如何输出结果的相关选项

    path: path.resolve(__dirname, "../dist"),

    filename: "js/[name].js", // string
    // 「入口分块(entry chunk)」的文件名模板（出口分块？）

    // library: "MyLibrary", // string,
    // 导出库(exported library)的名称

    // libraryTarget: "umd", // 通用模块定义
    // 导出库(exported library)的类型

    /* 高级输出配置（点击显示） */
  },
  plugins: [
    // new MinifyPlugin({}, {})
  ],
})

module.exports = config;