/**
 * @description 此模块会被所有的页面自动引入
 */
require("./common.css");//引入全局样式
// require("./global.less");
require('node_modules/weui/dist/style/weui.min.css');

require("./zepto.js");
require("./hotcss.js");
// 全局引入 handlebars helper
require("../../helper/equal");
require("../../helper/timeFormat");
require("../../helper/timeSplit");
require("../../helper/imgLoad");
