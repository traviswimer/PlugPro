var gulp = require('gulp');
var config = require('../config');

var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var gutil = require('gulp-util');

gulp.task('sass', function (){

	var buildDir;

	if( process.env.build === "package" ){
		buildDir = config.css.pkg;
	}else{
		buildDir = config.css.build;
	}

	return gulp.src( config.css.src + '/**/*.scss' )
		.pipe( plumber() )
		.pipe( sass() )
		.pipe( gulp.dest( buildDir ) );
});