var fs = require('fs');


function loadHtmlString( files, callback ){

	JST = {};

	files.forEach(function( filePath ){
		var data = fs.readFileSync(filePath).toString();
		JST[ filePath ] = function(){
			return data;
		};
	});

	return JST;

}

module.exports = loadHtmlString;