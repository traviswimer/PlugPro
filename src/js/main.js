
var Room = require('./Room');
var room = new Room();

room.on("load", function(){

	// HTML templates
	var JST = require("./ui/templates").JST;
	var Menu = require('./views/MenuView');


	var Toggle = require('./settings/Toggle');
	var AutoWootToggle = require('./settings/AutoWootToggle');



	// create global API object
	var plugPro = window.plugPro = {};

	// Add Autowoot
	var userId = API.getUser().id;
	var toggler = new Toggle( true );
	var autowootToggle = new AutoWootToggle( toggler, userId );

	// Add PlugPro menu
	var menu = new Menu( {
		JST: JST,
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
