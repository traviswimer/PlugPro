// A wrapper for the rewire() method. Allows tests to be run on another path
// when using istanbul code coverage through grunt.
var rewire = require("rewire");

module.exports = function (path) {
	return rewire((process.env.APP_DIR_FOR_CODE_COVERAGE || '../src/js/') + path);
};