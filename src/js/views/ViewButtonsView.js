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

	/**
	* Called when a potential room change is detected
	*/
	handleRoomChange: function(){
		if( $('#room-loader').length > 0 ){
			if( this.newRoomInterval ){
				clearInterval( this.newRoomInterval );
			}
			this.newRoomInterval = setInterval( this.checkForRoomChangeComplete.bind(this), 300 );
		}
	},

	/**
	* Called when user has successfully switched rooms
	*/
	checkForRoomChangeComplete: function(){
		if( $('#room-loader').length === 0 ){
			clearInterval( this.newRoomInterval );
			this.newRoomInterval = undefined;
			this.removeCurrentView();
			this.currentView = undefined;
			this.loadView( ProView );
		}
	},

	/**
	* Loads the correct view when a user clicks a view button
	* @param {object} evt - The click event object
	*/
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

	/**
	* Destroys current view and loads the one specifed
	* @param {object} newView - The view object to load
	*/
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

	/**
	* Destroys the current view if it exists
	*/
	removeCurrentView: function(){
		if( this.currentView ){
			this.currentView.destroy();
		}
	}

});

module.exports = ViewButtonsView;