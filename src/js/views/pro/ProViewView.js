/**
 * View for "pro view"
 * @module views/pro/ProViewView
 */

var WaitlistView = require('./WaitlistView');
var UserListView = require('./UserListView');
var PlayHistoryView = require('./PlayHistoryView');
var ArtworkView = require('./ArtworkView');
var panes = require('./panes');

var ProViewView = {
	
	/**
	* Initializes the "Pro" view
	*/
	initialize: function(){
		this.waitlistView = new WaitlistView();
		this.userListView = new UserListView();
		this.playHistoryView = new PlayHistoryView();
		this.artworkView = new ArtworkView();
	},

	/**
	* Renders the "Pro" view
	*/
	render: function(){
		var JST = window.plugPro.JST;

		// Store the time when this view was loaded
		this.loadTime = new Date();
		
		$('#chat-button').click();

		$('body').addClass('plugpro-pro');

		$('#room').append("<div class='pro-bg-cover'></div>");


		$('.pro-bg-cover').append( this.waitlistView.el );
		this.waitlistView.render();

		$('.pro-bg-cover').append( this.userListView.el );
		this.userListView.render();

		$('.pro-bg-cover').append( this.playHistoryView.el );
		this.playHistoryView.render();

		$('.pro-bg-cover').append( this.artworkView.el );
		this.artworkView.render();

		var windowWidth = $(window).width();

		this.callbackToReposition = this.reposition.bind(this);

		// Counteract plug's resizing events
		$(window).on( 'resize', this.callbackToReposition );
		$('#app-menu, #footer').on( "click", this.callbackToReposition );
		this.initialInterval = setInterval( this.callbackToReposition, 200 );

		this.reposition();
	},

	/**
	* Destroys the "Pro" view
	*/
	destroy: function(){
		if( this.initialInterval ){
			clearInterval( this.initialInterval );
			this.initialInterval = undefined;
		}
		$(window).off( 'resize', this.callbackToReposition );
		$('#app-menu, #footer').off( "click", this.callbackToReposition );

		$('body').removeClass('plugpro-pro');
		//$('#history-button').click();
		$('#room').find('.pro-bg-cover').remove();
		$('#plugpro-view-buttons').attr("style", "");
		$('#plugpro-view-buttons').css({
			"width": "auto"
		});
		$('.app-right').width( 345 );
		$('#history-panel').attr("style", "");
		$('#room-meta').attr("style", "");
		this.waitlistView.destroy();
		this.userListView.destroy();
		this.playHistoryView.destroy();
		this.artworkView.destroy();

		$(window).trigger('resize');
	},

	/**
	* Move DOM elements to the correct positions
	*/
	reposition: function(){
		var self = this;

		panes.update();

		var windowWidth = $(window).width();
		var windowHeight = $(window).height();

		var chatHeight = (windowHeight - 54);
		$('.app-right').css({
			"height": chatHeight + "px",
			"width": panes.get('chat')
		});

		$('#plugpro-view-buttons').width( panes.get('userlist') );

		var nowPlayingWidth = windowWidth - $('#room-bar').outerWidth() - panes.get('chat') - 54;
		$('#now-playing-bar').width( nowPlayingWidth );

		$('#chat-messages').height( windowHeight - 160 );

		// Wait 5 seconds before clearing the interval.
		// This fixes a bug where the layout wouldn't always render correctly.
		if( new Date() > this.loadTime + 5000 ){
			clearInterval( this.initialInterval );
		}


		var headerWidth = windowWidth - panes.get('chat');
		$('#room-meta').width( headerWidth );

		this.waitlistView.reposition();
		this.userListView.reposition();
		this.playHistoryView.reposition();
		this.artworkView.reposition();
	}

};

module.exports = ProViewView;