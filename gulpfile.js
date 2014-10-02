/********************************************************************/
/* Gulp tasks: 														*/
/*																	*/
/* gulp				Builds all chrome extension files, copies		*/
/*					them to the "build" directory, runs unit		*/
/*					tests, and watches for changes					*/
/*																	*/
/* gulp test		Runs all unit tests								*/
/*																	*/
/* gulp docs		Generates javascript documentation				*/
/*																	*/
/* gulp package		Builds chrome extension, preparing				*/
/*					it for upload to the chrome store				*/
/*																	*/
/********************************************************************/


var requireDir = require('require-dir');

// Load all gulp tasks
requireDir('./gulp/tasks', { recurse: true });
