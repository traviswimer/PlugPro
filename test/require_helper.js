// A wrapper for the require() method. Allows tests to be run on another path
// when using istanbul code coverage through grunt.

module.exports = function (path) {
	return require((process.env.APP_DIR_FOR_CODE_COVERAGE || '../src/') + path);
};