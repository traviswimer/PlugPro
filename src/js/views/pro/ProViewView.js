/**
 * View for "pro view"
 * @module views/pro/ProViewView
 */

var WaitlistView = require('./WaitlistView');
var UserListView = require('./UserListView');
var PlayHistoryView = require('./PlayHistoryView');

var ProViewView = {
	
	/**
	* Renders the "avatar" view
	*/
	render: function(){
		var JST = window.plugPro.JST;
		
		$('#chat-button').click();
		/*if( $('#history-panel').css("display") !== "block" ){
			$('#history-button').click();
		}*/

		$('body').addClass('plugpro-pro');

		$('#room').append("<div class='pro-bg-cover'></div>");

		this.waitlistView = new WaitlistView();
		$('.pro-bg-cover').append( this.waitlistView.el );
		this.waitlistView.render();

		this.userListView = new UserListView();
		$('.pro-bg-cover').append( this.userListView.el );
		this.userListView.render();

		this.playHistoryView = new PlayHistoryView();
		$('.pro-bg-cover').append( this.playHistoryView.el );
		this.playHistoryView.render();

		var windowWidth = $(window).width();

		// Set pane defaults
		this.paneSizes = {
			"middle": windowWidth * 0.5,
			"userlist": windowWidth * 0.25,
			"chat": windowWidth * 0.25
		};

		this.callbackToReposition = this.reposition.bind(this);

		$(window).on( 'resize', this.callbackToReposition );

		this.initialInterval = setInterval( this.callbackToReposition, 200 );

		this.reposition();
	},

	destroy: function(){
		if( this.initialInterval ){
			clearInterval( this.initialInterval );
			this.initialInterval = undefined;
		}
		$(window).off( 'resize', this.callbackToReposition );

		$('body').removeClass('plugpro-pro');
		//$('#history-button').click();
		$('#room').find('.pro-bg-cover').remove();
		$('#plugpro-view-buttons').attr("style", "");
		$('#plugpro-view-buttons').css({
			"width": "auto"
		});
		$('#history-panel').attr("style", "");
		$('#room-meta').attr("style", "");
		this.waitlistView.destroy();
		this.userListView.destroy();

		$(window).trigger('resize');
	},

	reposition: function(){
		var self = this;

		var windowWidth = $(window).width();
		var windowHeight = $(window).height();

		$('.app-right').css({
			"height": (windowHeight - 54) + "px",
			"width": this.paneSizes.chat
		});

		$('#plugpro-view-buttons').width( this.paneSizes.userlist );


		/*
		if( $('#history-panel').html() !== "" ){


			$('#history-panel').width( this.paneSizes.middle/2 );
			$('#history-panel').height( (windowHeight - 109) / 2 );
			$('#history-panel').css({
				"left": this.paneSizes.userlist + "px"
			});

			if( this.initialInterval ){
				clearInterval( this.initialInterval );
				this.initialInterval = undefined;
			}
		}*/
		clearInterval( this.initialInterval );


		var headerWidth = windowWidth - this.paneSizes.chat;
		$('#room-meta').width( headerWidth );

		this.waitlistView.reposition( this.paneSizes );
		this.userListView.reposition( this.paneSizes );
		this.playHistoryView.reposition( this.paneSizes );
	}

};

module.exports = ProViewView;