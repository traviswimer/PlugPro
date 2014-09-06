
// HTML templates
var JST = require("./ui/templates").JST;
var Menu = require('./ui/Menu');

var Room = require('./Room');
var room = new Room();

var Toggle = require('./settings/Toggle');
var AutoWootToggle = require('./settings/AutoWootToggle');
room.on("load", function(){

	// Add Autowoot
	var userId = API.getUser().id;
	var toggler = new Toggle( true );
	new AutoWootToggle( toggler, userId );

	// Add PlugPro menu
	new Menu( JST );

});
room.init();
