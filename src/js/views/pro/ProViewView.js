/**
 * View for "pro view"
 * @module views/pro/ProViewView
 */

var WaitlistView = require('./WaitlistView');
var UserListView = require('./UserListView');
var DjView = require('./DjView');

var ProViewView = {
	
	/**
	* Renders the "avatar" view
	*/
	render: function(){
		var JST = window.plugPro.JST;
		
		$('#chat-button').click();

		$('body').addClass('plugpro-pro');

		$('#room').append("<div class='pro-bg-cover'></div>");

		this.waitlistView = new WaitlistView();
		$('.pro-bg-cover').append( this.waitlistView.el );
		this.waitlistView.render();

		this.userListView = new UserListView();
		$('.pro-bg-cover').append( this.userListView.el );
		this.userListView.render();

		this.djView = new DjView();
		$('.pro-bg-cover').append( this.djView.el );
		this.djView.render();

		var windowWidth = $(window).width();

		// Set pane defaults
		this.paneSizes = {
			"waitlist": windowWidth * 0.3,
			"userlist": windowWidth * 0.3,
			"chat": windowWidth * 0.4
		};

		this.reposition();
	},

	destroy: function(){
		$('body').removeClass('plugpro-pro');
	},

	reposition: function(){
		var windowWidth = $(window).width();
		var windowHeight = $(window).height();

		$('.app-right').height( windowHeight - 54 );
		$('.app-right').css({
			"height": (windowHeight - 54) + "px",
			"width": this.paneSizes.chat
		});

		var headerWidth = windowWidth - this.paneSizes.chat;
		$('#room-meta').width( headerWidth );
		$('#room-bar').width( headerWidth - 53 );
		$('#now-playing-bar').width( headerWidth - 108 );

		this.waitlistView.reposition( this.paneSizes );
		this.userListView.reposition( this.paneSizes );
		this.djView.reposition( this.paneSizes );
	}

};

module.exports = ProViewView;