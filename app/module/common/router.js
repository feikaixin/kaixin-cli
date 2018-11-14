/**
 * 用于将页面和访问地址对应
 * url对应的是window.location.pathname,是访问的路径
 * 注意打包之后的路径
 */
var router = {
  insList: {
    name: "",
    url: ""
  }
}

if (window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost") {
  $.each(router, function() {
    this["url"] = this["url"].replace("/", "");
  });
}
module.exports = router
