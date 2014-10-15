/**
 * View for the Pro, Video, and avatar buttons
 * @module views/ViewButtonsView
 */

var ProView = require('./pro/ProViewView');
var VideoView = require('./video/VideoViewView');
var AvatarsView = require('./avatars/AvatarsViewView');

var ViewButtonsView = Backbone.View.extend(
/** @lends ViewButtonsView.prototype */
{
	/**
	* @class ViewButtonsView view
	*
	* @augments Backbone.View
	* @constructs
	*/
	initialize: function( options ){
		var JST = window.plugPro.JST;
		this.buttonsHTML = JST['view_buttons.html']();
	},

	id: "plugpro-view-buttons",

	/**
	* Renders the ProMenu UI elements to the DOM
	*/
	render: function(){
		this.$el.append( this.buttonsHTML );
		this.loadView( ProView );

		// Detect room change
		$('#dashboard').on( "click", this.handleRoomChange.bind( this ) );
	},

	events: {
		"click .plugpro-view-button": "handleButtonClick"
	},

	handleRoomChange: function(){
		console.log("dashboardCLICK");
		if( $('#room-loader').length > 0 ){
		console.log("room change!!!!");
			if( this.newRoomInterval ){
				clearInterval( this.newRoomInterval );
			}
			this.newRoomInterval = setInterval( this.checkForRoomChangeComplete.bind(this), 300 );
		}
	},

	checkForRoomChangeComplete: function(){
		if( $('#room-loader').length === 0 ){
			clearInterval( this.newRoomInterval );
			this.newRoomInterval = undefined;
			this.removeCurrentView();
			this.currentView = undefined;
			this.loadView( ProView );
		}
	},

	handleButtonClick: function( evt ){
		var viewName = $( evt.currentTarget ).data('view-name');

		if( viewName === "pro" ){
			this.loadView( ProView );
		}else if( viewName === "video" ){
			this.loadView( VideoView );
		}else if( viewName === "avatars" ){
			this.loadView( AvatarsView );
		}
	},

	loadView: function( newView ){
		if( newView !== this.currentView ){
			this.removeCurrentView();
			this.currentView = newView;
			if( newView.initialize ){
				newView.initialize();
			}
			newView.render();
		}
	},

	removeCurrentView: function(){
		if( this.currentView ){
			this.currentView.destroy();
		}
	}

});

module.exports = ViewButtonsView;