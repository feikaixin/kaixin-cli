// Handlebars.registerHelper("timeFormat", function (time, type) {
module.exports = function (time, type) {
	var formater = {	
		//从毫秒数中提取 月日
		getDate: function (time) {
		    var Year = new Date(time);
		    console.log(time);
		    return [Year.getMonth() + 1 + "月", Year.getDate() + "日"].join('');
		},

		//从毫秒数中提取 时分
		getHour: function (time) {
		    var Hour = new Date(time);
		    function toNormal (num) {
		        if (num > 9) {
		     		return num;
		     	} else {
		     		return "0" + num;
		     	}
		 	}
			return [toNormal(Hour.getHours()), toNormal(Hour.getMinutes())].join(':');
		}
	};

	return formater[type](time);
}
//});
