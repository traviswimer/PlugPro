var gulp = require('gulp');
var runSequence = require('run-sequence');
var plumber = require('gulp-plumber');

gulp.task('default', function(callback) {
	runSequence(
		'build',
		'test',
		'watch',
		callback
	);
});