var gulp = require('gulp');
var config = require('../config');

var clean = require('gulp-clean');

gulp.task('clean', function () {

	var cleanDir;

	if( process.env.build === "package" ){
		cleanDir = config.pkg + '/*';
	}else{
		cleanDir = config.build + '/*';
	}

	return gulp.src( cleanDir, {read: false} )
		.pipe( clean() );
});