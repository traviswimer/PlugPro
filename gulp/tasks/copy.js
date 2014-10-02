var gulp = require('gulp');
var config = require('../config');
var gutil = require('gulp-util');

gulp.task('copy', function() {
	return gulp.src( config.src + '/manifest.json' )
		.pipe( gulp.dest( config.build ) )
		.on( 'error', gutil.log );
});
