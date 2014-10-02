var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('build', function( callback ){

	process.env.build = "dev";

	runSequence(
		'clean',
		['sass','jst','copy', 'imagemin'],
		'watchify',
		'livereload',
		callback
	);
});