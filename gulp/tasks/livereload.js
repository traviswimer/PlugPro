var gulp = require('gulp');
var config = require('../config');

var livereload = require('gulp-livereload');

gulp.task('livereload', function(){
	livereload.listen();
	gulp.watch( config.build + '/**' ).on( 'change', livereload.changed );
});