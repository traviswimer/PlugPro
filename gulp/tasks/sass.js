var gulp = require('gulp');
var config = require('../config');

var sass = require('gulp-sass');
var gutil = require('gulp-util');

gulp.task('sass', function (){

	var buildDir;

	if( process.env.build === "package" ){
		buildDir = config.css.pkg;
	}else{
		buildDir = config.css.build;
	}

	return gulp.src( config.css.src )
		.pipe( sass() )
		.pipe( gulp.dest( buildDir ) )
		.on( 'error', gutil.log );
});