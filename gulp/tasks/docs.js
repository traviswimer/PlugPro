var gulp = require('gulp');
var config = require('../config');
var gutil = require('gulp-util');
var jsdoc = require("gulp-jsdoc");

gulp.task('docs', function() {
	return gulp.src( config.js.src + '/**/*.js' )
		.pipe( jsdoc( config.docs ) );
});
