
module.exports = function (lvalue, rvalue, options) {
	if (arguments.length < 3) {
		throw Error('must be 3 arguments.');
	}
	if (lvalue == rvalue) {
		return options.fn(this);
	}
	return options.inverse(this);
}
