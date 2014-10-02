var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('package', function( callback ){

	process.env.build = "package";

	runSequence(
		'clean',
		['sass','jst','copy', 'imagemin'],
		'browserify',
		callback
	);
});


gulp.task('cleanPackage', function(){
	return gulp.src( config.pkg + '/*', {read: false} )
		.pipe( clean() );
});
