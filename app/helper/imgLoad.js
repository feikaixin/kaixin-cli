/*
 * @author wanlei
 * @description 页面图片预显示默认图片
**/
var defaultHead = "";

(function () {
  var count = 0;

  var timer = setInterval(function () {
    $imgs = $("img.lazy-load");
    //图片数量不再变化表示dom渲染完成
    if($imgs.length != 0 && count == $imgs.length){
      clearInterval(timer);

      $imgs.get().forEach(function (item,index) {
        var realSrc = item.src,
            loader = new Image();
            loader.src = realSrc;
        item.src = defaultHead;
        item.onload = function (itm) {
          item.src = realSrc;
          loader.remove();
        };
      });
    }
    count = $imgs.length;
  },50);
  //如果出现图片一闪而过的状态，可以把time再设小一点
})();
