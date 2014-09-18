
// create global API object
var plugPro = window.plugPro = {};

// Load html templates
var JST = require("./templates").JST;
plugPro.JST = JST;

var Room = require('./Room');
var room = new Room();

room.on("load", function(){

	var Menu = require('./views/MenuView');


	var Toggle = require('./settings/Toggle');
	var AutoWootToggle = require('./settings/AutoWootToggle');





	// Add Autowoot
	var userId = API.getUser().id;
	var toggler = new Toggle( true );
	var autowootToggle = new AutoWootToggle( toggler, userId );

	// Add PlugPro menu
	var menu = new Menu( {
		toggleSettings: {
			"AutoWoot": autowootToggle
		}
	});
	$('#app-menu').append( menu.$el );
	menu.render();

	plugPro.settings = {
		autowoot: autowootToggle
	}

});
room.init();
