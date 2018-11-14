/**
* author jipeng jim@campussay.com
* description
* 获取用户唯一标识openid,并把他存到本地
* access_token有效期（目前为2个小时）也许以后会有变化
* window.location.href = getRedirectUrl(xx);
**/
var utils = require('module/common/utils');
var StoreFactory = require('module/common/StoreFactory.js');
var tipsDialog = require('component/dialog/tipsDialog');

var main = {
	_getRedirectUrl :  function (redirect_uri){
		window.location.href =  'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx413b77af2e5023eb&redirect_uri='+redirect_uri+'&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
	},
	/**
	* 获取用户唯一标识openid 如果code没有，先调用getRedirectUrl
	**/
	getAccessToken : function (success) {
		 var code = utils.urlParam('code');
		 var cookie = StoreFactory.getStore();
		 var localStorage = cookie.getItem('openid');
		 if(localStorage != 'undefined' && localStorage != undefined) {
		 	success && success(localStorage);
		 	return
		 };
		 if(code != ''){
		 	utils.ajax({
			    url:'wechat/getUserOpenid',
			    data: {
			      code:code
			    },
			    type: 'GET', //post微信会报错
			    success: function (res) {
			    	if(1 == res.code){
			    		var data = JSON.parse(res.data);
			    		var openid = data.openid;
			    		cookie.setItem('openid',openid);
			    		success && success(openid);
			    	}else{
			    		new tipsDialog({
				            content: res.msg,
				            hideDelay: 2000,
				            type: 'success',
				            showOnce: true
			        	});
			    	}
			    }
		 	});
		 }else{
		 	var href = window.location.href;
		 	//正常应该是用href
		 	main._getRedirectUrl(href);
		 	//main._getRedirectUrl('http://www.lingshi321.com');
		 }

	}
};
module.exports = main.getAccessToken;
