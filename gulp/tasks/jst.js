var gulp = require('gulp');
var config = require('../config');

var concat = require('gulp-concat');
var template = require('gulp-template-compile');
var plumber = require('gulp-plumber');

gulp.task('jst', function() {
	gulp.src( config.jst.src )
		.pipe( plumber() )
		.pipe(
			template({
				namespace: 'plugPro"]["JST' // This is completely ridiculous
			}).on( 'error', console.error.bind(console) )
		)
		.pipe( concat("templates.js") )
		.pipe( gulp.dest( config.js.src ) );
});