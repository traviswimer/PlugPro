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

		// Clear everything from build directory
		clean: {
			build: ["build/"],
			docs: ["docs/"]
		},

		// Generate documentation
		jsdoc : {
			build : {
				src: ['src/js/**/*.js'], 
				options: {
					destination: 'docs'
				}
			}
		},

		// javascript minification
		uglify: {
			build: {
				src: './build/js/plug_pro.js',
				dest: './build/js/plug_pro.js'
			}
		},

		// Build modules into single file with browserify
		browserify: {
			options: {
				bundleOptions : {
					debug: true 
				}
			},
			build: {
				files: {
					'./build/js/plug_pro.js': ['./src/js/main.js'],
					'./build/js/init.js': ['./src/js/init.js'],
					'./build/js/event_page.js': ['./src/js/event_page.js']
				}
			}
		},

		// Compile HTML templates to javascript
		jst: {
			compile: {
				options: {
					commonjs: true
				},
				files: {
					"src/js/templates.js": ["src/html_templates/**/*.html"]
				}
			}
		},

		// Watch for changes to source or test code
		watch: {
			options: {
				livereload: true,
			},
			build: {
				files: [
					'src/**/*'
				],
				tasks: [
					'build'
				],
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
						cwd: './src/css',
						src: ['*.scss'],
						dest: './build/css',
						ext: '.css'
					}
				]
			}
		},

		imagemin: {
			dynamic: {
				files: [{
					expand: true,
					cwd: 'src/images/',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'build/images/'
				}]
			}
		},

		copy: {
			build: {
				files: [
					{
						flatten: true,
						src: [
							'src/manifest.json'
						],
						dest: 'build/manifest.json',
						filter: 'isFile'
					},
				]
			}
		},

		magic_mocha: {
			tests: {
				options: {
					globals: {
						// Add the jQuery module to the window object
						'$': 'jquery',
						'chrome': '../../../test/chrome',
						'API': '../../../test/API',
						'_': 'underscore'
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
				APP_DIR_FOR_CODE_COVERAGE: '../test/coverage/instrument/src/js/'
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
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jst');
	grunt.loadNpmTasks('grunt-jsdoc');


	grunt.registerTask('default', ['build', 'watch']);
	grunt.registerTask('test', ['env:coverage', 'not_constantinople']);
	grunt.registerTask('build', ['clean:build', 'jst', 'browserify', 'sass', 'imagemin', 'copy']);
	grunt.registerTask('docs', ['clean:docs', 'jsdoc']);


};