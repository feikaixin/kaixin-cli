require("./main.less");
var homePage = require("./main.handlebars")();
var main = {
  init: function() {
    $("body").append(homePage);
  }
};

main.init();
