var gulp = require('gulp');
var config = require('../config');

var clean = require('gulp-clean');

gulp.task('clean', function () {
	gulp.src( config.build + '/*', {read: false} )
		.pipe( clean() );
});