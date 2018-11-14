/**
 *  @description 可以共用的工具函数
 *
 */

function ajax(options) {
    var defaults = {
        url: options.url,
        data: options.data,
        type: options.type || 'GET',
        dataType: options.dataType || 'json',
        headers: {
          "Access-Control-Expose-Headers": "x-error-code,x-error-code-description"
        },
        async: options.async || true,
        contentType: options.contentType || 'application/json',
        beforeSend: options.beforeSend || function() {},
        success: options.success || function() {},
        error: options.error || null,
    }
    var ajaxConfig = {
        url: defaults.url,
        data: defaults.data,
        type: defaults.type,
        dataType: defaults.dataType,
        headers: defaults.headers,
        async: defaults.async,
        contentType: defaults.contentType,
        beforeSend: function(xhr) {
          defaults.beforeSend.call(xhr);
        },
        success: function(res, status, xhr) {
          defaults.success.call(xhr, {
            code: 1,
            data: res
          });
        },
        // xhrFields: {
        //   withCredentials: true
        // },
        // crossDomain: true,
        error: function(xhr, error) {
            let prompt;
            switch(parseInt(xhr.getResponseHeader('x-error-code')) || 0) {
              case 1001: prompt = '手机号码格式错误';break;
              case 1002: prompt = '短信发送失败';break;
              case 1003: prompt = '手机号码或密码错误';break;
              case 1004: prompt = '用户不存在';break;
              case 1005: prompt = '密码不符合要求';break;
              case 1006: prompt = '验证码请求超限';break;
              case 1007: prompt = '验证码错误';break;
              case 1008: prompt = '未授权访问';break;
              case 1009: prompt = '未登录';break;
              case 1010: prompt = '内部服务器错误';break;
              case 2001: prompt = '积分不足';break;
              case 2002: prompt = '积分转账数额不正确';break;
              case 2003: prompt = '转出账户和转入账户相同';break;
              default : prompt = '网络错误';
            }
            const resInfo = {
              code: parseInt(xhr.getResponseHeader('x-error-code')) || 0,
              description : xhr.getResponseHeader('x-error-code-description') || "未知错误",
              prompt,
            };
            console.log('code', xhr.getResponseHeader('x-error-code'))
            if(resInfo.code === 1009) {
              window.location.href = '/login.html';
            } else {
              defaults.error.call(xhr, resInfo);
            }
        }
    }
    return $.ajax(ajaxConfig);
};
// 获取url参数
var urlParam = function (name) {
  var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
  if (!results) {
    return '';
  }
  return results[1] || '';
};

function escapeHTML(a) {
  a = "" + a;
  return a.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
  ;
}
var cookie = {
  setCookie(name,value) {
    var Days = 10; 
    var exp = new Date(); 
    exp.setTime(exp.getTime() + Days*24*60*60*1000); 
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString(); 

  },
  getCookie(name) {
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
 
    if(arr=document.cookie.match(reg))
 
      return unescape(arr[2]); 
    else 
      return null; 
  },
  delCookie(name) {
    var exp = new Date(); 
    exp.setTime(exp.getTime() - 1); 
    var cval= this.getCookie(name); 
    if(cval!=null) 
        document.cookie= name + "="+cval+";expires="+exp.toGMTString(); 
  } 
}

module.exports = {
  urlParam: urlParam,
  escapeHTML: escapeHTML,
  ajax:ajax,
  cookie: cookie
};

