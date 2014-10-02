var gulp = require('gulp');
var config = require('../config');

var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var browserify = require('browserify');

var bundleOptions = require('../browserifyBundles');

function rebundle( bundler, dest, file ){
	return bundler.bundle()
		.on( 'error', gutil.log.bind(gutil, 'Browserify Error') )
		.pipe( source( file ) )
		.pipe( gulp.dest( dest ) );
}


gulp.task('watchify', function() {

	bundleOptions.forEach(function( options ){
		var bundler = watchify( browserify( options.src, watchify.args ) );
		bundler.on( 'update', function(){
			rebundle( bundler, options.dest, options.file );
		});

		rebundle( bundler, options.dest, options.file );
	});

});