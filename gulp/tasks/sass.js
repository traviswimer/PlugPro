var gulp = require('gulp');
var config = require('../config');

var sass = require('gulp-sass');

gulp.task('sass', function (){
	return gulp.src( config.css.src )
		.pipe( sass() )
		.pipe( gulp.dest( config.css.build ) );
});