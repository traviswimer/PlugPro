var gulp = require('gulp');
var config = require('../config');
var gutil = require('gulp-util');
var imagemin = require('gulp-imagemin');

gulp.task('imagemin', function() {
	return gulp.src( config.images.src + '/*' )
		.pipe( imagemin() )
		.pipe( gulp.dest( config.images.build ) )
		.on( 'error', gutil.log );
});
