var gulp = require('gulp');
var config = require('../config');
var gutil = require('gulp-util');
var plumber = require('gulp-plumber');

gulp.task('copy', function() {

	var buildDir;

	if( process.env.build === "package" ){
		buildDir = config.pkg;
	}else{
		buildDir = config.build;
	}

	return gulp.src( config.src + '/manifest.json' )
		.pipe( plumber() )
		.pipe( gulp.dest( buildDir ) )
		.on( 'error', gutil.log );
});
