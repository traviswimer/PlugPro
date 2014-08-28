///////////////////////////////////////////
// Using Grunt to build and test PlugPro //
///////////////////////////////////////////////////////////////////////////////////
//
// grunt	Start watching for changes. When a change is detected, Browserify
//			will bundle javscript files, SASS will be compiled to css, Mocha 
//			unit tests will run.
//
// grunt test	Runs Mocha unit tests with Istanbul code coverage
//
///////////////////////////////////////////////////////////////////////////////////

module.exports = function(grunt){


	grunt.initConfig({

		// javascript minification
		uglify: {
			build: {
				src: './build/js/plug_pro.js',
				dest: './build/js/plug_pro.js'
			}
		},

		// Build modules into single file with browserify
		browserify: {
			'./src/main.js': ['./build/js/plug_pro.js']
		},

		// Watch for changes to source or test code
		watch: {
			options: {
				livereload: true,
			},
			browserify: {
				files: ['src/**/*.js'],
				tasks: ['browserify'],
			},
			sass: {
				files: ['sass/**/*.scss'],
				tasks: ['sass'],
			},
			tests: {
				files: [
					'src/**/*.js',
					'test/unit/**/*'
				],
				tasks: ['test'],
			}
		},

		// Perform SASS compilation
		sass: {
			dist: {
				files: [
					{
						expand: true,
						cwd: './sass',
						src: ['*.scss'],
						dest: './build/css',
						ext: '.css'
					}
				]
			}
		},

		magic_mocha: {
			tests: {
				options: {
					globals: {
						// Add the jQuery module to the window object
						'$': 'jquery'
					}
				},
				files: {
					src: ['test/unit/**/*_test.js']
				}
			}
		},


		// Code coverage
		not_constantinople: {
			coverage: {
				options: {
					unitTestTask: "magic_mocha",
					directories: {
						root: 'test',
						coverage: 'coverage',
						sourceFiles: 'src/**/'
					},
					thresholds: {
						'statements': 100,
						'branches': 100,
						'lines': 100,
						'functions': 100
					}
				}
			}
		},

		// Use alternate path when running istanbul
		env: {
			coverage: {
				APP_DIR_FOR_CODE_COVERAGE: '../test/coverage/instrument/src/'
			}
		},

		// Remote code coverage checker
		coveralls: {
			options: {
				force: true
			},
			all: {
				src: 'test/coverage/reports/lcov.info'
			}
		},

	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-magic-mocha');
	grunt.loadNpmTasks('grunt-env');
	grunt.loadNpmTasks('grunt-not-constantinople');

	grunt.registerTask('default', ['browserify', 'sass', 'watch']);
	grunt.registerTask('test', ['env:coverage', 'not_constantinople']);
	grunt.registerTask('build', ['browserify', 'uglify', 'sass']);


};