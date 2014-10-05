var gulp = require('gulp');
var config = require('../config');
var gutil = require('gulp-util');
var jsdoc = require("gulp-jsdoc");
var plumber = require('gulp-plumber');

gulp.task('docs', function() {
	return gulp.src( config.js.src + '/**/*.js' )
		.pipe( plumber() )
		.pipe( jsdoc( config.docs ) );
});
