/**
 * View for the Pro, Video, and avatar buttons
 * @module views/ViewButtonsView
 */

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
		this.loadView( VideoView );
	},

	events: {
		"click .plugpro-view-button": "handleButtonClick"
	},

	handleButtonClick: function( evt ){
		var viewName = $( evt.currentTarget ).data('view-name');

		if( viewName === "pro" ){

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