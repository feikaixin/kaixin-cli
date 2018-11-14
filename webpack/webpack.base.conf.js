const fs = require('fs');
const merge = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ROOT_PATH = path.resolve(__dirname);
const TOP_PATH = path.resolve(ROOT_PATH, '../');
const APP_PATH = path.resolve(ROOT_PATH, '../app');
const MODULE_PATH = path.resolve(ROOT_PATH, '../app/module');

const getHtmlList = () => {
  const data = JSON.parse(fs.readFileSync('app.json', 'utf-8'));
  const pageList = data.pageList;
  return pageList.map(item => {
    const dist = (function() {
      let s1 = item.src.split("./app/page/")[1];
      let s2 = s1.substr(0, s1.lastIndexOf("/"));
      return s2;
    })();
    return new HtmlWebpackPlugin({
      chunks: [ dist , "common/common"],//包含页面的js和common
      title: item.title,
      extra: item.extra,//包含页面额外的配置信息
      template:  "app/template.ejs",
      filename: dist + '.html',
      chunksSortMode: "dependency",//按chunks的顺序对js进行引入
      hash: true //打版本戳
    })
  });
}

const getPageList = () => {
  let entryList = {
    "common/common": [
      MODULE_PATH + '/common/common.js'
    ]
  };
  const data = JSON.parse(fs.readFileSync('app.json', 'utf-8'));
  const pageList = data.pageList;

  pageList.forEach(item => {
    const s1 = item.src.split("./app/page/")[1];
    const name = s1.substr(0, s1.lastIndexOf("/"));
    console.log(name, item.src)
    entryList[name] = item.src;
  })

  return entryList;
}
const htmlList = getHtmlList()
const pageList = getPageList()


module.exports = {
  // Chosen mode tells webpack to use its built-in optimizations accordingly.
  entry: pageList, // string | object | array

  module: {
    // 关于模块配置

    rules: [
      // 模块规则（配置 loader、解析器等选项）
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.html$/, loader: "html?minimize=false" },
      { test: /\.json$/, loader: "json" },
      { test: /\.less$/, loader: "style-loader!css-loader!less-loader" },
      { test: /\.(jpg|gif|png|woff|svg|eot|ttf)$/,loader: 'url-loader'},
      { test: /\.handlebars/, loader: "handlebars-loader", query: { helperDirs: [APP_PATH + "/helper"] } },
    ],

    /* 高级模块配置（点击展示） */
  },

  resolve: {
    modules: [
      path.resolve(__dirname, "app")
    ],
    // 用于查找模块的目录
    extensions: [".js", ".json", ".jsx", ".css"],
    alias: {
      component: path.resolve(APP_PATH, "component"),
      module: path.resolve(APP_PATH, 'module'),
      service: path.resolve(APP_PATH, "service"),
      imgs: path.resolve(APP_PATH, "imgs"),
      fonts: path.resolve(APP_PATH, "fonts"),
      images: path.resolve(APP_PATH, "images"),
      node_modules: path.resolve(TOP_PATH, 'node_modules')
    },
  },

  // 通过在浏览器调试工具(browser devtools)中添加元信息(meta info)增强调试
  // 牺牲了构建速度的 `source-map' 是最详细的。

  // context: __dirname, // string（绝对路径！）
  // webpack 的主目录
  // entry 和 module.rules.loader 选项
  // 相对于此目录解析

  // target: "web", // 枚举
  // 包(bundle)应该运行的环境
  // 更改 块加载行为(chunk loading behavior) 和 可用模块(available module)

  // externals: ["react", /^@angular\//],
  // 不要遵循/打包这些模块，而是在运行时从环境中请求他们

  // stats: "errors-only",
  // 精确控制要显示的 bundle 信息


  plugins: [
    ...htmlList
  ],

  /* 高级配置（点击展示） */
}