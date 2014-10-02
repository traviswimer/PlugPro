var gulp = require('gulp');
var config = require('../config');
var gutil = require('gulp-util');
var imagemin = require('gulp-imagemin');

gulp.task('imagemin', function() {

	var buildDir;

	if( process.env.build === "package" ){
		buildDir = config.images.pkg;
	}else{
		buildDir = config.images.build;
	}

	return gulp.src( config.images.src + '/*' )
		.pipe( imagemin() )
		.pipe( gulp.dest( buildDir ) )
		.on( 'error', gutil.log );
});
