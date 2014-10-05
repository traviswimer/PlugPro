var gulp = require('gulp');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');

var config = require('../config');
var bundleOptions = require('../browserifyBundles');

gulp.task('browserify', function(){

	bundleOptions.forEach(function( options ){
		gulp.src( options.src )
			.pipe( plumber() )
			.pipe( browserify() )
			.pipe( uglify() )
			.pipe( gulp.dest( config.js.pkg ) );

	});
});