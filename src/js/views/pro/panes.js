
var panes = {};

function updatePanes(){
	var windowWidth = $(window).width();
	panes["middle"] = windowWidth * 0.5;
	panes["userlist"] = windowWidth * 0.25;
	panes["chat"] = windowWidth * 0.25;
};
updatePanes();

module.exports = {
	get: function( paneName ){
		return panes[ paneName ];
	},
	update: updatePanes
};