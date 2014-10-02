var gulp = require('gulp');
var config = require('../config');

gulp.task('copy', function() {
	gulp.src( config.src + '/manifest.json' )
		.pipe( gulp.dest( config.build ) );
});
