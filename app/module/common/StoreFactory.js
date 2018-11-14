/**
* author jipeng jim@campussay.com
* description   可以获取某一特定的浏览器支持的存储类型，并做优雅降级
* example 　 
*  StoreFactory.getStore('localStorage');//参数可以不传
*  按照sessionStorage','localStorage','cookie优先级使用
**/
 require('./zepto-cookie.js');
 var EmptyStore = {
    setItem : function() {},
    getItem : function() {},
    removeItem : function() {}
  };


  //用web storage实现的统一store接口
  var WebStore = {
    _store : null,

    init : function(type) {
      this._store = (type=='sessionStorage') ? sessionStorage : localStorage;
    },
    setItem : function(key,value) {
      this._store.setItem(key,value);
    },
    getItem : function(key) {
      return this._store.getItem(key);
    },
    removeItem : function(key) {
      this._store.removeItem(key);
    }
  };

  //用cookie实现的统一store接口
  var CookieStore ={
    setItem : function(key,value,expires) {
      $.cookie(key,value,{path:'/',expires:expires});
    },
    getItem : function(key) {
      return $.cookie(key);
    },
    removeItem : function(key) {
      $.cookie(key,'',{path:'/',expires:-1});
    }
  };

  //存储类，支持自动降级。
  var StoreFactory = {
    supportTypes : [],

    init : function() {
      this.supportTypes = this.getSupportTypes();
    },

    getStore : function(type) {
      //需要判断一下是否支持，否则自动降级
      var type = this._getAvailableType(type);
      if (type == null) {
        return  EmptyStore;
      } else if (type == 'cookie') {
        return  CookieStore;
      } else {
        WebStore.init();
        return  WebStore;
      }
    },

    //返回一个数组，标识浏览器所支持的存储类型，
    //如['sessionStorage','localStorage','cookie']
    getSupportTypes : function() {
      var types = [];
      var storages = ['sessionStorage','localStorage'];
      for (var i=0; i<storages.length; i++) {
        var storeName = storages[i];
        try {
          var storage = window[storeName];
          if (storage) {
            storage.setItem('test','fortest');
            if (storage.getItem('test')=='fortest') {
              types.push(storeName);
            }
            storage.removeItem('test');
          }
        } catch (e) {
          //不支持这类storage
        }
      }
      //检测cookie
      try {
        $.cookie('test','fortest',{path:'/'});
        if ($.cookie('test')=='fortest') {
          types.push('cookie');
        }
        $.cookie('test','',{path:'/',expires:-1});
      } catch (e) {
        //不支持cookie
      }
      return types;
    },

    _getAvailableType : function(type) {
      //需要判断一下是否支持，否则自动降级
      if (type == null) type = 'localStorage';  //默认为localStorage
      var supportTypes = this.supportTypes;
      var finalType = null;

      function isSupport(type,supportTypes) {
        for (var i=0; i<supportTypes.length; i++) {
          if (type==supportTypes[i]) {
            return true;
          }
        }
        return false;
      }
      if (type=='sessionStorage' && isSupport('sessionStorage',supportTypes)) {
        finalType = 'sessionStorage';
      } else if (type != 'cookie' && isSupport('localStorage',supportTypes)) {
        finalType = 'localStorage';
      } else if (isSupport('cookie',supportTypes)) {
        finalType = 'cookie';
      } else {
        console.error('No store can be used');
      }
      return finalType;
    }
  };
StoreFactory.init();
module.exports = StoreFactory;
