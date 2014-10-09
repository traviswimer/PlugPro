/**
 * View for "pro view"
 * @module views/pro/ProViewView
 */

var WaitlistView = require('./WaitlistView');
var UserListView = require('./UserListView');

var ProViewView = {
	
	/**
	* Renders the "avatar" view
	*/
	render: function(){
		var JST = window.plugPro.JST;
		

		$('body').addClass('plugpro-pro');

		$('#room').append("<div class='pro-bg-cover'></div>");

		this.waitlistView = new WaitlistView();
		$('.pro-bg-cover').append( this.waitlistView.el );
		this.waitlistView.render();

		this.userListView = new UserListView();
		$('.pro-bg-cover').append( this.userListView.el );
		this.userListView.render();

	},

	destroy: function(){
		$('body').removeClass('plugpro-pro');
	}

};

module.exports = ProViewView;