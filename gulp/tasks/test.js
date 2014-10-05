var gulp = require('gulp');
var config = require('../config');

var istanbul = require('gulp-istanbul');
var istanbulEnforcer = require('gulp-istanbul-enforcer');
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');
var jsdom = require('jsdom').jsdom;
var plumber = require('gulp-plumber');

gulp.task('test', function(callback) {

	if( typeof global.window === "undefined" ){

		// Initialize jsDOM
		var document = global.document = jsdom('<html><head><script></script></head><body></body></html>');
		global.window = document.createWindow();

	}

	// Make sure body is empty
	global.document.body.innerHTML = "";
	global.document.head.innerHTML = "";


	// Add all default window properties to the global object
	for(var windowProp in global.window ){
		// Some global vars already exist and can't be overwritten.
		if( typeof global[windowProp] === "undefined" ){
			global[windowProp] = global.window[ windowProp ];
		}
	}


	var globalsList = {
		'$': 'jquery',
		'chrome': '../../test/chrome',
		'API': '../../test/API',
		'_': 'underscore',
		'Backbone': 'backbone'
	};

	// Set to global object and window object
	for( var globalName in globalsList ){
		global[globalName] = require( globalsList[globalName] );
		global.window[globalName] = global[globalName];
	}

	var ended = false;
	function handleError(err) {
		if( err ){
			gutil.log(err.message);
		}
		
		if( !ended ){
			callback();
			ended = true;
		}
	}

	// Code coverage threshold options
	var enforcerOptions = {
		thresholds: {
			statements: 100,
			branches: 100,
			lines: 100,
			functions: 100
		},
		coverageDirectory: 'coverage',
		rootDirectory: config.root + '/test'
	};


	gulp.src( [config.js.src + '/**/*.js'] )
		.pipe( plumber() )
		// Instrument source code
		.pipe( istanbul() )
		.on('finish', function (){
			// Load tests into mocha
			gulp.src( [config.js.tests + '/**/*_test.js'] )
				.pipe( plumber() )
				.pipe(
					mocha({
						reporter: 'spec'
					})
					.on( 'error', handleError )
				)
				// Create coverage reports
				.pipe(istanbul.writeReports({
					dir: config.root + '/test/coverage',
					reporters: ['html', 'lcov', 'text-summary', 'json'],
					reportOpts: {
						dir: config.root + '/test/coverage'
					}
				}))
				// Throw error if coverage thresholds not met
				.pipe( istanbulEnforcer(enforcerOptions) )
				.on( 'error', handleError )
				.on( 'end', handleError );
		});

});