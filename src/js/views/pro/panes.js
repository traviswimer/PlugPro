
var panes = {};

function updatePanes(){
	var windowWidth = $(window).width();
	panes["userlist"] = 300;
	panes["middle"] = (windowWidth - panes["userlist"]) * (2/3);
	panes["chat"] = windowWidth - panes["middle"] - panes["userlist"];
};
updatePanes();

module.exports = {
	get: function( paneName ){
		return panes[ paneName ];
	},
	update: updatePanes
};