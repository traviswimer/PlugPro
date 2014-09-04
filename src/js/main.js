
var Room = require('./room');
var room = new Room();

var Toggle = require('./settings/Toggle');
var AutoWootToggle = require('./settings/AutoWootToggle');
room.on("load", function(){
	console.log("LOADED!");
	var userId = API.getUser().id;
	var toggler = new Toggle();
	toggler.on();
	new AutoWootToggle( toggler, userId );

	setTimeout( toggler.on.bind(toggler), 15000);
});
room.init();
