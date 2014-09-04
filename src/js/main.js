
var Room = require('./room');
var room = new Room();

var Toggle = require('./settings/Toggle');
var AutoWootToggle = require('./settings/AutoWootToggle');
room.on("load", function(){
	var userId = API.getUser().id;
	var toggler = new Toggle( true );
	new AutoWootToggle( toggler, userId );

});
room.init();
