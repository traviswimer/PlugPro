
var config = require('./config');

module.exports = [
	{
		src: config.js.src + '/main.js',
		dest: config.js.build,
		file: "plug_pro.js"
	},
	{
		src: config.js.src + '/init.js',
		dest: config.js.build,
		file: "init.js"
	},
	{
		src: config.js.src + '/event_page.js',
		dest: config.js.build,
		file: "event_page.js"
	}
];