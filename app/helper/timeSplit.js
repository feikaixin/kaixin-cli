
// Handlebars.registerHelper("timeSplit", function (time, type) {
module.exports = function (time, type) {
	var state = (type == 'start') ? 0 : 1;
	return time.split('-')[state];
}
//});