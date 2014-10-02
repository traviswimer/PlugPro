var gulp = require('gulp');
var config = require('../config');

gulp.task('watch', function(){
	gulp.watch( config.css.src, ['sass'] );
	gulp.watch( config.src + '/manifest.json', ['copy'] );
	gulp.watch( config.jst.src, ['jst'] );
	gulp.watch( config.js.tests + '/**/*', ['test'] );

});